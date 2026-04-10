"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { Label } from "radix-ui";
import RatingInput from "./RatingInput";
import { submitReview } from "@/utils/action";
import { Card } from "../ui/card";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/SubmitButton";
import { useUser } from "@clerk/nextjs";

const SubmitReview = ({ productId }: { productId: string }) => {
  const [isReviewVisible, setReviewVisible] = useState(false);
  const { user } = useUser();
  return (
    <div>
      <Button
        onClick={() => {
          setReviewVisible(!isReviewVisible);
        }}
        variant={"outline"}
        size="xs"
        className="p-2 cursor-pointer"
      >
        submit review
      </Button>
      {isReviewVisible && (
        <Card className="mt-2 p-10">
          <FormContainer action={submitReview}>
            <input
              type="hidden"
              name="productId"
              value={productId}
            />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || "user"}
            />
            <input
              type="hidden"
              name="authorImageUrl"
              value={user?.imageUrl}
            />
            <RatingInput
              labelText="rating"
              name="rating"
            />
            <TextAreaInput
              defaultValue="fjlsdddddddddd"
              name="comment"
              labelText="comment"
            />
            <SubmitButton
              text="提交"
              className="mt-4"
            />
          </FormContainer>
        </Card>
      )}
    </div>
  );
};

export default SubmitReview;
