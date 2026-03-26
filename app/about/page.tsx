import prisma from "@/utils/db";
import React from "react";
import db from "@/utils/db";
const AboutPage = async () => {
  return (
    <div>
      <h1 className="flex flex-wrap items-center justify-center text-7xl font-bold tracking-wide gap-2 lg:text-6xl ">
        We love <span className="bg-primary text-white ml-4 py-2 px-4 rounded-2xl">Store</span>
      </h1>
      <p className="max-w-2xl mx-auto leading-8 text-2xl mt-6 text-muted-foreground tracking-wide">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, quae! Iusto perspiciatis
        aliquam consequuntur, aut voluptas deserunt nemo esse! Suscipit, velit facere alias minus
        non aliquid facilis quos fugiat excepturi?
      </p>
    </div>
  );
};

export default AboutPage;
