const mongoose = require("mongoose");

// Define the schema for student information
const studentInformationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
    unique: true, // Ensure contact number is unique
  },
});

// Create and export the model
module.exports = mongoose.model("StudentData", studentInformationSchema);
