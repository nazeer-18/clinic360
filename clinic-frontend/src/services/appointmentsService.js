import API from './api';

export const getAppointments = async (id) => {
    const response = await API.get(`/api/appointments/get-appointments/?id=${id}`);
    return response.data;
};

export const getBookedSlots = async(appointmentData) => {
    const response = await API.post('/api/appointments/get-booked-slots', appointmentData);
    return response.data;
}

export const bookAppointment = async (appointmentData) => {
    const response = await API.post('/api/appointments/book-appointment', appointmentData);
    return response.data;
};

export const cancelAppointment = async (appointmentId) => {
    const response = await API.post(`/api/appointments/cancel-appointment?id=${appointmentId}`);
    return response.data;
};
