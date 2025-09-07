'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import { getSanityImage } from '@/lib/getSanityImage'
import { publicationQueries } from '@/lib/sanity/queries'
import { Publication } from '@/types/publication'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'

const categories = ['All', 'Economics', 'Agriculture', 'Technology', 'Politics', 'Health', 'Environment', 'Sports']

// Skeleton loading components
const PublicationSkeleton = () => (
  <div className="bg-[#F3F3F3] rounded-lg overflow-hidden flex h-48 animate-pulse">
    <div className="w-48 h-full bg-gray-300"></div>
    <div className="flex-1 p-6 flex flex-col justify-between">
      <div>
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
)

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: 6 }).map((_, index) => (
      <PublicationSkeleton key={index} />
    ))}
  </div>
)

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const publicationsData = await client.fetch(publicationQueries.getAllPublications)
        setPublications(publicationsData)
        setFilteredPublications(publicationsData)
      } catch (error) {
        console.error('Error fetching publications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPublications(publications)
    } else {
      const filtered = publications.filter(publication =>
        publication.category.toLowerCase() === selectedCategory.toLowerCase()
      )
      setFilteredPublications(filtered)
    }
  }, [selectedCategory, publications])

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center text-white ">
        <div className="absolute inset-0 bg-primary  w-full h-full"></div>
        <Image src="/images/hero.png" alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full opacity-20" />

        <div className="relative px-[8vw]">
          <div className="text-center">
            <h1 className="text-7xl font-semibold mb-6">Publications</h1>
            <p className="max-w-3xl mx-auto leading-relaxed">
              We provide data-driven insights and expert consultancy services to drive meaningful and sustainable transformation across various sectors. Our work spans education, agriculture, public health, and beyond, helping organizations achieve impactful
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className='px-[8vw] py-[10vh] space-y-[4vh]'>
        <div >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded-lg font-medium transition-all  text-sm text-[#565656] duration-300 ${selectedCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : ' text-gray-700 border border-[#262626]/30'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Publications Grid */}
        <div >
          {loading ? (
            <SkeletonGrid />
          ) : filteredPublications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon icon="mdi:file-document-outline" className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {selectedCategory === 'All' ? 'No publications yet' : `No publications in ${selectedCategory}`}
              </h3>
              <p className="text-gray-500">
                {selectedCategory === 'All'
                  ? 'Publications will appear here once they are added to Sanity CMS.'
                  : `No publications found in the ${selectedCategory} category.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPublications.map((publication) => {
                const handlePublicationClick = (e: React.MouseEvent) => {
                  e.preventDefault()
                  
                  if (publication.downloadUrl) {
                    // Download the file
                    window.open(publication.downloadUrl, '_blank')
                  } else if (publication.externalUrl) {
                    // Open external URL
                    window.open(publication.externalUrl, '_blank')
                  } else {
                    // Navigate to publication page
                    window.location.href = `/publications/${publication.slug.current}`
                  }
                }

                return (
                  <div
                    key={publication._id}
                    onClick={handlePublicationClick}
                    className="bg-[#F3F3F3] rounded-lg overflow-hidden flex h-60 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  >
                  {/* Image Section - Left Side */}
                  {publication.coverImage && (
                    <div className="w-60 h-full flex-shrink-0">
                      <Image
                        src={getSanityImage(publication.coverImage)}
                        alt={publication.title}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content Section - Right Side */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="text-xl font-bold text-black mb-3 leading-tight">
                        {publication.title}
                      </h3>

                      {/* Description */}
                      <p className="text-black text-sm leading-relaxed mb-4">
                        {publication.excerpt}
                      </p>
                    </div>

                    {/* Author Information */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {publication.author?.image ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={getSanityImage(publication.author.image)}
                              alt={publication.author.image.alt || publication.author.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {publication.author?.name?.charAt(0).toUpperCase() || 'A'}
                            </span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-sm text-black">
                            {publication.author?.name || 'Anonymous'}
                          </h4>
                          {publication.author?.title && (
                            <p className="text-xs text-gray-500">
                              {publication.author.title}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Three dots menu */}
                      <div className="flex items-center">
                        <button
                          className="p-1 hover:bg-gray-200 rounded-full"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            // Add menu functionality here if needed
                          }}
                        >
                          <Icon icon="mdi:dots-vertical" className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
