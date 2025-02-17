import { PortableText, type PortableTextReactComponents } from "@portabletext/react"
import { getImageDimensions } from "@sanity/asset-utils"
import Image from "next/image"
import { urlFor } from "@/sanity/sanity.client"

export interface Content {
  _key: string
  markDefs?: any[]
  children?: Children[]
  _type: string
  style?: string
  asset?: Asset
  listItem?: "bullet" | "number"
}

export interface Children {
  _key: string
  marks?: string[]
  text?: string
}

export interface Asset {
  _ref: string
  _type: string
}

interface RichContentProps {
  content: Content[]
}

const RichContent = ({ content }: RichContentProps) => {
  if (!content) return null

  // Image Component
  const ImageComponent = ({ value, isInline }: any) => {
    if (!value?.asset) return null

    const { width, height } = getImageDimensions(value)
    return (
      <Image
        src={urlFor(value)
          .width(isInline ? 800 : 800)
          .fit("max")
          .auto("format")
          .url()}
        alt={value.alt || " "}
        loading="lazy"
        width={width}
        height={height}
        className="py-4 w-full"
        style={{
          display: isInline ? "inline-block" : "block",
          aspectRatio: width / height,
        }}
      />
    )
  }

  // Span Element
  const SpanElement = ({ child }: { child: Children }) => {
    const { _key, marks = [], text = "" } = child

    const styles = {
      textDecoration: marks?.includes("underline") ? "underline" : "none",
      fontWeight: marks?.includes("strong") ? "bold" : "normal",
      fontStyle: marks?.includes("em") ? "italic" : "normal",
    }

    return (
      <span key={_key} style={styles}>
        {text}
      </span>
    )
  }

  // Block Component
  const BlockComponent = ({ value }: { value: Content }) => {
    if (!value?._key || !value?.children) return null

    // Handle lists
    if (value.listItem) {
      const ListTag = value.listItem === "bullet" ? "ul" : "ol"
      return (
        <ListTag key={value._key} className={value.listItem === "bullet" ? "list-disc pl-5 my-4" : "list-decimal pl-5 my-4"}>
          {value.children.map((child) => (
            <li key={child._key}>
              <SpanElement child={child} />
            </li>
          ))}
        </ListTag>
      )
    }

    // Handle block styles
    const getStyleClasses = (style?: string) => {
      switch (style) {
        case "h1":
          return "text-4xl font-bold my-4"
        case "h2":
          return "text-3xl font-bold my-3"
        case "h3":
          return "text-2xl font-bold my-2"
        case "h4":
          return "text-xl font-bold my-2"
        case "blockquote":
          return "border-l-4 border-gray-300 pl-4 italic my-4"
        case "normal":
          return "my-1"
        default:
          return "my-1"
      }
    }

    return (
      <div key={value._key} className={getStyleClasses(value.style)}>
        {value.children.map((child) => (
          <SpanElement key={child._key} child={child} />
        ))}
      </div>
    )
  }

  // PortableText Components
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: ImageComponent,
      block: BlockComponent,
    },
    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
        return (
          <a
            href={value.href}
            rel={rel}
            className="text-blue-600 hover:underline"
            target={!value.href.startsWith("/") ? "_blank" : undefined}
          >
            {children}
          </a>
        )
      },
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">{children}</code>,
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-5 my-4">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-5 my-4">{children}</ol>,
    },
    listItem: ({ children }) => <li className="my-2">{children}</li>,
  }

  return <PortableText value={content} components={components} />
}

export default RichContent