"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnGetUserInfOffPass = exports.returnUser = exports.passwordOmit = exports.returnUsers = exports.usersCreateSchema = void 0;
const bcryptjs_1 = require("bcryptjs");
const zod_1 = require("zod");
const usersCreateSchema = zod_1.z.object({
    name: zod_1.z.string().max(45),
    email: zod_1.z.string().email().max(45),
    password: zod_1.z
        .string()
        .min(4)
        .max(120)
        .transform((pass) => {
        return (0, bcryptjs_1.hashSync)(pass, 10);
    }),
    fone: zod_1.z.number(),
    createdAt: zod_1.z.string().optional(),
});
exports.usersCreateSchema = usersCreateSchema;
const returnUsers = usersCreateSchema.extend({
    id: zod_1.z.number(),
});
exports.returnUsers = returnUsers;
const passwordOmit = returnUsers.omit({
    password: true,
});
exports.passwordOmit = passwordOmit;
const returnUser = zod_1.z.array(passwordOmit);
exports.returnUser = returnUser;
const userSchemaInfoGet = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    fone: zod_1.z.number(),
    contacts: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.number(),
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
    })),
});
const returnIdInfoUserSchema = userSchemaInfoGet.extend({
    id: zod_1.z.number(),
});
const returnGetUserInfOffPass = returnIdInfoUserSchema.omit({ password: true });
exports.returnGetUserInfOffPass = returnGetUserInfOffPass;
