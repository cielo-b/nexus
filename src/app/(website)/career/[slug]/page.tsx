'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { jobQueries } from '@/lib/sanity/queries'
import { Job } from '@/types/job'
import BlockContentRenderer from '@/components/BlockContentRenderer'
export const runtime = 'edge';


export default function JobDetailPage() {
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const slug = params?.slug as string

  useEffect(() => {
    const fetchJob = async () => {
      if (!slug) return

      try {
        const data = await client.fetch(jobQueries.getJobBySlug, { slug })
        if (data) {
          setJob(data)
        } else {
          setError('Job not found')
        }
      } catch (err) {
        console.error('Error fetching job:', err)
        setError('Failed to load job details')
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/career"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            View All Careers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-44 max-md:pt-36 max-sm:pt-36 pb-20 max-md:pb-10 sm:pb-3 max-sm:pb-10">
        <div className="relative px-6 max-sm:px-4">
          <div className="flex flex-col lg:gap-12 md:gap-6 max-sm:gap-4 sm:gap-4 items-center justify-center relative w-full">
            <h1 className="text-black font-bold text-4xl md:text-5xl w-full text-center">
              {job.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                job.jobLocationType === 'remote' 
                  ? 'bg-green-100 text-green-800' 
                  : job.jobLocationType === 'hybrid'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {job.jobLocationType === 'on-site' ? 'On Site' : 
                 job.jobLocationType === 'hybrid' ? 'Hybrid' : 'Remote'}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                {job.schedule === 'full-time' ? 'Full Time' :
                 job.schedule === 'part-time' ? 'Part Time' :
                 job.schedule === 'contract' ? 'Contract' :
                 job.schedule === 'internship' ? 'Internship' : 'Freelance'}
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-lg">{job.location}</span>
            </div>
            <p className="text-lg text-gray-600 text-center max-w-4xl">
              {job.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Job Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <BlockContentRenderer content={job.content} />
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Apply?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our team and make a difference. Click the button below to apply for this position.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={job.urlToJob}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold inline-flex items-center justify-center"
            >
              Apply Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link
              href="/career"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors duration-300 text-lg font-semibold inline-flex items-center justify-center"
            >
              View All Careers
            </Link>
          </div>
        </div>
      </section>

      {/* Job Details Sidebar */}
      {/* <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Job Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Location Type</h4>
                <p className="text-gray-600 capitalize">
                  {job.jobLocationType === 'on-site' ? 'On Site' : 
                   job.jobLocationType === 'hybrid' ? 'Hybrid' : 'Remote'}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Schedule</h4>
                <p className="text-gray-600 capitalize">
                  {job.schedule === 'full-time' ? 'Full Time' :
                   job.schedule === 'part-time' ? 'Part Time' :
                   job.schedule === 'contract' ? 'Contract' :
                   job.schedule === 'internship' ? 'Internship' : 'Freelance'}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <p className="text-gray-600">{job.location}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Posted</h4>
                <p className="text-gray-600">
                  {new Date(job.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}

