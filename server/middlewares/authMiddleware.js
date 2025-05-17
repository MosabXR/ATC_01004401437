const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

dotenv.config({ path: "../config.env" });

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ status: "fail", message: "You must be signed in!" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(401).json({ status: "fail", message: "Your must be signed in!" });
        next();
    } catch (err) {
        res.status(401).json({ status: "fail", message: "Your session has expired! Please sign in again." });
    }
};

module.exports = authMiddleware;
