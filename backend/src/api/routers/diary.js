import express from "express";
import { isAuth } from "../../utils/auth.js";
import {
  createDiary,
  deleteDiary,
  getDiaries,
  getDiary,
  updateDiary,
} from "../controllers/Diaries.js";

const router = express.Router();

router.route("/api/diaries").get(isAuth, getDiaries).post(isAuth, createDiary);
router
  .route("/api/diaries/:id")
  .put(isAuth, updateDiary)
  .delete(isAuth, deleteDiary)
  .get(isAuth, getDiary);

export default router;
