import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (

        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-gray-800">
                <h1 className="text-3xl font-bold mb-4">Welcome to Clinic 360</h1>
                <p className="text-lg">
                    Your one-stop platform to connect patients with doctors. Get expert
                    medical consultation from professionals near you.
                </p>
            </div>

            <div className="flex gap-6 mt-6">
                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate("/register")}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Home;
