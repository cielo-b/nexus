'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { blogQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { BlogPost } from '@/types/blog'
import { Icon } from '@iconify/react/dist/iconify.js'

const categories = ['All', 'Economics', 'Agriculture', 'Technology', 'Politics', 'Health', 'Environment', 'Sports']

// Skeleton loading components
const BlogSkeleton = () => (
  <div className="overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-3">
      <div className="h-3 bg-gray-300 rounded mb-1"></div>
      <div className="h-3 bg-gray-300 rounded w-16 mb-2"></div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full border border-gray-300 text-xs">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded w-6"></div>
          </div>
          <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full border border-gray-300 text-xs">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded w-6"></div>
          </div>
        </div>
        <div className="bg-gray-300 px-3 py-1 rounded-lg w-12"></div>
      </div>
    </div>
  </div>
)

const BlogSkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {Array.from({ length: 10 }).map((_, index) => (
      <BlogSkeleton key={index} />
    ))}
  </div>
)

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

          {/* Category Filters Skeleton */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-12 w-20 bg-gray-300 rounded-lg animate-pulse"></div>
            ))}
          </div>

          {/* Blog Skeleton Grid */}
          <BlogSkeletonGrid />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative h-[40vh] flex flex-col items-center justify-center text-white ">
        <div className="absolute inset-0 bg-black/80  w-full h-full"></div>
        <Image src="/images/hero.png" alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full opacity-20" />

        <div className="relative w-full px-[8vw]">
          <div className="">
            <h1 className="text-6xl font-semibold mb-6">Our Blog</h1>
            <p className="max-w-3xl  leading-relaxed">
              We provide data-driven insights and expert consultancy services to drive meaningful and sustainable transformation across various sectors. Our work spans education, agriculture, public health, and beyond, helping organizations achieve impactful
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-[8vw] space-y-[3vh] py-[3vh]">
        {/* <div className="mb-8 relative  ">
          <h2 className="text-5xl font-semibold  mb-4">Our <span className='text-primary' >Articles</span></h2>
          <p className="max-w-3xl ">
            We offer tailored training programs designed to empower organizations with the skills and knowledge needed to drive data-driven transformation.
          </p>
        </div> */}

        {/* Category Filters */}
        <div className="flex flex-wrap justify-start items-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-8 py-4 rounded font-medium transition-all text-sm text-[#565656] duration-300 ${selectedCategory === category
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-700 border border-[#262626]/30'
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
                      className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredBlogs
            .filter(blog => !blog.featured || selectedCategory !== 'All')
            .map((blog) => (
              <div key={blog._id} className="overflow-hidden bg-white hover:bg-gray-50 transition-colors duration-300">
                {blog.coverImage && (
                  <div className="overflow-hidden">
                    <Image
                      src={getSanityImage(blog.coverImage)}
                      alt={blog.coverImage.alt || blog.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-3">
                  <h3 className="text-xs font-semibold line-clamp-2 mb-1">
                    {blog.title}
                  </h3>
                  <span className="text-[#98989A] capitalize text-xs mb-2 block">
                    {blog.category}
                  </span>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-[#E6E6E6] px-2 py-1 rounded-full border-[#AAAAAA] border text-xs">
                        <Icon icon="mdi:heart-outline" className="w-3 h-3 text-[#474747]" />
                        {formatNumber(blog.likes)}
                      </div>
                      <span className="flex items-center gap-1 bg-[#E6E6E6] px-2 py-1 rounded-full border-[#AAAAAA] border text-xs">
                        <Icon icon="mdi:eye-outline" className="w-3 h-3 text-[#474747]" />
                        {formatNumber(blog.views)}
                      </span>
                    </div>
                    <Link
                      href={`/blogs/${blog.slug.current}`}
                      className="bg-white text-black border-2 border-black px-4 py-2 flex items-center gap-1 justify-center text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 group"
                    >
                      Read More
                      <Icon icon="mdi:arrow-right" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-full flex items-center justify-center shadow-lg">
              <Icon icon="mdi:newspaper-variant-outline" className="w-16 h-16 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedCategory === 'All' ? 'No Articles Available' : `No ${selectedCategory} Articles`}
            </h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed mb-8">
              {selectedCategory === 'All'
                ? 'We\'re working on adding new articles. Check back soon for insightful content!'
                : `We don't have any articles in the ${selectedCategory} category yet. Try selecting a different category.`
              }
            </p>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View All Articles
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
