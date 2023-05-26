import { number, z } from "zod";

const createContactSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  fone: z.number(),
  createdAt: z.string().optional(),
});

const returnContact = createContactSchema.extend({
  id: z.number(),
});
const updatedContactUser = z
  .object({
    name: z.string().min(2).max(125),
    email: z.string().email(),
    phone: z.number(),
    userId: z.number().optional(),
  })
  .partial();

export { createContactSchema, returnContact, updatedContactUser };
