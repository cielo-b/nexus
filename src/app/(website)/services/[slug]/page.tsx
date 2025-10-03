'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { serviceQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { Service } from '@/types/service'
import { Publication } from '@/types/publication'
export const runtime = 'edge';


export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [service, setService] = useState<Service | null>(null)
  const [relatedPublications, setRelatedPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return
      
      try {
        const serviceData = await client.fetch(serviceQueries.getServiceBySlug, { slug })
        setService(serviceData)
        
        if (serviceData) {
          // Fetch related publications for this service
          const publications = await client.fetch(serviceQueries.getServicePublications, {
            publicationIds: serviceData.relatedPublications?.map((pub: any) => pub._ref) || []
          })
          setRelatedPublications(publications)
        }
      } catch (error) {
        console.error('Error fetching service data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
      {/* Hero Section */}
      <section className="relative pt-40 sm:h-[40vh]  flex flex-col items-center justify-end text-white pb-3">
        
        <Image src={getSanityImage(service.coverImage)} alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full opacity-20" />
        <div className="absolute inset-0 bg-black/80 w-full h-full"></div>
        <div className="relative w-full px-[8vw]">
          <div className="">
            <h1 className="text-6xl font-semibold mb-6">{service.title}</h1>
            <p className="max-w-3xl leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>






      {/* Related Publications Section */}
      {relatedPublications.length > 0 && (
        <section className="py-10 ">
          <div className="px-[8vw] space-y-8">
          <div className="mb-8 relative ">
          <h2 className="text-5xl font-semibold  mb-4">How <span className='text-primary' >We </span> Do It</h2>
          <p className="max-w-3xl ">
          Satisfaction is the key to our success. We strive to ensure every customer leaves happy with our quality service priority.
          </p>
        </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPublications.map((publication) => (
                <div key={publication._id} className="">
                  <Link href={`/publications/${publication.slug.current}`} className="block">
                    {publication.coverImage && (
                      <div className="relative h-64 w-full">
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
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
