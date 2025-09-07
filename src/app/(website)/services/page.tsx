'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { client } from '@/lib/sanity/client'
import { serviceQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { Service } from '@/types/service'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedService, setExpandedService] = useState<string | null>(null)

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

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
  }



  

  const ServiceAccordionSkeleton = () => (
    <section className="py-20 bg-gray-50">
      <div className="px-[8vw]">
        <div className="max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border-b border-gray-200 last:border-b-0">
              <div className="w-full py-6 px-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-15 h-15 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section Skeleton */}
        <section className="relative h-[80vh] flex flex-col items-center justify-center text-white">
          <div className="absolute inset-0 bg-primary w-full h-full"></div>
          <div className="relative px-[8vw]">
            <div className="text-center">
              <div className="h-20 bg-white/20 rounded-lg mb-6 animate-pulse"></div>
              <div className="space-y-3 max-w-3xl mx-auto">
                <div className="h-6 bg-white/20 rounded animate-pulse"></div>
                <div className="h-6 bg-white/20 rounded animate-pulse"></div>
                <div className="h-6 bg-white/20 rounded w-2/3 mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>
        <ServiceAccordionSkeleton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-white ">
        <div className="absolute inset-0 bg-primary  w-full h-full"></div>
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


      {/* Other Services Section - Accordion Style */}
      <section className="py-20 bg-gray-50">
        <div className="px-[8vw]">
          {services.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              {services.map((service, index) => (
                <div key={service._id} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleService(service._id)}
                    className="w-full py-6 px-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {service.coverImage ? (
                          <Image
                            src={getSanityImage(service.coverImage)}
                            alt={service.coverImage.alt || service.title}
                            width={60}
                            height={60}
                            className="w-15 h-15 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-15 h-15 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <Icon 
                      icon={expandedService === service._id ? "mdi:minus" : "mdi:plus"} 
                      className="w-6 h-6 text-gray-500" 
                    />
                  </button>
                  
                  {expandedService === service._id && (
                    <div className="px-4 pb-6">
                      <div className="pl-20">
                        <p className="text-gray-600 mb-4">
                          {service.shortDescription}
                        </p>
                        <Link
                          href={`/services/${service.slug.current}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Learn More
                          <Icon icon="mdi:arrow-right" className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon icon="mdi:briefcase-outline" className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services available</h3>
              <p className="text-gray-500">Services will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
