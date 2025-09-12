'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { client } from '@/lib/sanity/client'
import { expertiseQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { Expertise } from '@/types/expertise'

interface Service {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  servicesType: string
  coverImage: any
}

interface Publication {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  coverImage: any
  publicationDate: string
  author: {
    name: string
    title: string
    image: any
  }
  category: string
  tags: string[]
  downloadUrl?: string
  externalUrl?: string
  featured: boolean
  likes: number
  views: number
}

export default function ExpertisePage() {
  const params = useParams()
  const [expertise, setExpertise] = useState<Expertise | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expertiseData, servicesData, publicationsData] = await Promise.all([
          client.fetch(expertiseQueries.getExpertiseBySlug, { slug: params.slug }),
          client.fetch(expertiseQueries.getServicesByExpertise, { expertiseId: null }), // Will be updated after expertise is fetched
          client.fetch(expertiseQueries.getPublicationsByExpertise, { expertiseId: null }) // Will be updated after expertise is fetched
        ])

        setExpertise(expertiseData)
        
        if (expertiseData) {
          // Fetch services and publications for this specific expertise
          const [servicesForExpertise, publicationsForExpertise] = await Promise.all([
            client.fetch(expertiseQueries.getServicesByExpertise, { expertiseId: expertiseData._id }),
            client.fetch(expertiseQueries.getPublicationsByExpertise, { expertiseId: expertiseData._id })
          ])
          
          setServices(servicesForExpertise)
          setPublications(publicationsForExpertise)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchData()
    }
  }, [params.slug])

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading expertise area...</p>
        </div>
      </div>
    )
  }

  if (!expertise) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Icon icon="lucide:briefcase" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Expertise Not Found</h1>
          <p className="text-gray-600 mb-6">The expertise area you're looking for doesn't exist.</p>
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Icon icon="lucide:arrow-left" className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,20,20,0)_0%,rgba(20,20,20,0.88)_78%,rgba(20,20,20,1)_100%)] w-full h-full"></div>
        <Image 
          src={getSanityImage(expertise.coverImage)} 
          alt="Hero Background" 
          fill 
          className="object-cover absolute inset-0 w-full h-full opacity-20" 
        />
        <div className="relative w-full px-[8vw] h-full flex flex-col justify-between pb-[3vh] pt-[9vh]">
          <div className="flex gap-2 mb-4 w-full text-white">
            <Link href="/expertise" className='text-white/50'>
              Expertise
            </Link>
            {">"}
            <span className=''>
              {expertise.title}
            </span>
          </div>
          <div>
          <h1 className="text-7xl font-semibold mb-6 ">{expertise.title}</h1>
          <p className="text-lg ">
              {expertise.description}
              </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="px-4 sm:px-6 lg:px-[8vw]">
          <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold  mb-4">
                Our <span className="text-blue-500">Solutions</span>
              </h2>
              <p className="text-lg ">
              , we offer tailored training programs designed to empower organizations with the skills and knowledge needed to drive data-driven transformation. 
              </p>
            </div>


            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <Link
                    key={service._id}
                    href={`/services/${service.slug.current}`}
                    className=""
                  >
                    <div className="flex flex-col items-center">
                    <div className="aspect-w-16 aspect-h-9 w-full">
                      <Image
                        src={getSanityImage(service.coverImage)}
                        alt={service.title}
                        width={400}
                        height={225}
                        className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-semibold  mb-3  transition-colors">
                        {service.title}
                      </h3>
                      <p className=" text-sm line-clamp-3">
                        {service.shortDescription}
                      </p>
                    </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon icon="lucide:briefcase" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium  mb-2">No Services Yet</h3>
                <p className="text-sm">Services in this expertise area will appear here once they are added.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-[8vw]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold  mb-4">
                Latest <span className="text-blue-500">Insights</span>
              </h2>
              <p className="text-lg ">
                Research and insights in {expertise.title.toLowerCase()}
              </p>
            </div>

            {publications.length > 0 ? (
              <div className="relative">
                {/* Navigation Buttons */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
                >
                  <Icon icon="lucide:chevron-left" className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                </button>
                
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
                >
                  <Icon icon="lucide:chevron-right" className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                </button>

                {/* Horizontal Slider */}
                <div 
                  ref={sliderRef}
                  className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {publications.map((publication) => (
                    <Link
                      key={publication._id}
                      href={`/publications/${publication.slug.current}`}
                      className="flex flex-col items-center w-80"
                    >
                      <div className="aspect-w-16 aspect-h-9">
                        <Image
                          src={getSanityImage(publication.coverImage)}
                          alt={publication.title}
                          width={320}
                          height={180}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-bold mb-2  transition-colors line-clamp-2">
                          {publication.title}
                        </h3>
                        <p className=" text-sm line-clamp-3 leading-relaxed">
                          {publication.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon icon="lucide:file-text" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No Publications Yet</h3>
                <p className="text-gray-400">Publications in this expertise area will appear here once they are added.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
