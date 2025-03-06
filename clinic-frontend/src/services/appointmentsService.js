import API from './api';

export const getAppointments = async () => {
    const response = await API.get('/api/appointments');
    return response.data;
};

export const bookAppointment = async (appointmentData) => {
    const response = await API.post('/api/appointments', appointmentData);
    return response.data;
};

export const cancelAppointment = async (appointmentId) => {
    const response = await API.delete(`/api/appointments/${appointmentId}`);
    return response.data;
};
