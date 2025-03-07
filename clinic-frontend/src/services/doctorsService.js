import API from './api';

export const searchDoctors = async (query) => {
    const response = await API.post('/api/doctor/search-doctor',query); 
    return response.data;
};

export const getDoctor = async (doctorId) => {
    try {
        const response = await API.get(`/api/doctor/doctor-profile/?id=${doctorId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor:", error);
        throw error;
    }
};

export const getDoctorLocation = async(data) => {
    try{
        const response = await API.post('/api/doctor/get-doctor-location',data);
        return response.data;
    }catch(error){
        console.error("Error fetching location:", error);
        throw error;
    }
}