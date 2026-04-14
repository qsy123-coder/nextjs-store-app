import React from "react";

import { fetchReviews } from "@/utils/action";
import Image from "next/image";
import Rating from "./Rating";
import Comment from "./Comment";
import ReviewCard from "./ReviewCard";
const ProductReview = async ({ productId }: { productId: string }) => {
  const reviews = await fetchReviews({ productId });

  return (
    <div className="grid md:grid-cols-2 gap-4 mt-10">
      {reviews.map((review, index) => {
        const { id, comment, authorName, authorImageUrl, rating } = review;
        const reviewsInfo = { comment, name: authorName, image: authorImageUrl, rating };
        return (
          <ReviewCard
            reviewsInfo={reviewsInfo}
            key={id}
          />
        );
      })}
    </div>
  );
};

export default ProductReview;
