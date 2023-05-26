import "express-async-errors";
import express, { Application } from "express";
import UserRoutes from "./routers/user.routers";
import { handleErrors } from "./errors";
import LoginRoutes from "./routers/login.routers";
import contactRoutes from "./routers/contact.routers";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app: Application = express();
app.use(express.json());

app.use("/users", UserRoutes);
app.use("/login", LoginRoutes);
app.use("/contacts", contactRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(handleErrors);

export default app;
