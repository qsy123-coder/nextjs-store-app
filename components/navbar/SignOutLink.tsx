import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const SignOutLink = () => {
  return (
    <Button className="px-4 py-2 bg-amber-200 hover:bg-amber-500">
      <Link href="/">logout</Link>
    </Button>
  );
};

export default SignOutLink;
