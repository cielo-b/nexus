"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Fade } from "react-awesome-reveal";
import Header from "@/components/Header";
import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import { fetchCareers } from "@/sanity/queries/career";
import Career from "@/components/Career";
import WhatWeOffer from "@/components/WhatWeOffer";
import OurTeams from "@/components/OurTeams";
import ProfileBlogs from "@/components/ProfileBlogs";
import {
  fetchArticles,
  fetchArticleCategories,
} from "@/sanity/queries/articles";
import type { Content } from "@/components/RichContent";

interface Article {
  _id: string;
  title: string;
  excerpt: Content[];
  image: string;
  content: any;
  category: {
    _id: string;
    title: string;
  };
  authors: string[];
}

function SkeletonLoader() {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse w-full bg-white p-4 rounded-xl shadow-md"
        >
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [careers, setCareers] = useState<any[]>([]);
  const [isFetchingCareers, setIsFetchingCareers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [profileArticles, setProfileArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const pageSize = 6;

  const fetchCareersByPage = async (page: number) => {
    setIsFetchingCareers(true);
    try {
      const { items, total } = await fetchCareers(page, pageSize);
      setCareers(items);
      setTotalPages(Math.ceil(total / pageSize));
    } catch (error) {
      console.error("Failed to fetch careers:", error);
      setCareers([]);
    } finally {
      setIsFetchingCareers(false);
    }
  };

  useEffect(() => {
    fetchCareersByPage(currentPage);
  }, [currentPage]); // Removed fetchCareersByPage from dependencies

  useEffect(() => {
    const fetchProfileArticles = async () => {
      try {
        const categoriesData = await fetchArticleCategories();
        setCategories(categoriesData);

        const profileCategory = categoriesData.find(
          (cat: any) => cat.name === "Profiles"
        );
        if (profileCategory) {
          const { items } = await fetchArticles(1, 3, profileCategory._id);
          setProfileArticles(items);
        }
      } catch (error) {
        console.error("Failed to fetch profile articles:", error);
      }
    };

    fetchProfileArticles();
  }, []);

  const handleChange = (panel: string) => (isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <main className="flex flex-col w-full h-full overflow-hidden">
      <NavBar />
      <div className="w-full h-fit items-center lg:pb-20 max-md:pt-36 max-sm:pb-10 sm:pb-3 max-sm:pt-36 pt-44 gap-20 max-md:gap-10 justify-center flex flex-col">
        <div className="w-full flex justify-center z-40">
          <Fade className="px-6 max-sm:px-4 z-40">
            <div className="flex flex-col lg:gap-12 md:gap-6 max-sm:gap-4 sm:gap-4 items-center justify-center relative w-full z-40">
              <h1 className="text-black font-bold lg:text-6xl z-20 md:text-5xl max-sm:text-4xl sm:text-4xl w-full text-center">
                <span className="text-[#2563eb] inline-block relative items-center justify-center">
                  <img
                    src="/images/circles.svg"
                    alt=""
                    className="absolute w-[300px] self-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                  />
                  <span className="z-40 relative">Why Join </span>
                </span>{" "}
                Insight Nexus
              </h1>

              <div className="space-y-6 text-muted-foreground mx-auto max-w-6xl text-base leading-relaxed">
                <p>
                  At <strong>Insight Nexus Ltd</strong>, we go beyond data
                  collection—we generate evidence that drives real-world change.
                  Joining our team means contributing to high-quality, impactful
                  research that addresses today’s most pressing policy and
                  development challenges. Our work spans sectors such as public
                  health, education, social protection, youth empowerment, and
                  gender equality. Every project we undertake is grounded in
                  ethical research practices, cultural sensitivity, and a strong
                  commitment to social justice.
                </p>
                <p>
                  We believe that{" "}
                  <strong>
                    research should be more than a task—it should be a tool for
                    empowerment{" "}
                  </strong>{" "}
                  . That’s why we approach our work with empathy, integrity, and
                  deep contextual understanding. We ensure that all research
                  participants are treated with dignity and that the insights we
                  uncover are used to uplift and inform communities,
                  policymakers, and partners. .
                </p>
                <p>
                  As an organization, we are{" "}
                  <strong>
                    {" "}
                    intentional about fostering a workplace that values people{" "}
                  </strong>
                  . Our team is made up of professionals from diverse
                  disciplines and backgrounds who are united by a shared passion
                  for rigorous inquiry and transformative outcomes. Whether
                  you’re an early-career researcher or an experienced evaluator,
                  we provide opportunities to grow, lead, and make meaningful
                  contributions.
                </p>
                <p>
                  At Insight Nexus, you’ll benefit from:
                  <ul className="list-disc list-inside mt-2 ml-4 space-y-2">
                    <li>
                      A collaborative and inclusive environment that celebrates
                      different perspectives.
                    </li>
                    <li>
                      Clear pathways for <strong>career advancement </strong>{" "}
                      and <strong>skill development</strong>.
                    </li>
                    <li>
                      The chance to work on{" "}
                      <strong>multi-sectoral projects </strong> with local and
                      international partners.
                    </li>
                    <li>
                      A supportive culture that promotes{" "}
                      <strong>learning, innovation </strong>, and{" "}
                      <strong>impact</strong>.
                    </li>
                  </ul>
                </p>
                <p>
                  We don’t just offer employment—we offer a chance to be part of
                  something bigger: building knowledge that shapes better
                  futures. At Insight Nexus, you’re not just starting a
                  job—you’re starting a career with purpose.
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      <WhatWeOffer />
      <OurTeams />

      <div className="flex flex-col items-center relative pt-20 pb-20 max-md:pt-5 max-md:pb-5 gap-10 px-[10%] max-lg:px-6 overflow-hidden bg-[#f2f4fa]">
        <Fade>
          <Header
            title="Current Opportunities"
            icon={
              <RectangleGroupIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />
            }
          />
        </Fade>

        <div className="w-full space-y-4">
          {isFetchingCareers ? (
            <SkeletonLoader />
          ) : (
            careers.map((career, idx) => (
              <Career
                key={career._id}
                title={career.title}
                description={career.description}
                panel={`panel${idx + 1}`}
                expanded={expanded === `panel${idx + 1}`}
                handleChange={handleChange(`panel${idx + 1}`)}
                link={career.link}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === idx + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <ProfileBlogs articles={profileArticles} />

      <Footer />
    </main>
  );
}
