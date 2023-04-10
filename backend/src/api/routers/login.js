import express from "express";
import { Login } from "../controllers/Login.js";

const router = express.Router();

router.route("/api/auth/login").post(Login);

export default router;
