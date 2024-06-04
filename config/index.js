require('dotenv').config();
const dburl = process.env.MONGO_URL;
const appPort = process.env.PORT;

const config = {
  DB_URL: dburl,
  PORT:appPort
};
module.exports = Object.assign({}, config);