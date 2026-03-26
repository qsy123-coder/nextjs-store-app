import React from "react";
import { VscCode } from "react-icons/vsc";
import { Button } from "../ui/button";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Button
        size="icon"
        asChild
      >
        <VscCode className="w-10 h-10 p-2" />
      </Button>
    </Link>
  );
};

export default Logo;
