import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAppointments } from "../services/appointmentsService";
import { FaCalendarAlt, FaClock, FaLocationArrow, FaUserMd, FaCalendarDay } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { cancelAppointment } from '../services/appointmentsService';

const ViewAppointments = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = new URLSearchParams(location.search).get("id");
    const [appointments, setAppointments] = useState({
        upcomingBooked: [],
        pastBooked: [],
        upcomingCancelled: [],
        pastCancelled: []
    });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("upcomingBooked");

    // Get current date and time in IST (Indian Standard Time)
    const currentDate = new Date();
    const currentISTDate = currentDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const currentIST = new Date(currentISTDate); // Get the current time in IST

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointments(userId);

                const categorizedAppointments = {
                    upcomingBooked: [],
                    pastBooked: [],
                    upcomingCancelled: [],
                    pastCancelled: []
                };

                data.forEach((appointment) => {
                    const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}:00`);

                    // Check if the appointment is upcoming or past
                    if (appointment.status === "Booked") {
                        if (appointmentDateTime > currentIST) {
                            categorizedAppointments.upcomingBooked.push(appointment);
                        } else {
                            categorizedAppointments.pastBooked.push(appointment);
                        }
                    }

                    if (appointment.status === "Cancelled") {
                        if (appointmentDateTime > currentIST) {
                            categorizedAppointments.upcomingCancelled.push(appointment);
                        } else {
                            categorizedAppointments.pastCancelled.push(appointment);
                        }
                    }
                });

                setAppointments(categorizedAppointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [userId, currentIST]);

    const handleCancelAppointment = (appointmentId) => {
        const isConfirmed = window.confirm("Are you sure you want to cancel this appointment?");
        if (isConfirmed) {
            cancelAppointment(appointmentId)
                .then(() => {
                    alert("Appointment canceled successfully");
                })
                .catch((error) => {
                    console.error("Error canceling appointment:", error);
                    alert("There was an error canceling the appointment.");
                });
        }
    };

    const renderAppointments = (appointmentsList, status) => {
        return appointmentsList.map((appointment) => (
            <div key={appointment._id} className="border p-4 mb-4 rounded-lg shadow-md">
                <div className="flex items-center mt-2">
                    <FaClock className="mr-2 text-blue-500" />
                    <span>{appointment.startTime} - {appointment.endTime}</span>
                </div>
                <div className="flex items-center mt-2">
                    <FaLocationArrow className="mr-2 text-blue-500" />
                    <span>{appointment.location}</span>
                </div>
                <div className="flex items-center mt-2">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <span>{appointment.date}</span>
                </div>
                <div className="flex items-center mt-2">
                    <FaUserMd className="mr-2 text-blue-500" />
                    <span>{appointment.doctorName}</span>
                </div>
                {filter === "upcomingBooked" && (
                    <Button
                        onClick={() => handleCancelAppointment(appointment._id)}
                        variant="danger"
                        className="mt-4 bg-red-200 hover:bg-red-300 text-red-700 px-6 py-2"
                    >
                        Cancel Appointment
                    </Button>
                )}
            </div>
        ));
    };

    if (loading) {
        return <div>Loading appointments...</div>;
    }

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-semibold mb-6">Your Appointments</h2>

            <div className="mb-6">
                {/* Filter Buttons */}
                <div className="flex space-x-4 mb-6">
                    <Button
                        onClick={() => handleFilterChange("upcomingBooked")}
                        className="px-6 py-2 font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                    >
                        Upcoming Booked
                    </Button>
                    <Button
                        onClick={() => handleFilterChange("pastBooked")}
                        className="px-6 py-2 font-bold text-white bg-green-500 hover:bg-green-600 rounded-lg"
                    >
                        Past Booked
                    </Button>
                    <Button
                        onClick={() => handleFilterChange("upcomingCancelled")}
                        className="px-6 py-2 font-bold text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg"
                    >
                        Upcoming Cancelled
                    </Button>
                    <Button
                        onClick={() => handleFilterChange("pastCancelled")}
                        className="px-6 py-2 font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg"
                    >
                        Past Cancelled
                    </Button>
                </div>

                {/* Filtered Content */}
                {filter === "upcomingBooked" && (
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Upcoming Booked Appointments</h3>
                        {renderAppointments(appointments.upcomingBooked, "Booked")}
                    </div>
                )}

                {filter === "pastBooked" && (
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Past Booked Appointments</h3>
                        {renderAppointments(appointments.pastBooked, "Booked")}
                    </div>
                )}

                {filter === "upcomingCancelled" && (
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Upcoming Cancelled Appointments</h3>
                        {renderAppointments(appointments.upcomingCancelled, "Cancelled")}
                    </div>
                )}

                {filter === "pastCancelled" && (
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Past Cancelled Appointments</h3>
                        {renderAppointments(appointments.pastCancelled, "Cancelled")}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAppointments;