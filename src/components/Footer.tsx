'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import { expertiseQueries } from '@/lib/sanity/queries'
import { Expertise } from '@/types/expertise'

export default function Footer() {
  const [expertise, setExpertise] = useState<Expertise[]>([])
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const data = await client.fetch(expertiseQueries.getAllExpertise)
        setExpertise(data)
      } catch (error) {
        console.error('Error fetching expertise:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExpertise()
  }, [])

  const displayedExpertise = showAll ? expertise : expertise.slice(0, 5)
  const hasMore = expertise.length > 5
  return (
    <footer className="bg-dark-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logos/white-logo.png" alt="Insight Nexus" width={10000000} height={10000} />
            </Link>
            <p className="text-sm leading-relaxed text-gray-300 max-w-sm">
              All about delivering data-driven insights and comprehensive consultancy services to foster impactful and sustainable change in education, agriculture, public health, and more.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon icon="mdi:map-marker" className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">Kigali, Rwanda</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon icon="mdi:email" className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">info@insightnexus.africa</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon icon="mdi:phone" className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">+250782988053</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800  flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all duration-300 group">
                <Icon icon="mdi:twitter" className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800  flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all duration-300 group">
                <Icon icon="mdi:instagram" className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800  flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all duration-300 group">
                <Icon icon="mdi:facebook" className="w-5 h-5 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Expertise */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-xl mb-6">Expertise</h3>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-4 bg-gray-700  animate-pulse"></div>
                ))}
              </div>
            ) : (
              <ul className="space-y-4">
                {displayedExpertise.map((item) => (
                  <li key={item._id}>
                    <Link 
                      href={`/expertise/${item.slug.current}`} 
                      className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                {hasMore && (
                  <li>
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-300 flex items-center gap-1"
                    >
                      {showAll ? (
                        <>
                          <Icon icon="mdi:chevron-up" className="w-4 h-4" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <Icon icon="mdi:chevron-down" className="w-4 h-4" />
                          View More ({expertise.length - 5})
                        </>
                      )}
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Career
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Training
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-xl mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/data-transparency" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Data Transparency Agreement
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-16 pt-8">
          <p className="text-center text-sm text-gray-400">
            Copyright © 2025 Insight Nexus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
