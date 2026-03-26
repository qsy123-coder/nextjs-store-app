import React from "react";
import Link from "next/link";
import { DotIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "../ui/separator";
const BreadCrumbs = ({ text }: { text: string }) => {
  return (
    <div className="pb-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="text-2xl">
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <DotIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="text-2xl">
            <BreadcrumbLink asChild>
              <Link href="/products">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <DotIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem className="text-2xl">
            <BreadcrumbPage className="capitalize">{text}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="mt-2" />
    </div>
  );
};

export default BreadCrumbs;
