const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECT);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectToDb;
