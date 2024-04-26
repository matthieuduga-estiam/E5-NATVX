import { Schema, model } from "mongoose"

const articleSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    condition: { type: String, required: true },
    isSold: { type: Boolean, default: false },
    photos: [{ type: String }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
)

export default model("Article", articleSchema)
