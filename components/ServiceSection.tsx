"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { fetchServices, fetchCases } from "@/sanity/queries/services"
import RichContent, { type Content } from "./RichContent"

interface Service {
  _id: string
  title: string
  excerpt: Content[]
  image: string
}

interface Case {
  _id: string
  title: string
  excerpt: Content[]
  image: string
  service?: {
    _id: string
    title: string
  }
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [cases, setCases] = useState<Case[]>([])
  const [activeSection, setActiveSection] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  const loadServicesAndCases = useCallback(async () => {
    try {
      const fetchedServices = await fetchServices()
      setServices(fetchedServices)

      if (fetchedServices.length > 0) {
        setActiveSection(fetchedServices[0].title)

        const allCases = await Promise.all(fetchedServices.map((service) => fetchCases(service._id)))
        // Flatten the array of case arrays and keep the original service reference
        setCases(allCases.flat())
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch services and cases"
      setError(errorMessage)
      console.error("Error fetching services and cases:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadServicesAndCases()
  }, [loadServicesAndCases])

  const activeService = useMemo(
    () =>
      services.find((service) => service.title === activeSection) || {
        title: "",
        excerpt: [],
        image: "",
        _id: "",
      },
    [services, activeSection],
  )

  const activeCases = useMemo(
    () => cases.filter((caseItem) => caseItem.service?._id === activeService._id),
    [cases, activeService._id],
  )

  const handleSectionChange = useCallback((title: string) => {
    setActiveSection(title)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

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
              <div className="text-gray-700 text-md leading-relaxed">
                <RichContent content={activeService.excerpt} />
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-xl font-bold mb-4">Check Out Our {activeService.title} Works</h3>
              {activeCases.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCases.map((caseItem) => (
                    <Link href={`/cases/${caseItem._id}`} key={caseItem._id}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <Image
                          src={caseItem.image || "/placeholder.svg"}
                          alt={caseItem.title}
                          width={300}
                          height={200}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-lg mb-2">{caseItem.title}</h4>
                          <div className="text-sm text-gray-600 line-clamp-2">
                            <RichContent content={caseItem.excerpt} />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No works available for this service yet.</p>
              )}
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

