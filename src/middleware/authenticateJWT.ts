import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { getUserIfExists } from "../services/user.service";

const authenticateJWT = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Authorization failed!" });

  try {
    const { email }: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const user = await getUserIfExists(email);

    if (!user)
      return res.status(401).json({ message: "Authorization failed!" });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export default authenticateJWT;
