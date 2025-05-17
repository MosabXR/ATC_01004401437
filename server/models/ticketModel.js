const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: [true, "Ticket must be associated with an event"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Ticket must be associated with a user"],
    },
    isClaimed: {
        type: Boolean,
        default: false,
    },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
