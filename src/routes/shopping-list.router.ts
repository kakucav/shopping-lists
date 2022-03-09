import { Router } from "express";
import * as shoppingListController from "../controllers/shopping-list.controller";
import authenticateJWT from "../middleware/authenticateJWT";

const shoppingListRouter = Router();

shoppingListRouter.post(
  "/",
  authenticateJWT,
  shoppingListController.createList
);
shoppingListRouter.put(
  "/:id",
  authenticateJWT,
  shoppingListController.updateList
);
shoppingListRouter.delete(
  "/:id",
  authenticateJWT,
  shoppingListController.deleteList
);
shoppingListRouter.get(
  "/get-report",
  authenticateJWT,
  shoppingListController.getReport
);

export default shoppingListRouter;
