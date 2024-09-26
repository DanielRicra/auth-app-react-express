import { Router } from "express";
import { signup, logout, login } from "../controllers/auth.controller";

const router = Router();

router.get("/signup", signup)

router.get("/login", login)

router.get("/logout", logout)

export default router