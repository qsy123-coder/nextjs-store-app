import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

type BtnType = "lg" | "default" | "sm";

type ButtonProps = {
  text?: string;
  className?: string;
  btnSize?: BtnType;
};
const SubmitButton = ({ text, className, btnSize }: ButtonProps) => {
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

export default SubmitButton;
