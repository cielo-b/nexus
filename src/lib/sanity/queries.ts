import { groq } from 'next-sanity'

export const blogQueries = {
  // Get all blogs with basic info
  getAllBlogs: groq`
    *[_type == "blog"] {
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
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      category,
      tags,
      authors[]->{
        _id,
        name,
        title,
        email,
        orcidId,
        affiliations,
        researchInterests,
        isCorrespondingAuthor
      },
      showOnRecent,
      likes,
      views,
    }
  `,


  // Get recent blogs for homepage (3 random blogs with showOnRecent = true)
  getRecentBlogs: groq`
    *[_type == "blog" && showOnRecent == true]  [0...3] {
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
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      category,
      tags,
      authors[]->{
        _id,
        name,
        title,
        email,
        orcidId,
        affiliations,
        researchInterests,
        isCorrespondingAuthor
      },
      showOnRecent,
      likes,
      views,
    }
  `,

  // Get blogs by category
  getBlogsByCategory: groq`
    *[_type == "blog" && category == $category]  {
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
      authors[]->{
        _id,
        name,
        title,
        email,
        orcidId,
        affiliations,
        researchInterests,
        isCorrespondingAuthor
      },
      likes,
      views,
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
      authors[]->{
        _id,
        name,
        title,
        email,
        orcidId,
        affiliations,
        researchInterests,
        isCorrespondingAuthor
      },
      likes,
      views,
    }
  `,

  // Get similar blogs (same category, excluding current blog)
  getSimilarBlogs: groq`
    *[_type == "blog" && category == $category && _id != $excludeId] | [0...3] {
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
      authors[]->{
        _id,
        name,
        title,
        email,
        orcidId,
        affiliations,
        researchInterests,
        isCorrespondingAuthor
      },
      likes,
      views,
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
    *[_type == "partner"] | order( name asc) {
      _id,
      name,
      logo,
      url,
    }
  `,

}

export const testimonialQueries = {
  // Get all testimonials ordered by display order
  getAllTestimonials: groq`
    *[_type == "testimonial"] | order(rating desc) {
      _id,
      clientName,
      clientTitle,
      company,
      clientImage,
      testimonial,
      rating,
    }
  `,


  // Get testimonials with high ratings
  getTopRatedTestimonials: groq`
    *[_type == "testimonial" && rating >= 4] {
      _id,
      clientName,
      clientTitle,
      company,
      clientImage,
      testimonial,
      rating,
    }
  `,
}



export const teamMemberQueries = {
  // Get all active team members
  getAllTeamMembers: groq`
    *[_type == "teamMember"] {
      _id,
      name,
      title,
      bio,
      image,
      email,
      linkedin,
      twitter,
    }
  `,
}


export const serviceQueries = {
  // Get all active services
  getAllServices: groq`
    *[_type == "service"] {
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
    }
  `,

  // Get related publications for a service (using relatedPublications field)
  getServicePublications: groq`
    *[_type == "publication" && _id in $publicationIds] {
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
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      publicationDate,
      authors[]->{
        _id,
        name,
        title,
        email,
        orcidId,
        affiliations,
        researchInterests,
        isCorrespondingAuthor
      },
      category,
      tags,
      downloadUrl,
      externalUrl,
      likes,
      views
    }
  `,

}


export const faqQueries = {
  // Get all FAQs
  getAllFAQs: groq`
    *[_type == "faq"] {
      _id,
      title,
      content,
    }
  `,
}

export const publicationQueries = {
  // Get all publications
  getAllPublications: groq`
    *[_type == "publication"] {
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
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      publicationDate,
      authors[]->{
        _id,
        name,
        title,
        email,
        orcidId,
        affiliations,
        researchInterests,
        isCorrespondingAuthor
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
      likes,
      views,
      status,
      expertise
    }
  `,

  // Get publications by expertise
  getPublicationsByExpertise: groq`
    *[_type == "publication" && expertise._ref == $expertiseId] {
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
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      publicationDate,
      authors[]->{
        _id,
        name,
        title,
        email,
        orcidId,
        affiliations,
        researchInterests,
        isCorrespondingAuthor
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
      likes,
      views,
      status,
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
      },
      quote {
        text,
        author,
        authorTitle,
        authorCompany
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
      },
      quote {
        text,
        author,
        authorTitle,
        authorCompany
      }
    }
  `,

  // Get services by expertise
  getServicesByExpertise: groq`
    *[_type == "service" && expertise._ref == $expertiseId] {
      _id,
      title,
      slug,
      shortDescription,
      testingExperience,
      servicesType,
      coverImage,
    }
  `,

  // Get publications by expertise
  getPublicationsByExpertise: groq`
    *[_type == "publication" && expertise._ref == $expertiseId] {
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
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      publicationDate,
      authors[]->{
        _id,
        name,
        title,
        email,
        orcidId,
        affiliations,
        researchInterests,
        isCorrespondingAuthor
      },
      category,
      tags,
      downloadUrl,
      externalUrl,
      likes,
      views
    }
  `,

  // Get single publication by slug
  getPublicationBySlug: groq`
    *[_type == "publication" && slug.current == $slug][0] {
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
        },
        alt
      },
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      publicationDate,
      authors[]->{
        _id,
        name,
        title,
        email,
        orcidId,
        affiliations,
        researchInterests,
        isCorrespondingAuthor
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
      likes,
      views,
      status,
      expertise
    }
  `,

  // Get similar publications (same category, excluding current publication)
  getSimilarPublications: groq`
    *[_type == "publication" && category == $category && _id != $excludeId] [0...6] {
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
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      publicationDate,
      authors[]->{
        _id,
        name,
        title,
        email,
        orcidId,
        affiliations,
        researchInterests,
        isCorrespondingAuthor
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
      likes,
      views,
      status
    }
  `,
}

