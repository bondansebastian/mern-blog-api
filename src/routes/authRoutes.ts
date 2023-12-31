import { Router } from "express";
import authController from "../controllers/authController";

const authRoutes = Router();

authRoutes.post('/login', authController.login);

export default authRoutes;