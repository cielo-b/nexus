'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
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
        className="relative min-h-[45vh] flex flex-col items-center justify-center border-b border-gray-200 bg-white py-8 sm:py-12 lg:py-16 xl:py-20"
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
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 lg:space-y-12">
          <motion.div 
            ref={getToKnowRef}
            initial="hidden"
            animate={useInView(getToKnowRef) ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-12 lg:gap-20"
          >
            <motion.div 
              variants={fadeInLeft}
              transition={{ duration: 0.8 }}
              className='w-full lg:w-[40%] order-2 lg:order-1'
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Get To Know <span className="text-blue-600">Nexus</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
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
              className='w-full lg:w-[60%] order-1 lg:order-2 relative'
            >
              <Image src="/images/about1.png" alt="Get To Know Nexus" width={10000} height={100000} className="w-full h-80 sm:h-96 lg:h-[500px] object-cover  shadow-lg" />
              {/* Lines overlay */}
              <div className="absolute top-4 right-4 w-16 h-16 opacity-20 rotate-12">
                <Image src="/images/lines.png" alt="Lines" width={64} height={64} className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-4 left-4 w-12 h-12 opacity-15 -rotate-12">
                <Image src="/images/lines.png" alt="Lines" width={48} height={48} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            ref={whatWeDoRef}
            initial="hidden"
            animate={useInView(whatWeDoRef) ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-12 lg:gap-20"
          >
            <motion.div 
              variants={fadeInLeft}
              transition={{ duration: 0.8 }}
              className='w-full lg:w-[60%] order-1 relative'
            >
              <Image src="/images/about2.png" alt="What We Do" width={10000} height={100000} className="w-full h-80 sm:h-96 lg:h-[500px] object-cover  shadow-lg" />
              {/* Lines overlay */}
              <div className="absolute top-6 left-6 w-20 h-20 opacity-25 rotate-45">
                <Image src="/images/lines.png" alt="Lines" width={80} height={80} className="w-full h-full object-cover" />
            </div>
              <div className="absolute bottom-6 right-6 w-14 h-14 opacity-20 -rotate-30">
                <Image src="/images/lines.png" alt="Lines" width={56} height={56} className="w-full h-full object-cover" />
          </div>
            </motion.div>
            <motion.div 
              variants={fadeInRight}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='w-full lg:w-[40%] order-2'
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                What We <span className="text-blue-600">Do?</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
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
        className="py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 bg-primary relative overflow-hidden"
      >
        {/* Lines Animation - Top Right */}
        <div className="absolute top-10 right-10 w-24 h-24 opacity-20 rotate-12 hidden lg:block">
          <Image src="/images/lines.png" alt="Lines" width={96} height={96} className="w-full h-full object-cover" />
          </div>

        {/* Lines Animation - Bottom Left */}
        <div className="absolute bottom-10 left-10 w-20 h-20 opacity-15 -rotate-12 hidden lg:block">
          <Image src="/images/lines.png" alt="Lines" width={80} height={80} className="w-full h-full object-cover" />
            </div>

        {/* Lines Animation - Center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-10 rotate-45 hidden xl:block">
          <Image src="/images/lines.png" alt="Lines" width={64} height={64} className="w-full h-full object-cover" />
            </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Who we serve</h2>
          </motion.div>

          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView="auto"
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={8000}
              loop={true}
              loopAdditionalSlides={2}
              allowTouchMove={true}
              centeredSlides={false}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 25,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="who-we-serve-swiper"
            >
              {[
                {
                  icon: "solar:buildings-3-bold",
                  title: "Corporations",
                  description: "Forward-thinking companies working to transform their impact and manage social risks."
                },
                {
                  icon: "solar:money-bag-bold",
                  title: "Investors & Funders",
                  description: "Funders seeking quality, comparable social performance data across their portfolio."
                },
                {
                  icon: "solar:users-group-two-rounded-bold",
                  title: "NGOs & Social Enterprises",
                  description: "Social change organizations needing better data to improve their impact."
                },
                {
                  icon: "solar:user-bold",
                  title: "Individual Researchers",
                  description: "Researchers and academics seeking comprehensive data analysis and research support."
                },
                {
                  icon: "solar:graduation-bold",
                  title: "Students",
                  description: "Students and educational institutions requiring research assistance and data insights."
                },
                {
                  icon: "solar:buildings-2-bold",
                  title: "Government Institutions",
                  description: "Government agencies and public sector organizations seeking policy research and evaluation."
                },
                {
                  icon: "solar:university-bold",
                  title: "Universities",
                  description: "Educational institutions requiring research collaboration and academic support services."
                },
                {
                  icon: "solar:handshake-bold",
                  title: "International NGOs",
                  description: "International organizations working on global development and humanitarian projects."
                }
              ].map((item, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <motion.div 
                    variants={staggerItem}
                    transition={{ duration: 0.6 }}
                    className="text-center p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 w-80 sm:w-96 h-full min-h-[300px] flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 bg-white/20 rounded-lg">
                        <Icon icon={item.icon} className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                      <p className="text-white/90 mb-3 sm:mb-4 text-xs sm:text-sm text-left leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <button className="border-2 border-white text-white px-3 sm:px-4 py-1.5 font-medium hover:bg-white hover:text-blue-600 transition-colors text-xs sm:text-sm w-fit mx-auto">
                      Get in touch
                    </button>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Why Choose <span className="text-blue-600">Us</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
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
              <motion.div 
                key={index} 
                variants={staggerItem}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-start gap-6 sm:gap-8 bg-gray-50  p-6 sm:p-8 lg:p-10 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="bg-white  p-4 shadow-sm">
                  <Icon icon={item.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-[#014DFE]" />
            </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3">Meet Our Team</h2>
            <p className="text-sm sm:text-base lg:text-lg">Meet the team behind the work</p>
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
                  <div className="w-full h-64 sm:h-72 lg:h-80 mx-auto mb-6 sm:mb-8 overflow-hidden  shadow-2xl">
                    <Image
                      src={getSanityImage(member.image)}
                      alt={member.image.alt || member.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
              <p className="text-sm sm:text-base text-blue-100">Team members will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  )
}
