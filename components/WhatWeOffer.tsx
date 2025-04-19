import { Globe2, Users2, TrendingUp, Lightbulb } from "lucide-react"

const offerings = [
  {
    icon: Globe2,
    title: "Purposeful Work",
    description:
      "We engage in research and consulting that create lasting impact—advancing equity, policy reform, and sustainable development. Our projects are rooted in real-world needs, working with governments, NGOs, and international partners to drive change that matters.",
  },
  {
    icon: Users2,
    title: "Collaborative Expertise",
    description:
      "Our diverse team brings together experts in economics, gender equality and social inclusion, public health, and data science. We value mutual learning and open collaboration—when you join Insight Nexus, you join a space where your voice and expertise help shape better futures.",
  },
  {
    icon: TrendingUp,
    title: "Growth & Learning",
    description:
      "We invest in our people. From training workshops to mentorship, we support each team member's personal and professional journey—whether you're sharpening your analytical skills or preparing for graduate study.",
  },
  {
    icon: Lightbulb,
    title: "Innovation-Driven Culture",
    description:
      "We believe big ideas emerge from bold thinking. We embrace cutting-edge tools—like geospatial mapping, machine learning, and real-time data collection—to deliver smarter insights and transform how research is done.",
  },
]

export default function WhatWeOffer() {
  return (
    <section className="py-16 md:py-24 px-4 bg-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">What we offer</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {offerings.map((offering, index) => (
            <div
              key={offering.title}
              className="group relative p-6 md:p-8 rounded-xl bg-card hover:bg-accent transition-colors duration-300 border shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <offering.icon className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold tracking-tight">{offering.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{offering.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

