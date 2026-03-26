import React from "react";
import { cn } from "@/lib/utils";
const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("max-w-6xl xl:max-w-7xl m-auto px-8 py-24", className)}>{children}</div>
  );
};

export default Container;
