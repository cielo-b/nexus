import type React from "react"
import { Award, Shield, Lightbulb, Users, Leaf, Heart, Target } from "lucide-react"
import { Fade } from "react-awesome-reveal"
import Header from "./Header"

interface CoreValueProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
}

const CoreValue: React.FC<CoreValueProps> = ({ icon: Icon, title, description }) => (
  <Fade>
    <div className="flex flex-col h-[300px] w-[400px] space-y-4 bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div className="space-y-2 flex-grow overflow-auto">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </Fade>
)

export default function CoreValuesSection() {
  const coreValues = [
    {
      icon: Award,
      title: "Excellence",
      description:
        "We are committed to delivering the highest quality services, using the best practices and methodologies to ensure impactful results.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We operate honestly, transparently, and accountable in all our interactions, maintaining trust with our stakeholders.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace new ideas and technological advancements to offer creative, effective, and practical solutions.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and partnerships, creating synergies that drive sustainable development.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We are dedicated to promoting long-term solutions that contribute to communities' social, economic, and environmental well-being.",
    },
    {
      icon: Heart,
      title: "Inclusivity",
      description:
        "We strive to ensure that all voices are heard and considered, promoting equal opportunities for a more inclusive society.",
    },
  ]

  return (
    <section className="relative px-4 py-16 md:py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <img src="/images/zigs.svg" alt="zigs" className="absolute w-2/5 -bottom-1/3 -left-1/4 z-0" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="relative w-fit mb-12">
          <Fade>
            <Header
              title="Our core values"
              icon={<Target className="text-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />}
            />
          </Fade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-12 justify-items-center">
          {coreValues.map((value, index) => (
            <CoreValue key={index} {...value} />
          ))}
        </div>
      </div>
    </section>
  )
}

