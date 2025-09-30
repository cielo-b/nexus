'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Icon } from '@iconify/react'
import { Author } from '@/types/author'
import * as Popover from '@radix-ui/react-popover'

interface AuthorPopoverProps {
  author: Author
  children: React.ReactNode
}

export default function AuthorPopover({ author, children }: AuthorPopoverProps) {
  const router = useRouter()
  const pathname = usePathname()

  const getOrcidUrl = (orcidId: string) => {
    return `https://orcid.org/${orcidId}`
  }

  const getPubMedSearchUrl = (authorName: string) => {
    const encodedName = encodeURIComponent(authorName)
    return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodedName}`
  }

  const getGoogleScholarUrl = (authorName: string) => {
    const encodedName = encodeURIComponent(authorName)
    return `https://scholar.google.com/scholar?q=${encodedName}`
  }

  const handleViewOtherContent = () => {
    const encodedAuthorName = encodeURIComponent(author.name)
    
    // Determine if we're on a publication or blog page
    if (pathname.includes('/publications')) {
      router.push(`/publications?author=${encodedAuthorName}`)
    } else if (pathname.includes('/blogs')) {
      router.push(`/blogs?author=${encodedAuthorName}`)
    } else {
      // Default to publications if we can't determine the context
      router.push(`/publications?author=${encodedAuthorName}`)
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className="cursor-pointer hover:text-blue-600 transition-colors">
          {children}
        </div>
      </Popover.Trigger>
      
      <Popover.Portal>
        <Popover.Content
          className="z-20 bg-white border border-gray-200 rounded-xl shadow-2xl w-2xl max-h-96 overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          sideOffset={8}
        >
          <div className="p-5">
            {/* Header */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-xl">{author.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1">
                {author.isCorrespondingAuthor && (
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mb-1">
                    Corresponding Author
                  </span>
                )}
                <h3 className="text-lg font-semibold text-gray-900">{author.name}</h3>
                {author.title && (
                  <p className="text-sm text-gray-600">{author.title}</p>
                )}
              </div>
            </div>

            {/* Affiliations */}
            {author.affiliations && author.affiliations.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Affiliations</h4>
                {author.affiliations.map((affiliation, index) => (
                  <div key={index} className="text-sm text-gray-600 mb-1">
                    {affiliation}
                  </div>
                ))}
              </div>
            )}

            {/* Contact Links */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-center justify-between gap-2">
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Icon icon="mdi:email" className="w-4 h-4" />
                    {author.email}
                  </a>
                )}
                {author.orcidId && (
                  <a
                    href={getOrcidUrl(author.orcidId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    <Icon icon="simple-icons:orcid" className="w-4 h-4" />
                    ORCID Profile
                  </a>
                )}
              </div>
            </div>

            {/* Research Interests */}
            {author.researchInterests && author.researchInterests.length > 0 && (
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Research Interests</h4>
                <div className="flex flex-wrap gap-1">
                  {author.researchInterests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* View Other Content Button */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <button
                onClick={handleViewOtherContent}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Icon icon="mdi:file-document-multiple" className="w-4 h-4" />
                View Other {pathname.includes('/blogs') ? 'Blogs' : 'Publications'}
              </button>
            </div>

            {/* Search Links */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-800 mb-3">Search Publications</h4>
              <div className="flex items-center gap-3">
                <a
                  href={getPubMedSearchUrl(author.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-800 border w-full border-blue-800 py-2 px-4 rounded-full transition-colors"
                >
                  <Icon icon="simple-icons:pubmed" className="w-4 h-4" />
                  Search on PubMed
                </a>
                <a
                  href={getGoogleScholarUrl(author.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-800 border w-full border-blue-800 py-2 px-4 rounded-full transition-colors"
                >
                  <Icon icon="simple-icons:googlescholar" className="w-4 h-4" />
                  Search on Google Scholar
                </a>
              </div>
            </div>
          </div>
          
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
