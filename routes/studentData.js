const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getAllStudentDetails,
  createUserData,
  upDateUserData,
  deleteDatafromUser,
  studentDataget,
} = require("../controllers/studentData");

// Route to get all student details
router.route("/").get(getAllStudentDetails);

// Route to create new user data
router.route("/create").post(createUserData);

// Route to update user data
router.route("/update").post(upDateUserData);

// Route to delete user data
router.route("/delete").post(deleteDatafromUser);

// Route to get specific student data
router.route("/getData").get(studentDataget);

// Export the router
module.exports = router;
