import { useLocation, useNavigate } from "react-router-dom";
import { FaUserMd, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const SearchedDoctors = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { doctors } = state || {};

    // Handle "Explore" button click
    const handleExploreClick = (doctorId) => {
        navigate(`/doctor-profile/?id=${doctorId}`); // Navigate to the doctor's profile page
    };

    // Handle "Book Appointment" button click for each doctor
    const handleBookAppointmentClick = (doctorId) => {
        navigate(`/book-appointment/?id=${doctorId}`); // Navigate to the Book Appointment page with the doctor's id
    };

    return (
        <div className="container mx-auto p-10 mb-10">
            <div className="text-center text-2xl font-semibold mb-6">
                Explore Our Doctors
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {doctors.length === 0 ? (
                    <div>No doctors found</div>
                ) : (
                    doctors.map((doctor) => (
                        <div
                            key={doctor._id}
                            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                        >
                            <div className="text-lg font-semibold flex items-center">
                                <FaUserMd className="text-blue-600 mr-2" />
                                {doctor.name}
                            </div>

                            <div className="text-sm text-gray-600 mt-2 flex items-center">
                                <FaBriefcase className="mr-2 text-gray-500" />
                                {doctor.experience} years of experience
                            </div>

                            <div className="text-sm text-gray-600 mt-2 flex items-center">
                                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                                {doctor.city}, {doctor.state}
                            </div>

                            <div className="text-sm text-gray-500 mt-2">
                                {doctor.specialization.join(", ")}
                            </div>

                            {/* Explore Button */}
                            <button
                                className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                                onClick={() => handleExploreClick(doctor._id)}
                            >
                                Explore
                            </button>

                            {/* Book Appointment Button for each doctor */}
                            <button
                                className="mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                                onClick={() => handleBookAppointmentClick(doctor._id)}
                            >
                                Book Appointment
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchedDoctors;