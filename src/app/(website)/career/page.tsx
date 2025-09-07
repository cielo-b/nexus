'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { careerOfferQueries, careerTeamQueries } from '@/lib/sanity/queries'
import { CareerOffer } from '@/types/careerOffer'
import { CareerTeam } from '@/types/careerTeam'

export default function CareerPage() {
  const [careerOffers, setCareerOffers] = useState<CareerOffer[]>([])
  const [careerTeams, setCareerTeams] = useState<CareerTeam[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offersData, teamsData] = await Promise.all([
          client.fetch(careerOfferQueries.getAllCareerOffers),
          client.fetch(careerTeamQueries.getAllCareerTeams)
        ])
        
        setCareerOffers(offersData)
        setCareerTeams(teamsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderIcon = (item: CareerOffer | CareerTeam) => {
    if (item.iconType === 'emoji') {
      return (
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          {item.icon}
        </div>
      )
    }

    // For heroicons or custom SVG, you can expand this later
    return (
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">{item.icon}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="px-[8vw]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-8">
                Why Join <span className="text-blue-600">Insight Nexus</span>
              </h1>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  We generate evidence for real-world change, focusing on high-quality research in sectors 
                  like public health, education, social protection, youth empowerment, and gender equality. 
                  Our work emphasizes ethical practices and social justice, ensuring that every project 
                  contributes meaningfully to positive societal impact.
                </p>
                
                <div className="border-t border-gray-200 pt-6"></div>
                
                <p>
                  Our approach is grounded in empathy, integrity, and contextual understanding. We ensure 
                  that research participants are treated with dignity and that our insights uplift communities 
                  and policymakers. Our team comprises professionals from diverse disciplines united by a 
                  passion for rigorous inquiry and meaningful impact.
                </p>
                
                <p>
                  We are committed to fostering a workplace that values people and provides opportunities 
                  for growth, leadership, and meaningful contributions. Whether you're an early-career 
                  researcher or an experienced evaluator, there's a place for you to make a difference 
                  at Insight Nexus.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">Video Player Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-blue-600">
        <div className="px-[8vw]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What We Offer</h2>
            <p className="text-xl text-blue-100">
              You'll get access to our ever-expanding client acquisition product
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl text-white">Loading career offers...</div>
            </div>
          ) : careerOffers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {careerOffers.map((offer) => (
                <div key={offer._id} className="bg-white rounded-lg p-8 shadow-lg">
                  {renderIcon(offer)}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {offer.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No career offers yet</h3>
              <p className="text-blue-100">Career offers will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>

      {/* Our Teams Section */}
      <section className="py-20 bg-white">
        <div className="px-[8vw]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Teams</h2>
            <p className="text-xl text-gray-600">
              You'll get access to our ever-expanding client acquisition product
            </p>
          </div>
          
          {/* Team Illustration */}
          <div className="text-center mb-16">
            <div className="w-full max-w-2xl mx-auto h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Loading career teams...</div>
            </div>
          ) : careerTeams.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {careerTeams.map((team) => (
                <div key={team._id} className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
                  {renderIcon(team)}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {team.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {team.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No career teams yet</h3>
              <p className="text-gray-500">Career teams will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 ">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Join Our Team?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore our current opportunities and discover how you can make a meaningful impact 
            with Insight Nexus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Open Positions
            </Link>
            <Link
              href="/contact"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
