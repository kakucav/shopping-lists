import { Types } from "mongoose";
import ShoppingList, { IShoppingList } from "../models/shopping-list.model";

export const createShoppingList = async (
  name: string,
  userId: Types.ObjectId,
  products = []
): Promise<IShoppingList> => {
  const shoppingList = new ShoppingList({ name, userId, products });
  return await shoppingList.save();
};

export const getListWithSameName = async (
  name: string,
  userId: Types.ObjectId
): Promise<IShoppingList | null> => {
  return await ShoppingList.findOne({ name, userId, isDeleted: false });
};

export const getIfBelongsToUser = async (
  id: Types.ObjectId,
  userId: Types.ObjectId
): Promise<IShoppingList | null> => {
  return await ShoppingList.findOne({ _id: id, userId, isDeleted: false });
};

export const deleteList = async (
  shoppingList: IShoppingList
): Promise<void> => {
  shoppingList.isDeleted = true;
  await shoppingList.save();
};
