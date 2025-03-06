const express = require('express');
const router = express.Router();
const {bookAppointment,cancelAppointment,getAppointments} = require('../controllers/appointmentController');

router.get('/get-appointments',getAppointments);
router.post('/book-appointment',bookAppointment);
router.post('/cancel-appointment',cancelAppointment);
module.exports = router;