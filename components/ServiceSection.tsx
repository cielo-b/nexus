"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface SectionContent {
  title: string
  image: string
  description: string
}

const sections: Record<string, SectionContent> = {
  agriculture: {
    title: "Data collection ",
    image: "/image1.png",
    description:
      "At Insight Nexus, our data collection service is the cornerstone of informed decision-making, utilizing cutting-edge methodologies to gather accurate and relevant data across various sectors. Our team employs a range of tools and techniques (surveys, FGDs, and KIIs), from traditional surveys to advanced digital platforms, ensuring comprehensive coverage and high-quality data to support robust research and evaluation efforts In our commitment to upholding the highest standards of data integrity and reliability, Insight Nexus integrates advanced data management strategies inspired by the World Bank's Development Impact Evaluation (DIME) group. Our approach encompasses the following key components",

  },
  education: {
    title: "High-Frequency Checks (HFC)",
    image: "/image1.png",
    description:
      "We employ High-Frequency Checks to scrutinize every new dataset we receive, ensuring real-time feedback on data quality to both our field and research teams. This rigorous process focuses on verifying the completeness, consistency, and accuracy of our data, promptly identifying and rectifying any anomalous data points, including outliers. By adhering to these principles, we guarantee the refinementand reliability of our research data across all projects",

  },
  gender: {
    title: "Spot Checks",
    image: "/image1.png",
    description: "While the initial information suggested Sport Checks, we clarify our practice of Spot Checks—a method integral to our quality control process. These checks involve random, unannounced visits to data collection sites or during data entry activities to verify adherence to protocols and the accuracy of the data being collected or entered. This proactive approach further strengthens the validity and reliability of our data. This process done by our team leaders, and field supervisors. By adopting these sophisticated data management strategies, Insight Nexus ensures that our clients receive unparalleled support, backed by data of the utmost quality. Our dedication to employing these best practices demonstrates our commitment to excellence and our role as a trusted partner in research and development",
  },
  livelihoods: {
    title: "Data Backchecking",
    image: "/image1.png",
    description: "Complementing our HFCs, Data Backchecking serves as a cornerstone of our data quality assurance framework. Prior to any survey deployment, we conduct a data-focused pilot to fine-tune our high-frequency check processes. This entails a meticulous comparison of collected survey results against the original data to pinpoint and investigate any discrepancies. Such a thorough examination ensures that our data collection efforts align perfectly with our research objectives, cementing the accuracy and consistency of our findings. Between 3% to 10% of collected backchecked based on client request and budget",


  },
  health: {
    title: "Research",
    image: "/image1.png",
    description: "Our research services are designed to uncover deep insights and actionable intelligence, driving policy formulation and strategic decisions. Focusing on sectors such as public health, GESI, agriculture, education, Economic development, and more, we leverage qualitative and quantitative methods to produce evidence-based analyses that guide our clients toward impactful outcomes" 
   },
  collaboration: {
    title: "Monitoring, Evaluation, and Learning (MEL)",
    image: "/image1.png",
    description: "The MEL service at Insight Nexus is pivotal in assessing project effectiveness facilitating continuous improvement, and learning. By systematically tracking progress and evaluating results against objectives, we provide our clients with the clarity needed to refine strategies, enhance performance, and maximize impact.",
  },
  organizational: {
    title: "Analytics",
    image: "/image1.png",
    description: "Our analytics service transforms raw data into clear, actionable insights. Utilizing advanced statistical techniques and data visualization tools, we help organizations understand complex patterns, trends, and relationships within their data, enabling informed strategic planning and operational efficiencies.",

  },
  dataScience: {
    title: "IT Assistance",
    image: "/image1.png",
    description: "Insight Nexus offers specialized IT assistance, focusing on developing and implementing technology solutions that streamline operations and enhance data management. From custom software development to training in data management systems and tools (DHIS2, REDcup, ODK, kobocollect, and more), and equipping staff with IT skills (internet navigation, MS Office, etc).  our IT services are tailored to meet the specific needs of our clients, ensuring they have the robust technological foundation necessary to achieve their goals.",
  },
 
}

export default function ServicesSection() {
  const [activeSection, setActiveSection] = useState("agriculture")

  return (
    <div className="flex flex-col lg:flex-row gap-9 p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      {/* Navigation Links */}
      <div className="lg:w-1/4 space-y-2 order-1 lg:order-1">
        {Object.entries(sections).map(([key, { title }]) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`text-left w-full px-4 py-2 rounded-lg transition-colors ${
              activeSection === key ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-700 hover:text-blue-600"
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="lg:w-2/5 order-2 lg:order-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="relative">
                <h2 className="text-3xl font-bold">{sections[activeSection].title}</h2>
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-blue-600"></div>
              </div>
              <p className="text-gray-700 text-md leading-relaxed">{sections[activeSection].description}</p>
            </div>

            <div className="pt-8">
              <h3 className="text-xl font-bold mb-4">Check Out Our {sections[activeSection].title} Works</h3>
              <p className="text-gray-600">No Works Yet!!</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Area */}
      <div className="lg:w-1/3 order-3 lg:order-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src={sections[activeSection].image || "/placeholder.svg"}
              alt={sections[activeSection].title}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

