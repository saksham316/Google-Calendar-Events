// ---------------Imports------------------
import { app as server } from "./app";
import { connectMongoDB } from "./db/mongoDb/mongoDb";
import dotenv from "dotenv";
// ----------------------------------------
dotenv.config({
  path: `${process.env.NODE_ENV === "development" ? ".env.dev" : ".env.prod"}`,
});
const PORT = process.env.PORT || 6959;

// ----------------------------------------
connectMongoDB();

server.listen(() => {
  console.log("Server Started at PORT " + PORT);
});
