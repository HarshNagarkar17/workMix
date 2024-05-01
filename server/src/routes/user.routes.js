import {Router} from "express";
import { login, register } from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/auth.js";

const router = Router();

router.post("/register",verifyUser, register)

router.post("/login",verifyUser,login);


export default router;