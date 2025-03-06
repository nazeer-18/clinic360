import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState(""); // Default styling
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await loginUser({ email, password });
            if (res.token) {
                localStorage.setItem("token", res.token);
                setMessage("Login Successful!");
                setMessageStyle("bg-green-500 text-white font-bold p-2 rounded");
                setTimeout(() => navigate("/dashboard"), 2000);
            } else {
                setMessage(res.message || "Invalid credentials");
                setMessageStyle("bg-red-500 text-white font-bold p-2 rounded");
            }
        } catch (error) {
            console.log(error.response?.data?.message || "Server error");
            setMessage(error.response?.data?.message || "Server error");
            setMessageStyle("bg-red-500 text-white font-bold p-2 rounded");
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(""), 2000);
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300">
            <form
                onSubmit={handleLogin}
                className="bg-white p-10 rounded-lg shadow-lg w-[400px] flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white p-3 rounded transition font-semibold text-lg ${loading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {message && <p className={`text-center mt-2 ${messageStyle}`}>{message}</p>}
            </form>
        </div>
    );
};

export default Login;