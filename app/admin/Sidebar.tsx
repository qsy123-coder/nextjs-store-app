"use client";

import { Button } from "@/components/ui/button";
import { adminLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Children } from "react";

const Sidebar = () => {
  const path = usePathname();
  return (
    <aside className="flex flex-col start">
      {adminLinks.map((links) => {
        const isActive = path === links.href;
        return (
          <Button
            asChild
            variant={isActive ? "secondary" : "ghost"}
            size="default"
            className="w-full mb-2 font-normal capitalize  justify-start"
            key={links.href}
          >
            <Link href={links.href}>{links.label}</Link>
          </Button>
        );
      })}
    </aside>
  );
};

export default Sidebar;
