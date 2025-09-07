import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'

export default function Footer() {
  return (
    <footer className="bg-dark-bg text-white">
      <div className="px-[8vw] py-16">
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
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all duration-300 group">
                <Icon icon="mdi:twitter" className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all duration-300 group">
                <Icon icon="mdi:instagram" className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 hover:scale-110 transition-all duration-300 group">
                <Icon icon="mdi:facebook" className="w-5 h-5 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-xl mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/services/mel" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Monitoring, Evaluation, and Learning (MEL)
                </Link>
              </li>
              <li>
                <Link href="/services/data-collection" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Data collection
                </Link>
              </li>
              <li>
                <Link href="/services/it-assistance" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  IT Assistance
                </Link>
              </li>
              <li>
                <Link href="/services/analytics" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/services/research" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Research
                </Link>
              </li>
            </ul>
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
                <Link href="/terms" className="text-sm text-gray-300 hover:text-primary-400 transition-colors duration-300 block">
                  Terms and Conditions
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
