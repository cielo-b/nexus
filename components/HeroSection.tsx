import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";
import image from '@/public/images/land.png';
import RichContent, { type Content } from "./RichContent";

interface Category {
  name: string;
}

interface Article {
  _id: string;
  title: string;
  excerpt: Content[];
  image: string;
  category: Category;
}

interface HeroSectionProps {
  articles: Article[];
}

const HeroSection = ({ articles }: HeroSectionProps) => {
  const router = useRouter();
  const [swiper, setSwiper] = useState<any>(null);

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${image.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full min-h-screen flex flex-col items-center justify-center"
      id="home"
    >
      {/* Hero Content */}
      <div className="w-full flex justify-center z-40 py-12">
        <Fade className="px-6 max-sm:px-4 z-40" triggerOnce>
          <div className="flex flex-col gap-6 md:gap-8 items-center justify-center relative w-full z-40">
            <h1 className="text-black font-bold text-4xl sm:text-5xl lg:text-6xl text-center">
              <span className="text-[#2563eb] inline-block relative">
                <Image
                  src="/images/circles.svg"
                  alt=""
                  width={300}
                  height={300}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
                />
                <span className="relative z-10">Empowering </span>
              </span>
              Change
              <br />
              Through Expert{" "}
              <span className="text-[#2563eb] inline-block relative">
                <Image
                  src="/images/circles.svg"
                  alt=""
                  width={400}
                  height={400}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
                />
                <span className="relative z-10">Consultancy</span>
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-xl text-black/60 font-normal text-center max-w-3xl">
              Delivering data-driven insights and comprehensive consultancy services to foster 
              impactful and sustainable change in education, agriculture, public health, and more.
            </p>

            <button
              onClick={() => router.push("/about")}
              className="flex items-center justify-center gap-2 px-12 py-3 rounded-full bg-[#2563eb] text-white transition-all hover:-translate-y-1 hover:bg-blue-700 duration-200"
            >
              <span className="text-sm sm:text-base">More About Us</span>
              <ChevronRightIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </Fade>
      </div>

      {/* Articles Slider */}
      <div className="w-full px-4 md:px-[10vw] py-12">
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
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-2xl" />
                <div className="absolute bottom-0 left-0 p-4 w-full">
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
    </section>
  );
};

export default HeroSection;