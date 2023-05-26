"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedContactUser = exports.returnContact = exports.createContactSchema = void 0;
const zod_1 = require("zod");
const createContactSchema = zod_1.z.object({
    name: zod_1.z.string().max(45),
    email: zod_1.z.string().email().max(45),
    fone: zod_1.z.number(),
    createdAt: zod_1.z.string().optional(),
});
exports.createContactSchema = createContactSchema;
const returnContact = createContactSchema.extend({
    id: zod_1.z.number(),
});
exports.returnContact = returnContact;
const updatedContactUser = zod_1.z
    .object({
    name: zod_1.z.string().min(2).max(125),
    email: zod_1.z.string().email(),
    phone: zod_1.z.number(),
    userId: zod_1.z.number().optional(),
})
    .partial();
exports.updatedContactUser = updatedContactUser;
