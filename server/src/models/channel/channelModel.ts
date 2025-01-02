import mongoose from "mongoose";
import { authModel } from "../auth/authModel";

const channelSchema = new mongoose.Schema({
  channelId: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: authModel,
  },
});

export const channelModel = mongoose.model(
  "channel",
  channelSchema,
  "channel"
);
