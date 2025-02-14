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
import { fetchArticles, fetchOnBoardingArticles } from "@/sanity/queries/articles";
import { fetchTestimonials } from "@/sanity/queries/others";
import Values from "@/components/Values";
import Analytics from "@/components/Analytics";


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
  const [allArticles, setAllArticles] = useState<any>([])
  const [testimonies, setAllTestimonies] = useState<any>([])

  const fetchArticlesByCategory = async (page: number) => {
    setLoading(true);
    try {
      const items = await fetchOnBoardingArticles();
      const testimoniesData = await fetchTestimonials();
      setAllTestimonies(testimoniesData)
      setAllArticles(items)
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      setAllArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticlesByCategory(1)
  }, []);


  return loading ? (
    <Loader />
  ) : (
    <main className="flex flex-col w-full h-full overflow-hidden overflow-x-hidden">
      <NavBar />
      <HeroSection articles={allArticles} />
      <AboutUs />
      <Values></Values>
      
      {/* <Features title={"Our Services"} type={"all"} /> */}
      <Reviews testimonies={testimonies} />
      <Analytics></Analytics>
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