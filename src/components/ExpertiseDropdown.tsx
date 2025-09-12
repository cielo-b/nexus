'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { client } from '@/lib/sanity/client'
import { expertiseQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { Expertise } from '@/types/expertise'

interface ExpertiseDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export default function ExpertiseDropdown({ isOpen, onClose }: ExpertiseDropdownProps) {
  const [expertise, setExpertise] = useState<Expertise[]>([])
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

    if (isOpen) {
      fetchExpertise()
    }
  }, [isOpen])

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      // Check if click is outside the expertise dropdown
      if (isOpen && !target.closest('[data-expertise-dropdown]')) {
        onClose()
      }
    }

    if (isOpen) {
      // Add a small delay to prevent immediate closing when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 100)
      
      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [isOpen, onClose])

  return (
    <div 
      data-expertise-dropdown
      className={`fixed top-16 left-0 w-full bg-[#014DFE] z-50 transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="px-[8vw] py-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="ml-3 text-white text-lg">
                Loading expertise areas...
              </span>
            </div>
          ) : expertise.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {expertise.map((item) => (
                <Link
                  key={item._id}
                  href={`/expertise/${item.slug.current}`}
                  onClick={onClose}
                  className="group flex flex-col items-center p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={getSanityImage(item.coverImage)}
                      alt={item.coverImage.alt || item.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-white font-semibold text-center group-hover:text-blue-100 transition-colors duration-300">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon 
                icon="lucide:briefcase" 
                className="w-16 h-16 mx-auto mb-4 text-white/60" 
              />
              <p className="text-white/80 text-lg">
                No expertise areas available yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
