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

export const updateShoppingList = async (
  shoppingList: IShoppingList,
  name: string,
  products
): Promise<void> => {
  if (name) shoppingList.name = name;
  if (products) shoppingList.products = products;
  await shoppingList.save();
};

export const deleteList = async (
  shoppingList: IShoppingList
): Promise<void> => {
  shoppingList.isDeleted = true;
  await shoppingList.save();
};

export const getReport = async (
  userId: Types.ObjectId,
  startDate: Date,
  endDate: Date
) => {
  return await ShoppingList.aggregate([
    {
      $match: {
        userId,
        isDeleted: false,
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$products._id",
        totalQuantity: { $sum: "$products.quantity" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
  ]);
};
