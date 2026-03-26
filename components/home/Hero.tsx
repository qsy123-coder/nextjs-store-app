import React from "react";
import HeroCarousel from "./HeroCarousel";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-24 items-center ">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight capitalize sm:text-6xl pb-10">
          We are changing the way people shop
        </h1>
        <p className="max-w-xl text-lg pb-10 font-medium tracking-normal text-muted-foreground leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat tempore distinctio
          accusantium odit natus tempora. Expedita quibusdam voluptatum dolore. Excepturi laboriosam
          officiis eaque molestiae quo nemo similique aut maxime perspiciatis.
        </p>
        <Button
          size="lg"
          variant={"outline"}
          className="p-10 py-8 text-2xl"
          asChild
        >
          <Link href="/product">More Details</Link>
        </Button>
      </div>
      <HeroCarousel />
    </div>
  );
};

export default Hero;
