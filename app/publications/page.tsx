"use client";
import "ldrs/ring"; // Import the loader
import NavBar from "@/components/NavBar";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

import AnimatedCursor from "react-animated-cursor";
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import Publications from "@/components/Publications";
import { getAllCategories } from "@/sanity/queries/publications";
import { useRouter } from "next/navigation";

// Loader component
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
  const [categories, setCategories] = useState<any>([]);
  const router = useRouter();
  const [isFetchingCategories, setIsFetchingCategories] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetchingCategories(true);
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setIsFetchingCategories(false);
      }
    };

    fetchData();

    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <main className="flex flex-col w-full h-full  overflow-hidden overflow-x-hidden">
      <NavBar />
      <div
        className="w-full h-fit items-center lg:pb-20 max-md:pt-36 max-sm:pb-10 sm:pb-3 max-sm:pt-36 pt-44 gap-20 max-md:gap-10 justify-center flex flex-col "
        id="home"
      >
        <div className="w-full flex justify-center z-40">
          <Fade className="px-6 max-sm:px-4 z-40">
            <div className="flex flex-col lg:gap-12 md:gap-6 max-sm:gap-4 sm:gap-4 items-center justify-center relative w-full z-40">
              {/* <img
                src="/images/gradient.svg"
                alt="Gradient"
                className="w-full absolute z-0 lg:-top-64 max-md:opacity-50"
              /> */}

              <h1 className="text-black font-bold lg:text-6xl z-20 md:text-5xl max-sm:text-4xl sm:text-4xl w-full text-center">
                <span className="text-[#2563eb] inline-block relative items-center justify-center">
                  <img
                    src="/images/circles.svg"
                    alt=""
                    className="absolute w-[300x] self-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                  />
                  <span className="z-40 relative">Our</span>
                </span>{" "}
                Publications
              </h1>

              <p className="md:text-xl max-sm:text-xs text-black/60 font-normal z-10 text-center">
                We provide data-driven insights and expert consultancy services
                to drive meaningful and sustainable transformation across
                <br />
                various sectors. Our work spans education, agriculture, public
                health, and beyond, helping organizations achieve impactful
                <br />
                change and lasting success.
              </p>
            </div>
          </Fade>
        </div>
      </div>
      <Publications
        items={categories}
        isLoading={isFetchingCategories}
        handleItemClick={(item: any) =>
          router.push(`/publications/${item._id}`)
        }
      />
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
