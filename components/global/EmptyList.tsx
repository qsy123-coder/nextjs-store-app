import React from "react";
import { cn } from "@/lib/utils";
const EmptyList = ({
  heading = "Nothing fund!!",
  className,
}: {
  heading?: string;
  className?: string;
}) => {
  return <div className={cn("text-xl", className)}>{heading}</div>;
};

export default EmptyList;
