const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "A user must have a first name"],
        validate: [validator.isAlpha, "First name must only contain letters"],
    },
    lastName: {
        type: String,
        required: [true, "A user must have a last name"],
        validate: [validator.isAlpha, "Last name must only contain letters"],
    },
    email: {
        type: String,
        required: [true, "A user must have an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket", default: [] }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
