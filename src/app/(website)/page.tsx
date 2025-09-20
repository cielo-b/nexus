'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { Icon } from '@iconify/react'
import { motion, useInView } from 'framer-motion'
import { client } from '@/lib/sanity/client'
import { blogQueries, partnerQueries, testimonialQueries, faqQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { BlogPost } from '@/types/blog'
import { Partner } from '@/types/partner'
import { Testimonial } from '@/types/testimonial'
import { FAQ } from '@/types/faq'

// Static company data
const companyData = [
  {
    type: 'mission',
    title: 'Our Mission',
    content: 'At Nexus Consultancy, we are committed to delivering innovative, data-driven solutions that empower businesses to optimize operations, enhance decision-making, and achieve sustainable growth considering gender equality, social inclusion, and environmental responsibility.',
    image: '/images/image.png'
  },
  {
    type: 'vision',
    title: 'Our Vision',
    content: 'Our vision is to be a leading consultancy agency recognized for transforming organizations with intelligent strategies, insights, and tailored solutions that drive success in an ever-evolving business landscape.',
    image: '/images/image2.png'
  },
  {
    type: 'goals',
    title: 'Our Goals',
    content: 'Our goals are to guide organizations in overcoming challenges, streamline processes, and unlock new opportunities. We aim to foster long-term partnerships by providing actionable insights that lead to impactful change.',
    image: '/images/image3.png'
  }
]

// Custom hook for character-by-character animation
const useTypewriter = (text: string, speed: number = 50, delay: number = 0, shouldStart: boolean = true) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (text.length === 0 || !shouldStart) return

    let index = 0
    setDisplayedText('')
    setIsComplete(false)

    const startTimer = setTimeout(() => {
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          setIsComplete(true)
          clearInterval(timer)
        }
      }, speed)

      return () => clearInterval(timer)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [text, speed, delay, shouldStart])

  return { displayedText, isComplete }
}

