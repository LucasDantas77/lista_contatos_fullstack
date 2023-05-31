import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserController,
  updateUserController,
} from "../controllers/user.controllers";
import { tokenIsValid } from "../middlewares/tokenisvalid.middleware";
import { emailExists } from "../middlewares/userMiddlewares/emailExist.middleware";
import { dataIsValidMiddleware } from "../middlewares/validatedData.middleware";
import { usersCreateSchema } from "../schemas/user.schemas";

const UserRoutes: Router = Router();

UserRoutes.post(
  "/:create",
  dataIsValidMiddleware(usersCreateSchema),
  emailExists,
  createUserController
);
UserRoutes.get("/getProfile", tokenIsValid, listUserController);
UserRoutes.patch("/:update-profile", tokenIsValid, updateUserController);
UserRoutes.delete("/:delete-profile", tokenIsValid, deleteUserController);

export default UserRoutes;
