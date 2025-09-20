'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { CareerOffer } from '@/types/careerOffer'
import { CareerTeam } from '@/types/careerTeam'
import { Icon } from '@iconify/react/dist/iconify.js'

export default function CareerPage() {

  // What We Offer data
  const offersData = [
    {
      icon: "mdi:earth",
      title: "Purposeful Work",
      description: "We engage in research and consulting that create lasting impact—advancing equity, policy reform, and sustainable development. Our projects are rooted in real-world needs, working with governments, NGOs, and international partners to drive change that matters."
    },
    {
      icon: "mdi:account-group", 
      title: "Collaborative Expertise",
      description: "Our diverse team brings together experts in economics, gender equality and social inclusion, public health, and data science. We value mutual learning and open collaboration—when you join Insight Nexus, you join a space where your voice and expertise help shape better futures."
    },
    {
      icon: "mdi:trending-up",
      title: "Growth & Learning", 
      description: "We invest in our people. From training workshops to mentorship, we support each team member's personal and professional journey—whether you're sharpening your analytical skills or preparing for graduate study."
    },
    {
      icon: "mdi:lightbulb",
      title: "Innovation-Driven Culture", 
      description: "We believe big ideas emerge from bold thinking. We embrace cutting-edge tools—like geospatial mapping, machine learning, and real-time data collection—to deliver smarter insights and transform how research is done."
    }
  ]

  // Our Teams data
  const teamsData = [
    {
      emoji: "📊",
      title: "Research & Innovation Team",
      description: "The Research & Innovation Team leads the development of high-impact studies from design to insight. They transform complex policy and development challenges into evidence that guides real-world decisions. Combining interdisciplinary expertise with curiosity and rigor, they ensure each project delivers practical, ethical, and meaningful outcomes that advance social progress and inform smarter strategies."
    },
    {
      emoji: "🧪",
      title: "Data Quality & Systems Team",
      description: "This team safeguards the accuracy, integrity, and efficiency of our research operations. They develop quality assurance systems, implement automated monitoring tools, and troubleshoot data issues in real time. With strong technical and analytical skills, they ensure Insight Nexus consistently delivers data that is reliable, valid, and ready to drive confident decision-making."
    },
    {
      emoji: "🧠",
      title: "Analytics & Technical Support Team",
      description: "Experts in statistical modeling, impact evaluation, and econometrics, this team supports technical excellence across projects. They advise on methodology, build analytical tools, and turn raw data into evidence-rich narratives. Their innovations strengthen how we measure change, unpack outcomes, and ensure that research findings are both precise and policy-relevant."
    },
    {
      emoji: "🔍",
      title: "Research Operations Team",
      description: "Our Research Operations Team ensures seamless fieldwork execution, managing logistics, workflows, and research protocols. They coordinate teams, train staff, and maintain ethical standards on the ground. Their understanding of local dynamics and data collection realities bridges research design with field delivery—ensuring all studies are conducted smoothly, professionally, and with community respect."
    },
    {
      emoji: "📋",
      title: "Program Management Team",
      description: "The Program Management Team oversees the full life cycle of research projects, ensuring all activities meet deadlines, standards, and objectives. They coordinate internal teams, partners, and client expectations, while proactively managing risks. Their leadership keeps Insight Nexus agile, responsive, and always focused on delivering impactful, on-time, and ethically sound work."
    },
    {
      emoji: "🧭",
      title: "Field Engagement Team",
      description: "This team forms the human connection between Insight Nexus and the communities we serve. Made up of highly trained enumerators, supervisors, moderators, and translators, they collect high-quality data in diverse environments. Their professionalism, cultural sensitivity, and deep local knowledge ensure ethical, respectful engagement and accurate, trustworthy information gathering across all contexts."
    },
    {
      emoji: "📢",
      title: "Partnerships & Communications Team",
      description: "From building donor relationships to shaping strategic proposals, this team grows our reach and influence. They communicate our research clearly and persuasively to diverse stakeholders. Their expertise in partnership-building, messaging, and storytelling ensures our work resonates with policymakers, funders, and the public, turning results into actionable insights and lasting collaborations."
    },
    {
      emoji: "💼",
      title: "Finance & People Team",
      description: "This team manages Insight Nexus's financial health and organizational growth. They oversee audits, budgeting, procurement, and regulatory compliance, while also leading recruitment and talent development. Their dual focus ensures operational excellence and employee wellbeing, creating a work culture where teams thrive, careers grow, and the organization stays transparent, resilient, and people-centered."
    }
  ]

  return (
    <div className="min-h-screen text-gray-700">
      {/* Hero Section */}
      <section className="relative pt-44 max-md:pt-36 max-sm:pt-36 pb-20 max-md:pb-10 sm:pb-3 max-sm:pb-10">
        <div className="relative px-6 max-sm:px-4">
          <div className="flex flex-col lg:gap-12 md:gap-6 max-sm:gap-4 sm:gap-4 items-center justify-center relative w-full">
            <h1 className="text-black font-bold text-5xl w-full text-center">
              <span className="text-[#2563eb] inline-block relative items-center justify-center">
                <span className="z-40 relative">Why Join </span>
              </span> Insight Nexus
            </h1>
            <div className="space-y-6 text-muted-foreground mx-auto max-w-6xl text-base leading-relaxed">
              <p>At <strong>Insight Nexus Ltd</strong>, we go beyond data collection—we generate evidence that drives real-world change. Joining our team means contributing to high-quality, impactful research that addresses today's most pressing policy and development challenges. Our work spans sectors such as public health, education, social protection, youth empowerment, and gender equality. Every project we undertake is grounded in ethical research practices, cultural sensitivity, and a strong commitment to social justice.</p>
              <p>We believe that <strong>research should be more than a task—it should be a tool for empowerment</strong>. That's why we approach our work with empathy, integrity, and deep contextual understanding. We ensure that all research participants are treated with dignity and that the insights we uncover are used to uplift and inform communities, policymakers, and partners.</p>
              <p>As an organization, we are <strong>intentional about fostering a workplace that values people</strong>. Our team is made up of professionals from diverse disciplines and backgrounds who are united by a shared passion for rigorous inquiry and transformative outcomes. Whether you're an early-career researcher or an experienced evaluator, we provide opportunities to grow, lead, and make meaningful contributions.</p>
              <p>At Insight Nexus, you'll benefit from:
                <ul className="list-disc list-inside mt-2 ml-4 space-y-2">
                  <li>A collaborative and inclusive environment that celebrates different perspectives.</li>
                  <li>Clear pathways for <strong>career advancement</strong> and <strong>skill development</strong>.</li>
                  <li>The chance to work on <strong>multi-sectoral projects</strong> with local and international partners.</li>
                  <li>A supportive culture that promotes <strong>learning, innovation</strong>, and <strong>impact</strong>.</li>
                </ul>
              </p>
              <p>We don't just offer employment—we offer a chance to be part of something bigger: building knowledge that shapes better futures. At Insight Nexus, you're not just starting a job—you're starting a career with purpose.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">What <span className="text-[#2563eb]">We</span> Offer</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {offersData.map((offer, index) => (
              <div key={index} className="group relative p-6 md:p-8 rounded-xl bg-card hover:bg-accent transition-colors duration-300 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary  transition-colors duration-300">
                    <Icon icon={offer.icon} className="w-6 h-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold tracking-tight">{offer.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{offer.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Teams Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">Our teams</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {teamsData.map((team, index) => (
              <div key={index} className="group p-6 md:p-8 rounded-xl bg-card hover:bg-accent/50 transition-colors duration-300 border border-gray-300">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {team.emoji} {team.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{team.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
