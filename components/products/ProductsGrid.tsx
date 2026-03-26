import React from "react";
import { Product } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import FavoriteToggleButton from "./FavoriteToggleButton";

const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product, index) => {
        const { name, image, description, price } = product;
        const dollarAmount = formatCurrency(price);
        const productId = product.id;
        return (
          <article
            key={productId}
            className="group relative"
          >
            <Link href={`/product/${productId}`}>
              <Card className="group-hover:shadow transition-shadow duration-100 ">
                <CardContent className="p-4">
                  <div className="relative h-64 md:h-48 overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      priority
                      sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw, 33vw"
                      className="rounded w-full  object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="py-4">
                    <h2 className="text-lg capitalize font-medium tracking-normal">{name}</h2>
                    <p className="font-medium text-muted-foreground  mt-2">{dollarAmount}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-9 right-9 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
