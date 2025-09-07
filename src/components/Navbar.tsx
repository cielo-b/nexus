'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
  const shouldUseWhiteBg = alwaysWhitePages.includes(pathname) || isScrolled

  // Check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-[8vw] transition-all duration-300 ${
      shouldUseWhiteBg 
        ? 'bg-white text-black ' 
        : 'bg-transparent text-white'
    }`}>
      <div className={`border-b transition-colors duration-300 ${
        shouldUseWhiteBg ? 'border-gray-200' : 'border-danger'
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
                  ? 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1' 
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
                  ? 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1' 
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
                  ? 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1' 
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
                className={`flex items-center space-x-1 transition-colors duration-300 ${
                  shouldUseWhiteBg 
                    ? 'text-gray-700 hover:text-primary-500' 
                    : 'text-white hover:text-primary-300'
                }`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <span>Expertise</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="py-1">
                    <Link href="/expertise/education" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Education
                    </Link>
                    <Link href="/expertise/agriculture" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Agriculture
                    </Link>
                    <Link href="/expertise/health" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Public Health
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/publications" 
              className={`transition-colors duration-300 ${
                isActiveLink('/publications') 
                  ? 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1' 
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
                  ? 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1' 
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
                  ? 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1' 
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
                  ? 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1' 
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
                  ? 'text-primary-500 font-semibold border-b-2 border-primary-500 pb-1' 
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
            <Link
              href="/contact"
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                shouldUseWhiteBg
                  ? 'bg-primary-500 text-white hover:bg-primary-600 border-2 border-primary-500'
                  : 'bg-white border-2 border-white text-primary-500 hover:bg-primary-50'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className={`transition-colors duration-300 ${
              shouldUseWhiteBg 
                ? 'text-gray-700 hover:text-primary-500' 
                : 'text-white hover:text-primary-300'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
