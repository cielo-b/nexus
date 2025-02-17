import type React from "react"
import { useState } from "react"
import { Fade } from "react-awesome-reveal"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Link from "next/link"

import RichContent, { type Content } from "./RichContent"

interface Category {
  name: string
}

interface Article {
  _id: string
  title: string
  excerpt: Content[]
  image: string
  category: Category
}

interface HeroSectionProps {
  articles: Article[]
}

const HeroSection: React.FC<HeroSectionProps> = ({ articles }) => {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(articles.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(articles.length / 3)) % Math.ceil(articles.length / 3))
  }
  const [swiper, setSwiper] = useState<any>(null)

  return (
    <div
      className="w-full h-fit items-center lg:pb-20 max-md:pt-36 max-sm:pb-10 sm:pb-3 max-sm:pt-36 pt-44 gap-10 max-md:gap-10 justify-center flex flex-col bg-white"
      id="home"
    >
      <div className="w-full flex justify-center z-40">
        <Fade className="px-6 max-sm:px-4 z-40">
          <div className="flex flex-col lg:gap-8 md:gap-5 max-sm:gap-4 sm:gap-4 items-center justify-center relative w-full z-40">
            <h1 className="text-black font-bold lg:text-6xl z-20 md:text-5xl max-sm:text-4xl sm:text-4xl w-full text-center ">
              <span className="text-[#2563eb] inline-block relative items-center justify-center">
                <img
                  src="/images/circles.svg"
                  alt=""
                  className="absolute w-[300px] self-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                />
                <span className="z-40 relative">Empowering </span>
              </span>{"  "}
              Change
              <br />
              Through Expert{" "}
              <span className="text-  [#2563eb] inline-block relative items-center justify-center">
                <img
                  src="/images/circles.svg"
                  alt=""
                  className="absolute w-[300px] self-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                  style={{ width: "calc(100% + 100px)" }}
                />
                <span className="z-40 relative">Consultancy</span>
              </span>
            </h1>

            <p className="md:text-xl max-sm:text-xs text-black/60 font-normal z-10 text-center">
              Delivering data-driven insights and comprehensive consultancy <br />
              services to foster impactful and sustainable change in education, <br />
              agriculture, public health, and more.
            </p>
            <div
              onClick={() => router.push("/about")}
              className="cursor-pointer flex items-center justify-center gap-2 p-4 w-fit px-20 rounded-full bg-[#2563eb] text-white transition-all ease-in-out delay-150 hover:-translate-y-1 hover:bg-secondary duration-200"
            >
              <span className="text-sm w-max flex-1 text-center">More About Us</span>
              <ChevronRightIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </Fade>
      </div>

      <div className="relative w-full px-4 md:px-[10vw]">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          className="w-full"
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            type: "bullets",
          }}
          onSwiper={setSwiper}
        >
          {articles.map((article) => (
            <SwiperSlide key={article._id}>
              <Link
                href={`/blog/${article._id}`}
                className="bg-white shadow-lg rounded-2xl flex flex-col relative h-72 w-full overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="h-full w-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold mb-2 text-white">{article.title}</h3>
                  <div className="text-sm text-white/70 line-clamp-2">
                    <RichContent content={article.excerpt} />
                  </div>
                  <p className="text-sm text-white/70 mt-2">{article.category.name}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        
       
        
      </div>
      
    </div>
    
  )
}

export default HeroSection