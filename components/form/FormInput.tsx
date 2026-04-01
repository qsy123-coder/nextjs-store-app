import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormInputProps = {
  id: string;
  name?: string;
  type: string;
  label?: string;
  defaultValue: string;
};

const FormInput = ({ id, name, type, label, defaultValue }: FormInputProps) => {
  return (
    <div className="mb-4">
      <Label
        htmlFor={name}
        className="mb-2 capitalize"
      >
        {label || name}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormInput;
