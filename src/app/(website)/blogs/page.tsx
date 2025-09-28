'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
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
      <div className="h-3 bg-gray-300  mb-1"></div>
      <div className="h-3 bg-gray-300  w-16 mb-2"></div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-200 px-2 py-1  border border-gray-300 text-xs">
            <div className="w-3 h-3 bg-gray-300 "></div>
            <div className="h-3 bg-gray-300  w-6"></div>
          </div>
          <div className="flex items-center gap-1 bg-gray-200 px-2 py-1  border border-gray-300 text-xs">
            <div className="w-3 h-3 bg-gray-300 "></div>
            <div className="h-3 bg-gray-300  w-6"></div>
          </div>
        </div>
        <div className="bg-gray-300 px-3 py-1  w-12"></div>
      </div>
    </div>
  </div>
)

const BlogSkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
    {Array.from({ length: 10 }).map((_, index) => (
      <BlogSkeleton key={index} />
    ))}
  </div>
)

function BlogsContent() {
  const searchParams = useSearchParams()
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const [allBlogs] = await Promise.all([
          client.fetch(blogQueries.getAllBlogs)
        ])

        setBlogs(allBlogs)
        setFilteredBlogs(allBlogs)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Handle author query parameter from URL
  useEffect(() => {
    const authorParam = searchParams.get('author')
    if (authorParam) {
      setSearchQuery(authorParam)
    }
  }, [searchParams])

  useEffect(() => {
    let filtered = blogs

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog =>
        blog.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filter by search query (title, excerpt, content, and author names)
    if (searchQuery.trim()) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.authors && blog.authors.some(author =>
          author.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      )
    }

    setFilteredBlogs(filtered)
  }, [selectedCategory, searchQuery, blogs])

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
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

          


  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative h-[60vh]  flex flex-col items-center justify-end pb-4 text-white ">
        <div className="absolute inset-0 bg-black/80  w-full h-full"></div>
        <Image src="/images/hero.png" alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full opacity-20" />

        <div className="relative w-full px-[8vw]">
          <div className="">
            <h1 className="text-6xl font-semibold mb-6">Our Blog</h1>
            
            {/* Search Input */}
            <div className="max-w-2xl mb-6">
              <div className="relative">
                <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search blogs by title, content, or author name..."
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

      {/* Main Content */}
      <div className="px-[8vw] space-y-[3vh] py-[3vh]">
        {/* <div className="mb-8 relative  ">
          <h2 className="text-5xl font-semibold  mb-4">Our <span className='text-primary' >Articles</span></h2>
          <p className="max-w-3xl ">
            We offer tailored training programs designed to empower organizations with the skills and knowledge needed to drive data-driven transformation.
          </p>
        </div> */}

        {loading && <BlogSkeletonGrid />}

        {/* Category Filters */}
        {!loading && (
          <div className="flex flex-wrap justify-start items-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-8 py-4  font-medium transition-all text-sm text-[#565656] duration-300 ${selectedCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-700 border border-[#262626]/30'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredBlogs
              .filter(blog =>  selectedCategory !== 'All')
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

                  <Link
                    href={`/blogs/${blog.slug.current}`}
                    className="w-full bg-white text-black border-2 border-black px-4 py-2 flex items-center gap-1 justify-center text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 group"
                  >
                    Read More
                    <Icon icon="mdi:arrow-right" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-green-50 to-emerald-100  flex items-center justify-center shadow-lg">
              <Icon icon="mdi:newspaper-variant-outline" className="w-16 h-16 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {searchQuery 
                ? 'No Articles Found' 
                : selectedCategory === 'All' 
                  ? 'No Articles Available' 
                  : `No ${selectedCategory} Articles`
              }
            </h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed mb-8">
              {searchQuery
                ? 'No articles match your search criteria. Try adjusting your search terms or filters.'
                : selectedCategory === 'All'
                  ? 'We\'re working on adding new articles. Check back soon for insightful content!'
                  : `We don't have any articles in the ${selectedCategory} category yet. Try selecting a different category.`
              }
            </p>
            {(selectedCategory !== 'All' || searchQuery) && (
              <div className="flex flex-wrap gap-4 justify-center">
                {selectedCategory !== 'All' && (
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="bg-primary text-white px-8 py-4  font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    View All Articles
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
        )}
      </div>
    </div>
  )
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<BlogSkeletonGrid />}>
      <BlogsContent />
    </Suspense>
  )
}
