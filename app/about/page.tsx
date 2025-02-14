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
import Members from "@/components/Members";
import WhatWeDo from "@/components/WhatWeDo";
import Services from "@/components/Services";

// Create a Loader component
function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white backdrop-blur flex-col !z-50">
      <div className="container">
        <div className="dot"></div>
      </div>
      {/* <TypeAnimation
            sequence={[`Starting engines...`, 0]}
            wrapper='p'
            speed={5}
            repeat={Infinity}
            className='font-bold w-full text-[#2563eb] text-lg transition-opacity duration-300 ease-out uppercase self-center flex items-center justify-center'
          /> */}
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
        className="w-full bg-[#f2f4fa] h-fit items-center lg:pb-20  max-md:pt-36 max-sm:pb-10 sm:pb-3 max-sm:pt-36 pt-44 gap-20 max-md:gap-10 justify-center flex  flex-col "
        id="home"
      >
        <div className="w-full flex justify-center z-40">
          <Fade className=" px-6 max-sm:px-4 z-40">
            <div className="flex flex-col   lg:gap-12 md:gap-6  max-sm:gap-4 sm:gap-4     items-center justify-center relative w-full z-40">
              {/* <img
                src="/images/gradient.svg"
                alt="Gradient"
                className="w-full absolute z-0 lg:-top-64 max-md:opacity-50 "
              /> */}

              <h1 className="text-black font-bold lg:text-6xl z-20 md:text-5xl max-sm:text-4xl sm:text-4xl w-full  text-center ">
                About{" "}
                <span className="text-[#2563eb] inline-block relative items-center justify-center">
                  <img
                    src="/images/circles.svg"
                    alt=""
                    className="absolute w-[300x] self-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                  />
                  <span className="z-40 relative">Nexus </span>
                </span>{" "}
              </h1>
              <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

  <p className="text-lg text-[#000912]/70 text-center">
    Insight Nexus, established in Rwanda and duly registered under the Law N°
    007/2021 of 05/02/2021 governing companies, 
    excels in delivering a broad
    spectrum of consultancy services. Our areas of expertise 
    include education,
    agriculture, public health, gender, and livelihoods, alongside conducting
    in-depth case studies. We serve a diverse clientele, ranging from
    international to local NGOs, with a particular emphasis on strengthening
    local organizations.
  </p>
</div>
             


            </div>
          </Fade>
        </div>
      </div>
      <WhatWeDo></WhatWeDo>
      {/* <Features title={"Our Services"} type={"all"} />  */}
      <Services title={"What we do ?"} type={""}></Services>
      <WhyUs />
      <Members />
      {/* <Faq /> */}
      <Footer />

      {/* <AnimatedCursor
        innerSize={12}
        outerSize={12}
        color="37, 99, 235"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
        ]}
      /> */}
    </main>
  );
}
