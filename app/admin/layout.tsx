import React from "react";
import Sidebar from "./Sidebar";
import { Separator } from "@/components/ui/separator";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="mb-10">
        <h2 className="text-4xl font-bold tracking-wide">Dashboard</h2>
        <Separator />
      </header>
      <section className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-2">
          <Sidebar />
        </div>
        <div className="lg:col-span-10 px-4">{children}</div>
      </section>
    </div>
  );
};

export default LayoutPage;
