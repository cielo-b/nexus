"use client"

import "ldrs/ring"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import RichContent, { type Content } from "@/components/RichContent"
import Image from "next/image"
import Redirect from "@/components/Redirect"
import { fetchTrainingByID } from "@/sanity/queries/trainings"
import { ArrowLeft, ExternalLink } from "lucide-react"

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
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
      <div className="flex-grow mx-auto px-4 py-8 mt-20">
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Trainings
        </button>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">{training.title}</h1>
              <div className="prose max-w-none">
                <RichContent content={training.content as any} />
              </div>
              <a
                href={training.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                Apply Now
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="md:w-1/3 relative">
              {training.image && (
                <div className="h-full">
                  <Image
                    src={training.image || "/placeholder.svg"}
                    alt={training.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-r-lg"
                  />
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

