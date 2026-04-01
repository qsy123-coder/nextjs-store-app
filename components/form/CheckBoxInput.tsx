import React from "react";
import { Checkbox } from "../ui/checkbox";
type CheckBoxInputProps = {
  name: string;
  label: string;
  defaultValue: boolean;
};
const CheckBoxInput = ({ name, label, defaultValue = false }: CheckBoxInputProps) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Checkbox
        id={name}
        name={name}
        checked
        required
      />
      <label
        htmlFor={name}
        className=" capitalize text-sm leading-none "
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBoxInput;
