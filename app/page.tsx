import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { Suspense } from "react";
// import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import LoadingContainer from "@/components/global/LoadingContainer";
const HomePage = () => {
  return (
    <>
      <Hero />
      {/* <LoadingContainer /> */}
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
};

export default HomePage;
