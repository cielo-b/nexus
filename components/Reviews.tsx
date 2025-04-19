import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/20/solid";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideNextButton from "./SlideNextButton";
import SlidePrevButton from "./SlidePrevButton";
import Testimony from "./Testimony";
import { Fade } from "react-awesome-reveal";


const Reviews = ({ testimonies }: { testimonies: any[] }) => {
  const swipingButtonRefNext = useRef<HTMLButtonElement | null>(null);
  const swipingButtonRefPrev = useRef<HTMLButtonElement | null>(null);
  const [is3xlMax, setIs3xlMax] = useState<boolean | undefined>(undefined);
  const [isDesktopSm, setIsDesktopSm] = useState<boolean | undefined>(
    undefined
  );
  const [isTablet, setIsTablet] = useState<boolean | undefined>(undefined);

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
      className="flex flex-row items-center relative pt-20 pb-20 justify-between px-36 overflow-hidden bg-[#f2f4fa] max-lg:flex-col max-lg:px-6"
      id="reviews"
    >
      <Fade className="lg:w-[45%] w-full">
        <div className="flex flex-col items-start justify-center gap-10 max-sm:gap-6 w-full">
          <Header
            title="Reviews"
            icon={
              <ChatBubbleBottomCenterIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />
            }
          />
          <h1 className="text-[#000912] font-bold text-5xl text-start max-md:text-4xl max-sm:text-3xl ">
            What People Think About{" "}
            <span className="text-[#2563eb]">Nexus</span>
          </h1>
          <p className="text-md text-[#000912]/70 md:text-md max-sm:text-xs text-start">
            Clients consistently commend our consultancy agency for its
            transformative impact on their businesses. Our strategic solutions
            have streamlined operations, enhanced decision-making, and driven
            measurable growth, earning the trust and loyalty of organizations
            across various industries.
          </p>
          <p className="text-md text-[#000912]/70 md:text-md max-sm:text-xs text-start max-sm:hidden">
            Our customized consultancy services, such as workflow optimization
            and data-driven strategy development, have been particularly praised
            for delivering tangible results. From improving operational
            efficiency to fostering innovation, we empower businesses to achieve
            sustainable success and stay ahead in competitive markets.
          </p>
        </div>
      </Fade>

      <div className="relative flex lg:w-[45%] items-center justify-center w-full">
        <AiOutlineArrowLeft
          className="bg-brand-500 cursor-pointer rounded-full p-2 text-4xl text-[#000912] relative z-[1555] md-min2:hidden max-md:hidden"
          onClick={() => swipingButtonRefPrev.current?.click()}
        />
        <Swiper
          modules={[Autoplay]}
          className=" h-fit w-full max-sm:w-full !p-4 !py-10 sm-max:w-full xsm-min:!m-1 flex items-center justify-center"
          spaceBetween={25}
          autoplay={true}
          loop
        >
          <div className="max-sm:hidden">
            <SlidePrevButton swipingButtonRefPrev={swipingButtonRefPrev} />
          </div>

          {testimonies.map((testimony, idx) => {
            console.log(testimony);
            const name = testimony.userName;
            const title = testimony.userTitle;
            const ratings = testimony.rating;
            const description = testimony.body;
            const profilePic = testimony.userImage;
            return (
              <SwiperSlide
                className="h-full w-full flex items-center justify-center"
                key={idx}
              >
                <Testimony
                  name={name}
                  title={title}
                  ratings={ratings}
                  description={description}
                  profilePic={profilePic}
                />
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
      
    </div>
  );
};

export default Reviews;
