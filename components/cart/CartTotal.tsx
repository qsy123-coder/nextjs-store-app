import { Cart } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { formatCurrency } from "@/utils/formatCurrency";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/SubmitButton";
import { createOrderAction } from "@/utils/action";

const CartTotal = ({ currentCart }: { currentCart: Cart }) => {
  const { cartTotal, shipping, tax, taxRate, orderTotal } = currentCart;
  return (
    <Card className="p-8 ">
      <CartTotalRow
        label="cartTotal"
        amount={cartTotal}
      />
      <CartTotalRow
        label="shipping"
        amount={shipping}
      />
      <CartTotalRow
        label="tax"
        amount={tax}
      />
      <CartTotalRow
        label="taxRate"
        amount={taxRate}
      />
      <CardTitle>
        <CartTotalRow
          label="orderTotal"
          amount={orderTotal}
          isLastRow={true}
        />
      </CardTitle>
      <FormContainer action={createOrderAction}>
        <SubmitButton
          text="Place order"
          btnSize="lg"
          className="w-full text-lg mt-4"
        />
      </FormContainer>
    </Card>
  );
};

const CartTotalRow = ({
  label,
  amount,
  isLastRow,
}: {
  label: string;
  amount: number;
  isLastRow?: boolean;
}) => {
  return (
    <div>
      <p className="flex justify-between text-sm  gap-2 capitalize mb-1">
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {isLastRow ? null : <Separator />}
    </div>
  );
};
export default CartTotal;
