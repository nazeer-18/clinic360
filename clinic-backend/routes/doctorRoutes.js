const express = require('express');
const { searchDoctor, getDoctor } = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.get("/search-doctor", searchDoctor);
router.get('/doctor-profile', getDoctor);
module.exports = router;