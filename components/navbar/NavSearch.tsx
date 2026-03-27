"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";
const NavSearch = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const handleParams = useDebouncedCallback((searchInput: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }
    console.log("执行了");
    replace(`/products?${params?.toString()}`);
  }, 500);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
    toast(`"${search}" has found`);
  }, [searchParams.get("search")]);

  return (
    <Input
      className="max-w-xs dark:bg-muted"
      type="search"
      placeholder="search for..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleParams(e.target.value);
      }}
    />
  );
};

export default NavSearch;
