'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity/client'
import { blogQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { BlogPost } from '@/types/blog'

export default function BlogPostPage() {
  const params = useParams()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [similarBlogs, setSimilarBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const [blogData, similarData] = await Promise.all([
          client.fetch(blogQueries.getBlogBySlug, { slug: params.slug }),
          client.fetch(blogQueries.getSimilarBlogs, { 
            category: blog?.category || '', 
            excludeId: blog?._id || '' 
          })
        ])
        
        setBlog(blogData)
        setSimilarBlogs(similarData)
      } catch (error) {
        console.error('Error fetching blog:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchBlog()
    }
  }, [params.slug, blog?.category, blog?._id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  // Set up intersection observer for active section tracking
  useEffect(() => {
    if (!blog?.tableOfContents) return

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

    blog.tableOfContents.forEach((section) => {
      const element = document.getElementById(section.id.current)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [blog?.tableOfContents])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link href="/blogs" className="text-blue-600 hover:underline">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="px-[8vw]">
          <nav className="text-sm">
            <Link href="/blogs" className="text-blue-600 hover:underline">
              Blogs
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-600">{blog.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700">
        {blog.coverImage && (
          <Image
            src={getSanityImage(blog.coverImage)}
            alt={blog.coverImage.alt || blog.title}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-[8vw] py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Blog Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              {blog.tableOfContents && blog.tableOfContents.length > 0 ? (
                <div className="space-y-12">
                  {blog.tableOfContents.map((section, index) => (
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
                  <p className="text-gray-500">The full content for this blog post will be available soon.</p>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                Read Full Blog
                <span>↓</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Engagement Metrics */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">❤️</div>
                    <div className="text-sm text-gray-600">{formatNumber(blog.likes)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">👁️</div>
                    <div className="text-sm text-gray-600">{formatNumber(blog.views)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">📤</div>
                    <div className="text-sm text-gray-600">{formatNumber(blog.shares)}</div>
                  </div>
                </div>
              </div>

              {/* Blog Metadata */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Blog Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Publication Date:</span>
                    <div className="text-gray-900">{formatDate(blog.publishedAt)}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Reading Time:</span>
                    <div className="text-gray-900">{blog.readingTime} Min</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Category:</span>
                    <div className="text-gray-900">{blog.category}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Author:</span>
                    <div className="text-gray-900">{blog.author.name}</div>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              {blog.tableOfContents && blog.tableOfContents.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Table of Contents</h3>
                  <ul className="space-y-2 text-sm">
                    {blog.tableOfContents.map((section) => (
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

        {/* Similar News Section */}
        {similarBlogs.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Similar News</h2>
              <Link
                href="/blogs"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                View All News
                <span>→</span>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarBlogs.map((similarBlog) => (
                <div key={similarBlog._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {similarBlog.coverImage && (
                    <Image
                      src={getSanityImage(similarBlog.coverImage)}
                      alt={similarBlog.coverImage.alt || similarBlog.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {similarBlog.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {similarBlog.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <span>❤️</span>
                        {formatNumber(similarBlog.likes)}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>💬</span>
                        {formatNumber(similarBlog.shares)}
                      </span>
                    </div>
                    <Link
                      href={`/blogs/${similarBlog.slug.current}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-full justify-center"
                    >
                      Read More
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
