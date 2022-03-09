import { Request, Response, NextFunction } from "express";
import { isEmail } from "../helpers/validation";

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !isEmail(email))
    return res.status(400).json({ message: "Email is not valid!" });
  if (!password || password.length < 6)
    return res.status(400).json({ message: "Password too short!" });

  next();
};

export const validateUpdatePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!password || password.length < 6)
    return res.status(400).json({ message: "Password not sent or too short!" });

  next();
};
