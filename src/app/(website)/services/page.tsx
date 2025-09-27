'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { motion, useInView } from 'framer-motion'
import { client } from '@/lib/sanity/client'
import { howWeDoQueries, accordionItemQueries } from '@/lib/sanity/queries'
import { HowWeDo } from '@/types/howWeDo'
import { AccordionItem } from '@/types/accordionItem'
import BlockContentRenderer from '@/components/BlockContentRenderer'
import { getSanityImage } from '@/lib/getSanityImage'


export default function ServicesPage() {
  // State for How We Do content
  const [howWeDoContent, setHowWeDoContent] = useState<HowWeDo | null>(null)
  const [loading, setLoading] = useState(true)
  
  // State for accordion items
  const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([])
  const [accordionLoading, setAccordionLoading] = useState(true)
  
  // State for accordion
  const [activeAccordionItem, setActiveAccordionItem] = useState<number | null>(0)

  // Handle accordion item click
  const handleAccordionClick = (index: number) => {
    setActiveAccordionItem(activeAccordionItem === index ? null : index)
  }


  // Refs for animations
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const howWeDoRef = useRef(null)

  // All useInView calls at the top level to prevent hook order issues
  const isServicesInView = useInView(servicesRef)
  const isHowWeDoInView = useInView(howWeDoRef)

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

  // Fetch How We Do content
  useEffect(() => {
    const fetchHowWeDoContent = async () => {
      try {
        const content = await client.fetch(howWeDoQueries.getHowWeDo)
        setHowWeDoContent(content)
      } catch (error) {
        console.error('Error fetching How We Do content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHowWeDoContent()
  }, [])

  // Fetch accordion items
  useEffect(() => {
    const fetchAccordionItems = async () => {
      try {
        const items = await client.fetch(accordionItemQueries.getAllAccordionItems)
        setAccordionItems(items)
        // Set first item as active by default
        if (items.length > 0) {
          setActiveAccordionItem(0)
        }
      } catch (error) {
        console.error('Error fetching accordion items:', error)
      } finally {
        setAccordionLoading(false)
      }
    }

    fetchAccordionItems()
  }, [])

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
        className="py-10 bg-white"
      >
        <div className="max-w-[1700px] px-[8vw] mx-auto">

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

      <div className="mx-auto max-w-2xl bg-primary h-2 rounded-full mb-8 "></div>

      {/* How We Do Section */}
      {!loading && howWeDoContent && (
        <div className="max-w-[1700px] px-[8vw] mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-4 "
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              How We <span className="text-blue-600">Do It</span>
            </h2>
            {/* How We Work Section - Modern Grid Layout */}
            <section className="py-8" id="how-we-work">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {accordionLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading content...</p>
                    </div>
                  </div>
                ) : accordionItems.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Expandable Items */}
                    <div className="space-y-4">
                      {accordionItems.map((item, index) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                        >
                          <button
                            onClick={() => handleAccordionClick(index)}
                            className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                {item.title}
                              </h3>
                              <motion.div
                                animate={{ rotate: activeAccordionItem === index ? 45 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex-shrink-0"
                              >
                                <Icon 
                                  icon="mdi:plus" 
                                  className="w-6 h-6 text-blue-600" 
                                />
                              </motion.div>
                            </div>
                          </button>
                          
                          <motion.div
                            initial={false}
                            animate={{
                              height: activeAccordionItem === index ? "auto" : 0,
                              opacity: activeAccordionItem === index ? 1 : 0
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <p className="text-gray-600 mb-6 leading-relaxed">
                                {item.description}
                              </p>
                              <a 
                                href="/contact/" 
                                className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium"
                              >
                                <span>Speak to an expert</span>
                                <Icon icon="mdi:arrow-right" className="ml-2 w-4 h-4" />
                              </a>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Right Column - Video/Image Display */}
                    <div className="lg:sticky lg:top-8">
                      <motion.div
                        key={activeAccordionItem}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
                      >
                        <div className="aspect-video">
                          {activeAccordionItem !== null && accordionItems[activeAccordionItem]?.video ? (
                            <video 
                              autoPlay 
                              muted 
                              playsInline 
                              loop
                              className="w-full h-full object-cover"
                            >
                              <source 
                                src={accordionItems[activeAccordionItem].video} 
                                type="video/mp4" 
                              />
                            </video>
                          ) : (
                            <Image
                              src={getSanityImage(activeAccordionItem !== null ? accordionItems[activeAccordionItem]?.image : null, '/images/placeholder.jpg')}
                              alt={activeAccordionItem !== null ? accordionItems[activeAccordionItem]?.image?.alt || 'Accordion item image' : 'Accordion item image'}
                              fill
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        
                        {/* Overlay with Item Info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                          <div className="absolute bottom-6 left-6 right-6">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <h4 className="text-white text-xl font-semibold mb-2">
                                {activeAccordionItem !== null ? accordionItems[activeAccordionItem]?.title : accordionItems[0]?.title}
                              </h4>
                              <p className="text-gray-200 text-sm">
                                {activeAccordionItem !== null ? accordionItems[activeAccordionItem]?.description : accordionItems[0]?.description}
                              </p>
                            </motion.div>
                          </div>
                        </div>

                        {/* Play Button Overlay (only for videos) */}
                        {activeAccordionItem !== null && accordionItems[activeAccordionItem]?.video && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30"
                            >
                              <Icon icon="mdi:play" className="w-8 h-8 text-white ml-1" />
                            </motion.div>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No accordion items available.</p>
                  </div>
                )}
              </div>
            </section>
          </motion.div>



          <motion.div
            variants={fadeInUp}
          >
            <BlockContentRenderer content={howWeDoContent.content} />
          </motion.div>
        </div>
      )}
    </div>
  )
}