import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import authenticateJWT from "../middleware/authenticateJWT";
import {
  validateRegistration,
  validateUpdatePassword,
} from "../middleware/user-validation";

const authRouter = Router();

authRouter.post("/register", validateRegistration, authController.register);
authRouter.post("/login", authController.login);
authRouter.put(
  "/update-password",
  validateUpdatePassword,
  authenticateJWT,
  authController.updatePassword
);

export default authRouter;
