import { z } from "zod";

export const productSchema = z.object({
   name: z.string().min(3, "O nome do produto precisa conter ao menos 3 caracteres"),
   price: z.number(),
   quantity: z.number(),
   category: z.string().min(3, "A categoria precisa ter ao menos 3 caracteres")
})