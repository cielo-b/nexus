'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { motion, useInView } from 'framer-motion'
import { client } from '@/lib/sanity/client'
import { publicationQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { Publication } from '@/types/publication'

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Helper function to download PDF
const downloadPDF = (url: string, filename: string) => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function ServicesPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  
  // Refs for animations
  const heroRef = useRef(null)
  const publicationsRef = useRef(null)
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  }
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  // Fetch publications on component mount
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await client.fetch(publicationQueries.getAllPublications)
        setPublications(data)
      } catch (error) {
        console.error('Error fetching publications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [])


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading publications...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] pt-[20vh] flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/80 w-full h-full"></div>
        <Image src="/images/hero.png" alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full opacity-20" />

        <div className="relative w-full max-w-7xl mx-auto">
          <div className="text-left">
            <h1 className="text-6xl font-semibold mb-6">Our Publications</h1>
            <p className="text-xl max-w-3xl leading-relaxed">
              Explore our comprehensive collection of research publications, reports, and insights that drive meaningful transformation across various sectors. Download our latest publications and access valuable knowledge resources.
            </p>
          </div>
        </div>
      </section>

      {/* Publications Grid Section */}
      <motion.section 
        ref={publicationsRef}
        initial="hidden"
        animate={useInView(publicationsRef) ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-16 sm:py-20 lg:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Latest <span className="text-blue-600">Publications</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover our latest research findings, policy briefs, and technical reports that contribute to evidence-based decision making and sustainable development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {publications.map((publication, index) => (
              <motion.div
                key={publication._id}
                variants={staggerItem}
                className="relative"
              >
                {/* Publication Card - Clean Professional Design */}
                <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-blue-200 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border border-blue-200 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-blue-200 rounded-full"></div>
                  </div>

                  {/* Publication Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Icon icon="solar:document-text-bold" className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-2">
                          {publication.title}
                        </h3>
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Publication Meta */}
                  <div className="relative z-10 mb-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:calendar-bold" className="w-4 h-4" />
                        <span>{new Date(publication.publicationDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:user-bold" className="w-4 h-4" />
                        <span>{publication.author.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon icon="solar:tag-bold" className="w-4 h-4" />
                        <span>{publication.category}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {publication.excerpt}
                    </p>
                  </div>

                  {/* Table of Contents */}
                  {publication.tableOfContents && publication.tableOfContents.length > 0 && (
                    <div className="relative z-10 mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Icon icon="solar:list-bold" className="w-5 h-5 text-blue-600" />
                        Table of Contents
                      </h4>
                      <div className="space-y-2">
                        {publication.tableOfContents.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="flex items-start gap-3 group">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                            <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                              {section.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PDF Download Section */}
                  {(publication.downloadFile || publication.downloadUrl) && (
                    <div className="relative z-10 mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon icon="solar:file-download-bold" className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {publication.downloadFile?.filename || 'Download PDF'}
                            </p>
                            {publication.downloadFile?.size && (
                              <p className="text-xs text-gray-500">
                                {formatFileSize(publication.downloadFile.size)}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const url = publication.downloadFile?.asset?.url || publication.downloadUrl
                            const filename = publication.downloadFile?.filename || `${publication.title}.pdf`
                            if (url) downloadPDF(url, filename)
                          }}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <Icon icon="solar:download-bold" className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}