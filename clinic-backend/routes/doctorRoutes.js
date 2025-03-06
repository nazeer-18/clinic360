const express = require('express');
const { searchDoctor, getDoctor } = require('../controllers/doctorController');
const {authenticate} = require('../middleware/authMiddleware');

const router = express.Router();
router.post("/search-doctor",authenticate, searchDoctor);
router.get('/doctor-profile',authenticate, getDoctor);
module.exports = router;