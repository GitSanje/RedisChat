import { Router } from "express";
const router = Router();
import AuthController from "../controllers/AuthController.js";
// Auth Routes
router.post("/auth/login", AuthController.login);


export default router;