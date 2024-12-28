// ------------------Imports------------------
import mongoose from "mongoose";
// -------------------------------------------

// -------------------------------------------
export const connectMongoDB = async () => {
  try {
    if (process.env.MONGO_DB_URL) {
      await mongoose.connect(process.env.MONGO_DB_URL);
      console.log("Connected to MongoDB Successfully");
    } else {
      throw new Error("Connection to Mongo Database Failed");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Connection to Mongo Database Failed : ${error.message}`);
    } else {
      console.log(`Connection to Mongo Database Failed : ${error}`);
    }
  }
};
