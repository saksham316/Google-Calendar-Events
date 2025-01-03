import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelId: {
    type: String,
    required: [true, "Channel ID is a required field"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
});

export const channelModel = mongoose.model("channel", channelSchema, "channel");
