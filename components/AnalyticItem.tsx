import React from "react";
import { AnalyticsProps } from "@/types";
import CountUp from "react-countup";
import Link from "next/link";

const AnalyticItem = ({ title, description, link }: AnalyticsProps) => {
  const endValue = typeof title === "number" ? title : 0;

  return (
    <Link
      href={`/${link}`}
      className="flex flex-col hover:text-blue-500 text-black text-center items-center justify-center gap-3 max-md:w-1/3 md:w-1/3 max-sm:w-full sm:w-full max-md:bg-white/5 max-md:gap-2 max-md:py-2 rounded-2xl"
    >
      <CountUp
        end={endValue}
        className="font-medium text-3xl max-sm:text-2xl"
        {...({ duration: 5 } as any)}
      />
      <p className="font-light text-center text-md max-sm:text-sm">
        {description}
      </p>
    </Link>
  );
};

export default AnalyticItem;
