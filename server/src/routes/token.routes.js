import { Router } from "express";
import { refreshAccessToken } from "../controllers/token.controller.js";

const router = Router();

router.post("/refresh_access_token", refreshAccessToken);

export default router;