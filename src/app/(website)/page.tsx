'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { Icon } from '@iconify/react'
import { client } from '@/lib/sanity/client'
import { blogQueries, partnerQueries, testimonialQueries, companyInfoQueries, faqQueries } from '@/lib/sanity/queries'
import { getSanityImage } from '@/lib/getSanityImage'
import { BlogPost } from '@/types/blog'
import { Partner } from '@/types/partner'
import { Testimonial } from '@/types/testimonial'
import { CompanyInfo } from '@/types/companyInfo'
import { FAQ } from '@/types/faq'

export default function HomePage() {
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [activeTab, setActiveTab] = useState<string>('vision')
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const swiperRef = useRef<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogs, partnersData, testimonialsData, companyInfoData, faqsData] = await Promise.all([
          client.fetch(blogQueries.getAllBlogs),
          client.fetch(partnerQueries.getAllPartners),
          client.fetch(testimonialQueries.getAllTestimonials),
          client.fetch(companyInfoQueries.getAllCompanyInfo),
          client.fetch(faqQueries.getAllFAQs)
        ])

        setRecentBlogs(blogs.slice(0, 3)) // Get only 3 recent blogs
        setPartners(partnersData)
        setTestimonials(testimonialsData)
        setCompanyInfo(companyInfoData)
        setFaqs(faqsData)

        // Set initial active tab to the first available type
        if (companyInfoData.length > 0) {
          setActiveTab(companyInfoData[0].type)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
    const types = companyInfo.map(info => info.type)
    return Array.from(new Set(types))
  }

  const getCurrentContent = () => {
    return companyInfo.find(info => info.type === activeTab)
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
      {/* Hero Section */}
      <section className="relative py-[16vh] ">
        <Image src="/images/hero.png" alt="Hero Background" fill className="object-cover absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-black/25 w-full h-full"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-semibold mb-6 leading-tight">
              Empowering Change Through Expert Consultancy
            </h1>
            <p className="text-xl  mb-8">
              Delivering data-driven insights and comprehensive consultancy services to foster impactful and sustainable change <br /> in education, agriculture, public health, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Get To Know Nexus Section */}
      <section className="py-20 ">
        <div className="px-[8vw]">
          <div className="flex flex-col md:flex-row justify-between gap-16 items-center mb-16">
            <h2 className="text-7xl font-semibold text-gray-900 mb-4">Get To Know <br /><span className='text-primary'>Nexus</span> </h2>
            <div className='lg:w-1/2'>
              <p className='text-2xl font-semibold'>What is Insight Nexus</p>
              <p className="">
                Insight Nexus Ltd is a dynamic consultancy firm committed to empowering organizations through a wide range of tailored services designed to foster growth and operational excellence.
              </p>
            </div>
          </div>
          <div className="bg-black-bg text-white min-h-[500px] p-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-xl">Loading company information...</div>
              </div>
            ) : companyInfo.length > 0 ? (
              <>
                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="relative">
                    {getCurrentContent()?.image ? (
                      <Image
                        src={getSanityImage(getCurrentContent()!.image)}
                        alt={getCurrentContent()!.image?.alt || getCurrentContent()!.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                        <span className="text-gray-500 text-lg">Image placeholder</span>
                      </div>
                    )}
                  </div>
                  <div className='h-full'>
                    {getCurrentContent() && (
                      <div className='h-full flex flex-col justify-between '>
                        <div className='space-y-8'>
                          <div className="flex justify-end">
                            <p className='bg-[#1D1D1D] text-white px-4 py-2 rounded-md capitalize'>{getCurrentContent()!.type}</p>
                          </div>
                          <h3 className="text-5xl font-semibold  mb-6">
                            {getCurrentContent()!.title}
                          </h3>
                        </div>
                        <div className="prose prose-lg max-w-none  mb-8">
                          {getCurrentContent()!.content && (
                            <p className="text-lg leading-relaxed">
                              {getCurrentContent()!.content}
                            </p>
                          )}
                        </div>
                        {/* Navigation Tabs */}
                        <div className="flex flex-wrap justify-center mb-12">
                          {getAvailableTabs().map((type) => (
                            <button
                              key={type}
                              onClick={() => setActiveTab(type)}
                              className={`px-6 py-3 mx-2 mb-2 rounded-lg font-medium transition-colors ${activeTab === type
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:information-outline" className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No company information yet</h3>
                <p className="text-gray-500">Company information will appear here once it's added to Sanity CMS.</p>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* Core Values Section */}
      <section className="py-20 ">
        <div className="px-[8vw]">
          <div className="text-center mb-16">
            <h2 className="text-7xl font-semibold text-gray-900 mb-4">Explain Our Core<br /><span className='text-primary'>Values</span> </h2>
            <p className="">"Satisfaction is the key to our success. We strive to ensure every customer leaves happy with our quality service priority.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: "mdi:shield-check",
                title: "Excellence",
                description: "We are committed to delivering the highest quality services, using the best practices and methodologies to ensure impactful results."
              },
              {
                icon: "mdi:handshake",
                title: "Integrity",
                description: "We operate honestly, transparently, and accountable in all our interactions, maintaining trust with our stakeholders."
              },
              {
                icon: "mdi:lightbulb-outline",
                title: "Innovation",
                description: "We embrace new ideas and technological advancements to offer creative, effective, and practical solutions."
              },
              {
                icon: "mdi:megaphone",
                title: "Collaboration",
                description: "We believe in the power of teamwork and partnerships, creating synergies that drive sustainable development."
              },
              {
                icon: "mdi:code-tags",
                title: "Sustainability",
                description: "We are dedicated to promoting long-term solutions that contribute to communities' social, economic, and environmental well-being."
              },
              {
                icon: "mdi:chip",
                title: "Inclusivity",
                description: "We strive to ensure that all voices are heard and considered, promoting equal opportunities for a more inclusive society."
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

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="px-[8vw]">
          <div className="text-center mb-16">
            <p className="text-2xl  ">Trusted by leading organizations worldwide</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Loading partners...</div>
            </div>
          ) : partners.length > 0 ? (
            <div className="relative">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView="auto"
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={1000}
                loop={true}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                }}
                className="partners-swiper"
              >
                {partners.map((partner) => (
                  <SwiperSlide key={partner._id} className="!w-auto">
                    <div className="flex items-center justify-center p-6 h-24 w-48">
                      {partner.url ? (
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center hover:opacity-80 transition-opacity"
                        >
                          <Image
                            src={getSanityImage(partner.logo)}
                            alt={partner.logo.alt || partner.name}
                            width={200}
                            height={80}
                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        </a>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image
                            src={getSanityImage(partner.logo)}
                            alt={partner.logo.alt || partner.name}
                            width={200}
                            height={80}
                            className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
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
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon icon="mdi:handshake" className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No partners yet</h3>
              <p className="text-gray-500">Partners will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white">
        <div className="px-[8vw]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Section - Call to Action */}
            <div>
              <h2 className="text-6xl font-semibold text-white mb-6 ">
                Let's us <br /> listen to your <br /> problems
              </h2>
              <p className="max-w-xl ">
                Made for your convenience for a more beautiful future for you and your family
              </p>
            </div>

            {/* Right Section - FAQ/Accordion */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="text-white">Loading FAQs...</div>
                </div>
              ) : faqs.length > 0 ? (
                faqs.map((faq) => (
                  <div key={faq._id} className="border-b border-white/20">
                    <div
                      className="flex items-center justify-between py-4 cursor-pointer hover:bg-white/5 transition-colors rounded-lg px-4"
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
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 ">
        <div className="px-[8vw]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-5xl font-semibold  mb-4 max-w-3xl">The <span className='text-primary'>Clients</span> are the <span className='text-primary'>Heroes</span> of Our Business </h2>
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={goToPrevSlide}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                >
                  <Icon icon="mdi:chevron-left" className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                </button>
                <button
                  onClick={goToNextSlide}
                  className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"
                >
                  <Icon icon="mdi:chevron-right" className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>
            <p className="mb-12 max-w-7xl text-[#65676C] text-sm">Clients consistently commend our consultancy agency for its transformative impact on their businesses.Our strategic solutions have streamlined operations, enhanced decision-making, and driven measurable growth, earning the trust and loyalty of organizations across various industries.</p>
          </div>


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
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
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
                    <div className="bg-black text-white  rounded-lg shadow-md  ">
                      <div className="relative">
                        <Image src={"/images/testimonial-bg.png"} alt="" width={48} height={48} className="w-full h-full absolute top-0 right-0" />
                        <Image src={"/images/testimonial-quote.png"} alt="" width={48} height={48} className="absolute bottom-0 right-3" />
                        <div className="mb-4  z-20 p-6 space-y-4 flex flex-col justify-between h-full min-h-[230px]  ">
                          <p className="text-xl">
                            {testimonial.testimonial}
                          </p>
                          <div className="flex items-center justiy-between w-full  gap-3">
                            <div className="flex items-center gap-2">
                              {testimonial.clientImage ? (
                                <div className="w-6 h-6 rounded-full overflow-hidden ">
                                  <Image
                                    src={getSanityImage(testimonial.clientImage)}
                                    alt={testimonial.clientImage.alt || testimonial.clientName}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-6 h-6  rounded-full flex items-center justify-center ">
                                  <span className="text-blue-600 font-semibold">
                                    {testimonial.clientName.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <div>
                                <h4 className="font-semibold text-sm ">{testimonial.clientName}</h4>
                                <div className="flex text-sm">
                                  {renderStars(testimonial.rating)}
                                </div>
                              </div>
                            </div>
                            <p className="px-4 py-2 text-sm bg-white/5 border border-black font-medium  flex-gorw">{testimonial.clientTitle}, {testimonial.company}</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon icon="mdi:chat" className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
              <p className="text-gray-500">Testimonials will appear here once they are added to Sanity CMS.</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Blogs Section */}
      <section className="py-20 bg-white text-black">
        <div className="px-[8vw] w-full ">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold ">Recent Blogs</h2>
            <Link
              href="/blogs"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              View All Blogs
              <Icon icon="mdi:arrow-right" className="w-5 h-5" />
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
                      className="w-full h-60 object-cover rounded-2xl"
                    />
                  )}
                  <div className="p-6">
                    <h3 className=" font-semibold  line-clamp-2">
                      {blog.title}
                    </h3>
                    <span className=" text-[#98989A] capitalize text-xs ">
                      {blog.category}
                    </span>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1 bg-[#E6E6E6] px-4 py-2 rounded-full border-[#AAAAAA] border text-sm">
                          <Icon icon="mdi:heart-outline" className="w-4 h-4 text-[#474747]" />
                          {formatNumber(blog.likes)}
                        </div>
                        <span className="flex items-center gap-1 bg-[#E6E6E6] px-4 py-2 rounded-full border-[#AAAAAA] border text-sm">
                          <Icon icon="mdi:eye-outline" className="w-4 h-4 text-[#474747]" />
                          {formatNumber(blog.views)}
                        </span>
                      </div>
                      <Link
                        href={`/blogs/${blog.slug.current}`}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 justify-center group"
                      >
                        Read More
                        <Icon icon="mdi:arrow-right" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
