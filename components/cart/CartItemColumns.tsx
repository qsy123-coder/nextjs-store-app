"use client";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SelectProductAmount, { Mod } from "../single-product/SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/SubmitButton";
import { removeCartItemAction } from "@/utils/action";

export const FirstColumn = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className="relative h-30 w-30 md:h-40 md:w-40">
      <Image
        src={image}
        alt={name}
        priority
        fill
        className="object-cover rounded-xl"
      />
    </div>
  );
};

export const SecondColumn = ({
  name,
  company,
  productId,
}: {
  name: string;
  company: string;
  productId: string;
}) => {
  return (
    <div>
      <h3 className="font-medium text-lg capitalize tracking-wide ">
        <Link href={`/products/${productId}`}>{name}</Link>
      </h3>
      <h4 className="font-medium text-sm capitalize tracking-wide ">{company}</h4>
    </div>
  );
};

export const ThirdColumn = ({ cartItemId, quanlity }: { cartItemId: string; quanlity: number }) => {
  const [amount, setAmount] = useState(quanlity);
  const handleAmountChange = async () => {
    setAmount(amount);
  };
  return (
    <div className="flex flex-col gap-8">
      <SelectProductAmount
        mod={Mod.CartItem}
        setAmount={handleAmountChange}
        amount={amount}
        isLoading={false}
      />
      <FormContainer action={removeCartItemAction}>
        <input
          type="hidden"
          name="cartItemId"
          value={cartItemId}
        />
        <SubmitButton
          text="Remove"
          btnSize={"lg"}
        />
      </FormContainer>
    </div>
  );
};

export const FourthColumn = ({ price }: { price: number }) => {
  return (
    <div>
      <h4 className="font-bold text-sm">{formatCurrency(price)}</h4>
    </div>
  );
};
