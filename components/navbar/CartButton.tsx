"use client";
import React, { useEffect, useState } from "react";
import { LuArmchair } from "react-icons/lu";
import { VscCode } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";
import { fetchCartItems } from "@/utils/action";
const CartButton = () => {
  const [cartAmount, setCartAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const amount = await fetchCartItems();
        setCartAmount(amount);
      } catch (error) {
        console.error("获取购物车失败", error);
        setCartAmount(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  return (
    <Button
      size="icon"
      asChild
      variant="outline"
      className="w-10 relative flex justify-center items-center"
    >
      <Link href="/cart">
        <IoCartOutline />
        {!isLoading && cartAmount > 0 && (
          <span
            className="absolute -top-2 -right-3 bg-black text-white 
                       flex items-center justify-center w-4 h-4 
                       rounded-full text-xs font-medium"
          >
            {cartAmount}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartButton;
