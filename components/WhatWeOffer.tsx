import { Globe2, Users2, TrendingUp, Lightbulb } from "lucide-react"

const offerings = [
  {
    icon: Globe2,
    title: "Work that matters",
    description:
      "At Insight Nexus we work exclusively on projects with the potential for scalable social impact. We offer our teams the chance to make a difference on key policy and development issues, for clients such as multilateral organizations, foundations, NGOs and universities.",
  },
  {
    icon: Users2,
    title: "Top team",
    description:
      "Work with a driven and diverse team. Our teams have expertise across fields from biostatistics to education to econometrics. Joining our team means the chance to build your skills and work with experts in their fields.",
  },
  {
    icon: TrendingUp,
    title: "Career growth",
    description:
      "We provide every team member with 10 learning days and an annual learning allowance to pursue their learning goals – whether it's polishing their Python skills or pursuing a Master's degree.",
  },
  {
    icon: Lightbulb,
    title: "Space for ideas",
    description:
      "Insight Nexus offers a dynamic environment, focused on learning and innovation. We actively seek opportunities to improve the way we work using the latest technical innovations, combining methods such as machine learning and geospatial analysis to deliver cutting-edge research.",
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

