import {Router} from "express";
import { createArticle } from "../controllers/work.controller.js";
import { verifyUser } from "../middlewares/auth.js";

const router = Router();

router.post("/article",verifyUser, createArticle)

export default router;