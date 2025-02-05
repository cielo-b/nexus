import React from "react";
import { MenuLinks } from "@/constants";
import MenuItem from "./MenuItem";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineMenuFold } from "react-icons/ai";
import logo from "@/public/images/logo.png";
import Image from "next/image";

const NavBar = () => {
  return (
    <div className="w-full bg-[#00051234] backdrop-blur-xl z-50 py-5 px-6 lg:px-[10%] flex flex-row fixed items-center justify-between">
      <Link href="/" className="w-fit h-fit">
        <Image
          src={logo as any}
          alt="logo"
          width={1000}
          height={1000}
          className="w-32 max-sm:w-24"
        />
      </Link>

      <div className="hidden lg:flex">
        {MenuLinks.map((menuLink, index) => (
          <MenuItem
            key={index}
            to={menuLink.link}
            label={menuLink.title}
            isActive={false}
          />
        ))}
      </div>

      <div className="lg:hidden flex items-center">
        <button
          className="bg-[#2563eb] text-white rounded-full px-4 py-2"
          onClick={() => {
            document.getElementById("mobile-menu")?.classList.toggle("hidden");
          }}
        >
          <AiOutlineMenu />
        </button>
      </div>

      <Link
        href={"/#contactus"}
        className={`bg-[#2563eb] text-white rounded-full lg:flex gap-2 flex-row hidden items-center justify-center max-sm:px-2 max-sm:py-2 px-6 py-4 hover:bg-[#2563eb11] border-[#2563eb] hover:shadow-sm hover:shadow-[#2563eb45] ease-out duration-300 group border`}
      >
        Contact Us
      </Link>

      <div
        id="mobile-menu"
        onClick={() =>
          document.getElementById("mobile-menu")?.classList.toggle("hidden")
        }
        className="hidden absolute top-0 left-0 h-screen w-screen right-6 bg-[#000512]  backdrop-blur-3xl border border-[#2563eb] rounded-lg shadow-md lg:hidden flex-col p-[5vw] gap-4 items-center justify-center"
      >
        {MenuLinks.map((menuLink, index) => (
          <MenuItem
            key={index}
            to={menuLink.link}
            label={menuLink.title}
            isActive={false}
          // className="px-4 py-2 hover:bg-[#2563eb11]"
          />
        ))}
        <Link
          href={"#contactus"}
          className={`bg-[#2563eb] text-white rounded-full flex gap-2 flex-row items-center justify-center max-sm:px-2 max-sm:py-2 px-6 py-4 hover:bg-[#2563eb11] border-[#2563eb] hover:shadow-sm hover:shadow-[#2563eb45] ease-out duration-300 group border`}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
