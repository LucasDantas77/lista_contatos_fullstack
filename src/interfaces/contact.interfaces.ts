import { z } from "zod";
import {
  createContactSchema,
  returnContact,
  updatedContactUser,
} from "../schemas/contact.schema";

type tContact = z.infer<typeof createContactSchema>;
type tReturnContact = z.infer<typeof returnContact>;
type tReturnContactUpdate = z.infer<typeof updatedContactUser>;

export { tContact, tReturnContact, tReturnContactUpdate };
