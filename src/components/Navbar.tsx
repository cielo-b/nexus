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
    if (!pathname) return false
    
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
      <nav className={`fixed top-0 left-0 w-full z-50  px-8 lg:px-[2vw] xl:px-[5vw] transition-all duration-300 ${
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

        {/* Medium screens (1000px-1699px) - Single line navbar */}
        <div className="hidden xl:block 2xl:hidden relative">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logos/logo.png" alt="Logo" width={1000} height={1000} className='w-[180px]' />
            </Link>

            {/* All Navigation Links */}
            <div className="flex items-center space-x-4">
              <Link href="/" className={getLinkStyles('/')}>Home</Link>
              <Link href="/about" className={getLinkStyles('/about')}>About Us</Link>
              <Link href="/services" className={getLinkStyles('/services')}>Services</Link>
              
              {/* Expertise Dropdown */}
              <div className="relative">
                <button
                  data-expertise-dropdown
                  className="flex items-center space-x-1 transition-colors duration-300"
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
              className="px-3 py-2 text-sm font-medium transition-all duration-300 bg-white text-black hover:bg-gray-100"
            >
              Contact Us
            </Link>
          </div>
        </div>



        {/* Small screens (below 1000px) - Mobile menu */}
<div className="hidden lg:block xl:hidden relative">
  <div className="py-4">
    {/* First Row */}
    <div className="flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logos/logo.png"
          alt="Logo"
          width={1000}
          height={1000}
          className="w-[230px]"
        />
      </Link>

      {/* Top Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link href="/" className={getLinkStyles("/")}>Home</Link>
        <Link href="/about" className={getLinkStyles("/about")}>About Us</Link>
        <Link href="/services" className={getLinkStyles("/services")}>Services</Link>

        {/* Expertise Dropdown */}
        <div className="relative">
          <button
            data-expertise-dropdown
            className="flex items-center space-x-1 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <span>Expertise</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
              <Link
        href="/contact"
        className="px-3 py-2 text-sm font-medium transition-all duration-300 bg-white text-black hover:bg-gray-100"
      >
        Contact Us
      </Link>
      </div>
    </div>

    {/* Second Row */}
    <div className="mt-3 flex justify-end space-x-8">
      <Link href="/publications" className={getLinkStyles("/publications")}>
        Publications
      </Link>
      <Link href="/career" className={getLinkStyles("/career")}>Career</Link>
      <Link href="/training" className={getLinkStyles("/training")}>Training</Link>
      <Link href="/blogs" className={getLinkStyles("/blogs")}>Blog</Link>
      <Link href="/products" className={getLinkStyles("/products")}>Products</Link>
    </div>
  </div>
</div>



                <div className="lg:hidden">
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


                {/* Expertise Section - Shows when dropdown is open */}
                <div 
          data-expertise-dropdown
          className={`w-full transition-all duration-300 ease-in-out ${
            isDropdownOpen ? 'block' : 'hidden'
          } ${isOverDarkBackground ? 'text-white' : 'text-black'}`}
        >
          <div className="px-[8vw] pb-4">
            <div className="max-w-7xl mx-auto">
              {expertiseLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className={`animate-spin h-8 w-8 border-b-2 rounded-full ${isOverDarkBackground ? 'border-white' : 'border-black'}`}></div>
                  <span className={`ml-3 text-lg ${isOverDarkBackground ? 'text-white' : 'text-black'}`}>
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
                          className={`group flex items-center p-3 transition-all duration-300 ${
                            isOverDarkBackground 
                              ? 'bg-white/10 backdrop-blur-sm hover:bg-white/20' 
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          <h4 className={`font-semibold transition-colors duration-300 ${
                            isOverDarkBackground 
                              ? 'text-white group-hover:text-blue-100' 
                              : 'text-black group-hover:text-blue-600'
                          }`}>
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
                        className={`group flex flex-col items-center p-3 transition-all duration-300 hover:scale-105 ${
                          isOverDarkBackground 
                            ? 'bg-white/10 backdrop-blur-sm hover:bg-white/20' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <h4 className={`font-semibold text-center transition-colors duration-300 ${
                          isOverDarkBackground 
                            ? 'text-white group-hover:text-blue-100' 
                            : 'text-black group-hover:text-blue-600'
                        }`}>
                          {item.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
                    isOverDarkBackground ? 'text-white/60' : 'text-gray-400'
                  }`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <p className={`text-lg ${
                    isOverDarkBackground ? 'text-white/80' : 'text-gray-600'
                  }`}>
                    No expertise areas available yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Popover */}
      {isMobileMenuOpen && (
        <div 
          className="xl:hidden fixed inset-0 z-40   transition-opacity duration-300" 
          onClick={closeMobileMenu}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div 
            className={`absolute top-[100%] left-0 right-0   shadow-lg border-t border-white/10 transform transition-transform duration-300 ease-out`}
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideDown 0.3s ease-out' }}
          >
            <div className="px-6 py-4 space-y-4 bg-black/80 backdrop-blur-2xl">
              {/* Primary Navigation Links */}
              <div className="space-y-2">
                <Link 
                  href="/" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/') 
                      ? 'text-white font-semibold border-l-4 border-white pl-4' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/about') 
                      ? 'text-white font-semibold border-l-4 border-white pl-4' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  About Us
                </Link>
                <Link 
                  href="/services" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/services') 
                      ? 'text-white font-semibold border-l-4 border-white pl-4' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Services
                </Link>
                
                {/* Expertise Section */}
                <div className="py-2">
                  <div className="text-lg font-medium text-white mb-2">Expertise</div>
                  <div className="pl-4 space-y-2">
                    <Link 
                      href="/expertise/education" 
                      onClick={closeMobileMenu}
                      className="block py-1 text-white/80 hover:text-white transition-colors duration-300"
                    >
                      Education
                    </Link>
                    <Link 
                      href="/expertise/agriculture" 
                      onClick={closeMobileMenu}
                      className="block py-1 text-white/80 hover:text-white transition-colors duration-300"
                    >
                      Agriculture
                    </Link>
                    <Link 
                      href="/expertise/health" 
                      onClick={closeMobileMenu}
                      className="block py-1 text-white/80 hover:text-white transition-colors duration-300"
                    >
                      Public Health
                    </Link>
                  </div>
                </div>
              </div>

              {/* Secondary Navigation Links */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <Link 
                  href="/publications" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/publications') 
                      ? 'text-white font-semibold border-l-4 border-white pl-4' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Publications
                </Link>
                <Link 
                  href="/career" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/career') 
                      ? 'text-white font-semibold border-l-4 border-white pl-4' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Career
                </Link>
                <Link 
                  href="/training" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/training') 
                      ? 'text-white font-semibold border-l-4 border-white pl-4' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Training
                </Link>
                <Link 
                  href="/blogs" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/blogs') 
                      ? 'text-white font-semibold border-l-4 border-white pl-4' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Blog
                </Link>
                <Link 
                  href="/products" 
                  onClick={closeMobileMenu}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    isActiveLink('/products') 
                      ? 'text-white font-semibold border-l-4 border-white pl-4' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Products
                </Link>
              </div>

              {/* Contact Us Button */}
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="block w-full text-center bg-white text-gray-900 px-6 py-3 font-medium hover:bg-gray-100 transition-colors duration-300"
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
