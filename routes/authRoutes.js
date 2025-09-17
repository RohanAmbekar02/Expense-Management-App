const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { mobile, password } = req.body;
        let user = await User.findOne({ mobile });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ mobile, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { mobile, password } = req.body;

         const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

   
        const token = jwt.sign(
            { id: user._id, mobile: user.mobile },
               "mysecretkey", 
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (err) {    
        res.status(500).json({ error: err.message });
    }
});

router.get('/me', (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    try {
        const decoded = jwt.verify(token, "mysecretkey");
        res.json({ user: decoded });
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
});

module.exports = router;
