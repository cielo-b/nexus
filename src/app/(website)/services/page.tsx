'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import { client } from '@/lib/sanity/client'
import { serviceQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { Service } from '@/types/service'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching services...')
        const servicesData = await client.fetch(serviceQueries.getAllServices)
        console.log('Services fetched:', servicesData)
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating || services.length === 0) return

    const interval = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % services.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoRotating, services.length])

  const handleServiceClick = (index: number) => {
    setIsAutoRotating(false)
    // If clicking on the same service that's already active, close it
    if (index === activeServiceIndex) {
      setActiveServiceIndex(-1) // -1 means no service is active
    } else {
      setActiveServiceIndex(index)
    }
  }

  const handleServiceHover = (index: number) => {
    setIsAutoRotating(false)
    setActiveServiceIndex(index)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/80 w-full h-full"></div>
        <Image src="/images/hero.png" alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full opacity-20" />

        <div className="relative w-full max-w-7xl mx-auto">
          <div className="text-left">
            <h1 className="text-6xl font-semibold mb-6">What We Do</h1>
            <p className="text-xl max-w-3xl  leading-relaxed">
              We provide data-driven insights and expert consultancy services to drive meaningful and sustainable transformation across various sectors. Our work spans education, agriculture, public health, and beyond, helping organizations achieve impactful
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - Matching Image Design */}
      <section className="py-10">
        <div >
          <div className="max-w-7xl mx-auto">
            
            {loading ? (
              <div className="space-y-4">
                {/* Service List Skeleton */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border border-gray-200  p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200  animate-pulse"></div>
                      <div className="h-6 w-48 bg-gray-200  animate-pulse"></div>
                    </div>
                    <div className="w-6 h-6 bg-gray-200  animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : services.length > 0 ? (
              <div className="space-y-4">
                {/* Service List with Integrated Active Service */}
                {services.map((service, index) => (
                  <motion.div
                    key={service._id}
                    className={`cursor-pointer transition-all duration-300 border-b border-gray-200  overflow-hidden ${
                      index === activeServiceIndex 
                        ? 'shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleServiceClick(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {/* Service Header */}
                    <div className="p-4 flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-grow">
                        <div className="flex-shrink-0">
                          {service.coverImage ? (
                            <Image
                              src={getSanityImage(service.coverImage)}
                              alt={service.coverImage.alt || service.title}
                              width={256}
                              height={index === activeServiceIndex ? 256 : 80}
                              className={`object-cover  w-64 ${
                                index === activeServiceIndex ? 'h-64' : 'h-10'
                              }`}
                            />
                          ) : (
                            <div className={`bg-gray-200  flex items-center justify-center w-64 ${
                              index === activeServiceIndex ? 'h-64' : 'h-20'
                            }`}>
                              <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="text-left flex-grow">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {service.title}
                          </h3>
                          <AnimatePresence>
                            {index === activeServiceIndex && ( 
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <p className="text-sm text-gray-600 mb-4">
                                  {service.shortDescription}
                                </p>
                                <Link
                                  href={`/services/${service.slug.current}`}
                                  className="inline-flex items-center text-white bg-blue-600 px-6 py-3  font-semibold hover:bg-blue-700 transition-colors"
                                >
                                  Read More
                                  <Icon icon="mdi:arrow-up-right" className="w-5 h-5 ml-2" />
                                </Link>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <Icon 
                        icon="mdi:chevron-down" 
                        className={`w-6 h-6 text-gray-500 transition-transform duration-300 flex-shrink-0 ml-4 ${
                          index === activeServiceIndex ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100  flex items-center justify-center">
                  <Icon icon="mdi:briefcase-outline" className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services available</h3>
                <p className="text-gray-600">Services will appear here once they are added to Sanity CMS.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}