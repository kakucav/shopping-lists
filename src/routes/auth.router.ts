import { Router } from "express";
import {
  login,
  register,
  updatePassword,
} from "../controllers/auth.controller";
import authenticateJWT from "../middleware/authenticateJWT";
import {
  validateRegistration,
  validateUpdatePassword,
} from "../middleware/validation";

const authRouter = Router();

authRouter.post("/register", validateRegistration, register);
authRouter.post("/login", login);
authRouter.put(
  "/update-password",
  validateUpdatePassword,
  authenticateJWT,
  updatePassword
);

export default authRouter;
