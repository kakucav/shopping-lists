import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (await getUserIfExists(email))
      return res.status(409).json({ message: "Email already taken!" });

    const user = new User({ email, password });
    await user.save();

    return res.status(201).json({ data: { user } });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserIfExists(email);
    if (!user)
      return res.status(404).json({ message: "Incorrect email or password!" });

    if (!(await checkIfPasswordsMatch(password, user.password)))
      return res.status(404).json({ message: "Incorrect email or password!" });

    const token = generateJWT(email);

    return res.status(200).json({ data: { token } });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updatePassword = async (req: Request, res: Response) => {};

const getUserIfExists = async (email: string) => {
  return await User.findOne({ email });
};

const checkIfPasswordsMatch = async (
  password: string,
  passwordHash: string
) => {
  return await bcrypt.compare(password, passwordHash);
};

const generateJWT = (email: string) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};
