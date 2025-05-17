const Ticket = require("../models/ticketModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user._id }).populate("event");
        res.status(200).json({ status: "success", data: { tickets } });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.createTicket = async (req, res) => {
    try {
        console.log(req.params.id);

        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ status: "fail", message: "Event not found!" });
        }

        if (event.availableTickets <= 0) {
            return res.status(400).json({ status: "fail", message: "No tickets available!" });
        }

        const existingTicket = await Ticket.findOne({ event: req.params.id, user: req.user._id });
        if (existingTicket) {
            return res.status(400).json({ status: "fail", message: "You already have a ticket for this event!" });
        }

        const ticket = new Ticket({
            event: req.params.id,
            user: req.user._id,
        });

        event.availableTickets -= 1;
        await event.save();
        await ticket.save();

        await User.findByIdAndUpdate(req.user._id, { $push: { tickets: ticket._id } });
        res.status(201).json({ status: "success", message: "Ticked obtained successfully!", data: { ticket } });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ _id: req.params.id }).populate("event");
        if (!ticket) {
            return res.status(404).json({ status: "fail", message: "Ticket not found!" });
        }
        res.status(200).json({ status: "success", data: { ticket } });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.claimTicket = async (req, res) => {
    const ticket = await Ticket.findOne({ _id: req.params.id });
    if (!ticket) {
        return res.status(404).json({ status: "fail", message: "Ticket not found" });
    }

    if (ticket.isClaimed) {
        return res.status(400).json({ status: "fail", message: "Ticket already claimed" });
    }

    try {
        ticket.isClaimed = true;
        await ticket.save();

        res.status(200).json({ status: "success", message: "Ticket claimed successfully!", data: { ticket } });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

// Neglected for now :>I cuz the way I'm implementing this feature is that the guard is going to claim the ticket.

exports.deleteTicket = async (req, res) => {
    const ticket = await Ticket.findOne({ _id: req.params.id });
    if (!ticket) {
        return res.status(404).json({ status: "fail", message: "Ticket not found" });
    }

    // await ticket.deleteOne();

    res.status(200).json({ status: "success", data: { ticket } });
};
