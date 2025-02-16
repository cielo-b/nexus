"use client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import WhyUs from "@/components/WhyUs";
import { Fade } from "react-awesome-reveal";
import Header from "@/components/Header";
import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import Members from "@/components/Members";
import { fetchCareers } from "@/sanity/queries/career";
import Career from "@/components/Career";
import Recruitment from "@/components/Recruitment";
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

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white backdrop-blur flex-col !z-50">
      <div className="container">
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [careers, setCareers] = useState<any[]>([]);
  const [isFetchingCareers, setIsFetchingCareers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expanded, setExpanded] = useState<string | false>(false);
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
  }, [currentPage]);

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
                    className="absolute w-[300x] self-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                  />
                  <span className="z-40 relative">Our</span>
                </span>{" "}
                Careers
              </h1>
              <p className="md:text-2xl max-sm:text-xs text-black/60 font-normal z-10 text-center">
                At InsightNExus, we are committed to helping individuals build rewarding careers by providing data-driven insights and expert guidance.
              </p>
            </div>
          </Fade>
        </div>
      </div>

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

      <Recruitment></Recruitment>
      {/* <WhyUs></WhyUs> */}


      {/* <Members /> */}
      <Footer />
    </main>
  );
}