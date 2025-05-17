const Event = require("../models/eventModel");
const Ticket = require("../models/ticketModel");

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ status: "success", data: { events } });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

// const toggleFeatured = async (id, featured) => {
//     const event = await Event.findById(id);
//     event.featured = featured;
//     await event.save();
// };

// exports.getFeaturedEvents = async (req, res) => {
//     try {
//         const events = await Event.find({ featured: true });
//         res.status(200).json({ status: "success", data: { events } });
//     } catch (err) {
//         res.status(500).json({ status: "error", message: err.message });
//     }
// };

exports.createEvent = async (req, res) => {
    const { name, description, category, date, venue, price, image } = req.body;

    console.log(req.body);

    try {
        const event = new Event({
            name,
            description,
            category,
            date,
            venue,
            price,
            image,
        });

        await event.save();

        res.status(201).json({ status: "success", message: "Event created successfully!", data: { event } });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json({ status: "success", data: { event } });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { name, description, category, date, venue, price, image, totalTickets } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { name, description, category, date, venue, price, image, totalTickets },
            { new: true, runValidators: true },
        );
        res.status(200).json({ status: "success", message: "Event updated successfully!", data: { event } });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ status: "fail", message: "Event not found!" });
        }

        await event.deleteOne();
        await Ticket.deleteMany({ event: req.params.id });
        res.status(204).json({ status: "success", message: "Event deleted successfully!", data: null });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};
