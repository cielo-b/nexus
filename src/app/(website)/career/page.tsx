'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { careerOfferQueries, careerTeamQueries } from '@/lib/sanity/queries'
import { CareerOffer } from '@/types/careerOffer'
import { CareerTeam } from '@/types/careerTeam'
import { Icon } from '@iconify/react/dist/iconify.js'

export default function CareerPage() {
  const [careerOffers, setCareerOffers] = useState<CareerOffer[]>([])
  const [careerTeams, setCareerTeams] = useState<CareerTeam[]>([])
  const [loading, setLoading] = useState(true)

  // Static offers data
  const offersData = [
    {
      icon: "mdi:target",
      title: "Purposeful Work",
      description: "We engage in research and consulting that create lasting impact—advancing equity, policy reform, and sustainable development. Our projects are rooted in real-world needs, working with governments, NGOs, and international partners to drive change that matters."
    },
    {
      icon: "mdi:account-group-outline", 
      title: "Collaborative Expertise",
      description: "Our diverse team brings together experts in economics, gender equality and social inclusion, public health, and data science. We value mutual learning and open collaboration—when you join Insight Nexus, you join a space where your voice and expertise help shape better futures."
    },
    {
      icon: "mdi:school-outline",
      title: "Growth & Learning", 
      description: "We invest in our people. From training workshops to mentorship, we support each team member's personal and professional journey—whether you're sharpening your analytical skills or preparing for graduate study."
    },
    {
      icon: "mdi:lightbulb-outline",
      title: "Innovation-Driven Culture", 
      description: "We believe big ideas emerge from bold thinking. We embrace cutting-edge tools—like geospatial mapping, machine learning, and real-time data collection—to deliver smarter insights and transform how research is done."
    }
  ]

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
              
              <div className="space-y-6 text-lg text-gray-600 ">
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
      <section className="py-[10vh] bg-primary text-white ">
        <div className="px-[8vw] space-y-20">
          <div className="text-center">
            <h2 className="text-5xl max-w-4xl font-bold text-white mb-4 mx-auto">
            What We Offer
            </h2>
            <p className="max-w-4xl mx-auto">
              You'll get access to our ever-expanding client acquisition product
            </p>
          </div>

          <div className="flex justify-center gap-8 flex-wrap ">
            {offersData.map((offer, index) => (
              <div key={index} className="flex flex-col  items-start w-[23%]">
                <Icon icon={offer.icon} className="w-10 h-10 text-white mb-3" />
                <h3 className="text-lg text-white mb-4">
                  {offer.title}
                </h3>
                <p className="text-white/83">
                  {offer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Teams Section */}
      <section className="py-20 bg-white">
        <div className="px-[8vw] flex items-start flex-col md:flex-row ">
          <Image src="/images/careerTeams.png" alt="Career Teams" width={500} height={500} />
          <div className=" mb-16 space-y-8 pt-[5vh] md:pt-0 md:pl-[7vw]">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Teams</h2>
            <p className="">
              You'll get access to our ever-expanding client acquisition product
            </p>
            <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 - Expert-led training */}
            <div className="border border-[#EAE8E8] rounded-xl p-8 text-center flex flex-col items-center space-y-4 ">
            <Icon icon="mdi:microscope" className="w-12 h-12 text-blue-600" />
              <p >
              Research & Innovation Team
              </p>
              <p className='text-[#606060] text-sm '>
              The Research & Innovation Team leads the development of high-impact studies from design to insight.
              </p>
            </div>


            {/* Card 3 - Long-term success */}
            <div className="border border-[#EAE8E8] rounded-xl p-8 text-center flex flex-col items-center space-y-4 ">
            <Icon icon="mdi:chart-line" className="w-12 h-12 text-blue-600" />
              <p >
                Achieving long-term success through impactful, evidence-based strategies
              </p>
              <p className='text-[#606060] text-sm '>
              Experts in statistical modeling, impact evaluation, and econometrics
              </p>
            </div>
          </div>
          </div>
          

        </div>
      </section>
    </div>
  )
}
