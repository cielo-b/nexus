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
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
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
      publishedAt,
      readingTime,
      featured,
      showOnRecent,
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
      coverVideo {
        asset->{
          _id,
          url
        },
        filename,
        size
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
      publishedAt,
      readingTime,
      featured,
      showOnRecent,
      likes,
      views,
      shares
    }
  `,

  // Get recent blogs for homepage (3 random blogs with showOnRecent = true)
  getRecentBlogs: groq`
    *[_type == "blog" && showOnRecent == true] | order(publishedAt desc) [0...3] {
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
      publishedAt,
      readingTime,
      featured,
      showOnRecent,
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
      featured,
      likes,
      views,
      status,
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
      featured,
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
      featured,
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
      featured,
      likes,
      views,
      status,
      expertise
    }
  `,

  // Get similar publications (same category, excluding current publication)
  getSimilarPublications: groq`
    *[_type == "publication" && category == $category && _id != $excludeId] | order(publicationDate desc) [0...6] {
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
      featured,
      likes,
      views,
      status
    }
  `,
}

export const trainingQueries = {
  // Get all published trainings
  getAllTrainings: groq`
    *[_type == "training" && status == "published"] | order(publishedAt desc) {
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
      duration,
      level,
      format,
      applyLink,
      prerequisites,
      learningObjectives,
      certificate,
      maxParticipants,
      minParticipants,
      startDate,
      endDate,
      registrationDeadline,
      location,
      tags,
      featured,
      publishedAt,
      status
    }
  `,

  // Get featured trainings
  getFeaturedTrainings: groq`
    *[_type == "training" && featured == true && status == "published"] | order(publishedAt desc) {
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
      duration,
      level,
      format,
      applyLink,
      prerequisites,
      learningObjectives,
      certificate,
      maxParticipants,
      minParticipants,
      startDate,
      endDate,
      registrationDeadline,
      location,
      tags,
      featured,
      publishedAt,
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
      duration,
      level,
      format,
      applyLink,
      prerequisites,
      learningObjectives,
      certificate,
      maxParticipants,
      minParticipants,
      startDate,
      endDate,
      registrationDeadline,
      location,
      tags,
      featured,
      publishedAt,
      status
    }
  `,

  // Get trainings by category
  getTrainingsByCategory: groq`
    *[_type == "training" && category == $category && status == "published"] | order(publishedAt desc) {
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
      duration,
      level,
      format,
      applyLink,
      prerequisites,
      learningObjectives,
      certificate,
      maxParticipants,
      minParticipants,
      startDate,
      endDate,
      registrationDeadline,
      location,
      tags,
      featured,
      publishedAt,
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
      duration,
      level,
      format,
      applyLink,
      prerequisites,
      learningObjectives,
      certificate,
      maxParticipants,
      minParticipants,
      startDate,
      endDate,
      registrationDeadline,
      location,
      tags,
      featured,
      publishedAt,
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

export const jobQueries = {
  // Get all active jobs ordered by published date
  getAllJobs: groq`
    *[_type == "job" && active == true] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      slug,
      jobLocationType,
      schedule,
      location,
      urlToJob,
      publishedAt,
      featured,
      active
    }
  `,

  // Get featured jobs
  getFeaturedJobs: groq`
    *[_type == "job" && featured == true && active == true] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      slug,
      jobLocationType,
      schedule,
      location,
      urlToJob,
      publishedAt,
      featured,
      active
    }
  `,

  // Get job by slug
  getJobBySlug: groq`
    *[_type == "job" && slug.current == $slug && active == true][0] {
      _id,
      title,
      excerpt,
      slug,
      content,
      jobLocationType,
      schedule,
      location,
      urlToJob,
      publishedAt,
      featured,
      active
    }
  `,

  // Get jobs by location type
  getJobsByLocationType: groq`
    *[_type == "job" && jobLocationType == $locationType && active == true] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      slug,
      jobLocationType,
      schedule,
      location,
      urlToJob,
      publishedAt,
      featured,
      active
    }
  `,

  // Get jobs by schedule
  getJobsBySchedule: groq`
    *[_type == "job" && schedule == $schedule && active == true] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      slug,
      jobLocationType,
      schedule,
      location,
      urlToJob,
      publishedAt,
      featured,
      active
    }
  `,

  // Get recent jobs (last 5)
  getRecentJobs: groq`
    *[_type == "job" && active == true] | order(publishedAt desc) [0...5] {
      _id,
      title,
      excerpt,
      slug,
      jobLocationType,
      schedule,
      location,
      urlToJob,
      publishedAt,
      featured,
      active
    }
  `,
}
