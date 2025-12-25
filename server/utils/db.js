// utils/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb+srv://jitendrakumar_db_user:KQifubGjrZM6Xcw4@cluster0.fkipar7.mongodb.net/?appName=Cluster0"
  if (!uri) {
    throw new Error("MONGO_URI not defined in .env");
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true

    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
