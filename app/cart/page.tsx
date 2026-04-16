import CartItemsList from "@/components/cart/CartItemsList";
import CartTotal from "@/components/cart/CartTotal";
import SectionTitle from "@/components/global/SectionTitle";
import { fetchOrCreateCart, updateCart } from "@/utils/action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Cart = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/");
  const previousCart = await fetchOrCreateCart({ userId });
  const { cartItems, currentCart } = await updateCart(previousCart);

  if (cartItems.length === 0) {
    return <SectionTitle text="Empty cart" />;
  }

  return (
    <section>
      <SectionTitle text="Shopping Cart" />
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className="lg:col-span-4">
          <CartTotal currentCart={currentCart} />
        </div>
      </div>
    </section>
  );
};

export default Cart;
