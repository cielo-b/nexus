'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import { Publication } from '@/types/publication'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

interface PageProps {
  params: {
    slug: string
  }
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
    authors,
    category,
    tags,
    downloadUrl,
    externalUrl,
    featured
  }`
  
  return await client.fetch(query, { slug })
}

export default function PublicationPage({ params }: PageProps) {
  const [publication, setPublication] = useState<Publication | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const data = await getPublication(params.slug)
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

    if (params.slug) {
      fetchPublication()
    }
  }, [params.slug])

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {publication.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              {publication.featured && (
                <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {publication.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {publication.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {new Date(publication.publicationDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                {publication.author.name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {publication.coverImage && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={publication.coverImage.asset.url}
              alt={publication.title}
              width={800}
              height={450}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-[8vw] py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Publication Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {publication.tableOfContents && publication.tableOfContents.length > 0 ? (
                <div className="space-y-12">
                  {publication.tableOfContents.map((section, index) => (
                    <div
                      key={section.id.current}
                      id={section.id.current}
                      className="scroll-mt-24"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
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
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
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
              {/* Publication Metadata */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
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
                      {publication.author.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              {publication.tableOfContents && publication.tableOfContents.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Table of Contents</h3>
                  <ul className="space-y-2 text-sm">
                    {publication.tableOfContents.map((section) => (
                      <li key={section.id.current}>
                        <button
                          onClick={() => scrollToSection(section.id.current)}
                          className={`text-left w-full py-1 px-2 rounded transition-colors ${
                            activeSection === section.id.current
                              ? 'text-blue-600 bg-blue-50 border-l-2 border-blue-600 font-medium'
                              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
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
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
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
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View External
            </a>
          )}
          
          <Link
            href="/publications"
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Publications
          </Link>
        </div>
      </div>
    </div>
  )
}
