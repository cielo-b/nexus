"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import { RectangleGroupIcon, ChartBarIcon, CodeBracketIcon, CubeIcon } from "@heroicons/react/24/outline"
import { Fade } from "react-awesome-reveal"
import { fetchServices } from "@/sanity/queries/services"
import Link from "next/link"
import RichContent, { Content } from "./RichContent"

const Features = ({ title, type }: { title: any; type: any }) => {
  const [services, setServices] = useState<{ title: string; excerpt: Content[]; image: string; _id: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await fetchServices()
        setServices(fetchedServices)
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const sectors = ["Agriculture", "Public Health", "Socio-economic Research"]

  const software = ["Stata", "R", "Excel", "SPSS", "PowerBi", "Python"]

  const dataSystems = ["ODK", "KoBocollect", "Cspro", "surveyCTO", "DHIS2", "commcare", "QGIS"]

  return (
    <div
      className="flex flex-col relative pt-10 pb-20 max-md:pt-5 max-md:pb-10 gap-16 px-[5%] max-lg:px-4 overflow-hidden"
      id="features"
    >
      <img src="/images/dots.svg" alt="dots" className="absolute -left-7 bottom-4 z-30" />

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10 z-40">
        
    

      <div className="relative w-fit mb-9 mx-auto">
  <Fade>
    <Header
      title={title ? title : "Features"}
      icon={<RectangleGroupIcon className="text-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />}
    />
  </Fade>
</div>

          {!title && (
            <h1 className="text-black font-bold text-5xl text-center max-md:text-4xl max-sm:text-3xl">
              What <span className="text-[#2563eb]">We</span> Offer
            </h1>
          )}
          <p className="text-md max-sm:text-sm text-black/60 font-normal z-10 text-center mx-auto lg:w-2/3 max-sm:w-11/12">
            Insight Nexus LTD provides comprehensive data science, MEL, and research services, specializing in
            conducting studies/surveys, market studies, building MEL systems and indicators, data analysis, machine
            learning, and data visualization to transform raw data into actionable insights.
          </p>
       

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <Fade cascade damping={0.1}>
            <div>
              <div className="flex items-center mb-4">
                <ChartBarIcon className="w-8 h-8 text-[#2563eb] mr-3" />
                <h2 className="text-md font-bold text-gray-800">Our services support various sectors, including: </h2>
              </div>
              <ul className="space-y-2">
                {sectors.map((sector, index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <CubeIcon className="w-4 h-4 mr-2 text-[#2563eb]" />
                    {sector}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <CodeBracketIcon className="w-8 h-8 text-[#2563eb] mr-3" />
                <h2 className="text-md font-bold text-gray-800"> We offer statistical software support, including:</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {software.map((sw, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <RectangleGroupIcon className="w-8 h-8 text-[#2563eb] mr-3" />
                <h2 className="text-md font-bold text-gray-800">Plus Data collection and data management systems,</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {dataSystems.map((system, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {system}
                  </span>
                ))}
              </div>
            </div>
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse w-full relative rounded-xl h-64 bg-gray-300"></div>
              ))
            : services.map((service, index) => (
                <Fade key={index} direction="up" triggerOnce>
                  <div className="w-full relative rounded-xl h-64 shadow-lg overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
                      <p className="text-sm text-white/90 line-clamp-2 mb-2"><RichContent content={service.excerpt}></RichContent></p>
                      <div className="flex items-center justify-end">
                        <Link
                          href={`/services/${service._id}`}
                          className="text-blue-300 transition-colors duration-300 text-sm font-medium"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
        </div>
      </div>
    </div>
  )
}

export default Features

