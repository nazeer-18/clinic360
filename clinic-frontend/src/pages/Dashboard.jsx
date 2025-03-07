import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState({ name: "nazeer" });
    const userId = '67c8b144d046bf76b737f9a3';
    const navigate = useNavigate();

    // Function to handle button clicks and navigate to the corresponding page
    const handleButtonClick = (action) => {
        try {
            switch (action) {
                case "Search for Doctors":
                    navigate("/search-doctors");  // Navigate to search doctors page
                    break;
                case "Book Appointment":
                    navigate("/search-doctors");  // Navigate to book appointment page
                    break;
                case "View Appointments":
                    navigate(`/view-appointments/?id=${userId}`);  // Navigate to view appointments page
                    break;
                case "Cancel Appointment":
                    navigate(`/view-appointments/?id=${userId}`);  // Navigate to cancel appointment page
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(`${action} failed`, error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
            } catch (err) {
                console.error("User Fetch Failed", err);
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    return (
        <div className="bg-blue-50 min-h-screen flex flex-col">
            {/* Fixed Navbar */}
            <div className="bg-blue-600 text-white p-4 fixed w-full top-0 z-10">
                <div className="text-center text-xl">Dashboard</div>
            </div>

            {/* Main Content */}
            <div className="flex-grow mt-16 container mx-auto p-8 text-center">
                <div className="text-3xl font-semibold text-gray-700 mb-6">
                    Hi, <span className="text-blue-600">{user.name}</span>!
                </div>

                <div className="flex justify-around gap-6 flex-wrap">
                    <button
                        className="bg-blue-600 text-white font-bold p-4 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition duration-300"
                        onClick={() => handleButtonClick("Search for Doctors")}
                    >
                        Search for Doctors
                    </button>

                    <button
                        className="bg-blue-600 text-white font-bold p-4 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition duration-300"
                        onClick={() => handleButtonClick("Book Appointment")}
                    >
                        Book Appointment
                    </button>

                    <button
                        className="bg-blue-600 text-white font-bold p-4 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition duration-300"
                        onClick={() => handleButtonClick("View Appointments")}
                    >
                        View Appointments
                    </button>

                    <button
                        className="bg-blue-600 text-white font-bold p-4 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition duration-300"
                        onClick={() => handleButtonClick("Cancel Appointment")}
                    >
                        Cancel Appointment
                    </button>
                </div>

                <div className="mt-12 text-lg text-gray-500">
                    Welcome to your Dashboard! Choose an option above to manage your appointments.
                </div>
            </div>
        </div>
    );
};

export default Dashboard;