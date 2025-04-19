"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import { RectangleGroupIcon } from "@heroicons/react/20/solid"
import { Fade } from "react-awesome-reveal"
import { fetchMembers } from "@/sanity/queries/others"
import RichContent, { type Content } from "./RichContent"

const Members = () => {
  const [members, setMembers] = useState<{ name: string; description: Content[]; image: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const fetchedMembers = await fetchMembers()
        setMembers(fetchedMembers)
      } catch (error) {
        console.error("Error fetching members:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMembers()
  }, [])

  return (
    <div
      className="flex flex-row items-center relative pt-20 pb-20 max-md:pt-5 max-md:pb-5 gap-36 px-[20%] max-lg:px-6 max-md:gap-10 overflow-hidden"
      id="members"
    >
      <img src="/images/dots.svg" alt="dots" className="absolute -left-7 bottom-4 z-30" />

      <div className="w-full flex flex-col items-center justify-center gap-5 z-40">
        <Fade>
          <Header
            title="Members"
            icon={<RectangleGroupIcon className="fill-[#2563eb] w-6 h-6 max-sm:w-4 max-sm:h-4" />}
          />
          <h1 className="text-black font-bold text-5xl text-center max-md:text-4xl max-sm:text-3xl">
            Meet The <span className="text-[#2563eb]">Team</span>
          </h1>
          <p className="md:text-md max-sm:text-xs text-black/60 font-normal z-10 text-center lg:w-full max-sm:w-11/12">
            Meet the team behind all the work
          </p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse flex flex-col gap-4">
                  <div className="h-72 bg-gray-200 rounded-lg"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            : members.map((member, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <div className="text-sm uppercase tracking-wider text-gray-600">
                      <RichContent content={member.description} />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default Members

