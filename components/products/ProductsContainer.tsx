import { Product } from "@prisma/client";
import React from "react";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";

const ProductsContainer = ({
  layout,
  search,
  products,
}: {
  layout: string;
  search: string;
  products: Product[];
}) => {
  const productsLength = products.length;
  return (
    <div>
      <section className="flex justify-between items-center mb-2">
        <h2>
          {productsLength} product{productsLength > 1 && "s"} found
        </h2>
        <div className="flex gap-2">
          <Button
            variant={layout === "grid" ? "default" : "ghost"}
            asChild
          >
            <Link href={`/products?layout=grid${search && `&search=${search}`}`}>
              <LuLayoutGrid />
            </Link>
          </Button>
          <Button
            variant={layout === "list" ? "default" : "outline"}
            size="icon"
            asChild
          >
            <Link href={`/products?layout=list${search && `&search=${search}`}`}>
              <LuList />
            </Link>
          </Button>
        </div>
      </section>
      <Separator />
      <section className="pt-10">
        {productsLength > 0 ? (
          layout === "grid" ? (
            <ProductsGrid products={products} />
          ) : (
            <ProductsList products={products} />
          )
        ) : (
          <h2>no products found</h2>
        )}
      </section>
    </div>
  );
};

export default ProductsContainer;
