"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

const Comment = ({ comment }: { comment: string }) => {
  const [isExpend, setIsExpend] = useState(false);
  const longComment = comment.length > 130;
  const showComment = longComment && !isExpend ? `${comment.slice(0, 130)}...` : comment;
  return (
    <div className="w-full">
      <p className="text-sm max-w-sm break-words">{showComment}</p>
      {longComment && (
        <Button
          variant={"link"}
          className="p-2 cursor-pointer text-muted-foreground"
          size={"sm"}
          onClick={() => {
            setIsExpend(!isExpend);
          }}
        >
          {isExpend ? "readless" : "readMore"}
        </Button>
      )}
    </div>
  );
};

export default Comment;
