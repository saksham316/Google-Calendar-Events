// ---------------Imports------------------
import dotenv from "dotenv";
dotenv.config({
  path: ".env.dev",
});
import { app as server } from "./app";
import { connectMongoDB } from "./db/mongoDb/mongoDb";
import mongoose from "mongoose";

// ----------------------------------------
//dotenv configuration
const PORT = process.env.PORT || 6959;

// ----------------------------------------
//mongodb connection handling
connectMongoDB();
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Connection Disconnected");
});

// ----------------------------------------

// ----------------------------------------
//express app listening to the incoming requests
server.listen(PORT, () => {
  console.log("Server Started at PORT " + PORT);
});
// ----------------------------------------
