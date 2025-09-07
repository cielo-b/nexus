import { client } from '@/lib/sanity'
import { Publication } from '@/types/publication'
import Link from 'next/link'
import Image from 'next/image'

async function getPublications(): Promise<Publication[]> {
  const query = `*[_type == "publication"] | order(publicationDate desc) {
    _id,
    title,
    slug,
    excerpt,
    tableOfContents,
    coverImage,
    publicationDate,
    authors,
    category,
    tags,
    downloadUrl,
    externalUrl,
    featured
  }`
  
  return await client.fetch(query)
}

export default async function PublicationsPage() {
  const publications = await getPublications()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="px-[8vw] sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Publications
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our latest research, policy briefs, case studies, and insights 
              that drive data-driven solutions across education, agriculture, and public health.
            </p>
          </div>
        </div>
      </div>

      {/* Publications Grid */}
      <div className="px-[8vw] sm:px-6 lg:px-8 py-16">
        {publications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No publications yet</h3>
            <p className="text-gray-500">Publications will appear here once they are added to Sanity CMS.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((publication) => (
              <div key={publication._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {publication.coverImage && (
                  <div className="aspect-w-16 aspect-h-9">
                    <Image
                      src={publication.coverImage.asset.url}
                      alt={publication.title}
                      width={400}
                      height={225}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {publication.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    {publication.featured && (
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {publication.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {publication.excerpt}
                  </p>
                  
                  {/* Table of Contents Preview */}
                  {publication.tableOfContents && publication.tableOfContents.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Contents:</h4>
                      <div className="flex flex-wrap gap-1">
                        {publication.tableOfContents.slice(0, 3).map((section, index) => (
                          <span
                            key={section.id.current}
                            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                          >
                            {section.title}
                          </span>
                        ))}
                        {publication.tableOfContents.length > 3 && (
                          <span className="text-xs text-gray-500 px-2 py-1">
                            +{publication.tableOfContents.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">
                      By {publication.author.name}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(publication.publicationDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    
                    <div className="flex space-x-2">
                      {publication.downloadUrl && (
                        <a
                          href={publication.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Download
                        </a>
                      )}
                      <Link
                        href={`/publications/${publication.slug.current}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                  
                  {publication.tags && publication.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {publication.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
