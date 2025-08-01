const express = require("express"); // Loads the Express library.
const errorHandler = require("./middleware/errorHandler");

const connectDb = require("./config/dbConnection");

const dotenv = require("dotenv").config();         // Loads environment variables from .env

connectDb();
const app = express(); // Creates a new Express server.

const port = process.env.PORT || 5000; // Uses PORT from .env, or defaults to 5000

app.use(express.json()); //in-built middleware in express for body-parser

app.use("/api/contacts", require("./routes/contactRoutes")); //middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
