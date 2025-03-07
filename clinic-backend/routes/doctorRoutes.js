const express = require('express');
const { searchDoctor, getDoctor,getDoctorLocation } = require('../controllers/doctorController');
const {authenticate} = require('../middleware/authMiddleware');

const router = express.Router();
router.post("/search-doctor",authenticate, searchDoctor);
router.get('/doctor-profile',authenticate, getDoctor);
router.post('/get-doctor-location',getDoctorLocation)
module.exports = router;