"use client"
import React from "react";
import Link from "next/link";
import { MenuItemProps } from "@/types";

const MenuItem: React.FC<MenuItemProps> = ({
  to,
  label,
  isActive,
}: MenuItemProps) => {
  return (
    <Link
      href={to}
      className={"relative flex items-center flex-col justify-center text-center py-2 px-4 rounded-md text-white lg:text-black/90 transition-all group duration-300 font-bold lg:hover:text-black max-lg:text-base"}
    >
      {label}
      <div className="w-0 h-1 bg-[#2563eb] rounded-full group-hover:w-1/2 duration-300 hidden lg:block "></div>
    </Link>
  );
};

export default MenuItem;
