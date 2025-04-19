"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import {
  RectangleGroupIcon,
  ChartBarIcon,
  CodeBracketIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { Fade } from "react-awesome-reveal";
import { fetchServices } from "@/sanity/queries/services";
import Link from "next/link";
import RichContent, { Content } from "./RichContent";

const Features = ({ title, type }: { title: any; type: any }) => {
  const [services, setServices] = useState<
    { title: string; excerpt: Content[]; image: string; _id: string }[]
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

  const sectors = ["Agriculture", "Public Health", "Socio-economic Research"];
  const software = ["Stata", "R", "Excel", "SPSS", "PowerBi", "Python"];
  const dataSystems = [
    "ODK",
    "KoBocollect",
    "Cspro",
    "surveyCTO",
    "DHIS2",
    "commcare",
    "QGIS",
  ];

  return (
    <div
      className="flex flex-col relative pt-10 pb-20 max-md:pt-5 max-md:pb-10 gap-16 px-[5%] max-lg:px-4 overflow-hidden"
      id="features"
    >
      <img
        src="/images/dots.svg"
        alt="dots"
        className="absolute -left-7 bottom-4 z-30"
      />

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10 z-40">
        {/* Flex container for subtitle and image */}
        <div className="flex flex-row items-center justify-between gap-8 max-lg:flex-col">
          {/* Subtitle on the left */}
          <div className="flex-1">
            <div className="relative w-fit mb-9">
              <Fade>
                <Header
                  title={title ? title : "Features"}
                  icon={
                    <RectangleGroupIcon className="text-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />
                  }
                />
              </Fade>
            </div>

            {!title && (
              <h1 className="text-black font-bold text-5xl text-start max-md:text-4xl max-sm:text-3xl">
                What <span className="text-[#2563eb]">We</span> Offer
              </h1>
            )}
            <p className="text-md max-sm:text-sm text-black/60 font-normal z-10 text-start lg:w-2/3 max-sm:w-11/12">
              Insight Nexus LTD provides comprehensive data science, MEL, and
              research services, specializing in conducting studies/surveys,
              market studies, building MEL systems and indicators, data
              analysis, machine learning, and data visualization to transform
              raw data into actionable insights.
            </p>
          </div>

          <div className="flex-1 flex justify-end">
            <img
              src="/images/image3.jpeg"
              alt="Features"
              className="rounded-2xl w-full max-w-md object-cover h-80"
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col h-auto  bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <ChartBarIcon className="w-8 h-8 text-[#2563eb] mr-3" />
              <h2 className="text-md font-bold text-gray-800">
                Our services support various sectors, including:
              </h2>
            </div>
            <ul className="space-y-2">
              {sectors.map((sector, index) => (
                <li key={index} className="text-gray-700 flex items-center">
                  <CubeIcon className="w-4 h-4 mr-2 text-[#2563eb]" />
                  {sector}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col h-auto  bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <CodeBracketIcon className="w-8 h-8 text-[#2563eb] mr-3" />
              <h2 className="text-md font-bold text-gray-800">
                We offer statistical software support, including:
              </h2>
            </div>
            <div className="space-y-2">
              {software.map((sw, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium flex items-center"
                >
                  <CubeIcon className="w-4 h-4 mr-2 text-[#2563eb]" />
                  {sw}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col h-auto  bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <RectangleGroupIcon className="w-8 h-8 text-[#2563eb] mr-3" />
              <h2 className="text-md font-bold text-gray-800">
                Data collection and management systems:
              </h2>
            </div>
            <div className="space-y-2">
              {dataSystems.map((system, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium flex items-center"
                >
                  <CubeIcon className="w-4 h-4 mr-2 text-[#2563eb]" />
                  {system}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
