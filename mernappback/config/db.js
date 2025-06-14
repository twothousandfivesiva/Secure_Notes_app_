const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const MongoDB_URL = process.env.MongoDB_URL;

const db = async () => {
  try {
    const con = await mongoose.connect(MongoDB_URL);

    console.log(`mongodb connected: ${con.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

module.exports = db;
