import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { toast } from "sonner";

const SignOutLink = () => {
  return (
    <SignOutButton>
      <Link
        href="/"
        onClick={() => {
          toast("登出成功");
        }}
      >
        Sign out
      </Link>
    </SignOutButton>
  );
};

export default SignOutLink;
