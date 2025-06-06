import React, { useEffect, useState } from "react";
import Header from "./Header";
import { BuildingOffice2Icon } from "@heroicons/react/20/solid";
import { Fade } from "react-awesome-reveal";
import CustomButton from "./CustomButton";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const AboutUs = () => {
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
      className="flex flex-col items-center gap-8 bg-[#f2f4fa] px-[8vw] py-10 relative"
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
      <Header
        title="Get To Know Us"
        icon={
          <BuildingOffice2Icon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />
        }
      />
      <div className="flex flex-row items-center justify-between max-lg:flex-col w-full gap-8">
        {/* Image Section */}
        <div className="relative flex lg:w-[45%] items-center justify-center w-full">
          <img
            src="/images/image1.jpeg" // Replace with your image path
            alt="About Us"
            className="rounded-2xl w-full h-96 object-cover"
          />
        </div>

        {/* Text Section */}
        <Fade className="lg:w-[45%] w-full">
          <div className="flex flex-col items-start justify-center gap-10 max-sm:gap-6 w-full">
            <h1 className="text-[#000912] font-bold text-5xl text-start max-md:text-4xl max-sm:text-3xl">
              Get To Know <span className="text-[#2563eb]">Nexus</span>
            </h1>
            <p className="text-md text-[#000912]/70 md:text-md max-sm:text-xs text-start">
              Insight Nexus Ltd is a dynamic consultancy firm committed to
              empowering organizations through a wide range of tailored services
              designed to foster growth and operational excellence. By
              leveraging a deep understanding of data analytics, market trends,
              and business strategies, Insight Nexus provides customized,
              data-driven solutions that cater to the unique needs of each
              client. Beyond just data-driven strategies, we offer comprehensive
              solutions that include technical support, organizational capacity
              building, strategic planning, and more. Our team of experts works
              closely with businesses to navigate challenges, optimize
              processes, and develop sustainable strategies for success. Whether
              you're looking to enhance your internal capabilities, streamline
              your operations, or create a roadmap for the future, Insight Nexus
              is dedicated to helping you unlock the full potential of your
              organization. Our holistic approach ensures that we address both
              immediate needs and long-term goals, positioning your business for
              resilience, innovation, and lasting impact in an ever-evolving
              market landscape.
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
