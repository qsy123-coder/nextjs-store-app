"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ReviewLoading = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2 items-center ">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="ml-4">
            <Skeleton className="w-[200px] h-4 mb-2" />
            <Skeleton className="w-[100px] h-4 " />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

const loading = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 ">
      <ReviewLoading />
      <ReviewLoading />
    </div>
  );
};

export default loading;
