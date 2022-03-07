import { Request, Response } from "express";
import * as shoppingListService from "../services/shopping-list.service";

export const createList = async (req: Request | any, res: Response) => {
  try {
    const { name, products = [] } = req.body;
    const user = req.user;

    if (await shoppingListService.getListWithSameName(name, user._id))
      return res.status(409).json({ message: "You have list with same name!" });

    const shoppingList = await shoppingListService.createShoppingList(
      name,
      user._id,
      products
    );

    return res.status(201).json({ data: { shoppingList } });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateList = async (req: Request, res: Response) => {};

export const deleteList = async (req: Request | any, res: Response) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const shoppingList = await shoppingListService.getIfBelongsToUser(
      id,
      user._id
    );

    if (!shoppingList) return res.status(404).json({ message: "Not found!" });

    await shoppingListService.deleteList(shoppingList);

    return res.status(200).json({ message: "List deleted!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
