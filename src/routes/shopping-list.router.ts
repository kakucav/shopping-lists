import { Router } from "express";
import {
  createList,
  deleteList,
  updateList,
} from "../controllers/shopping-list.controller";

const shoppingListRouter = Router();

shoppingListRouter.post("/", createList);
shoppingListRouter.put("/:id", updateList);
shoppingListRouter.delete("/:id", deleteList);

export default shoppingListRouter;
