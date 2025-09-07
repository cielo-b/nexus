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

export const companyInfoQueries = {
  // Get all active company information
  getAllCompanyInfo: groq`
    *[_type == "companyInfo" && active == true] | order(type asc, order asc) {
      _id,
      type,
      title,
      content,
      image,
      order,
      active
    }
  `,

  // Get company info by type
  getCompanyInfoByType: groq`
    *[_type == "companyInfo" && type == $type && active == true] | order(order asc) {
      _id,
      type,
      title,
      content,
      image,
      order,
      active
    }
  `,

  // Get all types available
  getAvailableTypes: groq`
    array::unique(*[_type == "companyInfo" && active == true].type)
  `,
}

export const coreValueQueries = {
  // Get all core values
  getAllCoreValues: groq`
    *[_type == "coreValue"] | order(order asc) {
      _id,
      title,
      color,
      order,
      featured
    }
  `,

  // Get featured core values
  getFeaturedCoreValues: groq`
    *[_type == "coreValue" && featured == true] | order(order asc) {
      _id,
      title,
      color,
      order,
      featured
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

export const whyChooseUsQueries = {
  // Get all active why choose us features
  getAllWhyChooseUs: groq`
    *[_type == "whyChooseUs" && active == true] | order(order asc) {
      _id,
      title,
      order,
      featured,
      active
    }
  `,

  // Get featured why choose us features
  getFeaturedWhyChooseUs: groq`
    *[_type == "whyChooseUs" && featured == true && active == true] | order(order asc) {
      _id,
      title,
      order,
      featured,
      active
    }
  `,
}

export const careerOfferQueries = {
  // Get all active career offers
  getAllCareerOffers: groq`
    *[_type == "careerOffer" && active == true] | order(order asc) {
      _id,
      title,
      order,
      featured,
      active
    }
  `,

  // Get featured career offers
  getFeaturedCareerOffers: groq`
    *[_type == "careerOffer" && featured == true && active == true] | order(order asc) {
      _id,
      title,
      order,
      featured,
      active
    }
  `,
}

export const careerTeamQueries = {
  // Get all active career teams
  getAllCareerTeams: groq`
    *[_type == "careerTeam" && active == true] | order(order asc) {
      _id,
      title,
      order,
      featured,
      active
    }
  `,

  // Get featured career teams
  getFeaturedCareerTeams: groq`
    *[_type == "careerTeam" && featured == true && active == true] | order(order asc) {
      _id,
      title,
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
      featured,
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

export const trainingQueries = {
  // Get all active training programs
  getAllTrainings: groq`
    *[_type == "training" && active == true] | order(order asc) {
      _id,
      title,
      sector,
      duration,
      level,
      format,
      price,
      instructor,
      objectives,
      prerequisites,
      certificate,
      order,
      featured,
      active
    }
  `,

  // Get featured training programs
  getFeaturedTrainings: groq`
    *[_type == "training" && featured == true && active == true] | order(order asc) {
      _id,
      title,
      sector,
      duration,
      level,
      format,
      price,
      instructor,
      objectives,
      prerequisites,
      certificate,
      order,
      featured,
      active
    }
  `,

  // Get training programs by sector
  getTrainingsBySector: groq`
    *[_type == "training" && sector == $sector && active == true] | order(order asc) {
      _id,
      title,
      sector,
      duration,
      level,
      format,
      price,
      instructor,
      objectives,
      prerequisites,
      certificate,
      order,
      featured,
      active
    }
  `,
}

export const trainingFeatureQueries = {
  // Get all active training features
  getAllTrainingFeatures: groq`
    *[_type == "trainingFeature" && active == true] | order(section asc, order asc) {
      _id,
      title,
      section,
      order,
      featured,
      active
    }
  `,

  // Get training features by section
  getTrainingFeaturesBySection: groq`
    *[_type == "trainingFeature" && section == $section && active == true] | order(order asc) {
      _id,
      title,
      section,
      order,
      featured,
      active
    }
  `,

  // Get featured training features
  getFeaturedTrainingFeatures: groq`
    *[_type == "trainingFeature" && featured == true && active == true] | order(section asc, order asc) {
      _id,
      title,
      section,
      order,
      featured,
      active
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
      externalUrl,
      featured,
      likes,
      views
    }
  `,
}
