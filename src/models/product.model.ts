import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
  name: string;
}

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
