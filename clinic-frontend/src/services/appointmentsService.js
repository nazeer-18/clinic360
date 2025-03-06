import API from './api';

export const getAppointments = async (id) => {
    const response = await API.get(`/api/appointments/get-appointments/?id=${id}`);
    return response.data;
};

export const bookAppointment = async (appointmentData) => {
    const response = await API.post('/api/appointments', appointmentData);
    return response.data;
};

export const cancelAppointment = async (appointmentId) => {
    const response = await API.delete(`/api/appointments/?id=${appointmentId}`);
    return response.data;
};
