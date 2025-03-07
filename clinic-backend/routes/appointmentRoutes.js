const express = require('express');
const router = express.Router();
const {getBookedSlots,bookAppointment,cancelAppointment,getAppointments} = require('../controllers/appointmentController');

router.get('/get-appointments',getAppointments);
router.post('/book-appointment',bookAppointment);
router.post('/cancel-appointment',cancelAppointment);
router.post('/get-booked-slots',getBookedSlots);
module.exports = router;