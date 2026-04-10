"use client";

import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const Rating = ({ number }: { number: number }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    return number >= index + 1;
  });
  return (
    <div className="flex items-center ">
      {stars.map((star, index) => {
        return (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            {star ? (
              <FaStar className={`${star ? "text-primary" : "text-gray-400"}`} />
            ) : (
              <FaRegStar className={`${star ? "text-primary" : "text-gray-400"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
