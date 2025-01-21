const { hashPassword , isPasswordMatch } = require('../units/passwordUtils');
const jwt = require('jsonwebtoken');
const User = require('../moduels/users/user-moduel');

// const users = [];

// Register Function
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Invalid email or password format' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Save user
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// login Function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Invalid email or password format' });
    }

    const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await isPasswordMatch(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

    res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });   
    }
};

module.exports = { register, login};