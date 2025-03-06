const User = require('../models/User');
const jwt = require('jsonwebtoken');

//generating jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

//register a new user
const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const { name, mobile, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }
        if (role === 'patient') {
            const newUser = await User.create({ name, mobile, email, password, role });
            res.status(201).json({
                newUser, token: generateToken(newUser._id),message:'Registration successfull!'
            })
        } else {
            const { experience, specialization, city, state, locations } = req.body;
            const newUser = await User.create({ name, mobile, email, password, role, experience, specialization, city, state, locations });
            res.status(201).json({
                newUser, token: generateToken(newUser._id),message:'Registration successfull!'
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
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                message: 'User not found. Please Register!'
            });
        }
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        res.json({
            id: user._id,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            message: 'Logged in Successfully..'
        });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}
module.exports = { registerUser, loginUser };