import Stripe from "stripe";
import { NextRequest } from "next/server";
import db from "@/utils/db";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export const Post = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");
  const { cartId, orderId } = await req.json();
  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });
  const line_items = cart?.cartItems.map((cartItem, index) => {
    return {
      quantity: cartItem.amount,
      price_data: {
        currency: "use",
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
      },
      unit_amount: cartItem.product.price * 100,
    };
  });
  if (!cart || !order) {
    return Response.json(null, {
      status: 404,
      statusText: "resouce not found",
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      metadata: { cartId, orderId },
      line_items: line_items,
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id=SESSION_CHECKOUT_ID`,
    });
    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    return Response.json(null, {
      status: 500,
      statusText: "server internal error",
    });
  }
};
