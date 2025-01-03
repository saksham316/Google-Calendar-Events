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
  g_access_token: {
    type: String,
  },
  g_refresh_token: {
    type: String,
  },
  lastUpdatedTime: {
    type: String,
  },
  presentUpdatedTime: {
    type: String,
  },
});

export const authModel = mongoose.model("auth", authSchema, "auth");
