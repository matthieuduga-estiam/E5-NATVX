// Import libraries
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"

// Create an express app
const app = express()
const port = 3001

// Middlewares
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true, limit: "50mb"}))
app.use(express.json({ limit: "50mb"}))

// Define routes
app.get("/status", (req, res) => {
  res.status(200).send("API is running !")
})


// Import routes
import usersRoutes from "./routes/user.routes.js"
app.use("/users", usersRoutes)

import articlesRoutes from "./routes/article.route.js"
app.use("/articles", articlesRoutes)

import conversationsRoutes from "./routes/conversation.route.js"
app.use("/conversations", conversationsRoutes)

import messagesRoutes from "./routes/message.route.js"
app.use("/messages", messagesRoutes)

import paymentsRoutes from "./routes/payment.route.js"
app.use("/payments", paymentsRoutes)

import imagesRoutes from "./routes/image.route.js"
app.use("/images", imagesRoutes)

// Start the server
app.listen(port, () => {
  console.log(`E5-NATVX API is running on http://localhost:${port}\n\r`)
})

// Connect to the database with .env variables
const { MONGO_URL, MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env
const mongoConnectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}:27017/${MONGO_DATABASE}?authSource=admin`

mongoose
  .connect(mongoConnectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err))
