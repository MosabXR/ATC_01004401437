const express = require("express");
const router = express.Router();
const { getEvents, createEvent, getEvent, updateEvent, deleteEvent } = require("../controllers/eventController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.route("/").get(getEvents).post(authMiddleware, adminMiddleware, createEvent);
router
    .route("/:id")
    .get(getEvent)
    .patch(authMiddleware, adminMiddleware, updateEvent)
    .delete(authMiddleware, adminMiddleware, deleteEvent);

module.exports = router;
