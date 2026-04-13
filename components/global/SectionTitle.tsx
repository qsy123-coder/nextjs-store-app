import React from "react";
import { Separator } from "../ui/separator";

const SectionTitle = ({ text }: { text: string }) => {
  return (
    <div className="mb-8 mt-4">
      <h2 className="text-3xl font-bold tracking-wide capitalize mb-8">{text}</h2>
      <Separator />
    </div>
  );
};

export default SectionTitle;
