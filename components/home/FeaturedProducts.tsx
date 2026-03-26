import React from "react";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";
import { fetchFeaturedProducts } from "@/utils/action";

const FeaturedProducts = async () => {
  const products = await fetchFeaturedProducts();
  return (
    <div className="pt-24">
      <SectionTitle text="featured products " />
      <ProductsGrid products={products} />
    </div>
  );
};

export default FeaturedProducts;
