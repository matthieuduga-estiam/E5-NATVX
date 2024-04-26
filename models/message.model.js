import { Schema, model } from "mongoose"
import Conversation from "./conversation.model.js"
import User from "./user.model.js"

const messageSchema = new Schema(
  {
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
  },
  {
    timestamps: true,
  }
)

export default model("Message", messageSchema)