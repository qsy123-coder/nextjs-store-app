import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/SubmitButton";
import SectionTitle from "@/components/global/SectionTitle";
import ReviewCard from "@/components/review/ReviewCard";
import { Button } from "@/components/ui/button";
import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/action";
import React from "react";
import { FaTrash } from "react-icons/fa";

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReviewBind = deleteReviewAction.bind(null, { reviewId });
  return (
    <FormContainer action={deleteReviewBind}>
      <IconButton iconType="delete" />
    </FormContainer>
  );
};

const ReviewsPage = async () => {
  const userReviews = await fetchProductReviewsByUser();
  if (userReviews.length === 0) {
    return (
      <section>
        <SectionTitle text="Your review" />
        <div>There is no review</div>
      </section>
    );
  }
  return (
    <section>
      <SectionTitle text="Your review" />
      <div className="grid md:grid-cols-2 gap-4">
        {userReviews.map((userReview) => {
          const reviewId = userReview.id;
          const { comment, rating } = userReview;
          const { name, image } = userReview.product;
          const reviewInfo = { comment, rating, name, image };
          return (
            <ReviewCard
              reviewsInfo={reviewInfo}
              key={reviewId}
            >
              <DeleteReview reviewId={reviewId} />
            </ReviewCard>
          );
        })}
      </div>
    </section>
  );
};

export default ReviewsPage;
