// Import libraries
import express from "express"

// Create an express router
const router = express.Router()

// Import controller
import * as controller from "../controllers/conversation.controller.js"

// Import middleware
import { verifyToken } from "../middlewares/jwt.js"

// Define routes
router.post("/", verifyToken, controller.get)

router.get("/find", verifyToken, controller.find)

// Export the router
export default router