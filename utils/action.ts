"use server";
import db from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, reviewSchema, validateWithZodSchema } from "./schema";
import { useId } from "react";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";
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

//获取用户产品评论

export const fetchProductReviewsByUser = async () => {
  const user = await fetchUserId();
  const result = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      comment: true,
      rating: true,
      product: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return result;
};

//删除评论

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await fetchUserId();
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "You have delete this review" };
  } catch (error) {
    return renderError(error);
  }
};

//找到用户的第一个评论

export const findReviewByUser = async (preState: { productId: string; userId: string }) => {
  const { productId, userId } = preState;

  const result = await db.review.findFirst({
    where: {
      clerkId: userId,
      productId: productId,
    },
  });
  return result;
};

//获取购物车所有项总数量
export const fetchCartItems = async () => {
  const { userId } = await auth();
  const result = await db.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });
  return result?.numItemsInCart || 0;
};

//获取产品
const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

//添加关联product的product字段
const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

//获取或创建购物车
export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });

  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }

  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }

  return cart;
};

//更新或创建购物车项
const updateOrCreateCartItem = async ({
  cartId,
  productId,
  amount,
}: {
  cartId: string;
  productId: string;
  amount: number;
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId: productId,
      cartId: cartId,
    },
  });

  if (!cartItem) {
    cartItem = await db.cartItem.create({
      data: {
        cartId: cartId,
        productId: productId,
        amount: amount,
      },
    });
  } else {
    await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  }
};

//更新购物车
export const updateCart = async (cart: Cart) => {
  let numItemsInCart = 0;
  let cartTotal = 0;

  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
      cart: true,
    },
  });

  for (const cartItem of cartItems) {
    const { price } = cartItem.product;
    cartTotal += cartItem.amount * price;
    numItemsInCart += cartItem.amount;
  }

  const tax = cartTotal * cart.taxRate;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = shipping + tax + cartTotal;
  await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      orderTotal,
      tax,
    },
  });
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await fetchUserId();
  try {
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));
    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    const cartItem = await updateOrCreateCartItem({ cartId: cart.id, productId, amount });
    await updateCart(cart);
    return { message: "fff" };
  } catch (error) {
    return renderError(error);
  }
};
