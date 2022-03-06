import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (await userService.getUserIfExists(email))
      return res.status(409).json({ message: "Email already taken!" });

    const user = await userService.createUser({ email, password });

    return res.status(201).json({ data: { user } });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserIfExists(email);
    if (!user)
      return res.status(404).json({ message: "Incorrect email or password!" });

    if (!(await userService.checkIfPasswordsMatch(password, user.password)))
      return res.status(404).json({ message: "Incorrect email or password!" });

    const token = userService.generateJWT(email);

    return res.status(200).json({ data: { token } });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updatePassword = async (req: Request | any, res: Response) => {
  try {
    const { password } = req.body;

    await userService.updatePassword(req.user, password);

    return res.status(200).json({ message: "Password changed!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
