'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-44 max-md:pt-36 max-sm:pt-36 pb-20 max-md:pb-10 sm:pb-3 max-sm:pb-10">
        <div className="relative px-6 max-sm:px-4">
          <div className="flex flex-col lg:gap-12 md:gap-6 max-sm:gap-4 sm:gap-4 items-center justify-center relative w-full">
            <h1 className="text-black font-bold text-5xl w-full text-center">
              <span className="text-[#2563eb] inline-block relative items-center justify-center">
                <span className="z-40 relative">Our</span>
              </span> Trainings
            </h1>
            <div className="flex flex-col items-center gap-8 max-w-4xl">
              <p className="text-lg text-black/60 font-normal z-10 text-center leading-relaxed">
                At <span className="text-[#2563eb] font-semibold">InsightNexus</span>, we offer tailored training programs designed to empower organizations with the skills and knowledge needed to drive data-driven transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-[8vw] max-w-[1700px] mx-auto">
        <div className="mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 w-full">
            <div className="group flex flex-col items-center text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 mb-4 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <Icon icon="mdi:book-open" className="w-7 h-7 text-[#2563eb]" />
              </div>
              <p className="text-sm md:text-base text-gray-600">Expert-led training across education, agriculture, and public health sectors</p>
            </div>
            <div className="group flex flex-col items-center text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 mb-4 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <Icon icon="mdi:trending-up" className="w-7 h-7 text-[#2563eb]" />
              </div>
              <p className="text-sm md:text-base text-gray-600">Equipping teams with tools for sustainable growth and enhanced performance</p>
            </div>
            <div className="group flex flex-col items-center text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 mb-4 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <Icon icon="mdi:target" className="w-7 h-7 text-[#2563eb]" />
              </div>
              <p className="text-sm md:text-base text-gray-600">Achieving long-term success through impactful, evidence-based strategies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br bg-[#f2f4fa]">
        <div className="max-w-[1700px] px-[8vw] mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-16 ">
            Why Choose Insight Nexus Ltd For Your Training Needs?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Icon icon="mdi:lightbulb" className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Expert-Led Training</h3>
              <p className="text-gray-600">Our programs are led by experienced professionals who combine practical knowledge with academic excellence.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Icon icon="mdi:account-group" className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Tailored Courses</h3>
              <p className="text-gray-600">We customize our courses to meet each client's specific needs, ensuring relevant skill development.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Icon icon="mdi:target" className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Comprehensive Solutions</h3>
              <p className="text-gray-600">Whether you're an individual or an organization, we have the training solutions you need.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}