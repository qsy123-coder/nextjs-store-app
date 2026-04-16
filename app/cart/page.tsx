import CartItems from "@/components/cart/CartItems";
import CartTotal from "@/components/cart/CartTotal";
import { fetchOrCreateCart } from "@/utils/action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Cart = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const cart = await fetchOrCreateCart({ userId });
  return (
    <div className="grid lg:grid-cols-12">
      <div className="lg:col-span-8">
        <CartItems cart={cart} />
      </div>
      <div className="lg:col-span-4">
        <CartTotal cart={cart} />
      </div>
    </div>
  );
};

export default Cart;
