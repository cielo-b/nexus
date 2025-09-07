'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { client } from '@/lib/sanity/client'
import { teamMemberQueries, whyChooseUsQueries, companyInfoQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { TeamMember } from '@/types/teamMember'
import { WhyChooseUs } from '@/types/whyChooseUs'
import { CompanyInfo } from '@/types/companyInfo'

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUs[]>([])
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamData, whyChooseData, companyData] = await Promise.all([
          client.fetch(teamMemberQueries.getAllTeamMembers),
          client.fetch(whyChooseUsQueries.getAllWhyChooseUs),
          client.fetch(companyInfoQueries.getAllCompanyInfo)
        ])
        
        setTeamMembers(teamData)
        setWhyChooseUs(whyChooseData)
        setCompanyInfo(companyData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderIcon = (item: WhyChooseUs) => {
    if (item.iconType === 'emoji') {
      return (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          {item.icon}
        </div>
      )
    }

    // For heroicons or custom SVG, you can expand this later
    return (
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">{item.icon}</span>
      </div>
    )
  }

  const getCompanyInfoByType = (type: string) => {
    return companyInfo.find(info => info.type === type)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="px-[8vw]">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Nexus</span>
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
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
      <section className="py-20 bg-white">
        <div className="px-[8vw]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Get To Know Nexus */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get To Know <span className="text-blue-600">Nexus</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Insight Nexus is a dynamic consultancy firm committed to empowering organizations through a wide range of 
                tailored services designed to foster growth and operational excellence, by leveraging a deep understanding 
                of data analytics, market trends, and business strategies. Insight Nexus provides customized, data-driven 
                solutions that cater to the unique needs of each client. Beyond just data-driven strategies, we offer 
                comprehensive solutions.
              </p>
              <div className="relative">
                <Image
                  src="/placeholder.jpg"
                  alt="Get To Know Nexus"
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* What We Do */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What We <span className="text-blue-600">Do?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Insight Nexus Ltd is a forward-thinking consultancy firm dedicated to providing holistic, results-driven 
                solutions that help organizations achieve their goals. We offer a broad spectrum of services, including 
                Research Design, Implementation & Dissemination, Monitoring, Evaluation, and Learning (MEL), Capacity 
                building & technical training, and Strategic Planning & technical Advisory. In addition, we specialize 
                in facilitating grants applications, climate resilience assessments, and developing sustainable strategies 
                across key sectors.
              </p>
              <div className="relative">
                <Image
                  src="/placeholder.jpg"
                  alt="What We Do"
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-20 bg-primary ">
        <div className="px-[8vw]">
          <div className="text-center mb-16">
            <h2 className="text-6xl text-white mb-4">Who we serve</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Top Row - 3 items */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="solar:buildings-3-linear" className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Corporations</h3>
              <p className="text-white mb-6 text-left">
                Forward-thinking companies working to transform their impact and manage social risks.
              </p>
              <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Get in touch
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="solar:money-bag-outline" className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Investors & Funders</h3>
              <p className="text-white mb-6 text-left">
                Funders seeking quality, comparable social performance data across their portfolio.
              </p>
              <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Get in touch
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="solar:users-group-two-rounded-linear" className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">NGOs & Social Enterprises</h3>
              <p className="text-white mb-6 text-left">
                Social change organizations needing better data to improve their impact.
              </p>
              <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Get in touch
              </button>
            </div>

            {/* Bottom Row - 2 items centered */}
            <div className="text-center md:col-start-1 md:col-span-1">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="solar:buildings-3-linear" className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Individual researchers</h3>
              <p className="text-white mb-6 text-left">
                Forward-thinking companies working to transform their impact and manage social risks.
              </p>
              <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Get in touch
              </button>
            </div>

            <div className="text-center md:col-start-3 md:col-span-1">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="solar:users-group-two-rounded-linear" className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Students</h3>
              <p className="text-white mb-6 text-left">
                Social change organizations needing better data to improve their impact.
              </p>
              <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What You Access When You Join Nexus Section */}
      <section className="py-20 bg-white">
        <div className="px-[8vw]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What You Access When You Join <span className="text-blue-600">Nexus</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                You'll get access to our ever-expanding client acquisition product.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon icon="mdi:lightbulb-outline" className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Design, Implementation & Dissemination</h3>
                    <p className="text-gray-600">
                      Comprehensive research services from design to publication and dissemination.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon icon="mdi:chart-line" className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Monitoring, Evaluation, and Learning (MEL)</h3>
                    <p className="text-gray-600">
                      Track progress, measure impact, and learn from your projects with our MEL services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-gray-500 text-lg">Illustration placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="px-[8vw]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">Us</span>
            </h2>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Loading why choose us features...</div>
            </div>
          ) : whyChooseUs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((feature) => (
                <div key={feature._id} className="text-center">
                  {renderIcon(feature)}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
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
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon icon="mdi:check-circle-outline" className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No features yet</h3>
              <p className="text-gray-500">Why choose us features will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-20 bg-primary text-white ">
        <div className="px-[8vw]">
          <div className="text-center mb-16">
            <h2 className="text-7xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-2xl ">Meet the team behind the work</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Loading team members...</div>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member._id} className='space-y-2'>
                  <div className="w-full  mx-auto mb-6  overflow-hidden">
                    <Image
                      src={getSanityImage(member.image)}
                      alt={member.image.alt || member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {member.name}
                  </h3>
                  <p className=" mb-4">
                    {member.title}
                  </p>
                  {member.bio && (
                    <p className=" text-sm">
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Icon icon="mdi:account-group" className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-medium  mb-2">No team members yet</h3>
              <p className="text-blue-100">Team members will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
