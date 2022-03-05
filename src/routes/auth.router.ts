import { Router } from "express";
import {
  login,
  register,
  updatePassword,
} from "../controllers/auth.controller";
import { validateRegistration } from "../middleware/validation";

const authRouter = Router();

authRouter.post("/register", validateRegistration, register);
authRouter.post("/login", login);
authRouter.post("/update-password", updatePassword);

export default authRouter;
