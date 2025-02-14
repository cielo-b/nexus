"use client";
import "ldrs/ring"; // Import the loader
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import AnimatedCursor from "react-animated-cursor";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import Publications from "@/components/Publications";
import { getArticlesByCategory } from "@/sanity/queries/publications";
import { useParams } from "next/navigation";
import ArticlesListings from "@/components/ArticlesListing";

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

export default function Page() {
  const { id } = useParams<any>();
  const [loading, setLoading] = useState(true);
  const [isFetchingArticles, setIsFetchingArticles] = useState(true);
  const [articles, setArticles] = useState<any>([]);
  const [category, setCategory] = useState<any>();
  const router = useRouter(); // Initialize the router for App Router

  useEffect(() => {
    const fetchArticles = async () => {
      if (!id) return; // Prevent fetching until ID is available

      try {
        setIsFetchingArticles(true);
        const data = await getArticlesByCategory(id as string);
        console.log(data);
        setCategory(data[0].category);
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setArticles([]);
      } finally {
        setIsFetchingArticles(false);
      }
    };

    fetchArticles();

    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [id]);

  return loading || isFetchingArticles ? (
    <Loader />
  ) : (
    <main className="flex flex-col w-full h-full overflow-hidden overflow-x-hidden">
      <NavBar />
      <div
        className="w-full h-fit items-center lg:pb-20 max-md:pt-36 max-sm:pb-10 sm:pb-3 max-sm:pt-36 pt-44 gap-20 max-md:gap-10 justify-center flex flex-col"
        id="category-page"
      >
        {/* Add the "Return to Publications" button */}
        <div className="w-full flex justify-center z-40">
         
        </div>
        <div className="w-full flex justify-center z-40">
          <Fade className="px-6 max-sm:px-4 z-40">
            <div className="flex flex-col lg:gap-12 md:gap-6 max-sm:gap-4 sm:gap-4 items-center justify-center relative w-full z-40">
              <h1 className="text-black font-bold lg:text-4xl z-20 md:text-3xl max-sm:text-2xl sm:text-3xl w-full text-center">
                {category?.name}
              </h1>
            </div>
          </Fade>
        </div>
      </div>
      <ArticlesListings
        title={category?.name}
        items={articles}
        isLoading={isFetchingArticles}
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