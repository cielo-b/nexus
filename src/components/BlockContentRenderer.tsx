import { PortableText, PortableTextBlock } from '@portabletext/react'
import Image from 'next/image'
import { getSanityImage } from '@/lib/getSanityImage'

interface BlockContentRendererProps {
  content: PortableTextBlock[]
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null
      
      return (
        <div className="my-8 flex justify-center">
          <Image
            src={getSanityImage(value)}
            alt={value.alt || 'Image'}
            width={800}
            height={600}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-gray-900 mb-5 mt-7 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-6 first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-5 first:mt-0">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-gray-700 leading-relaxed">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-gray-700 leading-relaxed">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-800">
        {children}
      </em>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
}

export default function BlockContentRenderer({ content }: BlockContentRendererProps) {
  if (!content || content.length === 0) {
    return null
  }

  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
}
