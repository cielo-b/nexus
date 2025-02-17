"use client";
import "ldrs/ring"; // Import the loader
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import ContactUs from "@/components/ContactUs";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

import AnimatedCursor from "react-animated-cursor";
import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import WhyUs from "@/components/WhyUs";
import ServiceSection from "@/components/ServiceSection";
import Members from "@/components/Members";

// Create a Loader component
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Simulate a loading time of 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <main className="flex flex-col w-full h-full  overflow-hidden overflow-x-hidden">
      <NavBar />
      <div
        className="w-full  h-fit items-center lg:pb-10  max-md:pt-36 max-sm:pb-10 sm:pb-3 max-sm:pt-36 pt-44 gap-20 max-md:gap-10 justify-center flex  flex-col "
        id="home"
      >
        <div className="w-full flex justify-center z-40">
          <Fade className=" px-6 max-sm:px-4 z-40">
            <div className="flex flex-col   lg:gap-12 md:gap-6  max-sm:gap-4 sm:gap-4     items-center justify-center relative w-full z-40">
              <h1 className="text-black font-bold lg:text-6xl z-20 md:text-5xl max-sm:text-4xl sm:text-4xl w-full  text-center ">
                What {" "}
                <span className="text-[#2563eb] inline-block relative items-center justify-center">
                  <img
                    src="/images/circles.svg"
                    alt=""
                    className="absolute w-[300x] self-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                  />
                  <span className="z-40 relative">We </span>
                </span>{" "} Do
              </h1>
            </div>
          </Fade>
        </div>
      </div>

      
      {/* <Features title="All Our Services" type="all" /> */}
      <ServiceSection></ServiceSection>
      {/* <WhyUs /> */}
      <Footer />
      
    </main>
  );
}
