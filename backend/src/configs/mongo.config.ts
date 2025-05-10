import mongoose from "mongoose";
import { ENV } from "./env.config";

/**
 * Connects to the MongoDB database.
 * Logs detailed messages in development, minimal logs in production.
 */
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGO_URI);

    if (ENV.NODE_ENV === "development") {
      console.log("[MongoDB] ✅ Connected to:", ENV.MONGO_URI);
    } else {
      console.log("[MongoDB] ✅ Connected");
    }
  } catch (error) {
    console.error("[MongoDB] ❌ Connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
