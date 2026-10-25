import { z } from "zod";

export const saleSchema = z.object({
   priceOrder: z.number(),
   user: z.number(),
   date: z.date().optional(),
   newPriceOrder: z.number().optional()
})