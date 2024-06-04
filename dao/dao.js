// const StudentData = require("../model/studebtData");

// // Function to get all student details from the database
// const getData = async () => {
//   const studentDetails = await StudentData.find({});
//   return studentDetails;
// };

// // Function to get a student's email from the database
// const getDataemail = async (email) => {
//   const studentDetails = await StudentData.findOne(
//     { email: email },
//     { email: 1 }
//   );
//   return studentDetails;
// };

// // Function to create new student data in the database
// const createData = async (studentJSONdata) => {
//   const studentDetails = await StudentData.create(studentJSONdata);
//   return studentDetails;
// };

// // Function to update student data in the database by email
// const upDateData = async (email, studentJSONdata) => {
//   const studentDetails = await StudentData.findOneAndUpdate(
//     { email: email },
//     studentJSONdata,
//     { new: true }
//   );
//   return studentDetails;
// };

// // Function to delete student data from the database by email
// const deleteData = async (email) => {
//   const studentDetails = await StudentData.findOneAndDelete({ email: email });
//   return studentDetails;
// };

// // Function to get a single student's details from the database by email
// const getSingleData = async (email) => {
//   const studentDetails = await StudentData.findOne({ email: email });
//   return studentDetails;
// };

// // Export all functions
// module.exports = {
//   getData,
//   createData,
//   getDataemail,
//   upDateData,
//   deleteData,
//   getSingleData,
// };

// ____________________________________________________________________________________

// const StudentData = require("../model/studebtData");

// // Function to get all student details from the database with pagination
// const getData = async (skip, limit) => {
//   const studentDetails = await StudentData.find({}).skip(skip).limit(limit);
//   return studentDetails;
// };

// // Function to get the total count of student documents in the database
// const countData = async () => {
//   const count = await StudentData.countDocuments({});
//   return count;
// };

// // Function to get a student's email from the database
// const getDataemail = async (email) => {
//   const studentDetails = await StudentData.findOne(
//     { email: email },
//     { email: 1 }
//   );
//   return studentDetails;
// };

// // Function to create new student data in the database
// const createData = async (studentJSONdata) => {
//   const studentDetails = await StudentData.create(studentJSONdata);
//   return studentDetails;
// };

// // Function to update student data in the database by email
// const upDateData = async (email, studentJSONdata) => {
//   const studentDetails = await StudentData.findOneAndUpdate(
//     { email: email },
//     studentJSONdata,
//     { new: true }
//   );
//   return studentDetails;
// };

// // Function to delete student data from the database by email
// const deleteData = async (email) => {
//   const studentDetails = await StudentData.findOneAndDelete({ email: email });
//   return studentDetails;
// };

// // Function to get a single student's details from the database by email
// const getSingleData = async (email) => {
//   const studentDetails = await StudentData.findOne({ email: email });
//   return studentDetails;
// };

// // Export all functions
// module.exports = {
//   getData,
//   countData,
//   createData,
//   getDataemail,
//   upDateData,
//   deleteData,
//   getSingleData,
// };


// ________________________________________

const StudentData = require("../model/studebtData");

// Function to get all student details from the database with pagination and search
const getData = async (skip, limit, search = '') => {
  const query = search
    ? { $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }] }
    : {};
  const studentDetails = await StudentData.find(query).skip(skip).limit(limit);
  return studentDetails;
};

// Function to get the total count of student documents in the database with search
const countData = async (search = '') => {
  const query = search
    ? { $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }] }
    : {};
  const count = await StudentData.countDocuments(query);
  return count;
};

// Function to get a student's email from the database
const getDataemail = async (email) => {
  const studentDetails = await StudentData.findOne(
    { email: email },
    { email: 1 }
  );
  return studentDetails;
};

// Function to create new student data in the database
const createData = async (studentJSONdata) => {
  const studentDetails = await StudentData.create(studentJSONdata);
  return studentDetails;
};

// Function to update student data in the database by email
const upDateData = async (email, studentJSONdata) => {
  const studentDetails = await StudentData.findOneAndUpdate(
    { email: email },
    studentJSONdata,
    { new: true }
  );
  return studentDetails;
};

// Function to delete student data from the database by email
const deleteData = async (email) => {
  const studentDetails = await StudentData.findOneAndDelete({ email: email });
  return studentDetails;
};

// Function to get a single student's details from the database by email
const getSingleData = async (email) => {
  const studentDetails = await StudentData.findOne({ email: email });
  return studentDetails;
};

// Export all functions
module.exports = {
  getData,
  countData,
  createData,
  getDataemail,
  upDateData,
  deleteData,
  getSingleData,
};



