// database/dbConnection.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "medicore",
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Error connecting to database:", err);
    process.exit(1);
  }
};
