'use client'

import { useState, useEffect } from 'react'
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="px-4 sm:px-6 lg:px-[8vw]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={getSanityImage(expertise.coverImage)}
                alt={expertise.coverImage.alt || expertise.title}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {expertise.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {expertise.description}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="px-4 sm:px-6 lg:px-[8vw]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Related Services
              </h2>
              <p className="text-lg text-gray-600">
                Explore our services in {expertise.title.toLowerCase()}
              </p>
            </div>

            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <Link
                    key={service._id}
                    href={`/services/${service.slug.current}`}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <Image
                        src={getSanityImage(service.coverImage)}
                        alt={service.title}
                        width={400}
                        height={225}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {service.servicesType}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {service.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon icon="lucide:briefcase" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Services Yet</h3>
                <p className="text-gray-500">Services in this expertise area will appear here once they are added.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-[8vw]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Related Publications
              </h2>
              <p className="text-lg text-gray-600">
                Research and insights in {expertise.title.toLowerCase()}
              </p>
            </div>

            {publications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publications.map((publication) => (
                  <Link
                    key={publication._id}
                    href={`/publications/${publication.slug.current}`}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <Image
                        src={getSanityImage(publication.coverImage)}
                        alt={publication.title}
                        width={400}
                        height={225}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {publication.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(publication.publicationDate).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {publication.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {publication.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <Icon icon="lucide:user" className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{publication.author.name}</p>
                            <p className="text-xs text-gray-500">{publication.author.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Icon icon="lucide:heart" className="w-4 h-4 mr-1" />
                            {publication.likes}
                          </span>
                          <span className="flex items-center">
                            <Icon icon="lucide:eye" className="w-4 h-4 mr-1" />
                            {publication.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon icon="lucide:file-text" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Publications Yet</h3>
                <p className="text-gray-500">Publications in this expertise area will appear here once they are added.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="px-4 sm:px-6 lg:px-[8vw]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's discuss how our expertise in {expertise.title.toLowerCase()} can help your organization achieve its goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Icon icon="lucide:mail" className="w-5 h-5 mr-2" />
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                <Icon icon="lucide:briefcase" className="w-5 h-5 mr-2" />
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
