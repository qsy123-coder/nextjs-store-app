import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

const SignOutLink = () => {
  return (
    <SignOutButton>
      <Button
        className="px-4 py-2 bg-amber-200 hover:bg-amber-500"
        asChild
      >
        <Link href="/">logout</Link>
      </Button>
    </SignOutButton>
  );
};

export default SignOutLink;
