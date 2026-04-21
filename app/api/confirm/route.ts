import { NextRequest } from "next/server";
import Stripe from "stripe";
import db from "@/utils/db";
import { redirect } from "next/navigation";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id") as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;
    if (session.status === "complete") {
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
        },
      });
      await db.cart.delete({
        where: {
          id: cartId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return Response.json(null, {
      status: 500,
      statusText: "server internal error",
    });
  }

  redirect("/orders");
}

// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import db from "@/utils/db";
// import { redirect } from "next/navigation";

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const session_id = searchParams.get("session_id") as string;

//   // 1. 先定义一个变量记录是否成功
//   let success = false;

//   try {
//     const session = await stripe.checkout.sessions.retrieve(session_id);
//     const orderId = session.metadata?.orderId;
//     const cartId = session.metadata?.cartId;

//     if (session.status === "complete") {
//       // 使用 Promise.all 同时执行，效率更高
//       await Promise.all([
//         db.order.update({
//           where: { id: orderId },
//           data: { isPaid: true },
//         }),
//         db.cart.delete({
//           where: { id: cartId },
//         }),
//       ]);
//       success = true;
//     }
//   } catch (error) {
//     console.error("Stripe Confirmation Error:", error);
//     // 这里如果报错，可以跳转到错误页面
//     redirect("/orders?error=payment_verification_failed");
//   }

//   // 2. 将 redirect 放在 try-catch 之外
//   if (success) {
//     redirect("/orders");
//   } else {
//     // 如果 session 状态不是 complete
//     redirect("/");
//   }
// }
