import React, { useState } from "react";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import GroupedLinks from "./GroupedLinks";
import { FooterLinks } from "@/constants";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';
import ContactUs from "./ContactUs";
import Link from "next/link";

const Popup = ({
  handleClose,
  title,
  message,
  image,
}: {
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  message: string;
  image: string;
}) => (
  <div className="fixed top-0 left-0 w-full h-full bg-[#000000a4] backdrop-blur-lg flex justify-center items-center max-sm:px-6 z-50">
    <div className="bg-white p-6 rounded-[30px] text-center relative flex flex-col items-center justify-center gap-5">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
        onClick={handleClose}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      <div className="w-[160px] h-[160px] bg-white flex items-center justify-center rounded-full absolute -top-[25%] z-30">
        <img src={image} alt={title} className="w-[60px] absolute top-10" />
      </div>
      <h2 className="text-[#000912] font-semibold text-xl max-sm:text-lg z-50 mb-2 w-full">
        {title}
      </h2>
      <p className="text-[#000912] z-50">{message}</p>
      <CustomButton
        title="Got it!"
        handleClick={handleClose}
        containerStyles="flex items-center justify-center w-full"
        textStyles="text-white"
      />
    </div>
  </div>
);

const Footer = () => {


  return (
    <div className="bg-[#f2f4fa] px-[100px] max-lg:px-6 py-[50px] max-lg:py-[25px]  flex flex-col w-full gap-[34px] max-md:gap-[27px] max-sm:gap-[16px]">
      <hr className="border-1 border-[#C6C6C6] w-full " />
      <div className="w-full flex items-center justify-between flex-col-reverse md:flex-row gap-20">
        <div className="lg:w-[50%]">
        <Link href="/" className="w-fit h-fit">
     

     <p className="text-2xl font-bold italic">
      Insight<span className="text-blue-600 italic">Nexus</span>
</p>
     </Link>
          
          <p className="text-lg font-medium text-black/70 mt-4">
            All about delivering data-driven insights and comprehensive consultancy services to foster impactful and sustainable change in education, agriculture, public health, and more.
          </p>
          <div className='flex flex-col gap-[24px] max-lg:w-[45%] mt-6'>
            <div className="flex items-center gap-2 text-lg text-[#000912]/70">
              <HiLocationMarker />
              <span>Kigali, Rwanda</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-[#000912]/70">
              <HiMail />
              <span>info@insightnexus.africa</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-[#000912]/70">
              <HiPhone />
              <span>+250 790 000 000</span>
            </div>

            <div className="flex gap-[20px] mt-6">
              <a
                href="https://x.com/insightnexus_c"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#000912] hover:text-[#1DA1F2]"
              >
                <FaTwitter size={30} />
              </a>
              <a
                href="https://www.instagram.com/insightnexus_c?igsh=OTd4ZWpudm95Nmxj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#000912] hover:text-[#C13584]"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61564435222131"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#000912] hover:text-[#3b5998]"
              >
                <FaFacebook size={30} />
              </a>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[50%] lg:px-[3%]  ">
          <ContactUs />
        </div>
      </div>

      <hr className="border-1 border-[#C6C6C6] w-full " />

      <div className="w-full flex items-center justify-center ">
        <p className="text-[#000912]/50 font-medium text-center max-sm:text-sm">
          Copyright © 2024{" "}
          <a href="mailto:team.nexus@gmail.com" className="text-[#000912]">
            info@insightnexus.africa
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
