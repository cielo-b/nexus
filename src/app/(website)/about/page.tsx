'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { client } from '@/lib/sanity/client'
import { teamMemberQueries, companyInfoQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { TeamMember } from '@/types/teamMember'
import { CompanyInfo } from '@/types/companyInfo'

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamData, companyData] = await Promise.all([
          client.fetch(teamMemberQueries.getAllTeamMembers),
          client.fetch(companyInfoQueries.getAllCompanyInfo)
        ])

        setTeamMembers(teamData)
        setCompanyInfo(companyData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  const getCompanyInfoByType = (type: string) => {
    return companyInfo.find(info => info.type === type)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center border-b border-b-[#890000] bg-white py-12 sm:py-20">
        <div className="px-4 sm:px-6 lg:px-[8vw] w-full">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6">
              About <span className="text-blue-600">Nexus</span>
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-2">
                Insight Nexus Ltd. established in Rwanda, excels in delivering a comprehensive range of consultancy services.
                Our expertise spans sectors such as public health, agriculture, education, tourism, technology, energy, and finance,
                with a focus on providing sustainable, data-driven strategies. We support a diverse clientele, including individual
                researchers, students, profit-oriented businesses, government institutions, universities, and both international
                and local NGOs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get To Know Nexus / What We Do Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-[8vw] space-y-12 sm:space-y-16 lg:space-y-20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-12 lg:gap-20">
            <div className='w-full lg:w-[40%] order-2 lg:order-1'>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Get To Know <span className="text-blue-600">Nexus</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Insight Nexus is a dynamic consultancy firm committed to empowering organizations through a wide range of
                tailored services designed to foster growth and operational excellence, by leveraging a deep understanding
                of data analytics, market trends, and business strategies. Insight Nexus provides customized, data-driven
                solutions that cater to the unique needs of each client. Beyond just data-driven strategies, we offer
                comprehensive solutions.
              </p>
            </div>
            <div className='w-full lg:w-[60%] order-1 lg:order-2'>
              <Image src="/images/about1.png" alt="Get To Know Nexus" width={10000} height={100000} className="w-full object-cover rounded-lg shadow-lg" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-12 lg:gap-20">
            <div className='w-full lg:w-[60%] order-1'>
              <Image src="/images/about2.png" alt="What We Do" width={10000} height={100000} className="w-full object-cover rounded-lg shadow-lg" />
            </div>
            <div className='w-full lg:w-[40%] order-2'>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                What We <span className="text-blue-600">Do?</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                Insight Nexus Ltd is a forward-thinking consultancy firm dedicated to providing holistic, results-driven
                solutions that help organizations achieve their goals. We offer a broad spectrum of services, including
                Research Design, Implementation & Dissemination, Monitoring, Evaluation, and Learning (MEL), Capacity
                building & technical training, and Strategic Planning & technical Advisory. In addition, we specialize
                in facilitating grants applications, climate resilience assessments, and developing sustainable strategies
                across key sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary">
        <div className="px-4 sm:px-6 lg:px-[8vw]">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-2 sm:mb-4">Who we serve</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: "solar:buildings-3-linear",
                title: "Corporations",
                description: "Forward-thinking companies working to transform their impact and manage social risks."
              },
              {
                icon: "solar:money-bag-outline",
                title: "Investors & Funders",
                description: "Funders seeking quality, comparable social performance data across their portfolio."
              },
              {
                icon: "solar:users-group-two-rounded-linear",
                title: "NGOs & Social Enterprises",
                description: "Social change organizations needing better data to improve their impact."
              },
              {
                icon: "solar:buildings-3-linear",
                title: "Individual researchers",
                description: "Forward-thinking companies working to transform their impact and manage social risks."
              },
              {
                icon: "solar:users-group-two-rounded-linear",
                title: "Students",
                description: "Social change organizations needing better data to improve their impact."
              }
            ].map((item, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 bg-white/20">
                  <Icon icon={item.icon} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base text-left">
                  {item.description}
                </p>
                <button className="border-2 border-white text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm sm:text-base">
                  Get in touch
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Access When You Join Nexus Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-[8vw]">
          <div className="flex gap-8 sm:gap-12 lg:gap-20 flex-col lg:flex-row items-center">
            <div className='w-full lg:w-[40%] order-2 lg:order-1 p-4 sm:p-6 lg:p-10'>
            <Image src="/images/about3.png" alt="What You Access" width={10000} height={100000} className="w-full object-cover rounded-lg shadow-lg" /> 
            </div>
            <div className='w-full lg:w-[60%] order-1 lg:order-2'>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                What You Access When You Join <span className="text-blue-600">Nexus</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                You'll get access to our ever-expanding client acquisition product.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  {
                    icon: "mdi:lightbulb-outline",
                    title: "Research Design, Implementation & Dissemination",
                    description: "Comprehensive research services from design to publication and dissemination."
                  },
                  {
                    icon: "mdi:chart-line",
                    title: "Monitoring, Evaluation, and Learning (MEL)",
                    description: "Track progress, measure impact, and learn from your projects with our MEL services."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-4 sm:gap-5 border border-[#EAE8E8] rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-blue-50 rounded-full p-3">
                      <Icon icon={item.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-[#014DFE]" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-base sm:text-lg font-medium mb-2">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-[#606060]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="px-4 sm:px-6 lg:px-[8vw]">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              Why Choose <span className="text-blue-600">Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: "mdi:lightbulb-outline",
                title: "Innovation & Technology",
                description: "At Insight Nexus Ltd, we continuously invest in the latest technologies to enhance our research capabilities."
              },
              {
                icon: "mdi:pencil-outline",
                title: "Rigorous Methodology",
                description: "Our approach combines rigorous data collection methodologies with in-depth analysis, offering clients an integrated research process."
              },
              {
                icon: "mdi:send",
                title: "Local Context Understanding",
                description: "At Insight Nexus Ltd, delivering impactful insights requires a deep understanding of the local context."
              },
              {
                icon: "mdi:share-variant",
                title: "Ethical Standards",
                description: "We strongly emphasize maintaining the safety, dignity, and rights of all participants in our studies with highest ethical standards."
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-start gap-4 sm:gap-5 bg-black/5 rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-black/10 transition-colors duration-300">
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm">
                <Icon icon={item.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-[#014DFE]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#555555]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary text-white">
        <div className="px-4 sm:px-6 lg:px-[8vw]">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-4">Meet Our Team</h2>
            <p className="text-lg sm:text-xl lg:text-2xl">Meet the team behind the work</p>
          </div>

          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-lg sm:text-xl">Loading team members...</div>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {teamMembers.map((member) => (
                <div key={member._id} className='space-y-3 sm:space-y-4 text-center'>
                  <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-4 sm:mb-6 overflow-hidden rounded-full">
                    <Image
                      src={getSanityImage(member.image)}
                      alt={member.image.alt || member.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm sm:text-base mb-3 sm:mb-4 text-blue-100">
                    {member.title}
                  </p>
                  {member.bio && (
                    <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Icon icon="mdi:account-group" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-medium mb-2">No team members yet</h3>
              <p className="text-sm sm:text-base text-blue-100">Team members will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
