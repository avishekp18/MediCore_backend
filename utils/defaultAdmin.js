import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const createDefaultAdmin = async () => {
  try {
    const email = "admin@example.com";
    const password = "admin123";

    // Delete existing admin with the same email
    await User.findOneAndDelete({ email });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = await User.create({
      firstName: "Avishek",
      lastName: "Pradhan",
      email,
      password: hashedPassword,
      role: "Admin",
    });

    console.log(`✅ Default admin created: ${email} / ${password}`);
  } catch (err) {
    console.error("Failed to create default admin:", err.message);
  }
};
