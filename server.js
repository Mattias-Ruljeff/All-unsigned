"use strict";

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");

require("dotenv").config();

// Create express application
const app = express();

// Additional middlewares
app.use(cors());
app.use(logger("dev")); // Request logger
app.use(express.json()); // Parses JSON

// Routes
app.use("/bands", require("./routes/bandRoute"));
app.use("/albums", require("./routes/albumRoute"));

// Serve static assets if in production.
if (process.env.NODE_ENV === "production") {
    // Set static folder.
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// Start listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log("Press Ctrl-C to terminate...");
});