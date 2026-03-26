import { Product } from "@prisma/client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import FavoriteToggleButton from "./FavoriteToggleButton";
const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 gap-10">
      {products.map((product, index) => {
        const { image, name, company, price } = product;
        const productId = product.id;
        return (
          <article
            key={productId}
            className="relative group"
          >
            <Card className=" group-hover:shadow transition-shadow duration-500">
              <CardContent className="grid grid-cols-3 gap-4 pl-4">
                <div className="relative h-24 md:h-32 w-24 md:w-32 overflow-hidden">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    priority
                    sizes="(max-width-768px) 33vw,(max-width-1280px) 50vw,100vw"
                    className="rounded-xl w-full object-cover transform group-hover:scale-110  duration-500 transition-transform"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-lg tracking-wide capitalize ">{company}</h2>
                  <p className="font-light text-muted-foreground">{name}</p>
                </div>
                <p className="ml-auto font-light tracking-wide mr-4">{formatCurrency(price)}</p>
                <div className="bottom-7 right-7 absolute">
                  <FavoriteToggleButton productId={productId} />
                </div>
              </CardContent>
            </Card>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsList;
