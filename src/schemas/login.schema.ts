import { z } from "zod";

const createLoginSchema =z.object({
    email: z.string().email().min(10).max(45),
    password: z.string().min(3).max(120),
})

export {
    createLoginSchema
}