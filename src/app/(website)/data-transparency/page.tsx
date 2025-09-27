'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'
import { client } from '@/lib/sanity/client'
import { dataTransparencyQueries } from '@/lib/sanity/queries'
import { DataTransparency } from '@/types/dataTransparency'
import BlockContentRenderer from '@/components/BlockContentRenderer'

export default function DataTransparencyPage() {
  const [dataTransparency, setDataTransparency] = useState<DataTransparency | null>(null)
  const [loading, setLoading] = useState(true)
  // Refs for animations
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  
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

  // Animation state
  const [heroVisible, setHeroVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    const fetchDataTransparency = async () => {
      try {
        const data = await client.fetch(dataTransparencyQueries.getDataTransparency)
        setDataTransparency(data)
      } catch (error) {
        console.error('Error fetching data transparency:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDataTransparency()
  }, [])

  // Trigger animations after component mounts
  useEffect(() => {
    if (!loading && dataTransparency) {
      const timer1 = setTimeout(() => setHeroVisible(true), 100)
      const timer2 = setTimeout(() => setContentVisible(true), 300)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [loading, dataTransparency])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Data Transparency Agreement...</p>
        </div>
      </div>
    )
  }

  if (!dataTransparency) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:alert-circle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Transparency Agreement Not Found</h2>
          <p className="text-gray-600">The data transparency agreement content is not available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroVisible ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="relative min-h-[50vh] pt-44 max-md:pt-36 max-sm:pt-36 pb-8 sm:pb-12 lg:pb-16 xl:pb-20 flex flex-col items-center justify-center border-b border-gray-200 bg-white"
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
          <div className="text-center">
            <motion.h1 
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4"
            >
              Data <span className="text-blue-600">Transparency</span> Agreement
            </motion.h1>
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-gray-600 leading-relaxed px-2">
                Our commitment to transparent data practices, ethical research standards, 
                and open communication about how we collect, use, and protect your information.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Content Section */}
      <motion.section 
        ref={contentRef}
        initial="hidden"
        animate={contentVisible ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-6 sm:py-8 lg:py-12 bg-white"
      >
        <div className="px-[8vw] max-w-[1700px] mx-auto">
          <motion.div 
            variants={staggerItem}
            className="prose prose-lg max-w-none"
          >
            <BlockContentRenderer content={dataTransparency.content} />
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
