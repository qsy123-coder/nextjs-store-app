"use server";

import prisma from "@/utils/db";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { productSchema } from "./schema";
const renderError = async (error: unknown): Promise<{ message: string }> => {
  return error instanceof Error ? { message: error.message } : { message: "there is a error" };
};

const fetchUserId = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }
  return user.id;
};
export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  return await db.product.findMany({
    where: {
      OR: [{ name: { contains: search, mode: "insensitive" } }],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const singleProduct = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!singleProduct) {
    redirect("/products");
  }

  return singleProduct;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  const userId = await fetchUserId();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = productSchema.parse(rawData);
    return { message: "666" };
    console.log(rawData);
  } catch (error) {
    console.log(error);
    return renderError(error);
  }
};
