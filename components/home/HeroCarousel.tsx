import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

import Img1 from "@/public/images/hero1.jpg";
import Img2 from "@/public/images/hero2.jpg";
import Img3 from "@/public/images/hero3.jpg";
import Img4 from "@/public/images/hero4.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
const HeroCarousel = () => {
  const imgs = [Img1, Img2, Img3, Img4];
  return (
    <Carousel className="w-full max-w-[12rem] sm:max-w-xl lg:block hidden">
      <CarouselContent>
        {imgs.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center">
                  <Image
                    src={img}
                    alt="name"
                    className="object-cover w-full h-[24rem]"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
  // return (
  //   <div className="hidden md:block">
  //     <Carousel>
  //       <CarouselContent>
  //         {imgs.map((img, index) => {
  //           return (
  //             <CarouselItem key={index}>
  //               <Card>
  //                 <CardContent className="p-2">
  //                   <Image
  //                     src={img}
  //                     alt={`img${index}`}
  //                     className="w-full h-[24rem] rounded-md object-cover "
  //                   />
  //                 </CardContent>
  //               </Card>
  //             </CarouselItem>
  //           );
  //         })}
  //       </CarouselContent>
  //       <CarouselPrevious />
  //       <CarouselNext />
  //     </Carousel>
  //   </div>
  // );
};

export default HeroCarousel;