export default function HomePage() {
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [coreValuesVisible, setCoreValuesVisible] = useState(false)
  const [animatedIcons, setAnimatedIcons] = useState<Set<number>>(new Set())
  const swiperRef = useRef<any>(null)
  const coreValuesRef = useRef<HTMLDivElement>(null)
  const getToKnowRef = useRef<HTMLDivElement>(null)
  const partnersRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const blogsRef = useRef<HTMLDivElement>(null)

  // Typewriter animations for hero text
  const heroTitle = "Empowering Change Through Expert Consultancy"
  const heroDescription = "Delivering data-driven insights and comprehensive consultancy services to foster impactful and sustainable change in education, agriculture, public health, and more."
  
  const { displayedText: displayedTitle, isComplete: titleComplete } = useTypewriter(heroTitle, 15, 500, true)
  const { displayedText: displayedDescription, isComplete: descriptionComplete } = useTypewriter(heroDescription, 10, 0, titleComplete)

  // Animation variants - reduced for better performance
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogs, partnersData, testimonialsData, faqsData] = await Promise.all([
          client.fetch(blogQueries.getAllBlogs),
          client.fetch(partnerQueries.getAllPartners),
          client.fetch(testimonialQueries.getAllTestimonials),
          client.fetch(faqQueries.getAllFAQs)
        ])

        setRecentBlogs(blogs.slice(0, 3)) // Get only 3 recent blogs
        setPartners(partnersData)
        setTestimonials(testimonialsData)
        setFaqs(faqsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Scroll observer for core values animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCoreValuesVisible(true)
            
            // Trigger icon animations with staggered delay
            const coreValues = [
              { icon: "mdi:shield-check", title: "Excellence" },
              { icon: "mdi:handshake", title: "Integrity" },
              { icon: "mdi:lightbulb-outline", title: "Innovation" },
              { icon: "mdi:megaphone", title: "Collaboration" },
              { icon: "mdi:code-tags", title: "Sustainability" },
              { icon: "mdi:chip", title: "Inclusivity" }
            ]
            
            coreValues.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedIcons(prev => new Set([...prev, index]))
              }, index * 200) // 200ms delay between each icon
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (coreValuesRef.current) {
      observer.observe(coreValuesRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        icon="mdi:star"
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  const getAvailableTabs = () => {
    return companyData.map(item => item.type)
  }


  const toggleFaq = (faqId: string) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId)
  }

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  const goToPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  console.log(recentBlogs)


  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes iconRotate {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image src="/images/hero.png" alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-black/80 w-full h-full"></div>
        <div className="relative z-10 flex items-center justify-start w-full h-full px-4 sm:px-6 lg:px-8">
          <div className="text-white px-[8vw] max-w-[1700px] mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 sm:mb-6 leading-tight">
              {displayedTitle}
              {!titleComplete && <span className="typewriter-cursor text-white">|</span>}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 leading-relaxed">
              {displayedDescription}
              {!descriptionComplete && <span className="typewriter-cursor text-white">|</span>}
            </p>
          </div>
        </div>
      </section>

      {/* Get To Know Nexus Section */}
      <motion.section 
        ref={getToKnowRef}
        initial="hidden"
        animate={useInView(getToKnowRef) ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-8 sm:py-12 lg:py-16"
      >
        <div className="px-[8vw] max-w-[1700px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left side - Title and description */}
          <motion.div 
              variants={fadeInLeft}
              className="w-full lg:w-1/2"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6"
            >
              Get To Know <br /><span className='text-primary'>Nexus</span>
            </motion.h2>
            <motion.div 
                variants={fadeInUp}
                className="space-y-4"
            >
                <p className='text-xl sm:text-2xl lg:text-3xl font-semibold'>What is Insight Nexus</p>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                Insight Nexus Ltd is a dynamic consultancy firm committed to empowering organizations through a wide range of tailored services designed to foster growth and operational excellence.
              </p>
            </motion.div>
          </motion.div>

            {/* Right side - Carousel */}
            <motion.div 
              variants={fadeInRight}
              className="w-full lg:w-1/2"
            >
                  <div className="relative">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={25}
                  slidesPerView={1}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  speed={800}
                  loop={true}
                  className="company-info-swiper"
                >
                  {companyData.map((item) => (
                    <SwiperSlide key={item.type}>
                      <div className="shadow-xl hover:shadow-2xl flex w-full h-fit flex-col items-start justify-center gap-6 :p-3 px-8 ring-1 ring-[#f0efef] transition-shadow duration-300">
                      <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={320}
                          className="w-full h-80 object-cover"
                        />
                        <div className="flex w-full flex-col items-start justify-center gap-2">
                          <span className="text-5xl font-black text-[#2563eb] max-sm:text-lg">
                            {item.title}
                          </span>
                          <span className="text-lg font-medium text-gray-600 max-sm:text-base">
                            {item.content}
                          </span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>


      {/* Core Values Section */}
      <motion.section 
        ref={coreValuesRef}
        initial="hidden"
        animate={useInView(coreValuesRef) ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-8 sm:py-12 lg:py-16"
      >
        <div className="px-[8vw] max-w-[1700px] mx-auto">
          <motion.div 
            variants={fadeInUp}
            className="text-left mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-3 sm:mb-4">Explain Our Core<br /><span className='text-primary'>Values</span> </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl">"Satisfaction is the key to our success. We strive to ensure every customer leaves happy with our quality service priority.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {[
              {
                icon: "solar:shield-check-bold",
                title: "Excellence",
                description: "We are committed to delivering the highest quality services, using the best practices and methodologies to ensure impactful results."
              },
              {
                icon: "solar:handshake-heart-bold",
                title: "Integrity",
                description: "We operate honestly, transparently, and accountable in all our interactions, maintaining trust with our stakeholders."
              },
              {
                icon: "solar:lightbulb-minimalistic-bold",
                title: "Innovation",
                description: "We embrace new ideas and technological advancements to offer creative, effective, and practical solutions."
              },
              {
                icon: "solar:users-group-rounded-bold",
                title: "Collaboration",
                description: "We believe in the power of teamwork and partnerships, creating synergies that drive sustainable development."
              },
              {
                icon: "solar:leaf-bold",
                title: "Sustainability",
                description: "We are dedicated to promoting long-term solutions that contribute to communities' social, economic, and environmental well-being."
              },
              {
                icon: "solar:users-group-two-rounded-bold",
                title: "Inclusivity",
                description: "We strive to ensure that all voices are heard and considered, promoting equal opportunities for a more inclusive society."
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="flex flex-col items-start gap-4 sm:gap-5 bg-black/5  p-4 sm:p-6 lg:p-8"
              >
                <div className="bg-white  p-4 sm:p-5 shadow-sm">
                  <Icon 
                    icon={item.icon} 
                    className={`w-8 h-8 sm:w-10 sm:h-10 text-[#014DFE] transition-all duration-700 ${
                      animatedIcons.has(index) 
                        ? 'animate-spin' 
                        : ''
                    }`}
                    style={{
                      animation: animatedIcons.has(index) 
                        ? 'iconRotate 1.4s ease-in-out' 
                        : 'none'
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-[#555555]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section 
        ref={partnersRef}
        initial="hidden"
        animate={useInView(partnersRef) ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-8 sm:py-12 lg:py-16 bg-white"
      >
        <div className="px-[8vw] max-w-[1700px] mx-auto">
          <motion.div 
            variants={fadeInUp}
            className="text-left mb-8 sm:mb-12 lg:mb-16"
          >
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold">Trusted by leading organizations worldwide</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Loading partners...</div>
            </div>
          ) : partners.length > 0 ? (
            <div className="relative">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={40}
                slidesPerView="auto"
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={10000}
                loop={true}
                loopAdditionalSlides={partners.length * 2}
                allowTouchMove={true}
                centeredSlides={false}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
                className="partners-swiper"
              >
                {/* Duplicate slides multiple times for seamless infinite loop */}
                {[...partners, ...partners, ...partners].map((partner, index) => (
                  <SwiperSlide key={`${partner._id}-${index}`} className="!w-auto">
                    <div className="flex items-center justify-center p-8 h-32 w-56 bg-white hover:scale-110 transition-transform duration-300">
                      {partner.url ? (
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center"
                        >
                          <Image
                            src={getSanityImage(partner.logo)}
                            alt={partner.logo.alt || partner.name}
                            width={250}
                            height={100}
                            className="max-w-full max-h-full object-contain"
                          />
                        </a>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image
                            src={getSanityImage(partner.logo)}
                            alt={partner.logo.alt || partner.name}
                            width={250}
                            height={100}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100  flex items-center justify-center">
                <Icon icon="mdi:handshake" className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No partners yet</h3>
              <p className="text-gray-500">Partners will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section 
        ref={ctaRef}
        initial="hidden"
        animate={useInView(ctaRef) ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-8 sm:py-12 lg:py-16 bg-primary text-white"
      >
        <div className="px-[8vw] max-w-[1700px] mx-auto">
          <motion.div 
            variants={fadeInUp}
            className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {/* Left Section - Call to Action */}
            <motion.div variants={fadeInLeft}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Frequently asked questions
              </h2>
              <p className="text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
                Made for your convenience for a more beautiful future for you and your family
              </p>
            </motion.div>

            {/* Right Section - FAQ/Accordion */}
            <motion.div variants={fadeInRight} className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="text-white">Loading FAQs...</div>
                </div>
              ) : faqs.length > 0 ? (
                faqs.map((faq) => (
                  <div key={faq._id} className="border-b border-white/20">
                    <div
                      className="flex items-center justify-between py-4 cursor-pointer  px-4"
                      onClick={() => toggleFaq(faq._id)}
                    >
                      <span className="text-white text-lg font-medium">{faq.title}</span>
                      <Icon
                        icon={openFaqId === faq._id ? "mdi:chevron-up" : "mdi:chevron-down"}
                        className={`w-5 h-5 text-white transition-all duration-300 ${openFaqId === faq._id ? 'rotate-180' : 'rotate-0'
                          }`}
                      />
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqId === faq._id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <div className="px-4 pb-4">
                        <p className="text-white/90 text-base leading-relaxed">
                          {faq.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-white/70">No FAQs available yet</div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Client Testimonials Section */}
      <motion.section 
        ref={testimonialsRef}
        initial="hidden"
        animate={useInView(testimonialsRef) ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-8 sm:py-12 lg:py-16"
      >
        <div className="px-[8vw] max-w-[1700px] mx-auto">
          <motion.div variants={fadeInUp}>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 sm:mb-6"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 lg:mb-0 max-w-3xl">The <span className='text-primary'>Clients</span> are the <span className='text-primary'>Heroes</span> of Our Business </h2>
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={goToPrevSlide}
                  className="w-10 h-10 sm:w-12 sm:h-12  border-2 border-gray-300 flex items-center justify-center"
                >
                  <Icon icon="mdi:chevron-left" className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                </button>
                <button
                  onClick={goToNextSlide}
                  className="w-10 h-10 sm:w-12 sm:h-12  border-2 border-primary flex items-center justify-center"
                >
                  <Icon icon="mdi:chevron-right" className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </button>
              </div>
            </motion.div>
            <motion.p 
              variants={fadeInUp}
              className="mb-8 sm:mb-12 px-[8vw] max-w-[1700px] text-[#65676C] text-xs sm:text-sm leading-relaxed"
            >
              Clients consistently commend our consultancy agency for its transformative impact on their businesses.Our strategic solutions have streamlined operations, enhanced decision-making, and driven measurable growth, earning the trust and loyalty of organizations across various industries.
            </motion.p>
          </motion.div>


          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Loading testimonials...</div>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="relative">
              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={800}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                className="testimonials-swiper"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial._id}>
                    <div className="testimonial-card h-[280px] w-full relative overflow-hidden bg-black text-white shadow-md group cursor-pointer">
                      {/* Front of card - Name, Position, Rating */}
                      <div className="absolute inset-0 bg-black text-white p-6 flex flex-col justify-center items-center text-center transition-transform duration-500 group-hover:-translate-y-full">
                        <div className="w-16 h-16 overflow-hidden mb-4">
                              {testimonial.clientImage ? (
                                  <Image
                                    src={getSanityImage(testimonial.clientImage)}
                                    alt={testimonial.clientImage.alt || testimonial.clientName}
                              width={64}
                              height={64}
                                    className="w-full h-full object-cover"
                                  />
                              ) : (
                            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                              <span className="text-white font-semibold text-2xl">
                                    {testimonial.clientName.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                        </div>
                        <h4 className="font-semibold text-2xl mb-2">{testimonial.clientName}</h4>
                        <p className="text-gray-300 text-base mb-1">{testimonial.clientTitle}</p>
                        <p className="text-gray-400 text-sm mb-4">{testimonial.company}</p>
                        <div className="flex items-center gap-1">
                                  {renderStars(testimonial.rating)}
                                </div>
                              </div>
                      
                      {/* Back of card - Testimonial message with primary bg */}
                      <div className="absolute inset-0 bg-primary text-white p-6 flex flex-col justify-center items-center text-center transition-transform duration-500 group-hover:translate-y-0 translate-y-full">
                        <Image src={"/images/testimonial-bg.png"} alt="" width={48} height={48} className="w-full h-full absolute top-0 right-0 opacity-20" />
                        <Image src={"/images/testimonial-quote.png"} alt="" width={48} height={48} className="absolute bottom-0 right-3 opacity-30" />
                        <div className="relative z-10">
                            <p className="text-xl leading-relaxed">
                            "{testimonial.testimonial}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100  flex items-center justify-center">
                <Icon icon="mdi:chat" className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
              <p className="text-gray-500">Testimonials will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Recent Blogs Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white text-black">
        <div className="px-[8vw] max-w-[1700px] mx-auto w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">Recent Blogs</h2>
            <Link
              href="/blogs"
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3  flex items-center gap-2 text-sm sm:text-base"
            >
              View All Blogs
              <Icon icon="mdi:arrow-right" className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Loading recent blogs...</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {recentBlogs.map((blog) => (
                <div key={blog._id} className="overflow-hidden">
                  {blog.coverImage && (
                    <Image
                      src={blog.coverImage.asset.url || '/placeholder.jpg'}
                      alt={blog.coverImage.alt || blog.title}
                      width={400}
                      height={250}
                      className="w-full h-60 object-cover "
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {blog.title}
                    </h3>
                    <span className="text-[#98989A] capitalize text-sm">
                      {blog.category}
                    </span>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1 bg-[#E6E6E6] px-4 py-2  border-[#AAAAAA] border text-sm">
                          <Icon icon="mdi:heart-outline" className="w-4 h-4 text-[#474747]" />
                          {formatNumber(blog.likes)}
                        </div>
                        <span className="flex items-center gap-1 bg-[#E6E6E6] px-4 py-2  border-[#AAAAAA] border text-sm">
                          <Icon icon="mdi:eye-outline" className="w-4 h-4 text-[#474747]" />
                          {formatNumber(blog.views)}
                        </span>
                      </div>
                      <Link
                        href={`/blogs/${blog.slug.current}`}
                        className="bg-primary text-white px-6 py-2  flex items-center gap-2 justify-center"
                      >
                        Read More
                        <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
