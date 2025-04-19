import type React from "react"
import CustomButton from "./CustomButton"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi"
import ContactUs from "./ContactUs"
import Link from "next/link"

const Popup = ({
  handleClose,
  title,
  message,
  image,
}: {
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void
  title: string
  message: string
  image: string
}) => (
  <div className="fixed top-0 left-0 w-full h-full bg-[#000000a4] backdrop-blur-lg flex justify-center items-center p-4 z-50">
    <div className="bg-white p-6 rounded-[30px] text-center relative flex flex-col items-center justify-center gap-5 max-w-sm w-full">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
        onClick={handleClose}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      <div className="w-[120px] h-[120px] bg-white flex items-center justify-center rounded-full absolute -top-16 z-30">
        <img src={image || "/placeholder.svg"} alt={title} className="w-[50px] absolute top-8" />
      </div>
      <h2 className="text-[#000912] font-semibold text-lg mt-10 z-50 mb-2 w-full">{title}</h2>
      <p className="text-[#000912] text-sm z-50">{message}</p>
      <CustomButton
        title="Got it!"
        handleClick={handleClose}
        containerStyles="flex items-center justify-center w-full"
        textStyles="text-white"
      />
    </div>
  </div>
)

const Footer = () => {
  return (
    <div className="bg-[#f2f4fa] px-4 sm:px-6 lg:px-[100px] py-8 sm:py-12 lg:py-[50px] flex flex-col w-full gap-6 sm:gap-8 lg:gap-[34px]">
      <hr className="border-1 border-[#C6C6C6] w-full" />
      <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-20">
        <div className="w-full lg:w-[50%]">
          <Link href="/" className="w-fit h-fit">
            <p className="text-xl sm:text-2xl font-bold italic">
              Insight<span className="text-blue-600 italic">Nexus</span>
            </p>
          </Link>

          <p className="text-base sm:text-lg font-medium text-black/70 mt-4">
            All about delivering data-driven insights and comprehensive consultancy services to foster impactful and
            sustainable change in education, agriculture, public health, and more.
          </p>
          <div className="flex flex-col gap-4 sm:gap-[24px] mt-6">
            <div className="flex items-center gap-2 text-base sm:text-lg text-[#000912]/70">
              <HiLocationMarker />
              <span>Kigali, Rwanda</span>
            </div>
            <div className="flex items-center gap-2 text-base sm:text-lg text-[#000912]/70">
              <HiMail />
              <span>info@insightnexus.africa</span>
            </div>
            <div className="flex items-center gap-2 text-base sm:text-lg text-[#000912]/70">
              <HiPhone />
              <span>+250 790 000 000</span>
            </div>

            <div className="flex gap-4 sm:gap-[20px] mt-4 sm:mt-6">
              <a
                href="https://x.com/insightnexus_c"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#000912] hover:text-[#1DA1F2]"
              >
                <FaTwitter size={24} className="sm:w-[30px] sm:h-[30px]" />
              </a>
              <a
                href="https://www.instagram.com/insightnexus_c?igsh=OTd4ZWpudm95Nmxj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#000912] hover:text-[#C13584]"
              >
                <FaInstagram size={24} className="sm:w-[30px] sm:h-[30px]" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61564435222131"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#000912] hover:text-[#3b5998]"
              >
                <FaFacebook size={24} className="sm:w-[30px] sm:h-[30px]" />
              </a>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[50%]">
          <ContactUs />
        </div>
      </div>

      <hr className="border-1 border-[#C6C6C6] w-full" />

      <div className="w-full flex items-center justify-center">
        <p className="text-[#000912] font-medium text-center text-xs sm:text-sm">
          Insight Nexus || Powered by Y4 Lab.© 2025
        
        </p>
      </div>
    </div>
  )
}

export default Footer

