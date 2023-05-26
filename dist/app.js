"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const user_routers_1 = __importDefault(require("./routers/user.routers"));
const errors_1 = require("./errors");
const login_routers_1 = __importDefault(require("./routers/login.routers"));
const contact_routers_1 = __importDefault(require("./routers/contact.routers"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", user_routers_1.default);
app.use("/login", login_routers_1.default);
app.use("/contacts", contact_routers_1.default);
app.use(errors_1.handleErrors);
exports.default = app;
