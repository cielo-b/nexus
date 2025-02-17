import React, { useState, useEffect } from "react";
import Header from "./Header";
import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import { Fade } from "react-awesome-reveal";
import { fetchServices } from "@/sanity/queries/services";
import Link from "next/link";

const Features = ({ title, type }: { title: any; type: any }) => {
  const [services, setServices] = useState<
    { title: string; excerpt: string; image: string, _id: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await fetchServices();
        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <div
      className="flex flex-row items-center relative pt-10 pb-10 max-md:pt-5 max-md:pb-5 gap-36 px-[20%] max-lg:px-6 max-md:gap-10 overflow-hidden"
      id="features"
    >
      <img
        src="/images/dots.svg"
        alt="dots"
        className="absolute -left-7 bottom-4 z-30"
      />

      <div className="w-full flex flex-col items-center justify-center gap-10 z-40">
        <Fade>
          <Header
            title={title ? title : "Features"}
            icon={
              <RectangleGroupIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />
            }
          />
          {!title && (
            <h1 className="text-black font-bold text-5xl text-center max-md:text-4xl max-sm:text-3xl">
              What <span className="text-[#2563eb]">We</span> Offer
            </h1>
          )}
          <p className="tmd:text-md max-sm:text-xs text-black/60 font-normal z-10 text-center lg:w-full max-sm:w-11/12">
            Insight Nexus LTD provides comprehensive data science, MEL, and research services,
             specializing in conducting studies/surveys, market studies,
              building MEL systems and indicators, data analysis, 
              machine learning, and data visualization to transform raw
               data into actionable insights.
          </p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse w-full relative rounded-2xl h-64 bg-gray-300"
              ></div>
            ))
            : services.map((service, index) => (
              <div
                key={index}
                className="w-full relative rounded-2xl h-64"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full rounded-2xl h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {service.title}
                  </h3>
                  <p className="text-lg text-white/70 line-clamp-1">{service.excerpt}</p>
                  <div className="flex items-center justify-end text-white ">
                    <Link href={`/services/${service._id}`} className="hover:underline">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
