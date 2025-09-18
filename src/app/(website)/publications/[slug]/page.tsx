'use client'

import { useState, useEffect, use } from 'react'
import { client } from '@/lib/sanity'
import { Publication } from '@/types/publication'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getSanityImage } from '@/lib/getSanityImage'
import { Icon } from '@iconify/react'

// Skeleton component for similar publications
const SimilarPublicationSkeleton = () => (
  <div className="bg-[#F3F3F3] rounded-lg overflow-hidden flex h-60 animate-pulse">
    <div className="w-60 h-full bg-gray-300"></div>
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

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPublication(slug: string): Promise<Publication | null> {
  const query = `*[_type == "publication" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    tableOfContents,
    coverImage,
    publicationDate,
    author {
      name,
      title,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    category,
    tags,
    downloadUrl,
    externalUrl,
    featured,
    likes,
    views
  }`

  return await client.fetch(query, { slug })
}

async function getSimilarPublications(category: string, excludeId: string): Promise<Publication[]> {
  const query = `*[_type == "publication" && category == $category && _id != $excludeId] | order(publicationDate desc) [0...6] {
    _id,
    title,
    slug,
    excerpt,
    coverImage {
      asset->{
        _id,
        url
      },
      alt
    },
    publicationDate,
    author {
      name,
      title,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    category,
    tags,
    downloadUrl,
    externalUrl,
    featured,
    likes,
    views
  }`

  return await client.fetch(query, { category, excludeId })
}

export default function PublicationPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const [publication, setPublication] = useState<Publication | null>(null)
  const [similarPublications, setSimilarPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [similarLoading, setSimilarLoading] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const data = await getPublication(resolvedParams.slug)
        if (!data) {
          notFound()
        }
        setPublication(data)
      } catch (error) {
        console.error('Error fetching publication:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    if (resolvedParams.slug) {
      fetchPublication()
    }
  }, [resolvedParams.slug])

  // Fetch similar publications when publication is loaded
  useEffect(() => {
    const fetchSimilarPublications = async () => {
      if (!publication) return

      setSimilarLoading(true)
      try {
        const similar = await getSimilarPublications(publication.category, publication._id)
        setSimilarPublications(similar)
      } catch (error) {
        console.error('Error fetching similar publications:', error)
      } finally {
        setSimilarLoading(false)
      }
    }

    fetchSimilarPublications()
  }, [publication])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  // Set up intersection observer for active section tracking
  useEffect(() => {
    if (!publication?.tableOfContents) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    publication.tableOfContents.forEach((section) => {
      const element = document.getElementById(section.id.current)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [publication?.tableOfContents])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!publication) {
    notFound()
  }

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center text-white bg-transparent ">

        <Image src={getSanityImage(publication.coverImage)} alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full " />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,20,20,0)_0%,rgba(20,20,20,0.88)_78%,rgba(20,20,20,1)_100%)]   w-full h-full"></div>
        {/* <div className="absolute inset-0 bg-black/20 w-full h-full"></div> */}
        <div className="relative w-full px-[8vw] h-full flex flex-col justify-between  pb-[3vh] pt-[9vh]">
          <div className="flex gap-2 mb-4 w-full text-white">
            <Link href="/publications" className='text-white/50   '>
              Publications
            </Link>
            {">"}
            <span className=''>
              {publication.title}
            </span>
          </div>
          <h1 className="text-7xl font-semibold mb-6 text-center">{publication.title}</h1>
        </div>
      </section>


      {/* Main Content */}
      <div className=" ">
        <div className="grid lg:grid-cols-3 ">
          {/* Publication Content */}
          <div className="lg:col-span-2 border-r border-r-[#262626]/11">
            <div className="bg-white rounded-lg ">
              {publication.tableOfContents && publication.tableOfContents.length > 0 ? (
                <div className="space-y-12">
                  {publication.tableOfContents.map((section, index) => (
                    <div
                      key={section.id.current}
                      id={section.id.current}
                      className="scroll-mt-24 border-b border-b-[#262626]/11 pl-[8vw] pr-[3vw] py-[4vh]"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 mb-6  pb-2">
                        {section.title}
                      </h2>
                      {section.content && (
                        <div className="prose prose-lg max-w-none">
                          <PortableText
                            value={section.content}
                            components={{
                              block: {
                                h1: ({ children }) => (
                                  <h1 className="text-3xl font-bold text-gray-900 mb-6">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                  <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">{children}</h3>
                                ),
                                normal: ({ children }) => (
                                  <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
                                ),
                              },
                              marks: {
                                strong: ({ children }) => (
                                  <strong className="font-semibold">{children}</strong>
                                ),
                                em: ({ children }) => (
                                  <em className="italic">{children}</em>
                                ),
                              },
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:file-document-outline" className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Content coming soon</h3>
                  <p className="text-gray-500">The full content for this publication will be available soon.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Views Metadata */}
              <div className="flex items-center gap-4 mb-4 border-b border-b-[#262626]/11 pr-[8vw] pl-[3vw] py-[4vh]">
                <div className="flex items-center gap-1 bg-[#E6E6E6] px-3 py-2 rounded-full border border-[#AAAAAA] text-sm">
                  <Icon icon="mdi:heart-outline" className="w-4 h-4 text-[#474747]" />
                  <span>{publication.likes || 0}</span>
                </div>
                <div className="flex items-center gap-1 bg-[#E6E6E6] px-3 py-2 rounded-full border border-[#AAAAAA] text-sm">
                  <Icon icon="mdi:eye-outline" className="w-4 h-4 text-[#474747]" />
                  <span>{publication.views || 0}</span>
                </div>
              </div>
              {/* Publication Metadata */}
              <div className=" mb-8 pr-[8vw] pl-[3vw] py-[4vh] space-y-4 ">
                <h3 className="font-bold text-gray-900 mb-4">Publication Details</h3>
                <div className="space-y-3 text-sm">

                  <div>
                    <span className="font-medium text-gray-600">Publication Date:</span>
                    <div className="text-gray-900">
                      {new Date(publication.publicationDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Category:</span>
                    <div className="text-gray-900">
                      {publication.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Author:</span>
                    <div className="text-gray-900">
                      {publication.author?.name}
                    </div>
                  </div>
                </div>
                {publication.tableOfContents && publication.tableOfContents.length > 0 && (
                <div >
                  <h3 className="font-bold text-gray-900 mb-4">Table of Contents</h3>
                  <ul className="space-y-2 text-sm bg-[#E8E8E8] rounded-lg p-6">
                    {publication.tableOfContents.map((section) => (
                      <li key={section.id.current}>
                        <button
                          onClick={() => scrollToSection(section.id.current)}
                          className={`text-left w-full py-1 px-2 rounded transition-colors ${activeSection === section.id.current
                            ? 'text-primary bg-blue-50  font-medium'
                            : 'text-gray-600 hover:text-primary hover:'
                            }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </div>

              {/* Table of Contents */}

            </div>
          </div>
        </div>

        {/* Tags */}
        {publication.tags && publication.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {publication.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          {publication.downloadUrl && (
            <a
              href={publication.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Icon icon="mdi:download" className="w-5 h-5 mr-2" />
              Download PDF
            </a>
          )}

          {publication.externalUrl && (
            <a
              href={publication.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Icon icon="mdi:open-in-new" className="w-5 h-5 mr-2" />
              View External
            </a>
          )}
        </div>

        {/* Similar Publications Section */}
        <div className="mt-16 px-[8vw]">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Publications</h2>

          {similarLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <SimilarPublicationSkeleton key={index} />
              ))}
            </div>
          ) : similarPublications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarPublications.map((similarPub) => {
                const handleSimilarClick = (e: React.MouseEvent) => {
                  e.preventDefault()

                  if (similarPub.downloadUrl) {
                    window.open(similarPub.downloadUrl, '_blank')
                  } else if (similarPub.externalUrl) {
                    window.open(similarPub.externalUrl, '_blank')
                  } else {
                    window.location.href = `/publications/${similarPub.slug.current}`
                  }
                }

                return (
                  <div
                    key={similarPub._id}
                    onClick={handleSimilarClick}
                    className="bg-[#F3F3F3] rounded-lg overflow-hidden flex h-60 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  >
                    {/* Image Section - Left Side */}
                    {similarPub.coverImage && (
                      <div className="w-60 h-full flex-shrink-0">
                        <Image
                          src={getSanityImage(similarPub.coverImage)}
                          alt={similarPub.title}
                          width={240}
                          height={240}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content Section - Right Side */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="text-xl font-bold text-black mb-3 leading-tight">
                          {similarPub.title}
                        </h3>

                        {/* Description */}
                        <p className="text-black text-sm leading-relaxed mb-4">
                          {similarPub.excerpt}
                        </p>
                      </div>

                      {/* Author Information */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {similarPub.author?.image ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <Image
                                src={getSanityImage(similarPub.author.image)}
                                alt={similarPub.author.image.alt || similarPub.author.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">
                                {similarPub.author?.name?.charAt(0).toUpperCase() || 'A'}
                              </span>
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-sm text-black">
                              {similarPub.author?.name || 'Anonymous'}
                            </h4>
                            {similarPub.author?.title && (
                              <p className="text-xs text-gray-500">
                                {similarPub.author.title}
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No similar publications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
