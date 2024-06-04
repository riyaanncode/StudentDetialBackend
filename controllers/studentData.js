// const {
//   getData,
//   createData,
//   getDataemail,
//   upDateData,
//   deleteData,
//   getSingleData,
// } = require("../dao/dao");

// /**
//  * Controller function to get all student details.
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  */
// const getAllStudentDetails = async (req, res) => {
//   try {

//     // Fetch all student details from the data source
//     const studentDetails = await getData();
//     // Send the retrieved student details as the response
//     res.send(studentDetails);
//   } catch (error) {
//     // Handle any errors that occur during data retrieval
//     res
//       .status(500)
//       .send({ status: "error", message: "Failed to fetch student details" });
//   }
// };

// /**
//  * Controller function to create user data.
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  */
// const createUserData = async (req, res) => {
//   const { name, className, age, email, address, contactNumber } = req.body;
//   // Convert age and contactNumber to numbers
//   const parsedAge = parseInt(age);
//   const parsedContactNumber = parseInt(contactNumber);

//   // Check if age and contactNumber could not be converted to numbers
//   if (isNaN(parsedAge)) {
//     res.send({
//       status: "error",
//       message: "Please provide a valid age",
//     });
//     return;
//   }
//   if (isNaN(parsedContactNumber)) {
//     res.send({
//       status: "error",
//       message: "Please provide a valid contact number",
//     });
//     return;
//   }

//   // Validate required fields
//   const requiredFields = {
//     name,
//     className,
//     parsedAge,
//     email,
//     address,
//     parsedContactNumber,
//   };
//   const fieldNames = {
//     name: "name",
//     className: "class name",
//     parsedAge: "age",
//     email: "email",
//     address: "address",
//     parsedContactNumber: "contact number",
//   };

//   for (const [field, value] of Object.entries(requiredFields)) {
//     if (!value) {
//       res.send({
//         status: "error",
//         message: `Please fill the ${fieldNames[field]}`,
//       });
//       return;
//     }
//   }

//   // Check for unique email
//   try {
//     const checkEmail = await getDataemail(email);
//     if (checkEmail) {
//       res.send({ status: "error", message: "Please use a unique email id" });
//       return;
//     }
//   } catch (error) {
//     res.send({ status: "error", message: "Error checking email uniqueness" });
//     return;
//   }

//   // Create user data object
//   const newUser = {
//     name,
//     className: className,
//     age: parsedAge,
//     email,
//     address,
//     contactNumber: parsedContactNumber,
//   };

//   // Save the new user data
//   try {
//     await createData(newUser);
//     res.send({ status: "success", message: "Data created successfully" });
//   } catch (error) {
//     console.log("error: ", error);
//     res.send({ status: "error", message: "Error creating data" });
//   }
// };

// /**
//  * Controller function to update user data.
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  */
// const upDateUserData = async (req, res) => {
//   const { name, className, age, email, address, contactNumber } = req.body;

//   // Validate required fields
//   const requiredFields = {
//     name,
//     className,
//     age,
//     email,
//     address,
//     contactNumber,
//   };
//   const fieldNames = {
//     name: "name",
//     className: "class name",
//     age: "age",
//     email: "email",
//     address: "address",
//     contactNumber: "contact number",
//   };

//   for (const [field, value] of Object.entries(requiredFields)) {
//     if (!value) {
//       res.send({
//         status: "error",
//         message: `Please fill the ${fieldNames[field]}`,
//       });
//       return;
//     }
//   }

//   // Check if the email exists in the database
//   try {
//     const checkEmail = await getDataemail(email);
//     if (!checkEmail) {
//       res.send({
//         status: "error",
//         message: "Email id is not found in the database",
//       });
//       return;
//     }
//   } catch (error) {
//     res.send({ status: "error", message: "Error checking email existence" });
//     return;
//   }

//   // Convert age and contactNumber to numbers
//   const parsedAge = parseInt(age);
//   const parsedContactNumber = parseInt(contactNumber);

//   // Check if age and contactNumber could not be converted to numbers
//   if (isNaN(parsedAge)) {
//     res.send({
//       status: "error",
//       message: "Please provide a valid age",
//     });
//     return;
//   }
//   if (isNaN(parsedContactNumber)) {
//     res.send({
//       status: "error",
//       message: "Please provide a valid contact number",
//     });
//     return;
//   }
//   // Create user data object
//   const updatedUser = {
//     name,
//     className: className,
//     age,
//     address,
//     contactNumber,
//   };

//   // Update the user data
//   try {
//     await upDateData(email, updatedUser);
//     res.send({ status: "success", message: "Data updated successfully" });
//   } catch (error) {
//     res.send({ status: "error", message: "Error updating data" });
//   }
// };

// /**
//  * Controller function to delete user data.
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  */
// const deleteDatafromUser = async (req, res) => {
//   const { email } = req.body;

//   // Validate the email field
//   if (!email) {
//     res.status(400).send({ status: "error", message: "Please fill the email" });
//     return;
//   }

//   try {
//     // Check if the email exists in the database
//     const checkEmail = await getDataemail(email);
//     if (!checkEmail) {
//       res.status(404).send({
//         status: "error",
//         message: "Email id is not found in the database",
//       });
//       return;
//     }

//     // Delete the data associated with the email
//     await deleteData(email);
//     res
//       .status(200)
//       .send({ status: "success", message: "Data deleted successfully" });
//   } catch (error) {
//     // Handle errors during email check or data deletion
//     res.status(500).send({ status: "error", message: "Internal server error" });
//   }
// };

