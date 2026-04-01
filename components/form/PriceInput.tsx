import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type PriceInputProps = {
  defaultValue?: number;
};

const price = "price";
const PriceInput = ({ defaultValue }: PriceInputProps) => {
  return (
    <div>
      <Label
        htmlFor={price}
        className="mb-2 capitalize"
      >
        Price ($)
      </Label>
      <Input
        id={price}
        name={price}
        type="number"
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
};

export default PriceInput;
