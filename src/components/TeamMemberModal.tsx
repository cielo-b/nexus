'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { TeamMember } from '@/types/teamMember'
import { getSanityImage } from '@/lib/getSanityImage'

interface TeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  teamMember: TeamMember | null
}

export default function TeamMemberModal({ isOpen, onClose, teamMember }: TeamMemberModalProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Reset loading state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
    }
  }, [isOpen])

  if (!isOpen || !teamMember) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
        >
          <Icon icon="mdi:close" className="w-6 h-6 text-white" />
        </motion.button>

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0, 0, 0.58, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"
              />
            </div>
          )}

          <div className=" max-h-[90vh] overflow-y-auto">
            {/* Image Section */}
            <div className="w-full">
            <div className="relative w-[200px] h-[200px] mx-auto">
              <Image
                src={getSanityImage(teamMember.image)}
                alt={teamMember.image.alt || teamMember.name}
                fill
                className={`object-contain transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
                priority
              />
            </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 lg:p-8 ">
              <div className="space-y-6">
                {/* Name and Title */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {teamMember.name}
                  </h2>
                  <p className="text-lg text-blue-600 font-medium">
                    {teamMember.title}
                  </p>
                </div>

                {/* Bio */}
                {teamMember.bio && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {teamMember.bio}
                    </p>
                  </div>
                )}

                {/* Contact Information */}
                <div className="space-y-4">
                  
                  {teamMember.email && (
                    <div className="flex items-center space-x-3">
                      <Icon icon="mdi:email" className="w-5 h-5 text-blue-600" />
                      <a 
                        href={`mailto:${teamMember.email}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        {teamMember.email}
                      </a>
                    </div>
                  )}

                  {teamMember.linkedin && (
                    <div className="flex items-center space-x-3">
                      <Icon icon="mdi:linkedin" className="w-5 h-5 text-blue-600" />
                      <a 
                        href={teamMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}

                  {teamMember.twitter && (
                    <div className="flex items-center space-x-3">
                      <Icon icon="mdi:twitter" className="w-5 h-5 text-blue-600" />
                      <a 
                        href={teamMember.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        Twitter Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm"
        >
          Press ESC to close
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
