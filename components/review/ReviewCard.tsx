import React, { Children } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Rating from "./Rating";
import Comment from "./Comment";
type ReviewsInfoProps = {
  reviewsInfo: {
    comment: string;
    name: string;
    image: string;
    rating: number;
  };

  children?: React.ReactNode;
};
const ReviewCard = ({ reviewsInfo, children }: ReviewsInfoProps) => {
  return (
    <Card className="group relative">
      <CardHeader>
        <div className="flex gap-2 mb-4">
          <div className="relative md:w-8 md:h-8 h-48 w-48 rounded-xl overflow-hidden">
            <Image
              src={reviewsInfo.image}
              alt={reviewsInfo.name}
              fill
              priority
              className="object-cover rounded-xl group-hover:scale-110 transform duration-150"
            />
          </div>
          <div>
            <h2>{reviewsInfo.name}</h2>
            <Rating number={reviewsInfo.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewsInfo.comment} />
      </CardContent>
      <div className="absolute top-2 right-2">{children}</div>
    </Card>
  );
};

export default ReviewCard;
