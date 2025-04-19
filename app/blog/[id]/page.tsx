"use client";

import "ldrs/ring";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import AnimatedCursor from "react-animated-cursor";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { fetchArticleByID, fetchArticles } from "@/sanity/queries/articles";
import { useParams } from "next/navigation";
import RichContent, { Content } from "@/components/RichContent";
import Link from "next/link";
import Redirect from "@/components/Redirect";

interface Article {
  _id: string;
  title: string;
  excerpt: Content[];
  image?: string;
  content: string;
  category: { _id: string; title: string };
  authors: string[];
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

export default function ArticlePage() {
  const { id } = useParams<any>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;
      try {
        const articleData = await fetchArticleByID(id);
        const relatedArticlesData = await fetchArticles(
          1,
          5,
          articleData?.category?._id
        ).then((res) => res.items.filter((item) => item._id !== id));
        setArticle(articleData);
        setRelatedArticles(relatedArticlesData);
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
          Back To Articles
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8  px-[10vw] ">
        {article ? (
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
            {article.image && (
              <div className="flex items-center justify-center">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-auto max-h-[500px] w-fit  rounded-lg mb-6"
                />
              </div>
            )}
            <RichContent content={article.content as any} />
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg">
            No article found.
          </div>
        )}
        <div className="w-[35%]">
          <h3 className="text-2xl font-bold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 gap-6">
            {relatedArticles.slice(0, 5).map((relatedArticle) => (
              <Link
                href={`/blog/${relatedArticle._id}`}
                key={relatedArticle._id}
                className="bg-white shadow rounded-2xl flex flex-col relative h-72"
              >
                <img
                  src={relatedArticle.image}
                  alt={relatedArticle.title}
                  className="h-full w-full object-cover rounded-2xl mb-4"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-lg text-white/70 line-clamp-1">
                    <RichContent content={relatedArticle.excerpt} />
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
export const runtime = "edge";
