"use client";
import "ldrs/ring";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import Header from "@/components/Header";
import { RectangleGroupIcon } from "@heroicons/react/20/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { fetchTrainings } from "@/sanity/queries/trainings";


function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="bg-gray-200 animate-pulse h-64 rounded"></div>
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
  const [training, setTrainings] = useState<any[]>([]);
  const [isFetchingTrainings, setIsFetchingTrainings] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;


  const fetchTrainingsByCategory = async (page: number) => {
    setIsFetchingTrainings(true);
    try {
      const { items, total } = await fetchTrainings(page, pageSize);
      setTrainings(items);
      setTotalPages(Math.ceil(total / pageSize));
    } catch (error) {
      console.error("Failed to fetch training:", error);
      setTrainings([]);
    } finally {
      setIsFetchingTrainings(false);
    }
  };

  useEffect(() => {
    fetchTrainingsByCategory(currentPage);
  }, [currentPage]);


  return isFetchingTrainings ? (
    <Loader />
  ) : (
    <main className="flex flex-col w-full h-full overflow-hidden">
      <NavBar />
      <div
        className="w-full h-fit items-center lg:pb-20 max-md:pt-36 max-sm:pb-10 sm:pb-3 max-sm:pt-36 pt-44 gap-20 max-md:gap-10 justify-center flex flex-col "
        id="home"
      >
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
                Trainings
              </h1>

              <p className="md:text-2xl max-sm:text-xs text-black/60 font-normal z-10 text-center">
                At InsightNExus, we offer tailored training programs designed to empower organizations with the skills and knowledge needed to drive data-driven transformation.
                
                Our expert-led training spans a wide range of sectors, including education, agriculture, public health, and more. We equip individuals and teams with the tools to foster sustainable growth,
                
                enhance performance, and achieve long-term success through impactful, evidence-based strategies.
              </p>

            </div>
          </Fade>
        </div>
      </div>

      <div className="flex flex-col items-center relative pt-20 pb-20 max-md:pt-5 max-md:pb-5 gap-6 px-[10%] max-lg:px-6 max-md:gap-10 overflow-hidden bg-[#f2f4fa]">
        <Fade>
          <Header
            title={"Our Trainings"}
            icon={
              <RectangleGroupIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />
            }
          />
        </Fade>


        {isFetchingTrainings ? (
          <SkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {training.map((article) => (
              <Link
                href={`/trainings/${article._id}`}
                key={article._id}
                className="bg-white shadow rounded-2xl  flex flex-col relative h-72"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover rounded-2xl mb-4"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black  rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 p-4 ">
                  <h3 className="text-2xl font-bold mb-2 text-white">{article.title}</h3>
                  <p className="text-lg text-white/70">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />

    </main>
  );
}
