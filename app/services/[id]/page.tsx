"use client";

import "ldrs/ring";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import AnimatedCursor from "react-animated-cursor";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { fetchCaseById, fetchCases, fetchServiceById, fetchServices } from "@/sanity/queries/services";
import { useParams } from "next/navigation";
import RichContent, { Content } from "@/components/RichContent";
import Link from "next/link";
import Redirect from "@/components/Redirect";

interface Service {
  _id: string;
  title: string;
  excerpt: Content[];
  image?: string;
  content: string;
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

export default function ServicePage() {
  const { id } = useParams<any>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [article, setService] = useState<Service | null>(null);
  const [cases, setCases] = useState<Service[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;
      try {
        const articleData = await fetchServiceById(id)
        const casesData = await fetchCases(id)
        setService(articleData);
        setCases(casesData);
      } catch (error) {
        console.error("Failed to fetch content:", error);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    };

    fetchContent();
  }, [id]);

  return loading || isFetching ? (
    <Loader />
  ) : !article ? (
    <Redirect to="/" />
  ) : (
    <main className="flex flex-col w-full h-full overflow-hidden overflow-x-hidden bg-gray-100">
      <NavBar />
      <div className="w-full mt-36 px-[10vw]">
        <button
          onClick={() => router.back()}
          className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-10 rounded-full"
        >
          Back To Services
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8  px-[10vw] ">
        {article ? (
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto rounded-lg mb-6"
              />
            )}
            <RichContent content={article.content as any} />
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg">Service not found.</div>
        )}
        <div className="w-[35%]">
          <h3 className="text-2xl font-bold mb-4">Some Cases</h3>
          <div className="grid grid-cols-1 gap-6">
            {cases.slice(0, 5).map((relatedService) => (
              <Link
                href={`/cases/${relatedService._id}`}
                key={relatedService._id}
                className="bg-white shadow rounded-2xl flex flex-col relative h-72 group"
              >
                <img
                  src={relatedService.image}
                  alt={relatedService.title}
                  className="h-full w-full object-cover rounded-2xl mb-4"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:underline">
                    {relatedService.title}
                  </h3>
                  <p className="text-lg text-white/70 group-hover:underline line-clamp-1">
                    <RichContent content={relatedService.excerpt}></RichContent>
                  </p>
                </div>
              </Link>

            ))}
          </div>
        </div>
      </div>
      <Footer />
      
    </main>
  );
}

export const runtime = 'edge';
