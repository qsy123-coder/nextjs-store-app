import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchReviews } from "@/utils/action";
import Image from "next/image";
import Rating from "./Rating";
import Comment from "./Comment";
const ProductReview = async ({ productId }: { productId: string }) => {
  const reviews = await fetchReviews({ productId });

  return (
    <div className="grid md:grid-cols-2 gap-4 mt-10">
      {reviews.map((review, index) => {
        const { id, comment, authorName: name, authorImageUrl: img, rating } = review;

        return (
          <Card
            key={id}
            className="group relative"
          >
            <CardHeader>
              <div className="flex gap-2 mb-4">
                <div className="relative md:w-8 md:h-8 h-48 w-48 rounded-xl overflow-hidden">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    priority
                    className="object-cover rounded-xl group-hover:scale-110 transform duration-150"
                  />
                </div>
                <div>
                  <h2>{name}</h2>
                  <Rating number={rating} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Comment comment={comment} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductReview;
