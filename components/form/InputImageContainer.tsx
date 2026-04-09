"use client";

import { actionFunction } from "@/utils/types";
import React, { useState } from "react";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import Image from "next/image";
import { SubmitButton } from "./SubmitButton";
import ImageInput from "./ImageInput";

type InputImageContainerProps = {
  action: actionFunction;
  image: string;
  productId: string;
  children?: React.ReactNode;
};

const InputImageContainer = (props: InputImageContainerProps) => {
  const { action, image, productId, children } = props;
  const [isImageUpdate, setImageUpdate] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl p-10 mb-6 shadow">
      <h1 className="text-2xl font-semibold tracking-wide mb-4">Edit image</h1>
      <Image
        alt="image"
        src={image}
        width={200}
        height={200}
        className="rounded-2xl object-cover w-[200px] h-[200px] mb-4"
        priority
      />
      <Button
        size="sm"
        className="mb-4"
        onClick={() => {
          setImageUpdate(!isImageUpdate);
        }}
      >
        更新图片
      </Button>
      {isImageUpdate && (
        <FormContainer action={action}>
          <div className="flex flex-col gap-4">
            {props.children}
            <ImageInput />
            <SubmitButton text="提交" />
          </div>
        </FormContainer>
      )}
    </div>
  );
};

export default InputImageContainer;
