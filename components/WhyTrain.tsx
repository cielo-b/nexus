"use client"

import { ArrowRight, Lightbulb, Users, Target } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type React from "react"

export default function WhyTrain() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const footer = document.querySelector("footer")
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br bg-[#f2f4fa]">
      <div className="mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-500 text-transparent bg-clip-text"
        >
          Why Choose Insight Nexus Ltd For Your Training Needs?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <FeatureItem
            icon={<Lightbulb className="w-12 h-12 text-blue-600" />}
            title="Expert-Led Training"
            description="Our programs are led by experienced professionals who combine practical knowledge with academic excellence."
          />
          <FeatureItem
            icon={<Users className="w-12 h-12 text-blue-600" />}
            title="Tailored Courses"
            description="We customize our courses to meet each client's specific needs, ensuring relevant skill development."
          />
          <FeatureItem
            icon={<Target className="w-12 h-12 text-blue-600" />}
            title="Comprehensive Solutions"
            description="Whether you're an individual or an organization, we have the training solutions you need."
          />
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* <Link
            href="#contact"
            onClick={scrollToContact}
            className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Contact Us Today
            <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Link> */}
        </motion.div>
      </div>
    </section>
  )
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </motion.div>
  )
}

