import { z, ZodType } from "zod";
export const productSchema = z.object({
  name: z.string().min(3, "Product name need at least 3 charcter"),
  company: z.string().min(2, "company name need at least 2 charcter"),
  price: z.coerce.number().int().min(0),
  description: z.string().refine(
    (description) => {
      const descriptionLength = description.split(" ").length;
      return descriptionLength <= 300 && descriptionLength >= 2;
    },
    { message: "Words should be between 2 words and 50 words" },
  ),
  featured: z.coerce.boolean(),
});

const imageValidate = () => {
  const maxImage = 1024 * 1024;
  const acceptImageType = ["image/"];
  return z
    .instanceof(File)
    .refine(
      (image) => {
        return !image || image.size <= maxImage;
      },
      { message: "The image must be smaller than 1024*1024" },
    )
    .refine(
      (image) => {
        return !image || acceptImageType.some((type) => image.type.startsWith(type));
      },
      { message: "The file type must be image" },
    );
};

export const imageSchema = z.object({
  image: imageValidate(),
});

export const validateWithZodSchema = <T>(schema: ZodType<T>, data: unknown): T => {
  console.log("type", data);
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map((error) => {
      return error.message;
    });

    throw new Error(errors.join(","));
  }

  return result.data;
};
