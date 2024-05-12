import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// routes
router.post('/register', register)
router.get('/login', login)

export default router