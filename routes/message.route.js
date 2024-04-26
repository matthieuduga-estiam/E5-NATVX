// Import libraries
import express from "express"

// Create an express router
const router = express.Router()

// Import controller
import * as controller from "../controllers/message.controller.js"

// Import middleware
import { verifyToken } from "../middlewares/jwt.js"

// Define routes
router.post("/", verifyToken, controller.create)

router.put("/:id", verifyToken, controller.update)

router.delete("/:id", verifyToken, controller.remove)


// Export the router
export default router