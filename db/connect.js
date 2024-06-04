const mongoose = require("mongoose");

// Function to connect to MongoDB
const mongoDBConnect = (uri) => {
  return mongoose.connect(uri, {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new topology engine
  });
};

// Export the connection function
module.exports = mongoDBConnect;
