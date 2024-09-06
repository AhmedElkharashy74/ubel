const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const argon2 = require('argon2')

// Create a new user
exports.create = async (req, res) => {
    const { first_name, last_name, email, password, phone, status, role } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Password validation
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    try {
        // Hash password with Argon2id
        const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
        console.log('Original password:', password);
        console.log('Hashed password:', hashedPassword);

        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone,
            status,
            role
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read users with pagination
exports.findAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({ error: 'Page and limit must be positive integers' });
        }

        const query = {};
        if (req.query.role) query.role = req.query.role;

        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        
        const totalUsers = await User.countDocuments(query);

        res.status(200).json({
            page,
            limit,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
exports.update = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone, status, role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { first_name, last_name, email, phone, status, role }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
exports.delete = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials: email not found', email });
        }

        // Verify password using Argon2id
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials: password mismatch' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
};