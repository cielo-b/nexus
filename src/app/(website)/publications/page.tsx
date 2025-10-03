'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import { groq } from 'next-sanity'
import { getSanityImage } from '@/lib/getSanityImage'
import { publicationQueries } from '@/lib/sanity/queries'
import { Publication } from '@/types/publication'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import TagCard from '@/components/TagCard'

const categories = ['All', 'Economics', 'Agriculture', 'Technology', 'Politics', 'Health', 'Environment', 'Sports']

interface SearchFilters {
  category: string
  searchQuery: string
}

// Skeleton loading components
const PublicationSkeleton = () => (
  <div className="overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-3">
      <div className="h-3 bg-gray-300  mb-1"></div>
      <div className="h-3 bg-gray-300  w-16 mb-2"></div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 "></div>
          <div className="h-3 bg-gray-300  w-12"></div>
        </div>
        <div className="bg-gray-300 px-3 py-1  w-12"></div>
      </div>
    </div>
  </div>
)

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
    {Array.from({ length: 10 }).map((_, index) => (
      <PublicationSkeleton key={index} />
    ))}
  </div>
)

function PublicationsContent() {
  const searchParams = useSearchParams()
  const [publications, setPublications] = useState<Publication[]>([])
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
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

  // Handle author query parameter from URL
  useEffect(() => {
    if (!searchParams) return
    
    const authorParam = searchParams.get('author')
    if (authorParam) {
      setSearchQuery(authorParam)
    }
  }, [searchParams])

  useEffect(() => {
    let filtered = publications

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(publication =>
        publication.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filter by search query (title, excerpt, content, author names, and tags)
    if (searchQuery.trim()) {
      filtered = filtered.filter(publication =>
        publication.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        publication.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (publication.authors && publication.authors.some(author =>
          author.name.toLowerCase().includes(searchQuery.toLowerCase())
        )) ||
        (publication.tags && publication.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      )
    }

    setFilteredPublications(filtered)
  }, [selectedCategory, searchQuery, publications])

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative pt-[200px] xl:h-[60vh]  flex flex-col items-center justify-end pb-4 text-white ">
        <div className="absolute inset-0 bg-black/80  w-full h-full"></div>
        <Image src="/images/hero.png" alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full opacity-20" />

        <div className="relative w-full px-[8vw]">
          <div className="">
            <h1 className="text-6xl font-semibold mb-6">Publications</h1>
            
            {/* Search Input */}
            <div className="max-w-2xl mb-6">
              <div className="relative">
                <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search publications by title, content, or author name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-white/30 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent focus:outline-none"
                />
              </div>
            </div>
            
            <p className="max-w-3xl  leading-relaxed">
              We provide data-driven insights and expert consultancy services to drive meaningful and sustainable transformation across various sectors. Our work spans education, agriculture, public health, and beyond, helping organizations achieve impactful
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className='px-[8vw] py-[4vh] space-y-[3vh]'>
        {/* Category Filter */}
        <div >
          <div className="flex flex-wrap justify-start items-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4  font-medium transition-all  text-sm text-[#565656] duration-300 ${selectedCategory === category
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
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-50 to-indigo-100  flex items-center justify-center shadow-lg">
                <Icon icon="mdi:file-document-outline" className="w-16 h-16 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {searchQuery 
                  ? 'No Publications Found' 
                  : selectedCategory === 'All' 
                    ? 'No Publications Available' 
                    : `No ${selectedCategory} Publications`
                }
              </h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed mb-8">
                {searchQuery
                  ? 'No publications match your search criteria. Try adjusting your search terms or filters.'
                  : selectedCategory === 'All'
                    ? 'We\'re working on adding new publications. Check back soon for insightful content!'
                    : `We don't have any publications in the ${selectedCategory} category yet. Try selecting a different category.`
                }
              </p>
              {(selectedCategory !== 'All' || searchQuery) && (
                <div className="flex flex-wrap gap-4 justify-center">
                  {selectedCategory !== 'All' && (
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className="bg-primary text-white px-8 py-4  font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      View All Publications
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="bg-gray-500 text-white px-8 py-4  font-semibold hover:bg-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
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
                    className="overflow-hidden bg-white cursor-pointer hover:bg-gray-50 transition-colors duration-300 flex flex-col h-full"
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
                    <div className="p-3 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className="text-xs font-semibold line-clamp-2 mb-1">
                          {publication.title}
                        </h3>
                        <span className="text-[#98989A] capitalize text-xs mb-2 block">
                          {publication.category}
                        </span>
                        
                        {/* Tags */}
                        {publication.tags && publication.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {publication.tags.slice(0, 3).map((tag, index) => (
                              <TagCard
                                key={index}
                                tag={tag}
                                variant="default"
                                size="sm"
                                className="text-xs"
                              />
                            ))}
                            {publication.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{publication.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        className="w-full bg-white text-black border-2 border-black px-4 py-2 flex items-center gap-1 justify-center text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 mt-auto"
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
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function PublicationsPage() {
  return (
    <Suspense fallback={<SkeletonGrid />}>
      <PublicationsContent />
    </Suspense>
  )
}
