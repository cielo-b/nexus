'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import ContactModal from './ContactModal'
import ExpertiseDropdown from './ExpertiseDropdown'

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if current page should always have white background
  const alwaysWhitePages = ['/about', '/career', '/training']
  const scrollEffectPages = ['/', '/publications', '/blogs',"/services"]
  
  // Check if current page is a single publication or blog page
  const isSinglePublicationPage = pathname.startsWith('/publications/') && pathname !== '/publications'
  const isSingleBlogPage = pathname.startsWith('/blogs/') && pathname !== '/blogs'
  const isSingleServicePage = pathname.startsWith('/services/') && pathname !== '/services'
  
  // For pages with scroll effect, use white background only when scrolled
  // For other pages, always use white background
  const shouldUseWhiteBg = alwaysWhitePages.includes(pathname) || 
    (scrollEffectPages.includes(pathname) && isScrolled) ||
    (isSinglePublicationPage && isScrolled) ||
    (isSingleBlogPage && isScrolled) ||
    (isSingleServicePage && isScrolled)

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

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 px-[8vw] transition-all duration-300 ${
        isDropdownOpen
          ? 'bg-[#014DFE] text-white'
          : shouldUseWhiteBg 
            ? 'bg-white text-black ' 
            : 'bg-transparent text-white'
      }`}>
      <div className={`border-b transition-colors duration-300 ${
        isDropdownOpen
          ? 'border-white/20'
          : shouldUseWhiteBg ? 'border-gray-200' : 'border-danger'
      }`}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logos/logo.png" alt="Logo" width={1000} height={1000} className='w-[200px]' />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors duration-300 ${
                isActiveLink('/') 
                  ? isDropdownOpen
                    ? 'text-white font-semibold border-b-2 border-white pb-1'
                    : 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1'
                  : isDropdownOpen
                    ? 'text-white hover:text-blue-100'
                    : shouldUseWhiteBg 
                      ? 'text-gray-700 hover:text-primary-500' 
                      : 'text-white hover:text-primary-300'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors duration-300 ${
                isActiveLink('/about') 
                  ? isDropdownOpen
                    ? 'text-white font-semibold border-b-2 border-white pb-1'
                    : 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1'
                  : isDropdownOpen
                    ? 'text-white hover:text-blue-100'
                    : shouldUseWhiteBg 
                      ? 'text-gray-700 hover:text-primary-500' 
                      : 'text-white hover:text-primary-300'
              }`}
            >
              About Us
            </Link>
            <Link 
              href="/services" 
              className={`transition-colors duration-300 ${
                isActiveLink('/services') 
                  ? isDropdownOpen
                    ? 'text-white font-semibold border-b-2 border-white pb-1'
                    : 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1'
                  : isDropdownOpen
                    ? 'text-white hover:text-blue-100'
                    : shouldUseWhiteBg 
                      ? 'text-gray-700 hover:text-primary-500' 
                      : 'text-white hover:text-primary-300'
              }`}
            >
              Services
            </Link>
            
            {/* Expertise Dropdown */}
            <div className="relative">
              <button
                data-expertise-dropdown
                className={`flex items-center space-x-1 transition-colors duration-300 ${
                  isDropdownOpen
                    ? 'text-white hover:text-blue-100'
                    : shouldUseWhiteBg 
                      ? 'text-gray-700 hover:text-primary-500' 
                      : 'text-white hover:text-primary-300'
                }`}
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
              <ExpertiseDropdown 
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
              />
            </div>

            <Link 
              href="/publications" 
              className={`transition-colors duration-300 ${
                isActiveLink('/publications') 
                  ? isDropdownOpen
                    ? 'text-white font-semibold border-b-2 border-white pb-1'
                    : 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1'
                  : isDropdownOpen
                    ? 'text-white hover:text-blue-100'
                    : shouldUseWhiteBg 
                      ? 'text-gray-700 hover:text-primary-500' 
                      : 'text-white hover:text-primary-300'
              }`}
            >
              Publications
            </Link>
            <Link 
              href="/career" 
              className={`transition-colors duration-300 ${
                isActiveLink('/career') 
                  ? isDropdownOpen
                    ? 'text-white font-semibold border-b-2 border-white pb-1'
                    : 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1'
                  : isDropdownOpen
                    ? 'text-white hover:text-blue-100'
                    : shouldUseWhiteBg 
                      ? 'text-gray-700 hover:text-primary-500' 
                      : 'text-white hover:text-primary-300'
              }`}
            >
              Career
            </Link>
            <Link 
              href="/training" 
              className={`transition-colors duration-300 ${
                isActiveLink('/training') 
                  ? isDropdownOpen
                    ? 'text-white font-semibold border-b-2 border-white pb-1'
                    : 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1'
                  : isDropdownOpen
                    ? 'text-white hover:text-blue-100'
                    : shouldUseWhiteBg 
                      ? 'text-gray-700 hover:text-primary-500' 
                      : 'text-white hover:text-primary-300'
              }`}
            >
              Training
            </Link>
            <Link 
              href="/blogs" 
              className={`transition-colors duration-300 ${
                isActiveLink('/blogs') 
                  ? isDropdownOpen
                    ? 'text-white font-semibold border-b-2 border-white pb-1'
                    : 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1'
                  : isDropdownOpen
                    ? 'text-white hover:text-blue-100'
                    : shouldUseWhiteBg 
                      ? 'text-gray-700 hover:text-primary-500' 
                      : 'text-white hover:text-primary-300'
              }`}
            >
              Blog
            </Link>
            <Link 
              href="/products" 
              className={`transition-colors duration-300 ${
                isActiveLink('/products') 
                  ? isDropdownOpen
                    ? 'text-white font-semibold border-b-2 border-white pb-1'
                    : 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1'
                  : isDropdownOpen
                    ? 'text-white hover:text-blue-100'
                    : shouldUseWhiteBg 
                      ? 'text-gray-700 hover:text-primary-500' 
                      : 'text-white hover:text-primary-300'
              }`}
            >
              Products
            </Link>
          </div>

          {/* Contact Us Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                isDropdownOpen
                  ? 'bg-white text-[#014DFE] hover:bg-blue-50 border-2 border-white'
                  : shouldUseWhiteBg
                    ? 'bg-primary-500 text-white hover:bg-primary-600 border-2 border-primary-500'
                    : 'bg-white border-2 border-white text-primary-500 hover:bg-primary-50'
              }`}
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className={`transition-colors duration-300 ${
                isDropdownOpen
                  ? 'text-white hover:text-blue-100'
                  : shouldUseWhiteBg 
                    ? 'text-gray-700 hover:text-primary-500' 
                    : 'text-white hover:text-primary-300'
              }`}
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
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300" 
          onClick={closeMobileMenu}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div 
            className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideDown 0.3s ease-out' }}
          >
            <div className="px-6 py-4 space-y-4">
              {/* Navigation Links */}
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

              {/* Contact Us Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsContactModalOpen(true)
                    closeMobileMenu()
                  }}
                  className="block w-full text-center bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </nav>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  )
}
