// Import libraries
import express from "express"

// Create an express router
const router = express.Router()

// Import controller
import * as controller from "../controllers/user.controller.js"

// Import middleware
import { verifyToken } from "../middlewares/jwt.js"

// Define routes
router.post("/login", controller.login)

router.post("/verifyToken", verifyToken, controller.verifyToken)

router.post("/", controller.create)

router.get("/", verifyToken, controller.findAll)

router.get("/:id", verifyToken, controller.findOne)

router.put("/", verifyToken, controller.update)

router.delete("/:id", verifyToken, controller.remove)

router.post("/profile", verifyToken, controller.profile)

// Export the router
export default router