import React from "react";
import { FaStar } from "react-icons/fa";

const ProductRating = () => {
  const rate = 4.2;
  const review = 25;
  const reviewText = `(${review}) reviews`;
  const className = `text-lg font-mono tracking-normal flex items-center  gap-2 `;
  return (
    <div>
      <p className={className}>
        <FaStar />
        {rate} {reviewText}
      </p>
    </div>
  );
};

export default ProductRating;
