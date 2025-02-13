"use client"

import "ldrs/ring"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import { useState, useEffect } from "react"
import { Fade } from "react-awesome-reveal"
import Header from "@/components/Header"
import { RectangleGroupIcon } from "@heroicons/react/20/solid"
import { ArrowRight, BookOpen, Target, TrendingUp } from 'lucide-react'
import Link from "next/link"
import { fetchTrainings } from "@/sanity/queries/trainings"
import WhyTrain from "@/components/WhyTrain"

function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="flex flex-col gap-4">
          <div className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
          <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded w-24"></div>
        </div>
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
  const [training, setTrainings] = useState<any[]>([])
  const [isFetchingTrainings, setIsFetchingTrainings] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 6

  const fetchTrainingsByCategory = async (page: number) => {
    setIsFetchingTrainings(true)
    try {
      const { items, total } = await fetchTrainings(page, pageSize)
      setTrainings(items)
      setTotalPages(Math.ceil(total / pageSize))
    } catch (error) {
      console.error("Failed to fetch training:", error)
      setTrainings([])
    } finally {
      setIsFetchingTrainings(false)
    }
  }

  useEffect(() => {
    fetchTrainingsByCategory(currentPage)
  }, [currentPage])

  return isFetchingTrainings ? (
    <Loader />
  ) : (
    <main className="flex flex-col w-full h-full overflow-hidden">
      <NavBar />
      <div className="w-full h-fit items-center lg:pb-20 max-md:pt-36 max-sm:pb-10 sm:pb-3 max-sm:pt-36 pt-44 gap-20 max-md:gap-10 justify-center flex flex-col">
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
                Trainings
              </h1>

              {/* Enhanced subtitle section */}
              <div className="flex flex-col items-center gap-8 max-w-4xl">
                <p className="md:text-2xl max-sm:text-xs text-black/60 font-normal z-10 text-center leading-relaxed">
                  At{" "}
                  <span className="text-[#2563eb] font-semibold">
                    InsightNexus
                  </span>
                  , we offer tailored training programs designed to empower organizations with the skills
                  and knowledge needed to drive data-driven transformation.
                </p>

                <div className="grid md:grid-cols-3 gap-6 w-full">
                  <div className="group flex flex-col items-center text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 mb-4 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                      <BookOpen className="w-7 h-7 text-[#2563eb]" />
                    </div>
                    <p className="text-sm md:text-base text-gray-600">
                      Expert-led training across education, agriculture, and public health sectors
                    </p>
                  </div>

                  <div className="group flex flex-col items-center text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 mb-4 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                      <TrendingUp className="w-7 h-7 text-[#2563eb]" />
                    </div>
                    <p className="text-sm md:text-base text-gray-600">
                      Equipping teams with tools for sustainable growth and enhanced performance
                    </p>
                  </div>

                  <div className="group flex flex-col items-center text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 mb-4 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                      <Target className="w-7 h-7 text-[#2563eb]" />
                    </div>
                    <p className="text-sm md:text-base text-gray-600">
                      Achieving long-term success through impactful, evidence-based strategies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      <div className="flex flex-col items-center relative pt-20 pb-20 max-md:pt-5 max-md:pb-5 gap-6 px-[10%] max-lg:px-6 max-md:gap-10 overflow-hidden bg-[#f2f4fa]">
        <Fade>
          <Header
            title={"Our Trainings"}
            icon={<RectangleGroupIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />}
          />
        </Fade>

        {isFetchingTrainings ? (
          <SkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {training.map((article) => (
              <div key={article._id} className="flex flex-col gap-4">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{article.title}</h3>
                <Link
                  href={`/trainings/${article._id}`}
                  className="flex items-center gap-2 text-gray-900 hover:gap-3 transition-all group"
                >
                  Read more
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <WhyTrain />
      <Footer />
    </main>
  )
}