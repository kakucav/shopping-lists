import "dotenv/config";
import express, { json } from "express";
import seedProducts from "./data/products";
import { connectToDB } from "./database/connection";
import authRouter from "./routes/auth.router";
import shoppingListRouter from "./routes/shopping-list.router";

const app = express();
const port: Number = Number(process.env.PORT) || 5000;
const connectionString = process.env.DB_CONNECTION_STRING as string;

app.use(json());

app.use("/api/auth", authRouter);
app.use("/api/shopping-lists", shoppingListRouter);

app.listen(port, async () => {
  console.log(`Application is running on port ${port}...`);
  await connectToDB(connectionString);
});

//DATA SEED
// seedProducts();
