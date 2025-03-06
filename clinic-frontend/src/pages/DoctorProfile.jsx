import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDoctor } from "../services/doctorsService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt, faBriefcase, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const DoctorProfile = () => {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const doctorId = new URLSearchParams(location.search).get("id");

    useEffect(() => {
        if (!doctorId) {
            navigate("/"); // Redirect if no doctor id is found
            return;
        }

        const fetchDoctorDetails = async () => {
            try {
                const doctorData = await getDoctor(doctorId); // Fetch doctor data using the id
                setDoctor(doctorData);
                console.log(doctorData);
            } catch (error) {
                console.error("Error fetching doctor data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [doctorId, navigate]);

    if (loading) {
        return <div>Loading doctor details...</div>;
    }

    if (!doctor) {
        return <div>Doctor not found</div>;
    }

    return (
        <div className="container mx-auto p-8 bg-gray-100 min-h-screen mb-10">
            <div className="text-center text-3xl font-semibold mb-6 text-indigo-600">
                Doctor Profile
            </div>

            <div className="border p-6 rounded-lg shadow-md bg-white">
                <div className="text-2xl font-bold text-gray-800">{doctor.name}</div>
                <div className="text-lg text-gray-600 mb-4">{doctor.specialization.join(", ")}</div>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-indigo-500" />
                    <span><strong>Email:</strong> {doctor.email}</span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-indigo-500" />
                    <span><strong>Mobile:</strong> {doctor.mobile}</span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-indigo-500" />
                    <span><strong>Experience:</strong> {doctor.experience} years</span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-indigo-500" />
                    <span><strong>Location:</strong> {doctor.city}, {doctor.state}</span>
                </div>

                <div className="mt-6">
                    <strong className="text-lg text-gray-800">Available Locations & Slots:</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {doctor.locations.map((location, index) => (
                            <div key={index} className="border p-4 rounded-md shadow-md bg-gray-50">
                                <div className="font-semibold text-gray-800">{location.locationName}</div>
                                <div className="text-gray-600 mt-2">Availability:</div>
                                {location.availabilitySlots.map((slot, slotIndex) => (
                                    <div key={slotIndex} className="text-gray-500 mt-2">
                                        <div className="flex items-center">
                                            <FontAwesomeIcon icon={faClock} className="mr-2 text-indigo-500" />
                                            <div>
                                                <strong>Day:</strong> {slot.day}
                                            </div>
                                        </div>
                                        <div>
                                            <strong>Time:</strong> {slot.startTime} - {slot.endTime}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;