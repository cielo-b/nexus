import { groq } from 'next-sanity'

export const blogQueries = {
  // Get all blogs with basic info
  getAllBlogs: groq`
    *[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      coverImage {
        asset->{
          _id,
          url
        }
      },
      category,
      author,
      publishedAt,
      readingTime,
      featured,
      likes,
      views,
      shares
    }
  `,

  // Get featured blogs
  getFeaturedBlogs: groq`
    *[_type == "blog" && featured == true] | order(publishedAt desc) [0...1] {
      _id,
      title,
      slug,
      excerpt,
      coverImage {
        asset->{
          _id,
          url
        }
      },
      category,
      author,
      publishedAt,
      readingTime,
      featured,
      likes,
      views,
      shares
    }
  `,

  // Get blogs by category
  getBlogsByCategory: groq`
    *[_type == "blog" && category == $category] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      coverImage {
        asset->{
          _id,
          url
        }
      },
      category,
      author,
      publishedAt,
      readingTime,
      featured,
      likes,
      views,
      shares
    }
  `,

  // Get single blog by slug
  getBlogBySlug: groq`
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      tableOfContents,
      coverImage {
        asset->{
          _id,
          url
        }
      },
      category,
      author,
      publishedAt,
      readingTime,
      featured,
      likes,
      views,
      shares,
      tags
    }
  `,

  // Get similar blogs (same category, excluding current blog)
  getSimilarBlogs: groq`
    *[_type == "blog" && category == $category && _id != $excludeId] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      coverImage {
        asset->{
          _id,
          url
        }
      },
      category,
      author,
      publishedAt,
      readingTime,
      likes,
      views,
      shares
    }
  `,

  // Get all unique categories
  getCategories: groq`
    array::unique(*[_type == "blog"].category)
  `,
}

export const partnerQueries = {
  // Get all partners ordered by display order
  getAllPartners: groq`
    *[_type == "partner"] | order(order asc, name asc) {
      _id,
      name,
      logo,
      url,
      featured,
      order
    }
  `,

  // Get featured partners
  getFeaturedPartners: groq`
    *[_type == "partner" && featured == true] | order(order asc, name asc) {
      _id,
      name,
      logo,
      url,
      featured,
      order
    }
  `,
}

export const testimonialQueries = {
  // Get all testimonials ordered by display order
  getAllTestimonials: groq`
    *[_type == "testimonial"] | order(order asc, rating desc) {
      _id,
      clientName,
      clientTitle,
      company,
      clientImage,
      testimonial,
      rating,
      featured,
      order
    }
  `,

  // Get featured testimonials
  getFeaturedTestimonials: groq`
    *[_type == "testimonial" && featured == true] | order(order asc, rating desc) {
      _id,
      clientName,
      clientTitle,
      company,
      clientImage,
      testimonial,
      rating,
      featured,
      order
    }
  `,

  // Get testimonials with high ratings
  getTopRatedTestimonials: groq`
    *[_type == "testimonial" && rating >= 4] | order(rating desc, order asc) {
      _id,
      clientName,
      clientTitle,
      company,
      clientImage,
      testimonial,
      rating,
      featured,
      order
    }
  `,
}



export const teamMemberQueries = {
  // Get all active team members
  getAllTeamMembers: groq`
    *[_type == "teamMember" && active == true] | order(order asc) {
      _id,
      name,
      title,
      bio,
      image,
      email,
      linkedin,
      twitter,
      order,
      featured,
      active
    }
  `,

  // Get featured team members
  getFeaturedTeamMembers: groq`
    *[_type == "teamMember" && featured == true && active == true] | order(order asc) {
      _id,
      name,
      title,
      bio,
      image,
      email,
      linkedin,
      twitter,
      order,
      featured,
      active
    }
  `,
}


export const serviceQueries = {
  // Get all active services
  getAllServices: groq`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      slug,
      shortDescription,
      testingExperience,
      servicesType,
      coverImage,
      relatedPublications,
      expertise
    }
  `,


  // Get service by slug
  getServiceBySlug: groq`
    *[_type == "service" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      shortDescription,
      testingExperience,
      servicesType,
      coverImage,
      relatedPublications,
      order,
      active
    }
  `,

  // Get related publications for a service (using relatedPublications field)
  getServicePublications: groq`
    *[_type == "publication" && _id in $publicationIds] | order(publicationDate desc) {
      _id,
      title,
      slug,
      excerpt,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      publicationDate,
      author {
        name,
        title,
        image {
          asset->{
            _id,
            url
          },
          alt
        }
      },
      category,
      tags,
      downloadUrl,
      externalUrl,
      featured,
      likes,
      views
    }
  `,

}


export const faqQueries = {
  // Get all FAQs
  getAllFAQs: groq`
    *[_type == "faq" && active == true] | order(order asc) {
      _id,
      title,
      content,
      order,
      active
    }
  `,
}

export const publicationQueries = {
  // Get all publications
  getAllPublications: groq`
    *[_type == "publication"] | order(publicationDate desc) {
      _id,
      title,
      slug,
      excerpt,
      tableOfContents,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      publicationDate,
      author {
        name,
        title,
        image {
          asset->{
            _id,
            url
          },
          alt
        }
      },
      category,
      tags,
      downloadUrl,
      downloadFile {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      externalUrl,
      featured,
      likes,
      views,
      expertise
    }
  `,

  // Get publications by expertise
  getPublicationsByExpertise: groq`
    *[_type == "publication" && expertise._ref == $expertiseId] | order(publicationDate desc) {
      _id,
      title,
      slug,
      excerpt,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      publicationDate,
      author {
        name,
        title,
        image {
          asset->{
            _id,
            url
          },
          alt
        }
      },
      category,
      tags,
      downloadUrl,
      downloadFile {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      externalUrl,
      featured,
      likes,
      views,
      expertise
    }
  `,
}

export const expertiseQueries = {
  // Get all expertise areas
  getAllExpertise: groq`
    *[_type == "expertise"] | order(title asc) {
      _id,
      title,
      description,
      slug,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  `,

  // Get expertise by slug
  getExpertiseBySlug: groq`
    *[_type == "expertise" && slug.current == $slug][0] {
      _id,
      title,
      description,
      slug,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  `,

  // Get services by expertise
  getServicesByExpertise: groq`
    *[_type == "service" && expertise._ref == $expertiseId] | order(order asc) {
      _id,
      title,
      slug,
      shortDescription,
      testingExperience,
      servicesType,
      coverImage,
      order,
      active
    }
  `,

  // Get publications by expertise
  getPublicationsByExpertise: groq`
    *[_type == "publication" && expertise._ref == $expertiseId] | order(publicationDate desc) {
      _id,
      title,
      slug,
      excerpt,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      publicationDate,
      author {
        name,
        title,
        image {
          asset->{
            _id,
            url
          },
          alt
        }
      },
      category,
      tags,
      downloadUrl,
      externalUrl,
      featured,
      likes,
      views
    }
  `,
}
