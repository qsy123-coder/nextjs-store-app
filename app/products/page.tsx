import ProductsContainer from "@/components/products/ProductsContainer";
import { fetchAllProducts } from "@/utils/action";
import React from "react";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string; search?: string }>;
}) => {
  const products = await fetchAllProducts();
  const params = await searchParams;
  const layout = params.layout || "grid";
  const search = params.search || "";
  console.log(params);
  return (
    <ProductsContainer
      layout={layout}
      search={search}
      products={products}
    />
  );
};

export default ProductsPage;
