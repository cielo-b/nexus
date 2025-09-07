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
    setActiveServiceIndex(index)
  }

  const handleServiceHover = (index: number) => {
    setIsAutoRotating(false)
    setActiveServiceIndex(index)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0 bg-primary w-full h-full"></div>
        <Image src="/images/hero.png" alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full opacity-20" />

        <div className="relative px-[8vw]">
          <div className="text-center">
            <h1 className="text-7xl font-semibold mb-6">What We Do</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              We provide data-driven insights and expert consultancy services to drive meaningful and sustainable transformation across various sectors. Our work spans education, agriculture, public health, and beyond, helping organizations achieve impactful
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - Matching Image Design */}
      <section className="py-20">
        <div className="px-[8vw]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold  mb-12 text-center">Our Services</h2>
            
            {loading ? (
              <div className="space-y-6">
                {/* Active Service Skeleton */}
                <div className="bg-gray-800 rounded-2xl p-8 mb-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="w-full h-64 bg-gray-700 rounded-xl animate-pulse"></div>
                    <div className="space-y-4">
                      <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                      <div className="h-12 w-32 bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                {/* Service List Skeleton */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-800 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-700 rounded-lg animate-pulse"></div>
                      <div className="h-6 w-48 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="w-6 h-6 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : services.length > 0 ? (
              <div className="space-y-6">
                {/* Active Service Display */}
                <AnimatePresence mode="wait">
                  {services[activeServiceIndex] && (
                    <motion.div
                      key={activeServiceIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="bg-gray-800 rounded-2xl p-8 mb-8"
                    >
                      <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="relative">
                          {services[activeServiceIndex].coverImage ? (
                            <Image
                              src={getSanityImage(services[activeServiceIndex].coverImage)}
                              alt={services[activeServiceIndex].coverImage.alt || services[activeServiceIndex].title}
                              width={600}
                              height={400}
                              className="w-full h-64 object-cover rounded-xl"
                            />
                          ) : (
                            <div className="w-full h-64 bg-gray-700 rounded-xl flex items-center justify-center">
                              <span className="text-gray-400 text-lg">Service Image</span>
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <motion.h3
                            key={`title-${activeServiceIndex}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-3xl font-bold  mb-4"
                          >
                            {services[activeServiceIndex].title}
                          </motion.h3>
                          <motion.p
                            key={`desc-${activeServiceIndex}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg text-gray-300 mb-6"
                          >
                            {services[activeServiceIndex].shortDescription}
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                          >
                            <Link
                              href={`/services/${services[activeServiceIndex].slug.current}`}
                              className="inline-flex items-center bg-blue-600  px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                              Read More
                              <Icon icon="mdi:arrow-up-right" className="w-5 h-5 ml-2" />
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Service List */}
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={service._id}
                      className={`cursor-pointer transition-all duration-300 rounded-xl p-4 flex items-center justify-between ${
                        index === activeServiceIndex 
                          ? 'bg-gray-700 shadow-lg' 
                          : 'bg-gray-800 hover:bg-gray-750'
                      }`}
                      onClick={() => handleServiceClick(index)}
                      onMouseEnter={() => handleServiceHover(index)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {service.coverImage ? (
                            <Image
                              src={getSanityImage(service.coverImage)}
                              alt={service.coverImage.alt || service.title}
                              width={60}
                              height={60}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-semibold ">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                      <Icon 
                        icon={index === activeServiceIndex ? "mdi:minus" : "mdi:plus"} 
                        className="w-6 h-6 " 
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:briefcase-outline" className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No services available</h3>
                <p className="text-gray-400">Services will appear here once they are added to Sanity CMS.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}