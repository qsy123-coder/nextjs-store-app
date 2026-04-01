import { z } from "zod";
export const productSchema = z.object({
  name: z.string().min(3),
  company: z.string().min(2),
  price: z.coerce.number().int().min(0),
  //   image: z.string(),
  description: z.string(),
  featured: z.coerce.boolean(),
  //   clerkId: z.string(),
});
