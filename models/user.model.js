import { Schema, model } from "mongoose"

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    country: { type: String, default: "" },
    rank: { type: Number, default: 0 },
    expoPushToken: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
)

export default model("User", userSchema)
