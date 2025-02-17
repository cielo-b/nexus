"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import RichContent, { type Content } from "@/components/RichContent"
import Redirect from "@/components/Redirect"
import { fetchTrainingByID } from "@/sanity/queries/trainings"

interface Training {
  _id: string
  title: string
  excerpt: Content[]
  image?: string
  content: string
  link: string
}

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm z-50">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
    </div>
  )
}

export default function TrainingPage() {
  const { id } = useParams<any>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [training, setTraining] = useState<Training | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return
      try {
        const trainingData = await fetchTrainingByID(id)
        setTraining(trainingData)
      } catch (error) {
        console.error("Failed to fetch content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [id])

  if (loading) return <Loader />
  if (!training) return <Redirect to="/" />

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <div className="flex-grow  mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span className="text-sm font-medium">Back to Trainings</span>
        </button>
        <div className="bg-white  rounded-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3 p-6 sm:p-8 lg:p-10">
              <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">{training.title}</h1>
              <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
                <RichContent content={training.content as any} />
              </div>
              <a
                href={training.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Now
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="md:w-1/3 relative">
              {training.image ? (
                <div className="h-64 md:h-full">
                  <Image
                    src={training.image || "/placeholder.svg"}
                    alt={training.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none"
                  />
                </div>
              ) : (
                <div className="h-64 md:h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">No image available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export const runtime = "edge"

