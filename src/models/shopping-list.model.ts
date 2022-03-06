import { Document, Schema, model, Types } from "mongoose";

export interface IShoppingList extends Document {
  name: string;
  userId: Types.ObjectId;
  createdAt: Date;
  products: {
    _id: Types.ObjectId;
    quantity: number;
  }[];
}

const shoppingListSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    products: [{ _id: Types.ObjectId, quantity: Number }],
    default: [],
  },
  {
    timestamps: true,
  }
);

const ShoppingList = model<IShoppingList>("ShoppingList", shoppingListSchema);

export default ShoppingList;
