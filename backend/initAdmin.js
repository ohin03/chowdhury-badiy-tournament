import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

async function initAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      console.error("❌ Error: ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file");
      process.exit(1);
    }

    // Check if admin already exists
    let existingAdmin = await Admin.findOne({ username });
    
    if (existingAdmin) {
      // Update password for existing admin
      console.log(`🔄 Admin user "${username}" already exists. Updating password...`);
      existingAdmin.password = password;
      await existingAdmin.save();
      console.log("✅ Admin password updated successfully!");
      console.log(`📝 Username: ${username}`);
      console.log("🔒 Password: (hashed securely with bcryptjs)");
      process.exit(0);
    }

    // Create default admin user from environment variables
    const newAdmin = await Admin.create({
      username,
      password
    });

    console.log("✅ Admin user created successfully!");
    console.log(`📝 Username: ${username}`);
    console.log("🔒 Password: (hashed securely with bcryptjs)");
    console.log("\n🎯 Admin is now ready to login!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error initializing admin:", err.message);
    process.exit(1);
  }
}

initAdmin();
