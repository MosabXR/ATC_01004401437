const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ status: "fail", message: "Passwords do not match!" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "fail", message: "Email already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const userCount = await User.countDocuments();

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: userCount === 0 ? "admin" : "user",
        });

        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(201).json({ status: "success", message: "User registered successfully!", data: { token, user } });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

// I need to remove the hashed password from the response on both sign up and sign in.

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: "fail", message: "Invalid credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "fail", message: "Invalid credentials!" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(200).json({ status: "success", message: "Signed in successfully!", data: { token, user } });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};
