import { Link } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../services/authService";
import { FaClinicMedical } from "react-icons/fa";

const Navbar = () => {
    const handleLogout = () => {
        logoutUser(); 
        window.location.href = "/";
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/dashboard" className="flex items-center text-xl font-bold">
                    <FaClinicMedical className="mr-2 text-2xl" />
                    Clinic 360
                </Link>

                <div className="space-x-6">
                    {isLoggedIn() ? (
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;