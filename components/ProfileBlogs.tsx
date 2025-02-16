import Link from "next/link"
import RichContent from "@/components/RichContent"

interface Article {
  _id: string
  title: string
  excerpt: any[]
  image: string
  category?: {
    _id: string
    title: string
  }
}

interface ProfileBlogsProps {
  articles: Article[]
}

export default function ProfileBlogs({ articles = [] }: ProfileBlogsProps) {
  if (articles.length === 0) {
    return null // Don't render the section if there are no articles
  }

  // Take only the first 3 articles
  const previewArticles = articles.slice(0, 3)

  return (
    <section className="py-16 md:py-24 px-4 bg-[#f2f4fa]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Latest Profiles</h2>
          <p className="text-gray-600 text-center max-w-2xl">
            Explore our latest profiles and insights from our team and partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {previewArticles.map((article) => (
            <Link
              href={`/blog/${article._id}`}
              key={article._id}
              className="group bg-white shadow-sm hover:shadow-lg rounded-xl flex flex-col relative h-72 overflow-hidden transition-all duration-300"
            >
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl"></div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full">
                  {article.category?.title || "Profiles"}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <div className="text-sm text-white/80 line-clamp-2">
                    <RichContent content={article.excerpt} />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/blog">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
              See All Profiles
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

