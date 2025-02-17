"use client"

import { useState } from "react"
import { MenuLinks } from "@/constants"
import MenuItem from "./MenuItem"
import Link from "next/link"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { motion, AnimatePresence } from "framer-motion"

interface MenuItemProps {
  to: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick = (to: string) => {
    setIsMenuOpen(false) // Close the menu when a link is clicked
    const section = document.querySelector(to)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }) // Smooth scroll to the section
    }
  }

  return (
    <div className="w-full bg-[#00051234] backdrop-blur-xl z-50 py-5 px-6 lg:px-[10%] flex flex-row fixed items-center justify-between">
      <Link href="/" className="w-fit h-fit">
        <p className="text-xl font-bold italic">
          Insight<span className="text-blue-600 italic">Nexus</span>
        </p>
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
          className="text-[#2563eb] rounded-full p-2 z-50 fixed top-5 right-6"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <AiOutlineClose className="w-6 h-6 text-white" />
          ) : (
            <AiOutlineMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      <Link
        href={"/#contactus"}
        className={`bg-[#2563eb] text-white rounded-full lg:flex gap-2 flex-row hidden items-center justify-center max-sm:px-2 max-sm:py-2 px-6 py-4 hover:bg-[#2563eb11] border-[#2563eb] hover:shadow-sm hover:shadow-[#2563eb45] ease-out duration-300 group border`}
        onClick={() => handleLinkClick("#contactus")}
      >
        Contact Us
      </Link>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-screen w-screen bg-[#000512] backdrop-blur-3xl border border-[#2563eb] shadow-md lg:hidden flex-col p-[5vw] gap-4 items-center justify-center z-40"
          >
            {MenuLinks.map((menuLink, index) => (
              <MenuItem
                key={index}
                to={menuLink.link}
                label={menuLink.title}
                isActive={false}
              />
            ))}
            <Link
              href={"#contactus"}
              className={`bg-[#2563eb] text-white rounded-full flex gap-2 flex-row items-center justify-center max-sm:px-2 max-sm:py-2 px-6 py-4 hover:bg-[#2563eb11] border-[#2563eb] hover:shadow-sm hover:shadow-[#2563eb45] ease-out duration-300 group border`}
              onClick={() => handleLinkClick("#contactus")}
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NavBar