import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDoctor, getDoctorLocation } from '../services/doctorsService';
import { bookAppointment, getBookedSlots } from '../services/appointmentsService';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookAppointment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const doctorId = new URLSearchParams(location.search).get("id");
    const patientId = '67c8b144d046bf76b737f9a3'; // You can replace this with the actual patient ID from your state or context
    const [weekday, setWeekday] = useState('');
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [StringDate, setStringDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState(''); // Combined message for success or error
    const [messageType, setMessageType] = useState(''); // To differentiate between success or error message
    const [isSubmitting, setIsSubmitting] = useState(false); // To track submission status

    // Fetch doctor details
    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const doctorData = await getDoctor(doctorId);
                setDoctor(doctorData);
            } catch (error) {
                console.error("Error fetching doctor data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (doctorId) {
            fetchDoctorDetails();
        }
    }, [doctorId]);

    // Fetch available slots for the selected date and day
    useEffect(() => {
        if (doctor) {
            const fetchAvailableSlots = async () => {
                const dayOfWeek = selectedDate.toLocaleString('en-us', { weekday: 'long' });
                setWeekday(dayOfWeek);
                const slots = doctor.locations.flatMap(location =>
                    location.availabilitySlots.filter(slot => slot.day === dayOfWeek)
                );
                setAvailableSlots(slots);

                // Fetch booked slots for that specific date
                const booked = await fetchBookedSlots(selectedDate);
                setBookedSlots(booked);
            };
            fetchAvailableSlots();
        }
    }, [doctor, selectedDate]);

    // Fetch booked slots for a particular date
    const fetchBookedSlots = async (date) => {
        try {
            const newDate = date.toLocaleDateString('en-CA');
            setStringDate(newDate);
            const response = await getBookedSlots({ doctorId, date: StringDate });
            return response || [];
        } catch (error) {
            console.error("Error fetching booked slots:", error);
            return [];
        }
    };

    // Handle calendar date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setMessage(''); // Clear message on date change
    };

    // Handle start time change
    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
        setEndTime(''); // Clear the end time when a new start time is selected
        setMessage('');
    };

    // Handle end time change
    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
        setMessage('');
    };

    // Convert a time string to a Date object (for comparison)
    const convertToDate = (time) => {
        const dateTimeString = `${selectedDate.toLocaleDateString()} ${time}`;
        return new Date(dateTimeString);
    };

    // Check if the selected start time and end time are within the available slots and not conflicting with booked slots
    const isSlotAvailable = (start, end) => {
        const startDateTime = convertToDate(start);
        const endDateTime = convertToDate(end);

        // Check if the selected time range is within available slots
        const isWithinAvailableSlot = availableSlots.some(slot => {
            const slotStart = convertToDate(slot.startTime);
            const slotEnd = convertToDate(slot.endTime);
            return startDateTime >= slotStart && endDateTime <= slotEnd;
        });

        // Check if the selected time range conflicts with any booked slots
        const isConflictingWithBookedSlots = bookedSlots.some(bookedSlot => {
            const bookedStart = new Date(bookedSlot.startTime);
            const bookedEnd = new Date(bookedSlot.endTime);
            return (
                (startDateTime >= bookedStart && startDateTime < bookedEnd) ||
                (endDateTime > bookedStart && endDateTime <= bookedEnd) ||
                (startDateTime < bookedStart && endDateTime > bookedEnd)
            );
        });

        return isWithinAvailableSlot && !isConflictingWithBookedSlots;
    };

    // Handle booking submission
    const handleBookAppointment = async () => {
        if (!startTime || !endTime) {
            setMessage("Please select both start time and end time.");
            setMessageType('error');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        if (!isSlotAvailable(startTime, endTime)) {
            setMessage("The selected slot is not available. Please choose another.");
            setMessageType('error');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        setIsSubmitting(true); // Start submission

        try {
            const response = await getDoctorLocation({ doctorId, startTime, endTime, day: weekday });
            const location = response.location;
            const result = await bookAppointment({
                doctorId, patientId, location, date: selectedDate.toLocaleDateString('en-CA'),
                startTime, endTime, status: 'Booked'
            });

            if (result.success) {
                setMessage(result.message);
                setMessageType('success');
                setTimeout(() => setMessage(''), 3000);
                setTimeout(() => {
                    navigate('/view-appointments');
                }, 3000);
            } else {
                setMessage(result.message);
                setMessageType('error');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
            setMessage("Something went wrong while booking the appointment.");
            setMessageType('error');
            setTimeout(() => setMessage(''), 3000);
        } finally {
            setIsSubmitting(false); // End submission
        }
    };

    // Combine available and booked time slots for display
    const combinedSlots = [
        ...availableSlots.map(slot => ({ ...slot, status: 'available' })),
        ...bookedSlots.map(slot => ({ ...slot, status: 'booked' })),
    ];

    // Sort the combined slots by time
    combinedSlots.sort((a, b) => {
        const aStart = convertToDate(a.startTime);
        const bStart = convertToDate(b.startTime);
        return aStart - bStart;
    });

    if (loading) return <div>Loading doctor details...</div>;
    if (!doctor) return <div>Doctor not found</div>;

    return (
        <div className="container mx-auto p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-center text-3xl font-semibold mb-6">Book Appointment with {doctor.name}</h2>

            {/* Calendar */}
            <div className="mb-6">
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    minDate={new Date()} // Disable past dates
                />
            </div>

            {/* Original Slots */}
            <div className="mb-5 text-center">
                <h3 className="text-lg font-semibold">Original Slots</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {availableSlots.map((slot, index) => {
                        return (
                            <div key={index}>
                                <button
                                    onClick={() => {
                                        setStartTime(slot.startTime);
                                        setEndTime(slot.endTime);
                                    }}
                                    className="p-4 border rounded-md bg-green-500 text-white hover:bg-opacity-80"
                                >
                                    {slot.startTime} - {slot.endTime}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Booked Slots */}
            <div className="mb-5 text-center">
                <h3 className="text-lg font-semibold">Booked Slots</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {bookedSlots.map((slot, index) => {
                        return (
                            <div key={index}>
                                <button
                                    className="p-4 border rounded-md bg-red-500 text-white hover:bg-opacity-80"
                                    disabled
                                >
                                    {slot.startTime} - {slot.endTime} (Booked)
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6 flex space-x-4">
                <div>
                    <label className="block text-sm font-medium">Start Time:</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">End Time:</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>
            </div>

            {/* Error or Success message */}
            {message && (
                <div
                    className={`text-center mb-4 ${
                        messageType === 'success' ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                    {message}
                </div>
            )}

            {/* Book appointment button */}
            <div className="text-center mb-8">
                <button
                    onClick={handleBookAppointment}
                    className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Trying to book the slot...' : 'Book Appointment'}
                </button>
            </div>
        </div>
    );
};

export default BookAppointment;