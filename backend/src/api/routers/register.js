import express from "express";
import { register } from "../controllers/Register.js";

const router = express.Router();
router.route("/api/auth/register").post(register);

export default router;