// /**
//  * Controller function to get a single student's data by email.
//  * @param {Object} req - The request object.
//  * @param {Object} res - The response object.
//  */
// const studentDataget = async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     res.status(400).send({ status: "error", message: "Please fill the email" });
//     return;
//   }

//   try {
//     // Check if the email exists in the database
//     const checkEmail = await getDataemail(email);
//     if (!checkEmail) {
//       res.status(404).send({
//         status: "error",
//         message: "Email id is not found in the database",
//       });
//       return;
//     }

//     // Get the student data by email
//     const data = await getSingleData(email);
//     res.status(200).send({ status: "success", message: data });
//   } catch (error) {
//     // Handle errors during email check or data retrieval
//     res.status(500).send({ status: "error", message: "Internal server error" });
//   }
// };

// module.exports = {
//   getAllStudentDetails,
//   createUserData,
//   upDateUserData,
//   deleteDatafromUser,
//   studentDataget,
// };


// ____________________________________________________


// _______________________________________________________________

const {
  getData,
  createData,
  getDataemail,
  upDateData,
  deleteData,
  getSingleData,
  countData,
} = require("../dao/dao");

/**
 * Controller function to get all student details with pagination and search functionality.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllStudentDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 4; // Default to 4 items per page if not provided
    const search = req.query.search || ''; // Default to an empty string if not provided

    const skip = (page - 1) * limit;
    const totalStudents = await countData(search);
    const studentDetails = await getData(skip, limit, search);

    res.status(200).json({
      page,
      limit,
      totalStudents,
      totalPages: Math.ceil(totalStudents / limit),
      data: studentDetails,
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Failed to fetch student details" });
  }
};

// The rest of your controllers remain the same...

/**
 * Controller function to create user data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createUserData = async (req, res) => {
  const { name, className, age, email, address, contactNumber } = req.body;
  const parsedAge = parseInt(age);
  const parsedContactNumber = parseInt(contactNumber);

  if (isNaN(parsedAge)) {
    res.send({
      status: "error",
      message: "Please provide a valid age",
    });
    return;
  }
  if (isNaN(parsedContactNumber)) {
    res.send({
      status: "error",
      message: "Please provide a valid contact number",
    });
    return;
  }

  const requiredFields = {
    name,
    className,
    parsedAge,
    email,
    address,
    parsedContactNumber,
  };
  const fieldNames = {
    name: "name",
    className: "class name",
    parsedAge: "age",
    email: "email",
    address: "address",
    parsedContactNumber: "contact number",
  };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      res.send({
        status: "error",
        message: `Please fill the ${fieldNames[field]}`,
      });
      return;
    }
  }

  try {
    const checkEmail = await getDataemail(email);
    if (checkEmail) {
      res.send({ status: "error", message: "Please use a unique email id" });
      return;
    }
  } catch (error) {
    res.send({ status: "error", message: "Error checking email uniqueness" });
    return;
  }

  const newUser = {
    name,
    className: className,
    age: parsedAge,
    email,
    address,
    contactNumber: parsedContactNumber,
  };

  try {
    await createData(newUser);
    res.send({ status: "success", message: "Data created successfully" });
  } catch (error) {
    console.log("error: ", error);
    res.send({ status: "error", message: "Error creating data" });
  }
};

/**
 * Controller function to update user data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const upDateUserData = async (req, res) => {
  const { name, className, age, email, address, contactNumber } = req.body;

  const requiredFields = {
    name,
    className,
    age,
    email,
    address,
    contactNumber,
  };
  const fieldNames = {
    name: "name",
    className: "class name",
    age: "age",
    email: "email",
    address: "address",
    contactNumber: "contact number",
  };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      res.send({
        status: "error",
        message: `Please fill the ${fieldNames[field]}`,
      });
      return;
    }
  }

  try {
    const checkEmail = await getDataemail(email);
    if (!checkEmail) {
      res.send({
        status: "error",
        message: "Email id is not found in the database",
      });
      return;
    }
  } catch (error) {
    res.send({ status: "error", message: "Error checking email existence" });
    return;
  }

  const parsedAge = parseInt(age);
  const parsedContactNumber = parseInt(contactNumber);

  if (isNaN(parsedAge)) {
    res.send({
      status: "error",
      message: "Please provide a valid age",
    });
    return;
  }
  if (isNaN(parsedContactNumber)) {
    res.send({
      status: "error",
      message: "Please provide a valid contact number",
    });
    return;
  }

  const updatedUser = {
    name,
    className: className,
    age,
    address,
    contactNumber,
  };

  try {
    await upDateData(email, updatedUser);
    res.send({ status: "success", message: "Data updated successfully" });
  } catch (error) {
    res.send({ status: "error", message: "Error updating data" });
  }
};

/**
 * Controller function to delete user data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteDatafromUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).send({ status: "error", message: "Please fill the email" });
    return;
  }

  try {
    const checkEmail = await getDataemail(email);
    if (!checkEmail) {
      res.status(404).send({
        status: "error",
        message: "Email id is not found in the database",
      });
      return;
    }

    await deleteData(email);
    res.status(200).send({ status: "success", message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};

/**
 * Controller function to get a single student's data by email.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const studentDataget = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    res.status(400).send({ status: "error", message: "Please fill the email" });
    return;
  }

  try {
    const checkEmail = await getDataemail(email);
    if (!checkEmail) {
      res.status(404).send({
        status: "error",
        message: "Email id is not found in the database",
      });
      return;
    }

    const data = await getSingleData(email);
    res.status(200).send({ status: "success", message: data });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
};

module.exports = {
  getAllStudentDetails,
  createUserData,
  upDateUserData,
  deleteDatafromUser,
  studentDataget,
};
