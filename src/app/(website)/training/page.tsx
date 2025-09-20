'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-[20vh]  flex flex-col items-center justify-center ">
        <div className="relative px-[8vw]">
          <div className="text-center">
            <h1 className="text-7xl font-semibold mb-6">Our <span className='text-primary'>Trainings</span></h1>
            <p className="max-w-3xl mx-auto leading-relaxed">
            We offer tailored training programs designed to empower organizations with the skills 
            and knowledge needed to drive data-driven transformation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-[12vh] bg-white">
        <div className="px-[8vw]">
          {/* Training Features Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Expert-led training */}
            <div className="border border-[#EAE8E8]  p-8 text-center ">
              <div className="w-20 h-20 bg-gray-100  flex items-center justify-center mx-auto mb-6">
                <div className="w-12 h-12 bg-primary   flex items-center justify-center">
                  <Icon icon="mdi:play" className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-[#606060] text-sm leading-relaxed">
                Expert-led training across education, agriculture, and public health sectors
              </p>
            </div>

            {/* Card 2 - Team empowerment */}
            <div className="border border-[#EAE8E8]  p-8 text-center ">
              <div className="w-20 h-20 bg-gray-100  flex items-center justify-center mx-auto mb-6">
                <div className="w-12 h-12 bg-primary   flex items-center justify-center">
                  <Icon icon="mdi:account-group" className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-[#606060] text-sm leading-relaxed">
                Equipping teams with tools for sustainable growth and enhanced performance
              </p>
            </div>

            {/* Card 3 - Long-term success */}
            <div className="border border-[#EAE8E8]  p-8 text-center ">
              <div className="w-20 h-20 bg-gray-100  flex items-center justify-center mx-auto mb-6">
                <div className="w-12 h-12 bg-primary   flex items-center justify-center">
                  <Icon icon="mdi:feather" className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-[#606060] text-sm leading-relaxed">
                Achieving long-term success through impactful, evidence-based strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-[10vh] bg-primary text-white ">
        <div className="px-[8vw] space-y-20">
          <div className="text-center">
            <h2 className="text-5xl max-w-4xl font-bold text-white mb-4 mx-auto">
              Why Choose Insight Nexus Ltd For Your Training Needs?
            </h2>
            <p className="max-w-4xl mx-auto">
              You'll get access to our ever-expanding client acquisition product
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-20 px-[3vw]">
            {/* Expert-Led Training */}
            <div className="flex flex-col gap-y-4 items-start">
                <Icon icon="mdi:refresh" className="w-8 h-8 text-white " />
              <h3 className="text-lg  text-white mb-4">
                Expert-Led Training
              </h3>
              <p className="text-white/83">
                Our programs are led by experienced professionals who combine practical knowledge with academic excellence.
              </p>
            </div>

            {/* Tailored Courses */}
            <div className="flex flex-col gap-y-4 items-start">
                <Icon icon="mdi:pencil" className="w-8 h-8 text-white " />
              <h3 className="text-lg  text-white mb-4">
                Tailored Courses
              </h3>
              <p className="text-white/83">
                We customize our courses to meet each client's specific needs, ensuring relevant skill development.
              </p>
            </div>

            {/* Comprehensive Solutions */}
            <div className="flex flex-col gap-y-4 items-start">
                <Icon icon="mdi:send" className="w-8 h-8 text-white " />
              <h3 className="text-lg  text-white mb-4">
                Comprehensive Solutions
              </h3>
              <p className="text-white/83">
                Whether you're an individual or an organization, we have the training solutions you need.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}