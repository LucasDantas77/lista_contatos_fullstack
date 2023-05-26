import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getContactController,
  updateContactController,
} from "../controllers/contacts.controller";
import { tokenIsValid } from "../middlewares/tokenisvalid.middleware";

const contactRoutes: Router = Router();

contactRoutes.post("/:createContact", tokenIsValid, createContactController);
contactRoutes.patch(
  "/:contact/:edit-update/:id",
  tokenIsValid,
  updateContactController
);
contactRoutes.delete(
  "/:contact/:delete/:id",
  tokenIsValid,
  deleteContactController
);
contactRoutes.get("/:listContact", tokenIsValid, getContactController);

export default contactRoutes;
