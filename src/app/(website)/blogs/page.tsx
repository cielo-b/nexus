'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { blogQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { BlogPost } from '@/types/blog'

const categories = ['All', 'Technology', 'Politics', 'Health', 'Environment', 'Sports', 'Healthcare']

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [featuredBlog, setFeaturedBlog] = useState<BlogPost | null>(null)
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const [allBlogs, featured] = await Promise.all([
          client.fetch(blogQueries.getAllBlogs),
          client.fetch(blogQueries.getFeaturedBlogs)
        ])
        
        setBlogs(allBlogs)
        setFeaturedBlog(featured[0] || null)
        setFilteredBlogs(allBlogs)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    if (category === 'All') {
      setFilteredBlogs(blogs)
    } else {
      const filtered = blogs.filter(blog => 
        blog.category.toLowerCase() === category.toLowerCase()
      )
      setFilteredBlogs(filtered)
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We provide data-driven insights and expert consultancy services to drive meaningful and sustainable transformation across various sectors.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-[8vw] py-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Articles</h2>
          <p className="text-gray-600 text-lg">
            We offer tailored training programs designed to empower organizations with the skills and knowledge needed to drive data-driven transformation.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredBlog && selectedCategory === 'All' && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {featuredBlog.coverImage && (
                    <Image
                      src={getSanityImage(featuredBlog.coverImage)}
                      alt={featuredBlog.coverImage.alt || featuredBlog.title}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  )}
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {featuredBlog.category}
                    </span>
                    <span>{formatDate(featuredBlog.publishedAt)}</span>
                    <span>{featuredBlog.author.name}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <span>❤️</span>
                        {formatNumber(featuredBlog.likes)}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>👁️</span>
                        {formatNumber(featuredBlog.views)}
                      </span>
                    </div>
                    <Link
                      href={`/blogs/${featuredBlog.slug.current}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      Read More
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs
            .filter(blog => !blog.featured || selectedCategory !== 'All')
            .map((blog) => (
            <div key={blog._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {blog.coverImage && (
                <Image
                  src={getSanityImage(blog.coverImage)}
                  alt={blog.coverImage.alt || blog.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {blog.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                
                {/* Table of Contents Preview */}
                {blog.tableOfContents && blog.tableOfContents.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Contents:</h4>
                    <div className="flex flex-wrap gap-1">
                      {blog.tableOfContents.slice(0, 3).map((section, index) => (
                        <span
                          key={section.id.current}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                        >
                          {section.title}
                        </span>
                      ))}
                      {blog.tableOfContents.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{blog.tableOfContents.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <span>❤️</span>
                    {formatNumber(blog.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>👁️</span>
                    {formatNumber(blog.views)}
                  </span>
                </div>
                <Link
                  href={`/blogs/${blog.slug.current}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-full justify-center"
                >
                  Read More
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
