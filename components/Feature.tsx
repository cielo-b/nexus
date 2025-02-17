import React from "react";
import { FeaturesProps } from "@/types";
import { TypeAnimation } from "react-type-animation";
import { Fade, Slide } from "react-awesome-reveal";
import RichContent from "./RichContent";


const Feature = ({
  title,
  description,
  isActive,
  onClick
}: FeaturesProps) => {
  return (
    <div
      className={`w-full rounded-3xl border border-[#2563eb] bg-gradient-to-br cursor-pointer flex transition-all duration-300 ease-out justify-start gap-3 p-3 backdrop-blur-xl overflow-hidden `}
      onClick={onClick}
    >
      <div className='flex flex-col items-start w-fit justify-center gap-2 transition-opacity duration-300 ease-out'>
        <h1
          className={`font-semibold w-full text-lg max-sm:text-sm transition-colors duration-300 ease-out ${isActive ? "text-[#2563eb]" : "text-black"
            }`}
        >
          {title}
        </h1>
        {isActive && (
          // <TypeAnimation
          //   sequence={[`${description}`, 0]}
          //   wrapper='span'
          //   speed={90}
          //   repeat={0}
          //   className='font-light w-full text-black max-sm:text-xs transition-opacity duration-300 ease-out'
          // />
          <>
            <RichContent  content={description}  />
          </>
        )}
      </div>
    </div>
  );
};

export default Feature;
