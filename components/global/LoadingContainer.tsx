import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingContainer = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
      <LoadingSkech />
      <LoadingSkech />
      <LoadingSkech />
      <LoadingSkech />
      <LoadingSkech />
      <LoadingSkech />
    </div>
  );
};

const LoadingSkech = () => {
  return (
    <Card>
      <CardContent className="pt-4">
        <Skeleton className="w-full h-48"></Skeleton>
        <Skeleton className="w-3/4 h-4 mt-4"></Skeleton>
        <Skeleton className="w-1/4 h-2 mt-4"></Skeleton>
        <Skeleton className="w-1/4 h-2 mt-4"></Skeleton>
      </CardContent>
    </Card>
  );
};

export default LoadingContainer;
