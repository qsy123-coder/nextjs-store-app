import React from "react";
import { Card, CardContent } from "../ui/card";
import { CartItemWithProduct } from "@/utils/types";
import { FirstColumn, FourthColumn, SecondColumn, ThirdColumn } from "./CartItemColumns";

const CartItemsList = ({ cartItems }: { cartItems: CartItemWithProduct[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {cartItems.map((cartItem) => {
        const { image, company, name, price, id } = cartItem.product;
        const { amount, productId } = cartItem;
        return (
          <Card
            className="p-4"
            key={id}
          >
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:gap-8 justify-between">
                <FirstColumn
                  image={image}
                  name={name}
                />
                <SecondColumn
                  company={company}
                  name={name}
                  productId={productId}
                />
                <ThirdColumn />
                <FourthColumn price={price} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CartItemsList;
