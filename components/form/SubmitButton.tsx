"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";
import { LuPen, LuTrash } from "react-icons/lu";
import { SignInButton, SignUp, SignUpButton } from "@clerk/nextjs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ReloadIcon } from "@radix-ui/react-icons";

type BtnType = "lg" | "default" | "sm";

type ButtonProps = {
  text?: string;
  className?: string;
  btnSize?: BtnType;
};
export const SubmitButton = ({ text, className, btnSize }: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <div className="">
      <Button
        variant={"outline"}
        disabled={pending}
        size={btnSize}
        className={cn(className, "capitalize")}
      >
        {pending && <Spinner data-icon="inline-start" />}
        {text}
      </Button>
    </div>
  );
};

type IconButtonType = "delete" | "edit";
export const IconButton = ({ iconType }: { iconType: IconButtonType }) => {
  const { pending } = useFormStatus();
  return (
    <div className="">
      <Button
        variant={"outline"}
        disabled={pending}
        type="submit"
        size="icon-sm"
      >
        {pending && <Spinner data-icon="inline-start" />}
        {iconType === "delete" ? <LuTrash className={`${pending && "hidden"}`} /> : <LuPen />}
      </Button>
    </div>
  );
};

export const FavoriteSignUPButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon-lg"
        variant={"outline"}
        className="p-2 cursor-pointer"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const FavoriteSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      variant={"outline"}
      size="icon"
      className="p-2 cursor-pointer
  "
    >
      {pending ? (
        <ReloadIcon className="animate-spin" />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};
