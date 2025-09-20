'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity/client'
import { expertiseQueries } from '@/lib/sanity/queries'
import { Expertise } from '@/types/expertise'

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOverDarkBackground, setIsOverDarkBackground] = useState(false)
  const [expertise, setExpertise] = useState<Expertise[]>([])
  const [expertiseLoading, setExpertiseLoading] = useState(false)
  const pathname = usePathname()

  // Handle scroll detection and background color detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
      
      // Check if navbar is over dark background
      const heroSection = document.querySelector('section')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        const isOverHero = rect.top <= 0 && rect.bottom > 0
        setIsOverDarkBackground(isOverHero)
      }
    }

    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch expertise data when dropdown opens
  useEffect(() => {
    const fetchExpertise = async () => {
      if (isDropdownOpen && expertise.length === 0) {
        setExpertiseLoading(true)
        try {
          const data = await client.fetch(expertiseQueries.getAllExpertise)
          setExpertise(data)
        } catch (error) {
          console.error('Error fetching expertise:', error)
        } finally {
          setExpertiseLoading(false)
        }
      }
    }

    fetchExpertise()
  }, [isDropdownOpen, expertise.length])

  // Handle click outside to close expertise dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isDropdownOpen && !target.closest('[data-expertise-dropdown]')) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 100)
      
      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [isDropdownOpen])

  // Always show navbar - removed scroll hide effect
  const shouldHideNavbar = false

  // Check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Helper function to get link styles
  const getLinkStyles = (href: string) => {
    const textColor = isOverDarkBackground ? 'text-white' : 'text-black'
    const activeTextColor = isOverDarkBackground ? 'text-white' : 'text-black'
    const borderColor = isOverDarkBackground ? 'border-white' : 'border-black'
    
    return `transition-colors duration-300 ${textColor} ${
      isActiveLink(href) 
        ? `${activeTextColor} font-semibold border-b-2 ${borderColor} pb-1`
        : ''
    }`
  }

  // Get navbar background and text colors
  const getNavbarStyles = () => {
    if (isOverDarkBackground) {
      return 'bg-black/20 backdrop-blur-2xl text-white'
    } else {
      return 'bg-white/95 backdrop-blur-2xl text-black shadow-lg'
    }
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 px-[5vw] transition-all duration-300 ${
        shouldHideNavbar 
          ? 'transform -translate-y-full opacity-0' 
          : 'transform translate-y-0 opacity-100'
      } ${getNavbarStyles()}`}>
      <div className={` transition-colors duration-300 ${
        isDropdownOpen
          && 'border-white/20'
        
      }`}>
        {/* Large screens (1700px+) - Original layout */}
        <div className="hidden 2xl:block relative">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logos/logo.png" alt="Logo" width={1000} height={1000} className='w-[300px]' />
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link href="/" className={getLinkStyles('/')}>Home</Link>
              <Link href="/about" className={getLinkStyles('/about')}>About Us</Link>
              <Link href="/services" className={getLinkStyles('/services')}>Services</Link>
              
              {/* Expertise Dropdown */}
              <div className="relative">
                <button
                  data-expertise-dropdown
                  className="flex items-center space-x-1 transition-colors duration-300 "
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsDropdownOpen(!isDropdownOpen)
                  }}
                >
                  <span>Expertise</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <Link href="/publications" className={getLinkStyles('/publications')}>Publications</Link>
              <Link href="/career" className={getLinkStyles('/career')}>Career</Link>
              <Link href="/training" className={getLinkStyles('/training')}>Training</Link>
              <Link href="/blogs" className={getLinkStyles('/blogs')}>Blog</Link>
              <Link href="/products" className={getLinkStyles('/products')}>Products</Link>
            </div>

            {/* Contact Us Button */}
            <Link
              href="/contact"
              className="px-6 py-3 font-medium transition-all duration-300 bg-white text-black hover:bg-gray-100"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Medium screens (1000px-1699px) - Two-section navbar */}
        <div className="hidden xl:block 2xl:hidden relative">
          {/* Top section - Logo and primary nav items */}
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logos/logo.png" alt="Logo" width={1000} height={1000} className='w-[250px]' />
            </Link>

            {/* Primary Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link href="/" className={getLinkStyles('/')}>Home</Link>
              <Link href="/about" className={getLinkStyles('/about')}>About Us</Link>
              <Link href="/services" className={getLinkStyles('/services')}>Services</Link>
              
              {/* Expertise Dropdown */}
              <div className="relative">
                <button
                  data-expertise-dropdown
                  className="flex items-center space-x-1 transition-colors duration-300 "
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsDropdownOpen(!isDropdownOpen)
                  }}
                >
                  <span>Expertise</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contact Us Button */}
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium transition-all duration-300 bg-white text-black hover:bg-gray-100"
            >
              Contact Us
            </Link>
          </div>

          {/* Bottom section - Secondary nav items */}
          <div className="flex justify-center items-center py-2 border-t border-white/10">
            <div className="flex items-center space-x-6">
              <Link href="/publications" className={`${getLinkStyles('/publications')} text-sm`}>Publications</Link>
              <Link href="/career" className={`${getLinkStyles('/career')} text-sm`}>Career</Link>
              <Link href="/training" className={`${getLinkStyles('/training')} text-sm`}>Training</Link>
              <Link href="/blogs" className={`${getLinkStyles('/blogs')} text-sm`}>Blog</Link>
              <Link href="/products" className={`${getLinkStyles('/products')} text-sm`}>Products</Link>
            </div>
          </div>
        </div>

        {/* Expertise Section - Shows when dropdown is open */}
        <div 
          data-expertise-dropdown
          className={`w-full bg-black/20 backdrop-blur-2xl text-white transition-all duration-300 ease-in-out ${
            isDropdownOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="px-[8vw] py-8">
            <div className="max-w-7xl mx-auto">
              {expertiseLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin h-8 w-8 border-b-2 border-white"></div>
                  <span className="ml-3 text-white text-lg">
                    Loading expertise areas...
                  </span>
                </div>
              ) : expertise.length > 0 ? (
                <>
                  {/* Mobile List View */}
                  <div className="block md:hidden">
                    <div className="space-y-3">
                      {expertise.map((item) => (
                        <Link
                          key={item._id}
                          href={`/expertise/${item.slug.current}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="group flex items-center p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                        >
                          <h4 className="text-white font-semibold group-hover:text-blue-100 transition-colors duration-300">
                            {item.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Grid View */}
                  <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {expertise.map((item) => (
                      <Link
                        key={item._id}
                        href={`/expertise/${item.slug.current}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="group flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105"
                      >
                        <h4 className="text-white font-semibold text-center group-hover:text-blue-100 transition-colors duration-300">
                          {item.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 text-white/60 flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <p className="text-white/80 text-lg">
                    No expertise areas available yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Small screens (below 1000px) - Mobile menu */}
        <div className="xl:hidden">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logos/logo.png" alt="Logo" width={1000} height={1000} className='w-[200px]' />
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="transition-colors duration-300 "
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Popover */}
      {isMobileMenuOpen && (
        <div 
          className="xl:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300" 
          onClick={closeMobileMenu}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div 
            className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideDown 0.3s ease-out' }}
          >
            <div className="px-6 py-4 space-y-4">
              {/* Primary Navigation Links */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Main Navigation</div>
                <Link 
                  href="/" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/') 
                      ? 'text-primary-500 font-semibold border-l-4 border-primary-500 pl-4' 
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/about') 
                      ? 'text-primary-500 font-semibold border-l-4 border-primary-500 pl-4' 
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  About Us
                </Link>
                <Link 
                  href="/services" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/services') 
                      ? 'text-primary-500 font-semibold border-l-4 border-primary-500 pl-4' 
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  Services
                </Link>
                
                {/* Expertise Section */}
                <div className="py-2">
                  <div className="text-lg font-medium text-gray-700 mb-2">Expertise</div>
                  <div className="pl-4 space-y-2">
                    <Link 
                      href="/expertise/education" 
                      onClick={closeMobileMenu}
                      className="block py-1 text-gray-600 hover:text-primary-500 transition-colors duration-300"
                    >
                      Education
                    </Link>
                    <Link 
                      href="/expertise/agriculture" 
                      onClick={closeMobileMenu}
                      className="block py-1 text-gray-600 hover:text-primary-500 transition-colors duration-300"
                    >
                      Agriculture
                    </Link>
                    <Link 
                      href="/expertise/health" 
                      onClick={closeMobileMenu}
                      className="block py-1 text-gray-600 hover:text-primary-500 transition-colors duration-300"
                    >
                      Public Health
                    </Link>
                  </div>
                </div>
              </div>

              {/* Secondary Navigation Links */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Additional Pages</div>
                <Link 
                  href="/publications" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/publications') 
                      ? 'text-primary-500 font-semibold border-l-4 border-primary-500 pl-4' 
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  Publications
                </Link>
                <Link 
                  href="/career" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/career') 
                      ? 'text-primary-500 font-semibold border-l-4 border-primary-500 pl-4' 
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  Career
                </Link>
                <Link 
                  href="/training" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/training') 
                      ? 'text-primary-500 font-semibold border-l-4 border-primary-500 pl-4' 
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  Training
                </Link>
                <Link 
                  href="/blogs" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/blogs') 
                      ? 'text-primary-500 font-semibold border-l-4 border-primary-500 pl-4' 
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  Blog
                </Link>
                <Link 
                  href="/products" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/products') 
                      ? 'text-primary-500 font-semibold border-l-4 border-primary-500 pl-4' 
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  Products
                </Link>
              </div>

              {/* Contact Us Button */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="block w-full text-center bg-primary-500 text-white px-6 py-3  font-medium hover:bg-primary-600 transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      </nav>
    </>
  )
}
