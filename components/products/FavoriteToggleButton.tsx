import React from "react";
import { auth } from "@clerk/nextjs/server";
import { FavoriteSignUPButton, FavoriteSubmitButton } from "../form/SubmitButton";
import { fetchFavoriteId, toggleFavoriteAction } from "@/utils/action";
import FavoriteToggleForm from "./FavoriteToggleForm";

const FavoriteToggleButton = async ({ productId }: { productId: string }) => {
  const { userId } = await auth();
  if (!userId) return <FavoriteSignUPButton />;
  const favoriteId = await fetchFavoriteId({ productId });
  return (
    <FavoriteToggleForm
      productId={productId}
      favoriteId={favoriteId}
    />
  );
};

export default FavoriteToggleButton;
