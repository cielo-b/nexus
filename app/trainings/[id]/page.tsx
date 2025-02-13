"use client";

import "ldrs/ring";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import RichContent, { Content } from "@/components/RichContent";
import Link from "next/link";
import Redirect from "@/components/Redirect";
import { fetchTrainingByID } from "@/sanity/queries/trainings";

interface Training {
  _id: string;
  title: string;
  excerpt: Content[];
  image?: string;
  content: string;
  link: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
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

export default function TrainingPage() {
  const { id } = useParams<any>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [training, setTraining] = useState<Training | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;
      try {
        const trainingData = await fetchTrainingByID(id)
        setTraining(trainingData);
      } catch (error) {
        console.error("Failed to fetch content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  return loading ? (
    <Loader />
  ) : !training ? (
    <Redirect to="/" />
  ) : (
    <main className="flex flex-col w-full h-full overflow-hidden overflow-x-hidden bg-gray-100">
      <NavBar />
      <div className="w-full mt-36 px-[10vw]">
        <button
          onClick={() => router.back()}
          className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-10 rounded-full"
        >
          Back To Trainings
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8  px-[10vw] items-center ">
        {training ? (
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">{training.title}</h2>
            {training.image && (
              <img
                src={training.image}
                alt={training.title}
                className="w-full h-auto rounded-lg mb-6"
              />
            )}
            <RichContent content={training.content as any} />
            <div className="mt-5 flex justify-start">
              <a href={training.link} target="_blank" className={`bg-[#2563eb] text-white rounded-full flex gap-2 flex-row items-center justify-center max-sm:px-2 max-sm:py-2 px-10 py-2.5 hover:bg-[#2563eb11] border-[#2563eb] hover:shadow-sm hover:shadow-[#2563eb45] ease-out duration-300 group border w-fit`}>Apply Now</a>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg">No training found.</div>
        )}
      </div>
      <Footer />

    </main>
  );
}


export const runtime = 'edge';
