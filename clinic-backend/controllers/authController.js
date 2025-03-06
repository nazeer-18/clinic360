const User = require('../models/User');
const jwt = require('jsonwebtoken');

//generating jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

//register a new user
const registerUser = async (req, res) => {
    try {
        const { name, mobile, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }
        if (role === 'patient') {
            const newUser = await User.create({ name, mobile, email, password,role });
            res.status(201).json({
                newUser, token: generateToken(newUser._id),
            })
        } else {
            const { experience, specialization,city,state, locations } = req.body;
            const newUser = await User.create({ name, mobile, email, password, role, experience, specialization,city,state, locations });
            res.status(201).json({
                newUser, token: generateToken(newUser._id),
            })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.find({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                user,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({
                message: 'Invalid email or password'
            });
        }
    }
    catch (error) {
        res.status(401).json({ message: 'invalid data' });
    }
}
module.exports = { registerUser, loginUser };