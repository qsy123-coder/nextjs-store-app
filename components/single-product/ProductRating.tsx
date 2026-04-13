import { fetchProductReviews } from "@/utils/action";
import React from "react";
import { FaStar } from "react-icons/fa";

const ProductRating = async ({ productId }: { productId: string }) => {
  const { rating, count } = await fetchProductReviews(productId);
  const reviewText = `(${count}) reviews`;
  const className = `text-lg font-mono tracking-normal flex items-center  gap-2 `;
  return (
    <div>
      <p className={className}>
        <FaStar />
        {rating} {reviewText}
      </p>
    </div>
  );
};

export default ProductRating;
