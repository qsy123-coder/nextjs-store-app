import { NextRequest } from "next/server";
import db from "@/utils/db";
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");
  const { cartId, orderId } = await req.json();
  console.log("Received IDs:", { cartId, orderId });
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
        currency: "usd",
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
        unit_amount: cartItem.product.price * 100,
      },
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
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });
    console.log(JSON.stringify(line_items, null, 2));
    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return Response.json(null, {
      status: 500,
      statusText: "server internal error",
    });
  }
}
