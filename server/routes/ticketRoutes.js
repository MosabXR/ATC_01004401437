const express = require("express");
const router = express.Router();
const { getTickets, createTicket, getTicket, deleteTicket, claimTicket } = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/").get(authMiddleware, getTickets);
router.route("/:id").get(getTicket).post(authMiddleware, createTicket).delete(deleteTicket);
router.route("/:id/claim").patch(claimTicket);

module.exports = router;
