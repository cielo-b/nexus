import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {
  BuildingOffice2Icon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/20/solid";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AboutUsData, testimonies } from "@/constants";
import SlideNextButton from "./SlideNextButton";
import SlidePrevButton from "./SlidePrevButton";
import Testimony from "./Testimony";
import { Fade } from "react-awesome-reveal";
import CustomButton from "./CustomButton";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const AboutUs = () => {
  const swipingButtonRefNext = useRef<HTMLButtonElement | null>(null);
  const swipingButtonRefPrev = useRef<HTMLButtonElement | null>(null);
  const [is3xlMax, setIs3xlMax] = useState<boolean | undefined>(undefined);
  const [isDesktopSm, setIsDesktopSm] = useState<boolean | undefined>(
    undefined
  );
  const [isTablet, setIsTablet] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const handleSize = () => {
      setIs3xlMax(window.innerWidth <= 1420);
      setIsDesktopSm(window.innerWidth <= 1070);
      setIsTablet(window.innerWidth <= 720);
    };

    window.addEventListener("resize", handleSize);
    handleSize();

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center gap-8 bg-[#f2f4fa] px-[8vw] py-10 relative "
      id="aboutUs"
    >
      <img
        src="/images/zigs.svg"
        alt="zigs"
        className="absolute w-2/5 -top-1/3 -left-1/4 z-0"
      />
      <img
        src="/images/zigs.svg"
        alt="zigs"
        className="absolute w-2/5 -bottom-1/3 -right-1/4 z-0"
      />
      {window.location.pathname != "/" && (
        <Header
          title="About Us"
          icon={
            <BuildingOffice2Icon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />
          }
        />
      )}
      <div className="flex flex-row items-center relative  justify-between  overflow-hidden  max-lg:flex-col w-full">
        <div className="relative flex lg:w-[45%] items-center justify-center w-full">
          <AiOutlineArrowLeft
            className="bg-brand-500 cursor-pointer rounded-full p-2 text-4xl text-[#000912] relative z-[1555] md-min2:hidden max-md:hidden"
            onClick={() => swipingButtonRefPrev.current?.click()}
          />
          <Swiper
            modules={[Autoplay]}
            className=" h-fit w-full max-sm:w-full !p-4 !py-10 sm-max:w-full xsm-min:!m-1 flex items-center justify-center"
            spaceBetween={25}
            autoplay={{
              delay: 3000,
              pauseOnMouseEnter: true,
            }}
            loop
          >
            <div className="max-sm:hidden">
              <SlidePrevButton swipingButtonRefPrev={swipingButtonRefPrev} />
            </div>

            {AboutUsData.map((topic, idx) => {
              const { content, title, image } = topic;
              return (
                <SwiperSlide
                  className="h-full w-full flex items-center justify-center"
                  key={idx}
                >
                  <div className="shadow-shadow-400 hover:shadow-shadow-500 hover:shadow-3xl flex w-full h-fit flex-col items-start justify-center gap-6 rounded-lg p-4 max-sm:p-3 px-8 shadow-xl ring-1 ring-[#f0efef] transition-shadow 3xl-max:px-3 md-min3:items-center xsm-min:gap-3 max-sm:w-full">
                    <img
                      src={image}
                      className="rounded-2xl w-full h-80 object-cover "
                    />
                    <div className="flex w-full flex-col items-start justify-center gap-2 md-min3:items-center">
                      <span className="text-4xl font-black text-[#2563eb] xsm-min:text-base">
                        {title}
                      </span>
                    </div>
                    <span className="text-base font-medium text-gray-600 md-min3:text-center xsm-min:text-sm max-sm:text-sm">
                      {content}
                    </span>
                  </div>
                </SwiperSlide>
              );
            })}
            <SlideNextButton swipingButtonRefNext={swipingButtonRefNext} />
          </Swiper>
          <AiOutlineArrowRight
            className="bg-brand-500 cursor-pointer rounded-full p-2 text-4xl text-[#000912] md-min2:hidden max-md:hidden"
            onClick={() => swipingButtonRefNext.current?.click()}
          />
        </div>
        <Fade className="lg:w-[45%] w-full">
          <div className="flex flex-col items-start justify-center gap-10 max-sm:gap-6 w-full">
            <h1 className="text-[#000912] font-bold text-5xl text-start max-md:text-4xl max-sm:text-3xl ">
              Get To Know <span className="text-[#2563eb]">Nexus</span>
            </h1>
            <p className="text-md text-[#000912]/70 md:text-md max-sm:text-xs text-start">
              At InsightNexus, we're on a mission to provide innovative
              consultancy solutions that enable businesses to overcome
              challenges, optimize operations, and achieve sustainable growth.
              We are committed to delivering tailored, data-driven strategies
              that unlock the full potential of every organization.
            </p>
            {window.location.pathname == "/" && (
              <CustomButton
                title="More About Us"
                rightIcon={
                  <ArrowDownOnSquareIcon className="group-hover:stroke-white w-6 h-6 stroke-white" />
                }
                handleClick={() => {
                  router.push("about");
                }}
                containerStyles="max-lg:hidden"
              />
            )}
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default AboutUs;
