const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Event name is required"],
    },
    description: {
        type: String,
        required: [true, "Event description is required"],
    },
    category: {
        type: String,
        required: [true, "Event category is required"],
    },
    date: {
        type: Date,
        required: [true, "Event date is required"],
    },
    venue: {
        type: String,
        required: [true, "Event venue is required"],
    },
    price: {
        type: Number,
        required: [true, "Event price is required"],
    },
    image: {
        type: String,
        required: [true, "Event image is required"],
    },
    // featured: {
    //     type: Boolean,
    //     default: false,
    // },
    // totalTickets: { type: Number, required: true },
    // availableTickets: { type: Number, required: true },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
