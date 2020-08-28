const monk = require("monk");

require("dotenv").config();

const dbURL = process.env.DATABASE;
const db = monk(dbURL);
module.exports = db;
