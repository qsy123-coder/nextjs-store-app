import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchFavoriteAction } from "@/utils/action";
import React from "react";

const FavouritePage = async () => {
  const favorites = await fetchFavoriteAction();
  if (favorites.length === 0) {
    return <SectionTitle text="There is no product here" />;
  }
  return <ProductsGrid products={favorites.map((favorite) => favorite.product)} />;
};

export default FavouritePage;
