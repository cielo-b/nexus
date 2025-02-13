"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { fetchServices } from "@/sanity/queries/services"
import RichContent from "./RichContent"



export default function ServicesSection() {
  const [services, setServices] = useState<any[]>([])
  const [activeSection, setActiveSection] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  // Memoize the data fetching function
  const loadServices = useCallback(async () => {
    try {
      const fetchedServices = await fetchServices()
      setServices(fetchedServices)
      // Set initial active section if none is set
      if (!activeSection && fetchedServices.length > 0) {
        setActiveSection(fetchedServices[0].title)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch services"
      setError(errorMessage)
      console.error("Error fetching services:", error)
    } finally {
      setLoading(false)
    }
  }, [activeSection])

  useEffect(() => {
    loadServices()
  }, [loadServices])

  // Memoize the active section data
  const activeService = useMemo(() => 
    services.find(service => service.title === activeSection) || {
      title: "",
      excerpt: "",
      image: "",
      _id: ""
    }
  , [services, activeSection])

  // Handle section change
  const handleSectionChange = useCallback((title: string) => {
    setActiveSection(title)
  }, [])

  if (loading) {
    // make this better when loading
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    // make this better when error
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

  console.log(activeService);

  return (
    <div className="flex flex-col lg:flex-row gap-9 p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      {/* Navigation Links */}
      <nav className="lg:w-1/4 space-y-2 order-1 lg:order-1">
        {services.map((service) => (
          <button
            key={service._id}
            onClick={() => handleSectionChange(service.title)}
            className={`text-left w-full px-4 py-2 rounded-lg transition-colors ${
              activeSection === service.title 
                ? "text-blue-600 font-semibold bg-blue-50" 
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            {service.title}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <div className="lg:w-2/5 order-2 lg:order-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="relative">
                <h2 className="text-3xl font-bold">{activeService.title}</h2>
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-blue-600"></div>
              </div>
              <p className="text-gray-700 text-md leading-relaxed"><RichContent content={activeService.excerpt}/></p>
            </div>

            <div className="pt-8">
              <h3 className="text-xl font-bold mb-4">
                Check Out Our {activeService.title} Works
              </h3>
              <p className="text-gray-600">No Works Yet!!</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Area */}
      <div className="lg:w-1/3 order-3 lg:order-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src={activeService.image || "/placeholder.svg"}
              alt={activeService.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}