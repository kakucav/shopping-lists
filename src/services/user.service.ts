import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";

export const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<IUser> => {
  const user = new User({ email, password });
  return await user.save();
};

export const getUserIfExists = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export const checkIfPasswordsMatch = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHash);
};

export const generateJWT = (email: string): string => {
  const payload = { email };
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: Number(process.env.JWT_EXPIRE_TIME),
  });
};

export const updatePassword = async (
  user: IUser,
  newPassword: string
): Promise<void> => {
  user.password = newPassword;
  await user.save();
};
