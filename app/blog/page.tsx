"use client"
import "ldrs/ring"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"

import { useState, useEffect } from "react"
import { fetchArticleCategories, fetchArticles } from "@/sanity/queries/articles"
import { Fade } from "react-awesome-reveal"
import Header from "@/components/Header"
import { RectangleGroupIcon } from "@heroicons/react/20/solid"
import "swiper/css"
import Link from "next/link"

function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="bg-gray-200 animate-pulse h-64 rounded"></div>
      ))}
    </div>
  )
}

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white backdrop-blur flex-col !z-50">
      <div className="container">
        <div className="dot"></div>
      </div>
    </div>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [articles, setArticles] = useState<any[]>([])
  const [isFetchingArticles, setIsFetchingArticles] = useState(false)
  const [allArticles, setAllArticles] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 6

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchArticleCategories()
        fetchArticlesByCategory(null, currentPage)
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        setCategories([])
      }
      setLoading(false)
    }

    fetchCategories()
  }, [currentPage]) // Added currentPage to dependencies

  const fetchArticlesByCategory = async (category: string | null, page: number) => {
    setIsFetchingArticles(true)
    try {
      const { items, total } = await fetchArticles(page, pageSize, category || undefined)
      setArticles(items)
      if (!category) setAllArticles(items)
      setTotalPages(Math.ceil(total / pageSize))
    } catch (error) {
      console.error("Failed to fetch articles:", error)
      setArticles([])
    } finally {
      setIsFetchingArticles(false)
    }
  }

  useEffect(() => {
    if (categories.length > 0) {
      fetchArticlesByCategory(selectedCategory, currentPage)
    }
  }, [selectedCategory, currentPage])

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return loading ? (
    <Loader />
  ) : (
    <main className="flex flex-col w-full h-full overflow-hidden">
      <NavBar />
      <div
        className="w-full h-fit items-center lg:pb-20 max-md:pt-36 max-sm:pb-10 sm:pb-3 max-sm:pt-36 pt-44 gap-20 max-md:gap-10 justify-center flex flex-col "
        id="home"
      >
        <div className="w-full flex justify-center z-40">
          <Fade className="px-6 max-sm:px-4 z-40">
            <div className="flex flex-col lg:gap-12 md:gap-6 max-sm:gap-4 sm:gap-4 items-center justify-center relative w-full z-40">
              <h1 className="text-black font-bold lg:text-6xl z-20 md:text-5xl max-sm:text-4xl sm:text-4xl w-full text-center">
                <span className="text-[#2563eb] inline-block relative items-center justify-center">
                  <img
                    src="/images/circles.svg"
                    alt=""
                    className="absolute w-[300x] self-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                  />
                  <span className="z-40 relative">Our</span>
                </span>{" "}
                Blog
              </h1>
              <p className="md:text-xl max-sm:text-xs text-black/60 font-normal z-10 text-center">
                We provide data-driven insights and expert consultancy services to drive meaningful and sustainable
                transformation across
                <br />
                various sectors. Our work spans education, agriculture, public health, and beyond, helping organizations
                achieve impactful
                <br />
                change and lasting success.
              </p>
            </div>
          </Fade>
        </div>
      </div>

      <div className="flex flex-col items-center relative pt-20 pb-20 max-md:pt-5 max-md:pb-5 gap-6 px-[10%] max-lg:px-6 max-md:gap-10 overflow-hidden bg-[#f2f4fa]">
        <Fade>
          <Header
            title={"Our Articles"}
            icon={<RectangleGroupIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />}
          />
        </Fade>
        <div className="flex gap-4 flex-wrap mb-8">
          <button
            className={`px-4 py-2 rounded-lg text-white ${selectedCategory === null ? "bg-blue-600" : "bg-gray-400"}`}
            onClick={() => handleCategoryChange(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              className={`px-4 py-2 rounded-lg text-white ${
                selectedCategory === category._id ? "bg-blue-600" : "bg-gray-400"
              }`}
              onClick={() => handleCategoryChange(category._id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {isFetchingArticles ? (
          <SkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <Link
                href={`/blog/${article._id}`}
                key={article._id}
                className="bg-white shadow rounded-lg flex flex-col relative h-72 overflow-hidden group"
              >
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded">
                    {article.category?.name || "NEWS"}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-4">
                  <h3 className="text-2xl font-bold text-white">{article.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}

