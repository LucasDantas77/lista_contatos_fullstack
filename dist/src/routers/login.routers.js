"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = require("../controllers/login.controllers");
const login_schema_1 = require("../schemas/login.schema");
const validatedData_middleware_1 = require("../middlewares/validatedData.middleware");
const LoginRoutes = (0, express_1.Router)();
LoginRoutes.post("", (0, validatedData_middleware_1.dataIsValidMiddleware)(login_schema_1.createLoginSchema), login_controllers_1.createLogincontroller);
exports.default = LoginRoutes;
