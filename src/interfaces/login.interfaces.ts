import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schema";

type login = z.infer<typeof createLoginSchema>;

export { login };
