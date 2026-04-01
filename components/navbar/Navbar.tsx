import React, { Suspense } from "react";
import Logo from "./Logo";
import LinksDropdown from "./LinksDropdown";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import SignOutLink from "./SignOutLink";
import Container from "../global/Container";
import NavSearch from "./NavSearch";
import { auth } from "@clerk/nextjs/server";

const Navbar = async () => {
  const { userId } = await auth(); // ← 在服务端获取 userId
  const isAdmin = userId === process.env.USER_ID;
  return (
    <nav className="shadow">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center justify-center">
          <CartButton />
          <DarkMode />
          <LinksDropdown isAdmin={isAdmin} />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
