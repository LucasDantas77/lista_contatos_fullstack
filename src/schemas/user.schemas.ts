import { hashSync } from "bcryptjs";
import { z } from "zod";

const usersCreateSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z
    .string()
    .min(4)
    .max(120)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
  fone: z.number(),
  createdAt: z.string().optional(),
});

const returnUsers = usersCreateSchema.extend({
  id: z.number(),
});

const passwordOmit = returnUsers.omit({
  password: true,
});

const returnUser = z.array(passwordOmit);

const userSchemaInfoGet = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  fone: z.number(),
  contacts: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    })
  ),
});

const returnIdInfoUserSchema = userSchemaInfoGet.extend({
  id: z.number(),
});

const returnGetUserInfOffPass = returnIdInfoUserSchema.omit({ password: true });

export {
  usersCreateSchema,
  returnUsers,
  passwordOmit,
  returnUser,
  returnGetUserInfOffPass,
};
