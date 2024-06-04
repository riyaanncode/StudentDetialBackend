const express = require("express");
const app = express();
const config = require("./config/index");
const cors = require("cors");
const students_routes = require("./routes/studentData");
const connectDB = require("./db/connect");
const path = require("path");
// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./react-app")));
// Route for student data API
app.use("/api", students_routes); // Application first endpoint

// Root endpoint to check if the server is running
app.get("/", (req, res) => {
  res.send("I am live");
});

// Function to start the server and connect to the database
const start = async () => {
  try {
    // Connect to the database
    await connectDB(config.DB_URL); // Await connection to ensure DB is connected before starting server

    // Define the port from the configuration
    const PORT = config.PORT || 3000; // Fallback to 3000 if PORT is not defined

    // Start the server
    app.listen(PORT, () => {
      console.log(`${PORT} I am Connected`);
    });
  } catch (error) {
    // Log any errors that occur during startup
    console.error("Error starting the server: ", error);
  }
};

// Start the server
start();
