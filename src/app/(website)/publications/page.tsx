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
  <div className="overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-3">
      <div className="h-3 bg-gray-300 rounded mb-1"></div>
      <div className="h-3 bg-gray-300 rounded w-16 mb-2"></div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="h-3 bg-gray-300 rounded w-12"></div>
        </div>
        <div className="bg-gray-300 px-3 py-1 rounded-lg w-12"></div>
      </div>
    </div>
  </div>
)

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {Array.from({ length: 10 }).map((_, index) => (
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
      <section className="relative h-[40vh] flex flex-col items-center justify-center text-white ">
        <div className="absolute inset-0 bg-black/80  w-full h-full"></div>
        <Image src="/images/hero.png" alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full opacity-20" />

        <div className="relative w-full px-[8vw]">
          <div className="">
            <h1 className="text-6xl font-semibold mb-6">Publications</h1>
            <p className="max-w-3xl  leading-relaxed">
              We provide data-driven insights and expert consultancy services to drive meaningful and sustainable transformation across various sectors. Our work spans education, agriculture, public health, and beyond, helping organizations achieve impactful
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className='px-[8vw] py-[4vh] space-y-[3vh]'>
        <div >
          <div className="flex flex-wrap justify-start items-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded font-medium transition-all  text-sm text-[#565656] duration-300 ${selectedCategory === category
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
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center shadow-lg">
                <Icon icon="mdi:file-document-outline" className="w-16 h-16 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedCategory === 'All' ? 'No Publications Available' : `No ${selectedCategory} Publications`}
              </h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed mb-8">
                {selectedCategory === 'All'
                  ? 'We\'re working on adding new publications. Check back soon for insightful content!'
                  : `We don't have any publications in the ${selectedCategory} category yet. Try selecting a different category.`
                }
              </p>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  View All Publications
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                    className="overflow-hidden bg-white cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                  >
                    {/* Image Section */}
                    {publication.coverImage && (
                      <div className="overflow-hidden">
                        <Image
                          src={getSanityImage(publication.coverImage)}
                          alt={publication.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-3">
                      <h3 className="text-xs font-semibold line-clamp-2 mb-1">
                        {publication.title}
                      </h3>
                      <span className="text-[#98989A] capitalize text-xs mb-2 block">
                        {publication.category}
                      </span>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {publication.author?.image ? (
                            <div className="w-5 h-5 rounded-full overflow-hidden">
                              <Image
                                src={getSanityImage(publication.author.image)}
                                alt={publication.author.image.alt || publication.author.name}
                                width={20}
                                height={20}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-xs">
                                {publication.author?.name?.charAt(0).toUpperCase() || 'A'}
                              </span>
                            </div>
                          )}
                          <span className="text-xs text-gray-600 truncate">
                            {publication.author?.name || 'Anonymous'}
                          </span>
                        </div>
                        <button
                          className="bg-white text-black border-2 border-black px-4 py-2 flex items-center gap-1 justify-center text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handlePublicationClick(e)
                          }}
                        >
                          Read More
                          <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                        </button>
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
