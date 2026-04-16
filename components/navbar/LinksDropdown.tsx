"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links } from "@/utils/links";
import Link from "next/link";
import { LuAlignLeft } from "react-icons/lu";
import {
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { Separator } from "../ui/separator";
import UserIcon from "./UserIcon";
import SignOutLink from "./SignOutLink";
import { toast } from "sonner";
import { auth } from "@clerk/nextjs/server";
const LinksDropdown = () => {
  const { userId } = useAuth();

  const isAdmin = userId === process.env.ADMIN_USER_ID;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="flex gap-4 max-w-[100px] "
        >
          <LuAlignLeft className="!w-6 !h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48"
        align="start"
        sideOffset={10}
      >
        <Show when="signed-out">
          <DropdownMenuItem asChild>
            <SignInButton mode="modal">Log in</SignInButton>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <span>Sign up</span>
            </SignUpButton>
          </DropdownMenuItem>
        </Show>

        <Show when="signed-in">
          {links.map((link) => {
            if (!isAdmin && link.label === "dashboard") return null;
            return (
              <DropdownMenuItem
                key={link.href}
                asChild
              >
                <Link
                  href={link.href}
                  className="w-full capitalize"
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <Separator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;
