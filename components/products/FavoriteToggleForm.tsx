"use client";

import React from "react";
import { FavoriteSubmitButton, SubmitButton } from "../form/SubmitButton";
import FormContainer from "../form/FormContainer";
import { toggleFavoriteAction } from "@/utils/action";
import { usePathname } from "next/navigation";

const FavoriteToggleForm = ({
  productId,
  favoriteId,
}: {
  productId: string;
  favoriteId: string | null;
}) => {
  const pathName = usePathname();
  const favoriteButtonAction = toggleFavoriteAction.bind(null, {
    productId,
    favoriteId,
    pathName,
  });
  return (
    <FormContainer action={favoriteButtonAction}>
      <FavoriteSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
};

export default FavoriteToggleForm;
