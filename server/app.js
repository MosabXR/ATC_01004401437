const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const eventRouter = require("./routes/eventRoutes");
const ticketRouter = require("./routes/ticketRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/api/v1/events", eventRouter);
app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/users", userRouter);

// app.all("*", (req, res) => {
//     res.status(404).json({ status: "fail", message: `Can't find ${req.originalUrl} on this server!` });
// });

module.exports = app;
