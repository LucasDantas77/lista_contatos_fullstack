"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoginSchema = void 0;
const zod_1 = require("zod");
const createLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(10).max(45),
    password: zod_1.z.string().min(3).max(120),
});
exports.createLoginSchema = createLoginSchema;
