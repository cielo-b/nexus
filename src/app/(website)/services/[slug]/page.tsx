'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity/client'
import { serviceQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { Service, ServiceDetail } from '@/types/service'
import { Publication } from '@/types/publication'

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [service, setService] = useState<Service | null>(null)
  const [serviceDetails, setServiceDetails] = useState<ServiceDetail[]>([])
  const [relatedPublications, setRelatedPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceData, detailsData] = await Promise.all([
          client.fetch(serviceQueries.getServiceBySlug, { slug }),
          client.fetch(serviceQueries.getServiceDetails, { serviceId: service?._id })
        ])

        setService(serviceData)
        
        if (serviceData) {
          // Fetch service details
          const details = await client.fetch(serviceQueries.getServiceDetails, { 
            serviceId: serviceData._id 
          })
          setServiceDetails(details)

          // Fetch related publications for this service
          const publications = await client.fetch(serviceQueries.getPublicationsByService, {
            serviceId: serviceData._id
          })
          setRelatedPublications(publications)
        }
      } catch (error) {
        console.error('Error fetching service data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchData()
    }
  }, [slug, service?._id])

  const renderHighlightedTitle = (title: string, highlightedText?: string) => {
    if (!highlightedText) return title
    
    const parts = title.split(highlightedText)
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <span className="text-blue-600">{highlightedText}</span>
          {parts[1]}
        </>
      )
    }
    return title
  }

  const renderIcon = (icon?: string, iconType?: string) => {
    if (iconType === 'emoji' && icon) {
      return (
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          {icon}
        </div>
      )
    }

    return (
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">📊</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading service...</div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link
            href="/services"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4">
        <div className="px-[8vw]">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/services" className="text-gray-500 hover:text-gray-700">Services</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        {service.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={getSanityImage(service.heroImage)}
              alt={service.heroImage.alt || service.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="relative px-[8vw]">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">{service.title}</h1>
            <div className="prose prose-lg max-w-none text-blue-100">
              <PortableText value={service.description} />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Sections */}
      {serviceDetails.map((detail) => (
        <section key={detail._id} className="py-20 bg-white">
          <div className="px-[8vw]">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {renderHighlightedTitle(detail.title, detail.highlightedText)}
              </h2>
              {detail.quote && (
                <blockquote className="text-xl text-gray-600 italic max-w-3xl mx-auto">
                  "{detail.quote}"
                </blockquote>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <PortableText value={detail.content} />
                </div>
              </div>
              
              {detail.image && (
                <div className="relative">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <Image
                      src={getSanityImage(detail.image)}
                      alt={detail.image.alt || detail.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    {detail.imageTitle && (
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {detail.imageTitle}
                      </h3>
                    )}
                    {detail.imageSubtitle && (
                      <p className="text-gray-600 text-sm">
                        {detail.imageSubtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Related Publications Section */}
      {relatedPublications.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="px-[8vw]">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Related Publications</h2>
              <p className="text-xl text-gray-600">
                Explore our research and insights related to {service.title}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPublications.map((publication) => (
                <div key={publication._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <Link href={`/publications/${publication.slug.current}`} className="block">
                    {publication.coverImage && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={getSanityImage(publication.coverImage)}
                          alt={publication.coverImage.alt || publication.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {publication.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {publication.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{publication.author.name}</span>
                        <span>
                          {new Date(publication.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let us help you with {service.title} and achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
