import { Router } from "express";
import { createLogincontroller } from "../controllers/login.controllers";
import { createLoginSchema } from "../schemas/login.schema";
import { dataIsValidMiddleware } from "../middlewares/validatedData.middleware";

const LoginRoutes: Router = Router();

LoginRoutes.post(
  "",
  dataIsValidMiddleware(createLoginSchema),
  createLogincontroller
);

export default LoginRoutes;
