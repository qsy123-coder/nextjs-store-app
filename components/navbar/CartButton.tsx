import React from "react";
import { LuArmchair } from "react-icons/lu";
import { VscCode } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";
import { fetchCartItems } from "@/utils/action";
const CartButton = async () => {
  const cartAmount = await fetchCartItems();
  return (
    <Button
      size="icon"
      asChild
      variant="outline"
      className="w-10 relative flex justify-center items-center"
    >
      <Link href="/cart">
        <IoCartOutline />
        <span
          className="absolute -top-2
         -right-3 bg-black text-white items-center w-4 h-4 flex justify-center
         rounded-full text-xs"
        >
          {cartAmount}
        </span>
      </Link>
    </Button>
  );
};

export default CartButton;
