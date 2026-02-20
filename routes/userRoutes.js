const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const { jwtauth, gentoken } = require('../jwt');
const checkrole = async (id) => {
    try {
        const foundUser = await User.findById(id);
        if (foundUser && foundUser.role === 'user') {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};

router.post('/signup', async (req, res) => {
    try {
        const { name, password, role } = req.body;
        if (!name || !password) {
            return res.status(400).json({ error: "Name and password required" });
        }
        const existing = await User.findOne({ name });
        if (existing) {
            return res.status(409).json({ error: "User already exists" });
        }
        const newUser = new User({ name, password, role });
        const savedUser = await newUser.save();
        const token = gentoken({
            name: savedUser.name,
            role: savedUser.role
        });

        return res.status(201).json({
            message: "User created",
            token
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const foundUser = await User.findOne({ name });
        if (!foundUser || !(await foundUser.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid name or password" });
        }

        const token = gentoken({
            id: foundUser._id,
            Name: foundUser.name,
            role: foundUser.role
        });

        return res.json({ token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;

