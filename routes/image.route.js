// Import libraries
import express from "express"

// Create an express router
const router = express.Router()

// Import controller
import * as controller from "../controllers/image.controller.js"

// Import middleware
import { verifyToken } from "../middlewares/jwt.js"

// Define routes
router.get("/:id", controller.findOne)

// Export the router
export default router