"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import { RectangleGroupIcon } from "@heroicons/react/20/solid"
import { Fade } from "react-awesome-reveal"
import { fetchWhyUs } from "@/sanity/queries/others"
import type { Content } from "./RichContent"
import RichContent from "./RichContent"
import { Lightbulb, ShieldCheck, Users, BarChart, Globe, BookOpen, HeartHandshake, Target } from "lucide-react"

const WhyUs = () => {
  const [whyUsData, setWhyUsData] = useState<{ title: string; answer: Content[] }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWhyUsData = async () => {
      try {
        const fetchedData = await fetchWhyUs()
        setWhyUsData(fetchedData)
      } catch (error) {
        console.error("Error fetching Why Us data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadWhyUsData()
  }, [])

  // Map feature titles to Lucide icons
  const featureIcons = {
    "Innovation": <Lightbulb className="w-10 h-10 text-blue-500" />,
    "Reliability": <ShieldCheck className="w-10 h-10 text-blue-500" />,
    "Expert Team": <Users className="w-10 h-10 text-blue-500" />,
    "Data-Driven": <BarChart className="w-10 h-10 text-blue-500" />,
    "Global Reach": <Globe className="w-10 h-10 text-blue-500" />,
    "Education Focus": <BookOpen className="w-10 h-10 text-blue-500" />,
    "Community Impact": <HeartHandshake className="w-10 h-10 text-blue-500" />,
    "Goal-Oriented": <Target className="w-10 h-10 text-blue-500" />,
  }

  return (
    <div
      className="flex flex-col items-center relative pt-20 pb-20 max-md:pt-10 max-md:pb-10 gap-6 px-[10%] max-lg:px-6 max-md:gap-8 overflow-hidden bg-[#f2f4fa]"
      id="whyus"
    >
      <div className="w-full flex flex-col items-center justify-center gap-10 z-40">
        <Fade>
          <Header
            title="Our Strength ?"
            icon={<RectangleGroupIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />}
          />
          <h1 className="text-[#000912] font-bold text-5xl text-center max-md:text-4xl max-sm:text-3xl">
            Why <span className="text-[#2563eb]">Choose</span> Us
          </h1>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse space-y-4 p-6 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-emerald-200 rounded-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              ))
            : whyUsData.map((feature, index) => {
                // Normalize the title by trimming whitespace and converting to a consistent case
                const normalizedTitle = feature.title.trim()
                console.log("Feature Title:", normalizedTitle) // Debugging: Log the title

                return (
                  <div key={index} className="flex flex-col space-y-4 p-6 bg-[#f2f4fa] rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    {featureIcons[normalizedTitle as keyof typeof featureIcons] || <Lightbulb className="w-10 h-10 text-blue-500" />}
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <div className="text-md text-gray-600 leading-relaxed">
                      <RichContent content={feature.answer} />
                    </div>
                  </div>
                )
              })}
        </div>
      </div>
    </div>
  )
}

export default WhyUs