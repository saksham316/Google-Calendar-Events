import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"],
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

export const authModel = mongoose.model("auth", authSchema, "auth");
