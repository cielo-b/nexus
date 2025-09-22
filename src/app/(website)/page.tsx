'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Marquee from 'react-fast-marquee'
import { Icon } from '@iconify/react'
import { motion, useInView } from 'framer-motion'
import { client } from '@/lib/sanity/client'
import { blogQueries, partnerQueries, testimonialQueries, faqQueries, videoQueries, howWeDoQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { BlogPost } from '@/types/blog'
import { Partner } from '@/types/partner'
import { Testimonial } from '@/types/testimonial'
import { FAQ } from '@/types/faq'
import { Video } from '@/types/video'
import { HowWeDo } from '@/types/howWeDo'
import BlockContentRenderer from '@/components/BlockContentRenderer'

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
  const [videos, setVideos] = useState<Video[]>([])
  const [howWeDo, setHowWeDo] = useState<HowWeDo | null>(null)
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set())
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set())
  const [currentHeroVideo, setCurrentHeroVideo] = useState(0)
  const swiperRef = useRef<any>(null)
  const coreValuesRef = useRef<HTMLDivElement>(null)
  const getToKnowRef = useRef<HTMLDivElement>(null)
  const howWeDoRef = useRef<HTMLDivElement>(null)
  const partnersRef = useRef<HTMLDivElement>(null)
  const videosRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const blogsRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  // Hero video array for looping
  const heroVideos = ['/videos/hero.mp4', '/videos/hero2.mp4']

  // All useInView calls at the top level to prevent hook order issues
  const isGetToKnowInView = useInView(getToKnowRef)
  const isCoreValuesInView = useInView(coreValuesRef)
  const isPartnersInView = useInView(partnersRef)
  const isVideosInView = useInView(videosRef)
  const isCtaInView = useInView(ctaRef)
  const isTestimonialsInView = useInView(testimonialsRef)
  const isBlogsInView = useInView(blogsRef)

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
        const [blogs, partnersData, testimonialsData, faqsData, videosData, howWeDoData] = await Promise.all([
          client.fetch(blogQueries.getAllBlogs),
          client.fetch(partnerQueries.getAllPartners),
          client.fetch(testimonialQueries.getAllTestimonials),
          client.fetch(faqQueries.getAllFAQs),
          client.fetch(videoQueries.getAllVideos),
          client.fetch(howWeDoQueries.getHowWeDo)
        ])

        setRecentBlogs(blogs.slice(0, 3)) // Get only 3 recent blogs
        setPartners(partnersData)
        setTestimonials(testimonialsData)
        setFaqs(faqsData)
        setVideos(videosData)
        setHowWeDo(howWeDoData)
        
        // Debug logging
        console.log('How We Do Data:', howWeDoData)
        console.log('How We Do section should be visible now')
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Hero video switching logic
  useEffect(() => {
    const handleVideoEnd = () => {
      setCurrentHeroVideo((prev) => (prev + 1) % heroVideos.length)
    }

    const videoElement = heroVideoRef.current
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd)
      
      // Preload the next video for seamless switching
      const nextVideoIndex = (currentHeroVideo + 1) % heroVideos.length
      const nextVideo = document.createElement('video')
      nextVideo.src = heroVideos[nextVideoIndex]
      nextVideo.preload = 'auto'
      
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd)
      }
    }
  }, [currentHeroVideo, heroVideos.length])

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

  const goToNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
  }

  const goToPrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const goToVideo = (index: number) => {
    setCurrentVideoIndex(index)
  }

  const toggleVideoPlay = (index: number) => {
    setPlayingVideos(prev => {
      const newSet = new Set<number>()
      if (!prev.has(index)) {
        // If this video is not playing, start it and stop all others
        newSet.add(index)
      }
      // If this video is already playing, stop it (newSet remains empty)
      return newSet
    })
  }

  // Stop all videos when current video index changes
  useEffect(() => {
    setPlayingVideos(new Set<number>())
  }, [currentVideoIndex])

  const toggleVideoMute = (index: number) => {
    setMutedVideos(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
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
        <video
          ref={heroVideoRef}
          key={currentHeroVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => {
            if (heroVideoRef.current) {
              heroVideoRef.current.play().catch(console.error)
            }
          }}
        >
          <source src={heroVideos[currentHeroVideo]} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 w-full h-full"></div>
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
        animate={isGetToKnowInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-8"
      >
        <div className="px-[8vw] max-w-[1700px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left side - Title and description */}
            <div
              className="w-full lg:w-1/2"
            >
              <h2
                className="text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
              >
                Get To Know <br /><span className='text-primary'>Nexus</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed ">
                Insight Nexus Ltd is a dynamic consultancy firm committed to empowering organizations through a wide range of tailored services designed to foster growth and operational excellence. By leveraging a deep understanding of data analytics, market trends, and business strategies, Insight Nexus provides customized, data-driven solutions that cater to the unique needs of each client. Beyond just data-driven strategies, we offer comprehensive solutions that include technical support, organizational capacity building, strategic planning, and more. Our team of experts works closely with businesses to navigate challenges, optimize processes, and develop sustainable strategies for success. Whether you're looking to enhance your internal capabilities, streamline your operations, or create a roadmap for the future, Insight Nexus is dedicated to helping you unlock the full potential of your organization. Our holistic approach ensures that we address both immediate needs and long-term goals, positioning your business for resilience, innovation, and lasting impact in an ever-evolving market landscape.
              </p>
            </div>

            {/* Right side - Carousel */}
            <div
              className="w-full lg:w-1/2 p-10"
            >
              <div className="relative">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  spaceBetween={25}
                  slidesPerView={1}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  speed={800}
                  loop={true}
                  navigation={{
                    nextEl: '.company-swiper-next',
                    prevEl: '.company-swiper-prev',
                  }}
                  className="company-info-swiper"
                >
                  {companyData.map((item) => (
                    <SwiperSlide key={item.type} className='p-10'>

                      <div className="shadow-md">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={220}
                          className="w-full h-80 object-cover"
                        />
                        <div className="flex w-full flex-col items-start justify-center gap-2 p-8">
                          <span className="text-2xl font-semibold text-[#2563eb] max-sm:text-lg">
                            {item.title}
                          </span>
                          <span className=" text-gray-600 max-sm:text-base">
                            {item.content}
                          </span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                 {/* Navigation Buttons */}
                 <button className="company-swiper-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                   <Icon icon="solar:arrow-left-bold" className="w-6 h-6 text-gray-700" />
                 </button>
                 <button className="company-swiper-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                   <Icon icon="solar:arrow-right-bold" className="w-6 h-6 text-gray-700" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>


      {/* Core Values Section */}
      <motion.section
        ref={coreValuesRef}
        initial="hidden"
        animate={isCoreValuesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-8 bg-white"
      >
        <div className="px-[8vw] max-w-[1700px] mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Explain Our Core <span className="text-blue-600">Values</span>
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">Satisfaction is the key to our success. We strive to ensure every customer leaves happy with our quality service priority.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
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
            ].map((item, index) => {
              // Map core values to their corresponding PNG files
              const getImageSrc = (title: string) => {
                switch (title) {
                  case "Excellence":
                    return "/icons/excellense.png"
                  case "Integrity":
                    return "/icons/integrity.png"
                  case "Innovation":
                    return "/icons/innovation.png"
                  case "Collaboration":
                    return "/icons/collaboration.png"
                  case "Sustainability":
                    return "/icons/sustainability.png"
                  case "Inclusivity":
                    return "/icons/inclusion.png"
                  default:
                    return "/icons/excellense.png"
                }
              }

              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-start gap-6 sm:gap-8 bg-gray-50 p-6 sm:p-8 lg:p-10 hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="bg-white p-4 shadow-sm">
                    <Image
                      src={getImageSrc(item.title)}
                      alt={`${item.title} icon`}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>


      {/* Partners Section - Only show if there are partners */}
      {partners.length > 0 && (
        <section className="py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 bg-white">
        <div className="px-[8vw] max-w-[1700px] mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Trusted by leading organizations <span className="text-blue-600">worldwide</span>
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Loading partners...</div>
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <Marquee
                gradient={false}
                speed={60}
                pauseOnHover={true}
                className="overflow-hidden"
              >
                {partners.map((partner, index) => (
                  <div key={`${partner._id}-${index}`} className="mx-4 flex-shrink-0">
                    <div className="flex items-center justify-center p-8 h-48 w-72 bg-white hover:scale-110 transition-transform duration-300 overflow-hidden">
                      {partner.url ? (
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center overflow-hidden"
                        >
                          <Image
                            src={getSanityImage(partner.logo)}
                            alt={partner.logo.alt || partner.name}
                            width={250}
                            height={100}
                            className="max-w-full max-h-full object-contain bg-white"
                          />
                        </a>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                          <Image
                            src={getSanityImage(partner.logo)}
                            alt={partner.logo.alt || partner.name}
                            width={250}
                            height={100}
                            className="max-w-full max-h-full object-contain bg-white"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          )}
        </div>
        </section>
        )}

        {/* Featured Videos Section - Only show if there are videos */}
        {videos.length > 0 && (
          <section className="py-16 bg-blue-50">
        <div className="max-w-[1700px] mx-auto px-[8vw]">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Videos</h2>
          </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-xl">Loading videos...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <div
                    key={video._id}
                    className="flex-shrink-0"
                  >
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer">
                      <div className="relative aspect-video bg-gray-900 group/video">
                        <video
                          ref={(el) => {
                            if (el) {
                              el.muted = mutedVideos.has(index)
                              if (playingVideos.has(index)) {
                                el.play().catch(console.error)
                              } else {
                                el.pause()
                              }
                            }
                          }}
                          src={video.videoFile.asset.url || ''}
                          className="w-full h-full object-cover"
                          preload="metadata"
                          playsInline
                          muted={mutedVideos.has(index)}
                          onClick={() => toggleVideoPlay(index)}
                          onEnded={() => {
                            setPlayingVideos(prev => {
                              const newSet = new Set(prev)
                              newSet.delete(index)
                              return newSet
                            })
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 opacity-80" />
                        
                        {/* Video Control Buttons - Only visible on hover */}
                        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-10 opacity-0 group-hover/video:opacity-100">
                          <div className="flex items-center gap-6">
                            {/* Play/Pause Button */}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleVideoPlay(index)
                              }}
                              className="p-2 cursor-pointer bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/50 transition-all duration-200 hover:scale-110 border-2 border-white/30 shadow-lg"
                            >
                              <Icon 
                                icon={playingVideos.has(index) ? "mdi:pause" : "mdi:play"} 
                                className="w-10 h-10 text-white ml-1" 
                              />
                            </button>

                            {/* Mute/Unmute Button */}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleVideoMute(index)
                              }}
                              className="p-2 cursor-pointer bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/50 transition-all duration-200 hover:scale-110 border-2 border-white/30 shadow-lg"
                            >
                              <Icon 
                                icon={mutedVideos.has(index) ? "mdi:volume-off" : "mdi:volume-high"} 
                                className="w-10 h-10 text-white" 
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
        </section>
        )}

      {/* Call to Action Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={isCtaInView ? "visible" : "hidden"}
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
        animate={isTestimonialsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-8"
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
              className="mb-8 sm:mb-12 text-[#65676C] text-xs sm:text-sm leading-relaxed"
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
                        <div className="flex items-center gap-1 bg-[#E6E6E6] px-2 py-1  border-[#AAAAAA] border text-sm">
                          <Icon icon="mdi:heart-outline" className="w-4 h-4 text-[#474747]" />
                          {formatNumber(blog.likes)}
                        </div>
                        <span className="flex items-center gap-1 bg-[#E6E6E6] px-2 py-1  border-[#AAAAAA] border text-sm">
                          <Icon icon="mdi:eye-outline" className="w-4 h-4 text-[#474747]" />
                          {formatNumber(blog.views)}
                        </span>
                      </div>
                      <Link
                        href={`/blogs/${blog.slug.current}`}
                        className="bg-primary text-white px-4 py-2  flex items-center gap-2 justify-center text-sm"
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
