'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'
import { client } from '@/lib/sanity/client'
import { termsOfUseQueries } from '@/lib/sanity/queries'
import { TermsOfUse } from '@/types/termsOfUse'
import BlockContentRenderer from '@/components/BlockContentRenderer'

export default function TermsOfUsePage() {
  const [termsOfUse, setTermsOfUse] = useState<TermsOfUse | null>(null)
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
    const fetchTermsOfUse = async () => {
      try {
        const data = await client.fetch(termsOfUseQueries.getTermsOfUse)
        setTermsOfUse(data)
      } catch (error) {
        console.error('Error fetching terms of use:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTermsOfUse()
  }, [])

  // Trigger animations after component mounts
  useEffect(() => {
    if (!loading && termsOfUse) {
      const timer1 = setTimeout(() => setHeroVisible(true), 100)
      const timer2 = setTimeout(() => setContentVisible(true), 300)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [loading, termsOfUse])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Terms of Use...</p>
        </div>
      </div>
    )
  }

  if (!termsOfUse) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:alert-circle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms of Use Not Found</h2>
          <p className="text-gray-600">The terms of use content is not available at the moment.</p>
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
              Terms of <span className="text-blue-600">Use</span>
            </motion.h1>
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-gray-600 leading-relaxed px-2">
                Please read these Terms of Use carefully before using our services. 
                By accessing or using Insight Nexus Ltd services, you agree to be bound by these terms.
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
            <BlockContentRenderer content={termsOfUse.content} />
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
