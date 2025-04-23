"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import {
  RectangleGroupIcon,
  ChartBarIcon,
  CodeBracketIcon,
  CubeIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
  SparklesIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Fade } from "react-awesome-reveal";
import { fetchServices } from "@/sanity/queries/services";
import Link from "next/link";
import RichContent, { Content } from "./RichContent";

const Features = ({ title, type }: { title?: string; type?: string }) => {
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
  const researchDesign = [
    "Study design, implementation, and dissemination (quantitative & qualitative)",
    "Baseline, midline, and endline studies",
    "Impact evaluations (RCTs, quasi-experimental, etc.)",
    "Feasibility studies and market research",
    "Needs assessments and situation analyses",
    "Development of data collection tools (e.g., KoboToolbox, ODK)",
    "Real-time monitoring systems with smart dashboards (e.g., PowerBi, etc)",
    "GIS mapping and spatial data analysis",
    "Documentation of lessons learned, success stories, and best practices",
  ];
  const capacityBuilding = [
    "Development of Monitoring, Evaluation, and Learning (MEL) plans",
    "MEL system setup and strengthening",
    "Data quality assurance (DQA) and data verification exercises",
    "Indicator development, tools, and results frameworks",
    "Logical framework (LogFrame) development and review",
    "Development of interactive dashboards and data visualizations",
    "Learning agenda development and implementation",
    "Design and facilitation of learning events and After Action Reviews (AARs)",
  ];
  const strategicAdvisory = [
    "Providing technical training on research, M&E, and data systems",
    "Organizational capacity development for CSOs, NGOs, and institutions",
    "Training on digital literacy, data science, and tech-enabled data systems",
    "Workshops on gender equality, disability inclusion, and social inclusion (GESI)",
    "Coaching on evidence use and data-driven decision-making",
  ];
  const policyPlanning = [
    "Strategic plan and capacity action plan development",
    "Writing project proposals and grants applications",
    "Theory of Change (ToC) facilitation and design",
    "Policy brief and technical report writing",
    "Advisory services for GESI, climate resilience, and cross-cutting themes",
    "Donor reporting and strategic communications support",
  ];
  const environmental = [
    "Research and evaluation in climate-smart agriculture",
    "Environmental and climate-related impact assessments",
    "Climate vulnerability and resilience analysis",
    "Integration of climate adaptation into MEL systems",
    "Program design for sustainable agriculture and food systems",
    "Technical support on green economy, ecosystem services, and circular economy principles",
    "Climate and environment-focused policy briefs and knowledge products",
    "Design and evaluation of MEL systems for sustainable agriculture and food security programs",
    "MEL support for public health resilience and climate-related health interventions",
    "Technical frameworks for green economy, ecosystem services, and circular economy initiatives",
  ];

  const card = (icon: JSX.Element, title: string, items: string[]) => (
    <div className="flex flex-col h-auto bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-md font-bold text-gray-800 ml-3">{title}</h2>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="px-3 py-1 rounded-full text-sm font-medium flex items-center"
          >
            <CubeIcon className="w-4 h-4 mr-2 text-[#2563eb]" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );

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
        <div className="flex flex-row items-center justify-between gap-8 max-lg:flex-col">
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
          {card(<ChartBarIcon className="w-8 h-8 text-[#2563eb]" />, "We offer statistical software support, including:", software)}
          {card(<CodeBracketIcon className="w-8 h-8 text-[#2563eb]" />, "Data collection and management systems:", dataSystems)}
          {card(<MagnifyingGlassIcon className="w-8 h-8 text-[#2563eb]" />, "Research Design, Implementation & Dissemination", researchDesign)}
          {card(<ClipboardDocumentCheckIcon className="w-8 h-8 text-[#2563eb]" />, "Monitoring, Evaluation, and Learning (MEL)", capacityBuilding)}
          {card(<AcademicCapIcon className="w-8 h-8 text-[#2563eb]" />, "Capacity Building & Technical Training", strategicAdvisory)}
          {card(<SparklesIcon className="w-8 h-8 text-[#2563eb]" />, "Policy & Strategic Planning", policyPlanning)}
          {card(<DocumentMagnifyingGlassIcon className="w-8 h-8 text-[#2563eb]" />, "Environmental & Climate Resilience Services", environmental)}
        </div>
      </div>
    </div>
  );
};

export default Features;
