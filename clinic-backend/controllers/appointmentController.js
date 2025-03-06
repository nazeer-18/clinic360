const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const sendEmail = require('../middleware/emailService');

const bookAppointment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { doctorId, patientId, location, date, startTime, endTime, status } = req.body;
        const Doctor = await User.findById(doctorId);
        const Patient = await User.findById(patientId);
        const doctorEmail = Doctor.email;
        const doctorName = Doctor.name;
        const patientEmail = Patient.email;
        const patientName = Patient.name;
        const existingAppointment = await Appointment.findOne({
            doctorId,
            status: 'Booked',
            date,
            $or: [
                {
                    $and: [
                        { startTime: { $lte: startTime } },
                        { endTime: { $gt: startTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $gte: startTime } },
                        { endTime: { $lte: endTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $lt: endTime } },
                        { endTime: { $gte: endTime } }
                    ]
                }
            ]
        }).session(session);

        if (existingAppointment) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'slot is already booked , Please choose another slot' });
        }
        const appointment = new Appointment({
            doctorId,
            patientId,
            location,
            date,
            startTime,
            endTime,
            status
        })

        await appointment.save({ session });

        await sendEmail(patientEmail, "Appointment Confirmed", `Your appointment with Dr. ${doctorName} on ${date} from ${startTime} - ${endTime} is confirmed.`);
        await sendEmail(doctorEmail, "New Appointment", `You have a new appointment with ${patientName} on ${date} from ${startTime} - ${endTime}.`);
        await session.commitTransaction();
        session.endSession();
        return res.status(201).json({ message: 'Appointment booked successfully!', appointment });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: error.message });
    }
};

const cancelAppointment = async (req, res) => {
    const { id } = req.query;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const appointment = await Appointment.findById(id).session(session);
        const {doctorId,patientId,date,startTime,endTime} = appointment;
        const Doctor = await User.findById(doctorId);
        const Patient = await User.findById(patientId);
        const doctorEmail = Doctor.email;
        const doctorName = Doctor.name;
        const patientEmail = Patient.email;
        const patientName = Patient.name;
        if (!appointment) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Appointment not found' });
        }
        if (appointment.status === 'Cancelled') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Appointment is already cancelled" });
        }

        appointment.status = 'Cancelled';
        await appointment.save({ session });

        
        await sendEmail(patientEmail, "Appointment Canceled", `Your appointment with Dr. ${doctorName} on ${date} from ${startTime} - ${endTime} has been canceled.`);
        await sendEmail(doctorEmail, "Appointment Canceled", `Your appointment with ${patientName} on ${date} from ${startTime} -${endTime} has been canceled.`);
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: error.message });
    }
};

module.exports = { bookAppointment, cancelAppointment };