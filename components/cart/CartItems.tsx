import { Cart } from "@prisma/client";
import React from "react";
import SectionTitle from "../global/SectionTitle";

const CartItems = ({ cart }: { cart: Cart }) => {
  if (cart.numItemsInCart === 0) {
    return <SectionTitle text="Empty cart" />;
  }
  return <div>cartItems</div>;
};

export default CartItems;
