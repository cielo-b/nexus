import React, { useState, useEffect } from "react";
import Header from "./Header";
import Feature from "./Feature";
import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import { Fade } from "react-awesome-reveal";
import { fetchWhyUs } from "@/sanity/queries/others";
import { Content } from "./RichContent";

const WhyUs = () => {
  const [whyUsData, setWhyUsData] = useState<
    { title: string; answer: Content[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  const toggleFeature = (index: number) => {
    setActiveFeature(index === activeFeature ? null : index);
  };

  useEffect(() => {
    const loadWhyUsData = async () => {
      try {
        const fetchedData = await fetchWhyUs();
        setWhyUsData(fetchedData);
      } catch (error) {
        console.error("Error fetching Why Us data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWhyUsData();
  }, []);

  return (
    <div
      className="flex flex-row items-center relative pt-20 pb-20 max-md:pt-5 max-md:pb-5 gap-6 px-[20%] max-lg:px-6 max-md:gap-10 overflow-hidden bg-[#f2f4fa]"
      id="whyus"
    >
      <div className="w-full flex flex-col items-center justify-center gap-10 z-40">
        <Fade>
          <Header
            title="Our Strength ?"
            icon={
              <RectangleGroupIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />
            }
          />
          <h1 className="text-[#000912] font-bold text-5xl text-center max-md:text-4xl max-sm:text-3xl">
            Why <span className="text-[#2563eb]">Choose</span> Us
          </h1>
          <p className="tmd:text-md max-sm:text-xs text-[#000912]/70 font-normal z-10 text-center lg:w-full max-sm:w-11/12">
            Explore our innovative consultancy solutions, crafted to enhance
            business operations, optimize workflows, and foster growth through
            strategic insights and expert guidance.
          </p>
        </Fade>

        <div className="space-y-6 w-full">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse w-full rounded-3xl h-20 bg-gray-300 p-4"
              ></div>
            ))
            : whyUsData.map((feature, index) => (
              <Feature
                key={index}
                title={feature.title}
                description={feature.answer}
                isActive={index === activeFeature}
                onClick={() => toggleFeature(index)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
