const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const notificationRoutes = require("./routes/notificationRoutes"); // Your user-related routes file

const app = express();
const PORT = process.env.PORT || 8004;
console.log("Port", PORT);

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI =
  "mongodb+srv://harisejaz:harisejaz@cluster0.ks6qske.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
// app.use("/api/notifications", notificationRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
