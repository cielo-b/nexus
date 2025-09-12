'use client'

import Image from 'next/image'

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute -top-20 -left-20 w-80 h-80 opacity-20">
        <Image
          src="/images/lines.png"
          alt="Decorative lines"
          width={320}
          height={320}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute -bottom-20 -right-20 w-80 h-80 opacity-20">
        <Image
          src="/images/lines.png"
          alt="Decorative lines"
          width={320}
          height={320}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Illustration Section */}
        <div className="mb-12 max-w-xl">
          <Image
            src="/images/in-development.png"
            alt="Under Development Illustration"
            width={600}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            We're still <span className="text-[#014DFE]">developing</span> this
          </h1>
          
          <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            We offer tailored training programs designed to empower organizations with the skills and knowledge needed to drive data-driven transformation.
          </p>
        </div>
      </div>
    </div>
  )
}
