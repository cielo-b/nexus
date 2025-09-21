'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { motion, useInView } from 'framer-motion'


export default function ServicesPage() {
  // Refs for animations
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  
  // All useInView calls at the top level to prevent hook order issues
  const isServicesInView = useInView(servicesRef)
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  }
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  // Services data
  const services = [
    {
      title: "Research Design, Implementation & Dissemination",
      icon: "solar:chart-2-bold",
      items: [
        "Study design, implementation, and dissemination (both quantitative and qualitative)",
        "Baseline, midline, and endline studies",
        "Impact evaluations (RCTs, quasi-experimental, etc.)",
        "Feasibility studies and market research",
        "Needs assessments and situation analyses",
        "Development of data collection tools (e.g., KoboToolbox, ODK)",
        "Real-time monitoring systems with smart dashboards (eg: PowerBi, etc)",
        "GIS mapping and spatial data analysis",
        "Documentation of lessons learned, success stories, and best practices"
      ]
    },
    {
      title: "Monitoring, Evaluation, and Learning (MEL)",
      icon: "solar:check-circle-bold",
      items: [
        "Development of Monitoring, Evaluation, and Learning (MEL) plans",
        "MEL system setup and strengthening",
        "Data quality assurance (DQA) and data verification exercises",
        "Indicator development, tools, and results frameworks",
        "Logical framework (LogFrame) development and review",
        "Development of interactive dashboards and data visualizations",
        "Learning agenda development and implementation",
        "Design and facilitation of learning events and After Action Reviews (AARs)"
      ]
    },
    {
      title: "Capacity Building & Technical Training",
      icon: "solar:book-2-bold",
      items: [
        "Providing technical training on research, M&E, and data systems",
        "Organizational capacity development for CSOs, NGOs, and institutions",
        "Training on digital literacy, data science, and tech-enabled data systems",
        "Workshops on gender equality, disability inclusion, and social inclusion (GESI)",
        "Coaching on evidence use and data-driven decision-making"
      ]
    },
    {
      title: "Strategic Planning & Technical Advisory",
      icon: "solar:target-bold",
      items: [
        "Strategic plan and capacity action plan development",
        "Writing project proposals and grants applications",
        "Theory of Change (ToC) facilitation and design",
        "Policy brief and technical report writing",
        "Advisory services for GESI, climate resilience, and cross-cutting themes",
        "Donor reporting and strategic communications support"
      ]
    },
    {
      title: "Climate, Agriculture, and Sustainable Development",
      icon: "solar:leaf-bold",
      items: [
        "Research and evaluation in climate-smart agriculture",
        "Environmental and climate-related impact assessments",
        "Climate vulnerability and resilience analysis",
        "Integration of climate adaptation into MEL systems",
        "Program design for sustainable agriculture and food systems",
        "Technical support on green economy, ecosystem services, and circular economy principles",
        "Climate and environment-focused policy briefs and knowledge products",
        "Design and evaluation of MEL systems for sustainable agriculture and food security programs",
        "MEL support for public health resilience and climate-related health interventions",
        "Technical frameworks for green economy, ecosystem services, and circular economy initiatives"
      ]
    },
    {
      title: "Data Management Systems and Statistical Software Support",
      icon: "solar:database-bold",
      items: [
        "Data Collection and Management Systems: ODK, KoBocollect, Cspro, surveyCTO, DHIS2, commcare, QGIS",
        "Statistical Software Support: Stata, R, Excel, SPSS, PowerBi, Python, Dedoose, Atlas Ti, Nvivo"
      ],
      isSpecial: true
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] pt-[20vh] flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/80 w-full h-full"></div>
        <Image src="/images/hero.png" alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full opacity-20" />

        <div className="relative w-full max-w-[1700px] px-[8vw] mx-auto">
          <div className="text-left">
            <h1 className="text-6xl font-semibold mb-6">Our Services</h1>
            <p className="text-xl max-w-3xl leading-relaxed">
              We provide comprehensive research, monitoring, evaluation, and capacity building services to drive meaningful transformation across various sectors. Our expertise spans from data collection to strategic planning.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <motion.section 
        ref={servicesRef}
        initial="hidden"
        animate={isServicesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-16 sm:py-20 lg:py-24 bg-white"
      >
        <div className="max-w-[1700px] px-[8vw] mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive research, monitoring, evaluation, and capacity building services to drive meaningful transformation across various sectors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex flex-col h-auto bg-gray-50 p-6 sm:p-8 lg:p-10 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Icon icon={service.icon} className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 leading-tight">{service.title}</h2>
                </div>
                <div className="space-y-2">
                  {service.isSpecial ? (
                    <div className="space-y-4">
                      {service.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <h3 className="font-semibold text-gray-800 mb-3">{item.split(':')[0]}:</h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                            {item.split(':')[1]?.split(',').map((tool, toolIndex) => (
                              <li key={toolIndex} className="text-gray-800">
                                <span className="text-gray-600 text-sm">• {tool.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    service.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="px-3 py-1 rounded-full text-sm font-medium">
                        <span className="text-gray-600">• {item}</span>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}