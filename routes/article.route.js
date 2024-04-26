// Import libraries
import express from "express"

// Create an express router
const router = express.Router()

// Import controller
import * as controller from "../controllers/article.controller.js"

// Import middleware
import { verifyToken } from "../middlewares/jwt.js"

// Define routes
router.get("/", verifyToken, controller.findAll)

router.get("/:id", verifyToken, controller.findOne)

router.post("/", verifyToken, controller.create)

router.put("/:id", verifyToken, controller.update)

router.delete("/:id", verifyToken, controller.remove)

router.post("/search", verifyToken, controller.search)

// Export the router
export default router