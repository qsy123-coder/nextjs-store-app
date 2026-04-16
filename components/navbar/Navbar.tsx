import React, { Suspense } from "react";
import Logo from "./Logo";
import LinksDropdown from "./LinksDropdown";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import SignOutLink from "./SignOutLink";
import Container from "../global/Container";
import NavSearch from "./NavSearch";
import { auth } from "@clerk/nextjs/server";

const Navbar = () => {
  return (
    <nav className="shadow">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center justify-center">
          <Suspense fallback={<div>Cart...</div>}>
            <CartButton />
          </Suspense>
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
