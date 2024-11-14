import { Router } from "express";
const router = Router();
import AuthController from "../controllers/AuthController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

// Auth Routes
router.post("/auth/login", AuthController.login);
router.post("/chat-group", authMiddleware, ChatGroupController.store);

export default router;