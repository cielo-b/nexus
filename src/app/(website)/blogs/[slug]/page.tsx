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
import { Icon } from '@iconify/react'

// Skeleton component for related blogs
const RelatedBlogSkeleton = () => (
  <div className="overflow-hidden animate-pulse">
    <div className="w-full h-60 bg-gray-300 "></div>
    <div className="p-6">
      <div className="h-6 bg-gray-300  mb-2"></div>
      <div className="h-4 bg-gray-300  w-20 mb-4"></div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-gray-200 px-4 py-2  border border-gray-300 text-sm">
            <div className="w-4 h-4 bg-gray-300 "></div>
            <div className="h-4 bg-gray-300  w-8"></div>
          </div>
          <div className="flex items-center gap-1 bg-gray-200 px-4 py-2  border border-gray-300 text-sm">
            <div className="w-4 h-4 bg-gray-300 "></div>
            <div className="h-4 bg-gray-300  w-8"></div>
          </div>
        </div>
        <div className="bg-gray-300 px-6 py-2  w-24"></div>
      </div>
    </div>
  </div>
)

export default function BlogPostPage() {
  const params = useParams()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [relatedLoading, setRelatedLoading] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await client.fetch(blogQueries.getBlogBySlug, { slug: params.slug })
        setBlog(blogData)
      } catch (error) {
        console.error('Error fetching blog:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchBlog()
    }
  }, [params.slug])

  // Fetch related blogs when blog is loaded
  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      if (!blog) return
      
      setRelatedLoading(true)
      try {
        const related = await client.fetch(blogQueries.getSimilarBlogs, { 
          category: blog.category, 
          excludeId: blog._id 
        })
        setRelatedBlogs(related.slice(0, 6)) // Limit to 6 blogs
      } catch (error) {
        console.error('Error fetching related blogs:', error)
      } finally {
        setRelatedLoading(false)
      }
    }

    fetchRelatedBlogs()
  }, [blog])

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
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center text-white ">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,20,20,0)_0%,rgba(20,20,20,0.88)_78%,rgba(20,20,20,1)_100%)]   w-full h-full"></div>
        <Image src={getSanityImage(blog.coverImage)} alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full opacity-20" />
        <div className="relative w-full px-[8vw] h-full flex flex-col justify-between  pb-[3vh] pt-[9vh]">
          <div className="flex gap-2 mb-4 w-full text-white">
            <Link href="/blogs" className='text-white/50   '>
              Blogs
            </Link>
            {">"}
            <span className=''>
              {blog.title}
            </span>
          </div>
          <h1 className="text-7xl font-semibold mb-6 text-center">{blog.title}</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className=" ">
        <div className="grid lg:grid-cols-3 ">
          {/* Blog Content */}
          <div className="lg:col-span-2 border-r border-r-[#262626]/11">
            <div className="bg-white  ">
              {blog.tableOfContents && blog.tableOfContents.length > 0 ? (
                <div className="space-y-12">
                  {blog.tableOfContents.map((section, index) => (
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
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100  flex items-center justify-center">
                    <Icon icon="mdi:file-document-outline" className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Content coming soon</h3>
                  <p className="text-gray-500">The full content for this blog post will be available soon.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Views Metadata */}
              <div className="flex items-center gap-4 mb-4 border-b border-b-[#262626]/11 pr-[8vw] pl-[3vw] py-[4vh]">
                <div className="flex items-center gap-1 bg-[#E6E6E6] px-3 py-2  border border-[#AAAAAA] text-sm">
                  <Icon icon="mdi:heart-outline" className="w-4 h-4 text-[#474747]" />
                  <span>{blog.likes || 0}</span>
                </div>
                <div className="flex items-center gap-1 bg-[#E6E6E6] px-3 py-2  border border-[#AAAAAA] text-sm">
                  <Icon icon="mdi:eye-outline" className="w-4 h-4 text-[#474747]" />
                  <span>{blog.views || 0}</span>
                </div>
                <div className="flex items-center gap-1 bg-[#E6E6E6] px-3 py-2  border border-[#AAAAAA] text-sm">
                  <Icon icon="mdi:share-outline" className="w-4 h-4 text-[#474747]" />
                  <span>{blog.shares || 0}</span>
                </div>
              </div>
              {/* Blog Metadata */}
              <div className=" mb-8 pr-[8vw] pl-[3vw] py-[4vh] space-y-4 ">
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
                    <div className="text-gray-900">
                      {blog.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Author:</span>
                    <div className="text-gray-900">{blog.author.name}</div>
                  </div>
                </div>
                {blog.tableOfContents && blog.tableOfContents.length > 0 && (
                <div >
                  <h3 className="font-bold text-gray-900 mb-4">Table of Contents</h3>
                  <ul className="space-y-2 text-sm bg-[#E8E8E8]  p-6">
                    {blog.tableOfContents.map((section) => (
                      <li key={section.id.current}>
                        <button
                          onClick={() => scrollToSection(section.id.current)}
                          className={`text-left w-full py-1 px-2  transition-colors ${activeSection === section.id.current
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

        {/* Related Blogs Section */}
        <div className="mt-16 px-[8vw]">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Blogs</h2>
          
          {relatedLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <RelatedBlogSkeleton key={index} />
              ))}
            </div>
          ) : relatedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {relatedBlogs.map((relatedBlog) => (
                <div key={relatedBlog._id} className="overflow-hidden bg-white cursor-pointer hover:bg-gray-50 transition-colors duration-300">
                  {relatedBlog.coverImage && (
                    <div className="overflow-hidden">
                      <Image
                        src={getSanityImage(relatedBlog.coverImage)}
                        alt={relatedBlog.coverImage.alt || relatedBlog.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="text-xs font-semibold line-clamp-2 mb-1">
                      {relatedBlog.title}
                    </h3>
                    <span className="text-[#98989A] capitalize text-xs mb-2 block">
                      {relatedBlog.category}
                    </span>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-[#E6E6E6] px-2 py-1  border-[#AAAAAA] border text-xs">
                          <Icon icon="mdi:heart-outline" className="w-3 h-3 text-[#474747]" />
                          {formatNumber(relatedBlog.likes)}
                        </div>
                        <span className="flex items-center gap-1 bg-[#E6E6E6] px-2 py-1  border-[#AAAAAA] border text-xs">
                          <Icon icon="mdi:eye-outline" className="w-3 h-3 text-[#474747]" />
                          {formatNumber(relatedBlog.views)}
                        </span>
                      </div>
                      <Link
                        href={`/blogs/${relatedBlog.slug.current}`}
                        className="bg-white text-black border-2 border-black px-4 py-2 flex items-center gap-1 justify-center text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
                      >
                        Read More
                        <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No related blogs found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
