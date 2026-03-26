import React from "react";
import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa";

const FavoriteToggleButton = ({ productId }: { productId: string }) => {
  return (
    <div>
      <Button
        size="icon"
        variant={"outline"}
        className="p-2"
      >
        <FaHeart />
      </Button>
    </div>
  );
};

export default FavoriteToggleButton;
