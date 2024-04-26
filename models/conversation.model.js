import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: String },
    otherUser: { type: String },
    otherUserId: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model("Conversation", conversationSchema);
