import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AddToCart = () => {
  return (
    <Button
      asChild
      size="lg"
      className="mt-8"
    >
      <Link
        href="/cart"
        className="px-6 py-6"
      >
        add to cart
      </Link>
    </Button>
  );
};

export default AddToCart;
