import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const image = "image";
const ImageInput = () => {
  return (
    <div>
      <Label
        htmlFor={image}
        className="mb-2 capitalize"
      >
        upload your image
      </Label>
      <Input
        id={image}
        name={image}
        type="file"
        accept="image/*"
        required
      />
    </div>
  );
};

export default ImageInput;
