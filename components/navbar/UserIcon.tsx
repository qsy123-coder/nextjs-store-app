"use client";

import { currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { LuUser } from "react-icons/lu";
const UserIcon = () => {
  const { user, isLoaded } = useUser();

  // Clerk 加载中时显示骨架屏（可选，但推荐）
  if (!isLoaded) {
    return <div className="w-6 h-6 bg-muted rounded-full animate-pulse" />;
  }

  const profileImg = user?.imageUrl;

  if (profileImg) {
    return (
      <img
        src={profileImg}
        alt="用户头像"
        className="!w-6 !h-6 rounded-full object-cover"
      />
    );
  }

  return <LuUser className="!w-6 !h-6  bg-primary rounded-full text-white" />;
};

export default UserIcon;
