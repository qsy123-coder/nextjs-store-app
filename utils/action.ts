"use server";
import db from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, reviewSchema, validateWithZodSchema } from "./schema";
import { useId } from "react";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
// import { revalidatePath } from "next/cache";
const renderError = async (error: unknown): Promise<{ message: string }> => {
  return error instanceof Error ? { message: error.message } : { message: "there is a error" };
};

export const fetchUserId = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  return user;
};

export const fetchAdminId = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }
  if (user.id !== process.env.ADMIN_USER_ID) {
    redirect("/");
  }
  return user;
};

// 获取特色产品
export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

//获取所有产品
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

//获取单个产品
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

//获取管理员产品
export const fetchAdminProducts = async () => {
  await fetchAdminId();
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

//创建产品
export const createProductAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await fetchUserId();
  try {
    const rawData = Object.fromEntries(formData);
    const zodData = validateWithZodSchema(productSchema, rawData);
    const file = formData.get("image") as File;
    const imageData = validateWithZodSchema(imageSchema, { image: file });

    const fullPath = await uploadImage(imageData.image);

    await db.product.create({
      data: {
        ...zodData,
        clerkId: user.id,
        image: fullPath,
      },
    });

    console.log(zodData);
  } catch (error) {
    console.log(error);
    return renderError(error);
  }
  redirect("/admin/products");
};

//删除产品
export const deleteProductAction = async (productId: string) => {
  await fetchAdminId();
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    console.log(product);
    await deleteImage(product.image);
    revalidatePath("/admin/prouducts");
    return { message: "删除成功" };
  } catch (error) {
    return renderError(error);
  }
};

//获取管理员单个产品

export const fetchAdminProduct = async (productId: string) => {
  await fetchAdminId();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    redirect("/admin/products");
  }
  return product;
};

//更新编辑产品
export const updateProductAction = async (prevState: any, formData: FormData) => {
  await fetchAdminId();
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    const validateProducts = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: { id: productId },
      data: {
        ...validateProducts,
      },
    });
    console.log("rawData", rawData);
    revalidatePath(`/admin/products/${productId}/edit`);
  } catch (error) {
    return renderError(error);
  }
  return { message: "product Successful update" };
};

export const updateProductImage = async (prevState: any, formData: FormData) => {
  await fetchUserId();
  try {
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;
    const imgFile = formData.get("image") as File;
    const validateFile = validateWithZodSchema(imageSchema, { image: imgFile });
    const fullPath = await uploadImage(validateFile.image);
    await deleteImage(oldImageUrl);
    await db.product.update({
      where: { id: productId },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
  } catch (error) {
    return renderError(error);
  }
  return { message: "Image Successful update" };
};

//获取收藏id操作
export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await fetchUserId();
  const favorite = await db.favorite.findFirst({
    where: {
      productId: productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  if (!favorite) {
    return null;
  }
  return favorite.id;
};

//切换收藏操作
export const toggleFavoriteAction = async (preState: {
  productId: string;
  favoriteId: string | null;
  pathName: string;
}) => {
  const user = await fetchUserId();
  const { productId, favoriteId, pathName } = preState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: { id: favoriteId, clerkId: user.id },
      });
    } else {
      await db.favorite.create({
        data: {
          productId: productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathName);
  } catch (error) {
    return renderError(error);
  }

  return { message: `${favoriteId ? "favorite has remove" : "favorite has add"}` };
};

//数据库获取收藏产品操作

export const fetchFavoriteAction = async () => {
  const user = await fetchUserId();
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favorites;
};

export const fetchReviews = async ({ productId }: { productId: string }) => {
  const user = await fetchUserId();

  const reviews = await db.review.findMany({
    where: {
      productId: productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};
export const deleteReview = async () => {
  return { message: "review delete" };
};

export const submitReview = async (preState: any, formData: FormData) => {
  const user = await fetchUserId();
  const rawData = Object.fromEntries(formData);
  const validateField = validateWithZodSchema(reviewSchema, rawData);
  try {
    await db.review.create({
      data: {
        clerkId: user.id,
        ...validateField,
      },
    });

    revalidatePath(`/products/${validateField.productId}`);
  } catch (error) {
    return renderError(error);
  }

  return { message: "review delete" };
};

//获取产品平均评分以及评分数量
export const fetchProductReviews = async (productId: string) => {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      comment: true,
    },
    where: {
      productId,
    },
  });
  return {
    rating: result[0]?._avg?.rating?.toFixed(1) ?? 0,
    count: result[0]?._count?.comment ?? 0,
  };
};