export const trainingQueries = {
  // Get all published trainings
  getAllTrainings: groq`
    *[_type == "training" && status == "published"]  {
      _id,
      title,
      slug,
      description,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      category,
      content,
      applyLink,
      prerequisites,
      certificate,
      startDate,
      endDate,
      status
    }
  `,



  // Get training by slug
  getTrainingBySlug: groq`
    *[_type == "training" && slug.current == $slug && status == "published"][0] {
      _id,
      title,
      slug,
      description,
      content,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      category,
      content,
      applyLink,
      prerequisites,
      certificate,
      startDate,
      endDate,
      status
    }
  `,

  // Get trainings by category
  getTrainingsByCategory: groq`
    *[_type == "training" && category == $category && status == "published"]  {
      _id,
      title,
      slug,
      description,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      category,
      content,
      applyLink,
      prerequisites,
      certificate,
      startDate,
      endDate,
      status
    }
  `,

  // Get all unique training categories
  getTrainingCategories: groq`
    array::unique(*[_type == "training" && status == "published"].category)
  `,

  // Get upcoming trainings
  getUpcomingTrainings: groq`
    *[_type == "training" && status == "published" && startDate > now()] | order(startDate asc) {
      _id,
      title,
      slug,
      description,
      content,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
      },
      category,
      applyLink,
      prerequisites,
      certificate,
      startDate,
      endDate,
      status
    }
  `,
}

export const videoQueries = {
  // Get all videos ordered by creation date
  getAllVideos: groq`
    *[_type == "video"] | order(_createdAt desc) {
      _id,
      title,
      description,
      videoFile {
        asset->{
          _id,
          url
        },
        filename,
        size
      }
    }
  `,

  // Get video by ID
  getVideoById: groq`
    *[_type == "video" && _id == $id][0] {
      _id,
      title,
      description,
      videoFile {
        asset->{
          _id,
          url
        },
        filename,
        size
      }
    }
  `,
}

export const howWeDoQueries = {
  // Get the How We Do content
  getHowWeDo: groq`
    *[_type == "howWeDo"][0] {
      _id,
      content
    }
  `,
}

export const privacyPolicyQueries = {
  // Get the Privacy Policy content
  getPrivacyPolicy: groq`
    *[_type == "privacyPolicy"][0] {
      _id,
      content
    }
  `,
}

export const dataTransparencyQueries = {
  // Get the Data Transparency Agreement content
  getDataTransparency: groq`
    *[_type == "dataTransparency"][0] {
      _id,
      content
    }
  `,
}

export const termsOfUseQueries = {
  // Get the Terms of Use content
  getTermsOfUse: groq`
    *[_type == "termsOfUse"][0] {
      _id,
      content
    }
  `,
}

export const accordionItemQueries = {
  // Get all accordion items ordered by display order
  getAllAccordionItems: groq`
    *[_type == "accordionItem"] {
      _id,
      title,
      description,
      video,
      image {
        _id,
        asset->{
          _id,
          url
        },
        alt
      },
    }
  `,
}

export const jobQueries = {
  // Get all active jobs ordered by published date
  getAllJobs: groq`
    *[_type == "job" && status == "published"]) {
      _id,
      title,
      excerpt,
      slug,
      jobLocationType,
      schedule,
      location,
      urlToJob,
      status
    }
  `,


  // Get job by slug
  getJobBySlug: groq`
    *[_type == "job" && slug.current == $slug && status == "published"][0] {
      _id,
      title,
      excerpt,
      slug,
      content,
      jobLocationType,
      schedule,
      location,
      urlToJob,
      status
    }
  `,

  // Get jobs by location type
  getJobsByLocationType: groq`
    *[_type == "job" && jobLocationType == $locationType && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      slug,
      jobLocationType,
      schedule,
      location,
      urlToJob,
      status
    }
  `,

  // Get jobs by schedule
  getJobsBySchedule: groq`
    *[_type == "job" && schedule == $schedule && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      slug,
      jobLocationType,
      schedule,
      location,
      urlToJob,
      status
    }
  `,

  // Get recent jobs (last 5)
  getRecentJobs: groq`
    *[_type == "job" && status == "published"] | order(publishedAt desc) [0...5] {
      _id,
      title,
      excerpt,
      slug,
      jobLocationType,
      schedule,
      location,
      urlToJob,
      status
    }
  `,
}
