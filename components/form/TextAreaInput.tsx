import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
type TextAreaInputProps = {
  defaultValue: string;
  name: string;
  labelText?: string;
};

const TextAreaInput = ({ defaultValue, name, labelText }: TextAreaInputProps) => {
  return (
    <div>
      <Label
        htmlFor={name}
        className="mb-2 capitalize"
      >
        {labelText}
      </Label>
      <Textarea
        id={name}
        name={name}
        rows={5}
        defaultValue={defaultValue}
        required
        className="leading-loose"
      />
    </div>
  );
};

export default TextAreaInput;
