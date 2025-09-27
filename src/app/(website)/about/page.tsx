'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { motion, useInView } from 'framer-motion'
import Marquee from 'react-fast-marquee'
// import Lottie from 'lottie-react'
import { client } from '@/lib/sanity/client'
import { teamMemberQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { TeamMember } from '@/types/teamMember'

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  
  // Refs for animations
  const heroRef = useRef(null)
  const getToKnowRef = useRef(null)
  const whatWeDoRef = useRef(null)
  const whoWeServeRef = useRef(null)
  const whatYouAccessRef = useRef(null)
  const whyChooseUsRef = useRef(null)
  const teamRef = useRef(null)
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  }
  
  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  }
  
  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamData = await client.fetch(teamMemberQueries.getAllTeamMembers)
        setTeamMembers(teamData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={useInView(heroRef) ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="relative min-h-[50vh] pt-44   max-md:pt-36 max-sm:pt-36  pb-8 sm:pb-12 lg:pb-16 xl:pb-20 flex flex-col items-center justify-center border-b border-gray-200 bg-white"
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
          <div className="text-center">
            <motion.h1 
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4"
            >
              About <span className="text-blue-600">Nexus</span>
            </motion.h1>
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <p className=" text-gray-600 leading-relaxed px-2">
                Insight Nexus Ltd. established in Rwanda, excels in delivering a comprehensive range of consultancy services.
                Our expertise spans sectors such as public health, agriculture, education, tourism, technology, energy, and finance,
                with a focus on providing sustainable, data-driven strategies. We support a diverse clientele, including individual
                researchers, students, profit-oriented businesses, government institutions, universities, and both international
                and local NGOs.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Get To Know Nexus / What We Do Section */}
      <section className="py-6 sm:py-8 lg:py-12 bg-white">
        <div className="px-[8vw] max-w-[1700px] mx-auto  space-y-6 sm:space-y-8 lg:space-y-12">
          <motion.div 
            ref={getToKnowRef}
            initial="hidden"
            animate={useInView(getToKnowRef) ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row justify-center  items-center gap-8 sm:gap-12 lg:gap-20"
          >
            <motion.div 
              variants={fadeInLeft}
              transition={{ duration: 0.8 }}
              className=' max-w-xl order-2 lg:order-1'
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Icon icon="solar:buildings-2-bold" className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  Get To Know <span className="text-blue-600">Nexus</span>
                </h2>
              </div>
              <p className=" text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Insight Nexus is a dynamic consultancy firm committed to empowering organizations through a wide range of
                tailored services designed to foster growth and operational excellence, by leveraging a deep understanding
                of data analytics, market trends, and business strategies. Insight Nexus provides customized, data-driven
                solutions that cater to the unique needs of each client. Beyond just data-driven strategies, we offer
                comprehensive solutions.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className=' order-1 lg:order-2 relative'
            >
              <Image src="/images/about1.png" alt="Get To Know Nexus" width={10} height={100000} className="w-[500px] h-80  object-cover  shadow-lg" />
            </motion.div>
          </motion.div>
          
          <motion.div 
            ref={whatWeDoRef}
            initial="hidden"
            animate={useInView(whatWeDoRef) ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-20"
          >
            <motion.div 
              variants={fadeInLeft}
              transition={{ duration: 0.8 }}
              className=' max-w-xl order-1 relative'
            >
              <Image src="/images/about2.png" alt="What We Do" width={10000} height={100000} className="w-[500px] h-80 object-cover  shadow-lg" />

            </motion.div>
            <motion.div 
              variants={fadeInRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className=' max-w-xl order-2'
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Icon icon="solar:settings-minimalistic-bold" className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  What We <span className="text-blue-600">Do?</span>
                </h2>
              </div>
              <p className=" text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Insight Nexus Ltd is a forward-thinking consultancy firm dedicated to providing holistic, results-driven
                solutions that help organizations achieve their goals. We offer a broad spectrum of services, including
                Research Design, Implementation & Dissemination, Monitoring, Evaluation, and Learning (MEL), Capacity
                building & technical training, and Strategic Planning & technical Advisory. In addition, we specialize
                in facilitating grants applications, climate resilience assessments, and developing sustainable strategies
                across key sectors.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve Section - Horizontal Carousel */}
      <motion.section 
        ref={whoWeServeRef}
        initial="hidden"
        animate={useInView(whoWeServeRef) ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-4 sm:py-6 md:py-8 bg-primary relative  px-[8vw] "
      >

        <div className=" max-w-[1700px] mx-auto relative z-10">
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Icon icon="solar:users-group-rounded-bold" className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">Who we serve</h2>
            </div>
          </motion.div>

          <div className="relative overflow-hidden">
            <Marquee
              gradient={false}
              speed={60}
              pauseOnHover={true}
              className="overflow-hidden"
            >
              {[
                { icon: "mdi:office-building", title: "Corporations", description: "Forward-thinking companies working to transform their impact and manage social risks." },
                { icon: "mdi:handshake", title: "Investors & Funders", description: "Funders seeking quality, comparable social performance data across their portfolio." },
                { icon: "mdi:account-group", title: "NGOs & Social Enterprises", description: "Social change organizations needing better data to improve their impact." },
                { icon: "mdi:account-search", title: "Individual Researchers", description: "Researchers and academics seeking comprehensive data analysis and research support." },
                { icon: "mdi:school", title: "Students", description: "Students and educational institutions requiring research assistance and data insights." },
                { icon: "mdi:domain", title: "Government Institutions", description: "Government agencies and public sector organizations seeking policy research and evaluation." },
                { icon: "mdi:university", title: "Universities", description: "Educational institutions requiring research collaboration and academic support services." },
                { icon: "mdi:earth", title: "International NGOs", description: "International organizations working on global development and humanitarian projects." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  transition={{ duration: 0.6 }}
                  className="mx-4 text-center p-6 sm:p-8 transition-all duration-300 w-80 sm:w-96 h-[300px] flex flex-col justify-between flex-shrink-0 overflow-hidden"
                >
                  <div className="flex-1 flex flex-col justify-start">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 bg-white/20 rounded-lg">
                      <Icon icon={item.icon} className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-white/90 mb-3 sm:mb-4 text-xs sm:text-sm text-left leading-relaxed flex-1 overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                  <Link href="/contact" className="border-2 border-white text-white px-3 sm:px-4 py-1.5 font-medium hover:bg-white hover:text-blue-600 transition-colors text-xs sm:text-sm w-fit mx-auto inline-block text-center flex-shrink-0">
                    Get in touch
                  </Link>
                </motion.div>
              ))}
            </Marquee>
          </div>

        </div>
      </motion.section>


      {/* Why Choose Us Section */}
      <motion.section 
        ref={whyChooseUsRef}
        initial="hidden"
        animate={useInView(whyChooseUsRef) ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 bg-white"
      >
        <div className="px-[8vw] max-w-[1700px] mx-auto ">
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon icon="solar:star-bold" className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Why Choose <span className="text-blue-600">Us</span>
              </h2>
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2  gap-6 sm:gap-8"
          >
            {[
              {
                title: "Innovation & Technology",
                description: "At Insight Nexus Ltd, we continuously invest in the latest technologies to enhance our research capabilities.",
                image: "innovation.png"
              },
              {
                title: "Rigorous Methodology",
                description: "Our approach combines rigorous data collection methodologies with in-depth analysis, offering clients an integrated research process.",
                image: "methodology.png"
              },
              {
                title: "Local Context Understanding",
                description: "At Insight Nexus Ltd, delivering impactful insights requires a deep understanding of the local context.",
                image: "local.png"
              },
              {
                title: "Ethical Standards",
                description: "We strongly emphasize maintaining the safety, dignity, and rights of all participants in our studies with highest ethical standards.",
                image: "ethics.png"
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-start gap-6 sm:gap-8 bg-gray-50 p-6 sm:p-8 lg:p-10 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="bg-white p-4 shadow-sm">
                  <Image
                    src={`/icons/${item.image}`}
                    alt={`${item.title} icon`}
                    width={32}
                    height={32}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold mb-2 sm:mb-3 text-xl">{item.title}</h3>
                  <p className=" text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Image and Text */}
          <motion.div 
            variants={staggerItem}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 sm:mt-16 lg:mt-20 text-center"
          >
            <div className="max-w-2xl mx-auto flex flex-col items-center  gap-10">
              <Image
                src="/images/about4.png"
                alt="Our commitment to reaching every participant"
                width={100000}
                height={600}
                className="w-auto h-96 rounded-lg shadow-lg mb-6 sm:mb-8 object-cover"
              />
              <div className="text-3xl text-gray-800 leading-relaxed font-medium flex">
              <span className='text-7xl text-blue-600'>"</span> No matter how challenging the field, we reach every participant. Our shoes get muddy to serve our clients. <span className='text-7xl text-blue-600'>"</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Meet Our Team Section */}
      <motion.section 
        ref={teamRef}
        initial="hidden"
        animate={useInView(teamRef) ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 bg-primary text-white relative overflow-hidden"
      >
        {/* Lines Animation - Top Left */}
        <div className="absolute top-16 left-16 w-32 h-32 opacity-15 rotate-45 hidden xl:block">
          <Image src="/images/lines.png" alt="Lines" width={128} height={128} className="w-full h-full object-cover" />
        </div>
        
        {/* Lines Animation - Bottom Right */}
        <div className="absolute bottom-16 right-16 w-28 h-28 opacity-20 -rotate-30 hidden xl:block">
          <Image src="/images/lines.png" alt="Lines" width={112} height={112} className="w-full h-full object-cover" />
        </div>
        
        {/* Lines Animation - Center Right */}
        <div className="absolute top-1/2 right-20 w-24 h-24 opacity-10 rotate-90 hidden 2xl:block">
          <Image src="/images/lines.png" alt="Lines" width={96} height={96} className="w-full h-full object-cover" />
        </div>
        
        {/* Lines Animation - Top Right */}
        <div className="absolute top-20 right-20 w-20 h-20 opacity-12 rotate-12 hidden 2xl:block">
          <Image src="/images/lines.png" alt="Lines" width={80} height={80} className="w-full h-full object-cover" />
        </div>
        
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-[1700px] mx-auto relative z-10">
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon icon="solar:users-group-two-rounded-bold" className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">Meet Our Team</h2>
            </div>
            <p className="lg:text-lg">Meet the team behind the work</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-lg sm:text-xl">Loading team members...</div>
            </div>
          ) : teamMembers.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member._id} 
                  variants={staggerItem}
                  transition={{ duration: 0.6 }}
                  className='space-y-4 sm:space-y-6 text-center'
                >
                  <div className="w-full h-[600px] mx-auto mb-6 sm:mb-8 overflow-hidden shadow-2xl">
                    <Image
                      src={getSanityImage(member.image)}
                      alt={member.image.alt || member.name}
                      width={100000}
                      height={100000}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm mb-2 sm:mb-3 text-blue-100 font-medium">
                    {member.title}
                  </p>
                  {member.bio && (
                    <p className="text-xs text-blue-200 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 bg-blue-500  flex items-center justify-center">
                <Icon icon="mdi:account-group" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-medium mb-2">No team members yet</h3>
              <p className=" text-blue-100">Team members will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  )
}
