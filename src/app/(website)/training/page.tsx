'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { trainingQueries, trainingFeatureQueries } from '@/lib/sanity/queries'
import { Training } from '@/types/training'
import { TrainingFeature } from '@/types/training'

export default function TrainingPage() {
  const [ourTrainingsFeatures, setOurTrainingsFeatures] = useState<TrainingFeature[]>([])
  const [whyChooseUsFeatures, setWhyChooseUsFeatures] = useState<TrainingFeature[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ourTrainingsData, whyChooseUsData] = await Promise.all([
          client.fetch(trainingFeatureQueries.getTrainingFeaturesBySection, { section: 'our-trainings' }),
          client.fetch(trainingFeatureQueries.getTrainingFeaturesBySection, { section: 'why-choose-us' })
        ])
        
        setOurTrainingsFeatures(ourTrainingsData)
        setWhyChooseUsFeatures(whyChooseUsData)
      } catch (error) {
        console.error('Error fetching training data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderIcon = (feature: TrainingFeature) => {
    if (feature.iconType === 'emoji' && feature.icon) {
      return (
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          {feature.icon}
        </div>
      )
    }

    // For heroicons or custom SVG, you can expand this later
    return (
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">📚</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="px-[8vw]">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Trainings</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We offer tailored training programs designed to empower organizations with the skills 
              and knowledge needed to drive data-driven transformation.
            </p>
          </div>

          {/* Our Trainings Features */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Loading training features...</div>
            </div>
          ) : ourTrainingsFeatures.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {ourTrainingsFeatures.map((feature) => (
                <div key={feature._id} className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                  {renderIcon(feature)}
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No training features yet</h3>
              <p className="text-gray-500">Training features will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-blue-600">
        <div className="px-[8vw]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Insight Nexus Ltd For Your Training Needs?
            </h2>
            <p className="text-xl text-blue-100">
              You'll get access to our ever-expanding client acquisition product
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl text-white">Loading features...</div>
            </div>
          ) : whyChooseUsFeatures.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseUsFeatures.map((feature) => (
                <div key={feature._id} className="bg-white rounded-lg p-8 text-center">
                  {renderIcon(feature)}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No features yet</h3>
              <p className="text-blue-100">Features will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our training programs and transform your organization with data-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
