"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import SelectProductAmount, { Mod } from "./SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { addToCartAction } from "@/utils/action";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { SubmitButton } from "../form/SubmitButton";

const AddToCart = ({ productId }: { productId: string }) => {
  const [amount, setAmount] = useState(1);
  const { userId } = useAuth();
  return (
    <div>
      <SelectProductAmount
        amount={amount}
        mod={Mod.SingleProduct}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input
            type="hidden"
            name="productId"
            value={productId}
          />
          <input
            type="hidden"
            name="amount"
            value={amount}
          />
          <SubmitButton
            text=" Add to cart"
            btnSize="lg"
            className="mt-8"
          ></SubmitButton>
        </FormContainer>
      ) : (
        <SignInButton mode="modal">
          <Button
            size={"lg"}
            className="mt-8"
          >
            去登录 去登录 去登录 去登录
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default AddToCart;
