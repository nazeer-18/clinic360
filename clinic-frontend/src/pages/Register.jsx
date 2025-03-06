import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {registerUser} from '../services/authService'

const Register = () => {
    const [role, setRole] = useState("");
    const [messageStyle, setMessageStyle] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        experience: "",
        specialization: [],
        city: "",
        state: "",
        slots: [],
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSpecializationChange = (e) => {
        setUser({ ...user, specialization: e.target.value.split(",") });
    };

    const handleSlotChange = (index, key, value) => {
        const updatedSlots = [...user.slots];
        updatedSlots[index][key] = value;
        setUser({ ...user, slots: updatedSlots });
    };

    const addSlot = () => {
        setUser({
            ...user,
            slots: [...user.slots, { location: "", weekdays: [], startTime: "", endTime: "" }],
        });
    };

    const removeSlot = (index) => {
        const updatedSlots = user.slots.filter((_, i) => i !== index);
        setUser({ ...user, slots: updatedSlots });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await registerUser(user);
            setMessage(res.message);
            setMessageStyle("bg-green-500 text-white font-bold p-2 rounded");
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            console.log(error.response?.data?.message || "Server error");
            setMessage(error.response?.data?.message || "Server error");
            setMessageStyle("bg-red-500 text-white font-bold p-2 rounded");
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <div className="flex min-h-screen justify-center items-center bg-blue-100 p-4">
            <form
                onSubmit={handleRegister}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

                <div className="flex flex-col">
                    <label className="font-medium">Select Role:</label>
                    <select
                        className="border p-2 rounded"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <input type="text" name="name" placeholder="Full Name" className="border p-2 rounded" value={user.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" className="border p-2 rounded" value={user.email} onChange={handleChange} required />
                    <input type="text" name="mobile" placeholder="Mobile Number" className="border p-2 rounded" value={user.mobile} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" className="border p-2 rounded" value={user.password} onChange={handleChange} required />
                </div>

                {role === "doctor" && (
                    <div className="flex flex-col gap-2">
                        <input type="number" name="experience" placeholder="Experience (Years)" className="border p-2 rounded" value={user.experience} onChange={handleChange} required />
                        <input type="text" name="specialization" placeholder="Specialization (comma-separated)" className="border p-2 rounded" value={user.specialization.join(",")} onChange={handleSpecializationChange} required />
                        <input type="text" name="city" placeholder="City" className="border p-2 rounded" value={user.city} onChange={handleChange} required />
                        <input type="text" name="state" placeholder="State" className="border p-2 rounded" value={user.state} onChange={handleChange} required />

                        <h3 className="text-lg font-semibold mt-2">Available Slots</h3>
                        {user.slots.map((slot, index) => (
                            <div key={index} className="border p-2 rounded bg-gray-50 flex flex-col gap-2">
                                <input type="text" placeholder="Location" className="border p-2 rounded" value={slot.location} onChange={(e) => handleSlotChange(index, "location", e.target.value)} required />
                                <select multiple className="border p-2 rounded" onChange={(e) => handleSlotChange(index, "weekdays", Array.from(e.target.selectedOptions, option => option.value))} required>
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                </select>
                                <input type="time" className="border p-2 rounded" value={slot.startTime} onChange={(e) => handleSlotChange(index, "startTime", e.target.value)} required />
                                <input type="time" className="border p-2 rounded" value={slot.endTime} onChange={(e) => handleSlotChange(index, "endTime", e.target.value)} required />
                                <button type="button" className="bg-red-600 text-white p-1 rounded mt-2" onClick={() => removeSlot(index)}>Remove Slot</button>
                            </div>
                        ))}
                        <button type="button" className="bg-green-600 text-white p-2 rounded font-semibold mt-2" onClick={addSlot}>+ Add Slot</button>
                    </div>
                )}

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold text-lg" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                {message && <p className={`text-center mt-2 ${messageStyle}`}>{message}</p>}
            </form>
        </div>
    );
};

export default Register;