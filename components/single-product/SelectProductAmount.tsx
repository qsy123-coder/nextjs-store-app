import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export enum Mod {
  SingleProduct = "singleProduct",
  CartItem = "cartItem",
}
type SelectProductProps = {
  mod: Mod.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemProps = {
  mod: Mod.CartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

const SelectProductAmount = (props: SelectCartItemProps | SelectProductProps) => {
  const { amount, mod, setAmount } = props;
  const isCartItem = mod === Mod.CartItem;
  return (
    <div>
      <h4 className="mb-2">Amount:</h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => {
          setAmount(Number(value));
        }}
        disabled={isCartItem ? props.isLoading : false}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={amount} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Array.from({ length: isCartItem ? 10 : amount + 10 }, (_, index) => {
              const selectValue = (index + 1).toString();
              return (
                <SelectItem
                  value={selectValue}
                  key={selectValue}
                >
                  {selectValue}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectProductAmount;
