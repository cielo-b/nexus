'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity/client'
import { serviceQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { Service } from '@/types/service'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [featuredService, setFeaturedService] = useState<Service | null>(null)
  const [otherServices, setOtherServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesData = await client.fetch(serviceQueries.getAllServices)
        setServices(servicesData)
        
        // Find the featured service (first one or one marked as featured)
        const featured = servicesData.find(service => service.featured) || servicesData[0]
        setFeaturedService(featured)
        
        // Get other services (excluding the featured one)
        const others = servicesData.filter(service => service._id !== featured?._id)
        setOtherServices(others)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderIcon = (service: Service) => {
    if (service.iconType === 'emoji' && service.icon) {
      return (
        <div className="w-8 h-8 flex items-center justify-center text-lg">
          {service.icon}
        </div>
      )
    }

    // For heroicons or custom SVG, you can expand this later
    return (
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <span className="text-blue-600 text-sm font-semibold">
          {service.title.charAt(0)}
        </span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading services...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-[8vw]">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">What We Do</h1>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed">
              We provide data-driven insights and expert consultancy services to drive meaningful 
              and sustainable transformation across various sectors. Our work spans education, 
              agriculture, public health, and beyond, helping organizations achieve impactful 
              outcomes through evidence-based solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Service Section */}
      {featuredService && (
        <section className="py-20 bg-white">
          <div className="px-[8vw]">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                {featuredService.heroImage ? (
                  <Image
                    src={getSanityImage(featuredService.heroImage)}
                    alt={featuredService.heroImage.alt || featuredService.title}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-gray-500 text-lg">Service Image</span>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {featuredService.title}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                  <PortableText value={featuredService.description} />
                </div>
                <Link
                  href={`/services/${featuredService.slug.current}`}
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Read More
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-[8vw]">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Services</h2>
          
          {otherServices.length > 0 ? (
            <div className="space-y-4">
              {otherServices.map((service) => (
                <div key={service._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <Link href={`/services/${service.slug.current}`} className="block p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {service.cardImage ? (
                            <Image
                              src={getSanityImage(service.cardImage)}
                              alt={service.cardImage.alt || service.title}
                              width={80}
                              height={80}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                              {renderIcon(service)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {service.title}
                          </h3>
                          <p className="text-gray-600">
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 font-semibold">Learn More</span>
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services available</h3>
              <p className="text-gray-500">Services will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let us help you achieve your goals with our comprehensive suite of services.
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  )
}
