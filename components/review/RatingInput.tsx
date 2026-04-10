import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

const RatingInput = ({ name, labelText }: { name: string; labelText: string }) => {
  const numbers = Array.from({ length: 5 }, (_, index) => {
    const i = index + 1;

    return i.toString();
  }).reverse();

  return (
    <div className="max-w-xs mb-2">
      <Label
        htmlFor={name}
        className="capitalize"
      >
        {labelText || name}
      </Label>
      <Select
        name={name}
        required
        defaultValue={numbers[0]}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {numbers.map((number, index) => {
              return (
                <SelectItem
                  key={index}
                  value={number}
                >
                  {number}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RatingInput;
