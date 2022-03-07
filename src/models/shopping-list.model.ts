import { Document, Schema, model, Types } from "mongoose";

export interface IShoppingList extends Document {
  name: string;
  userId: Types.ObjectId;
  products: {
    _id: Types.ObjectId;
    quantity: number;
  }[];
  isDeleted: boolean;
}

const shoppingListSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    products: {
      type: [
        {
          _id: { type: Types.ObjectId, ref: "Product", required: true },
          quantity: { type: Number, required: true },
        },
      ],
      default: [],
    },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
  }
);

const ShoppingList = model<IShoppingList>("ShoppingList", shoppingListSchema);

export default ShoppingList;
