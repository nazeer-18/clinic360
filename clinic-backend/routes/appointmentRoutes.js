const express = require('express');
const router = express.Router();
const {bookAppointment,cancelAppointment} = require('../controllers/appointmentController');

router.post('/book-appointment',bookAppointment);
router.post('/cancel-appointment',cancelAppointment);
module.exports = router;