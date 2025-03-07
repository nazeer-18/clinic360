import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchDoctors } from "../services/doctorsService";

const SearchDoctors = () => {
    const navigate = useNavigate();
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [name, setName] = useState("");
    const [specializations, setSpecializations] = useState([]);
    const [newSpecialization, setNewSpecialization] = useState("");

    // Handle change in specialization input
    const handleSpecializationChange = (e) => {
        setNewSpecialization(e.target.value);
    };

    // Add specialization to the list when the user hits Enter
    const handleSpecializationAdd = (e) => {
        if (e.key === "Enter" && newSpecialization.trim() !== "") {
            setSpecializations([...specializations, newSpecialization.trim()]);
            setNewSpecialization(""); // Clear the input field
        }
    };

    // Remove specialization from the list
    const handleSpecializationRemove = (spec) => {
        setSpecializations(specializations.filter(s => s !== spec));
    };

    // Handle form submission or search action
    const handleSearch = async (e) => {
        e.preventDefault();
        const searchCriteria = {
            city,
            state,
            name,
            specializations,
        };
        try {
            const doctors = await searchDoctors(searchCriteria);
            navigate('/searched-doctors/', {
                state: { doctors } // Passing the doctor data as state
            });
        } catch (error) {
            console.error("Error searching for doctors:", error);
        }
    };
    

    return (
        <div className="container mx-auto p-8 mb-8">
            <h1 className="text-3xl font-semibold text-center mb-6">Search Doctors</h1>

            {/* City Input */}
            <div className="mb-4">
                <label className="block text-gray-700">City</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city if you know"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* State Input */}
            <div className="mb-4">
                <label className="block text-gray-700">State</label>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter state if you know"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Name Input */}
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name to match partially"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Specialization Input */}
            <div className="mb-4">
                <label className="block text-gray-700">Specialization</label>
                <input
                    type="text"
                    value={newSpecialization}
                    onChange={handleSpecializationChange}
                    onKeyDown={handleSpecializationAdd}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter specialization and press Enter"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                    {specializations.map((spec, index) => (
                        <span
                            key={index}
                            className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg"
                        >
                            {spec}
                            <button
                                onClick={() => handleSpecializationRemove(spec)}
                                className="ml-2 text-white font-bold"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Search Button */}
            <div className="mt-4 text-center">
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Search Doctors
                </button>
            </div>
        </div>
    );
};

export default SearchDoctors;