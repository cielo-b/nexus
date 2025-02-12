import React, { useState } from "react";
import CustomButton from "./CustomButton";
import AnalyticItem from "./AnalyticItem";
import { Analytics } from "@/constants";
import { Fade } from "react-awesome-reveal";

import TagButton from "./TagButton";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Link from "next/link";

const HeroSection = ({ articles }: { articles: any[] }) => {
  const router = useRouter();


  return (
    <div
      className="w-full h-fit items-center lg:pb-20 max-md:pt-36 max-sm:pb-10 sm:pb-3 max-sm:pt-36 pt-44 gap-10 max-md:gap-10 justify-center flex flex-col bg-white"
      id="home"
    >
      <div className="w-full flex justify-center z-40">
        <Fade className=" px-6 max-sm:px-4 z-40">
          <div className="flex flex-col lg:gap-5 md:gap-3 max-sm:gap-4 sm:gap-4 items-center justify-center relative w-full z-40">
            <h1 className="text-black font-bold lg:text-6xl z-20 md:text-5xl max-sm:text-4xl sm:text-4xl w-full text-center ">
              <span className="text-[#2563eb] inline-block relative items-center justify-center">
                <img
                  src="/images/circles.svg"
                  alt=""
                  className="absolute w-[300x] self-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                />
                <span className="z-40 relative">Empowering </span>
              </span>{" "}
              Change
              <br />
              Through Expert{" "}
              <span className="text-[#2563eb] inline-block relative items-center justify-center">
                <img
                  src="/images/circles.svg"
                  alt=""
                  className="absolute w-[300x] self-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                  style={{ width: "calc(100% + 100px)" }}
                />
                <span className="z-40 relative">Consultancy</span>
              </span>
            </h1>

            <p className="md:text-xl max-sm:text-xs text-black/60 font-normal z-10 text-center  ">
              Delivering data-driven insights and comprehensive consultancy{" "}
              <br />
              services to foster impactful and sustainable change in education,{" "}
              <br />
              agriculture, public health, and more.
            </p>
            <div
              onClick={() => router.push("/about")}
              className=" cursor-pointer flex items-center justify-center gap-2 p-4 w-fit px-20 rounded-full bg-[#2563eb] text-white transition-all ease-in-out delay-150 hover:-translate-y-1  hover:bg-secondary  duration-200"
            >
              <span className="text-sm w-max flex-1 text-center">
                More About Us
              </span>
              <ChevronRightIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </Fade>
      </div>


      <Swiper modules={[Autoplay]} className="w-full" spaceBetween={20} autoplay={{ delay: 2500, pauseOnMouseEnter: true }} loop>
        {Array.from({ length: Math.ceil(articles.length / 3) }, (_, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-wrap justify-center gap-4 px-4 md:px-[10vw]">
              {articles.slice(i * 3, i * 3 + 3).map((article) => (
                <Link href={`/blog/${article._id}`} key={article._id} className="bg-white shadow rounded-2xl flex flex-col relative h-72 w-full sm:w-1/2 lg:w-1/3">
                  <img src={article.image} alt={article.title} className="h-full w-full object-cover rounded-2xl mb-4" />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-2xl"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-2xl font-bold mb-2 text-white">{article.title}</h3>
                    <p className="text-lg text-white/70 line-clamp-1">{article.excerpt}</p>
                    <p className="text-lg text-white/70">{article.category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="border-[#2563eb] flex border h-fit p-10 gap-10 max-sm:p-5 inset-0 bg-opacity-20 rounded-full backdrop-blur-lg justify-between w-2/3 z-40 max-lg:w-11/12 max-md:flex-col max-md:rounded-3xl max-md:flex-wrap max-md:gap-5 ">
        {Analytics.map((item, index) => (
          <AnalyticItem
            title={item.title}
            key={index}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
