"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";

import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  EmailIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";
const ShareButton = ({ productId, name }: { productId: string; name: string }) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/products/${productId}`;
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          size="icon"
          className="p-2"
          asChild
        >
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={10}
        className="flex flex-row items-center justify-center gap-x-2 w-full"
      >
        <TwitterShareButton
          url={shareLink}
          title={name}
        >
          <TwitterIcon
            size={32}
            round
          />
        </TwitterShareButton>
        <EmailShareButton url={shareLink}>
          <EmailIcon
            size={32}
            round
          />
        </EmailShareButton>
        <LinkedinShareButton url={shareLink}>
          <LinkedinIcon
            size={32}
            round
          />
        </LinkedinShareButton>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
