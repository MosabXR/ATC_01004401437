const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

mongoose
    .connect(process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD))
    .then(() => {
        console.log("DB connection successful");
    })
    .catch((err) => {
        console.log("DB connection error");
    });

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
