import { sanityClient } from "../sanity.client";


export const fetchFaqs = async () => {
    try {
        const query = `*[_type == "faq"]{
      _id,
      title,
      answer
    }`;
        const faqs = await sanityClient.fetch(query);
        return faqs;
    } catch (error) {
        console.error("Error fetching faqs:", error);
        throw new Error("Failed to fetch faqs");
    }
};


export const fetchTestimonials = async () => {
    try {
        const query = `*[_type == "testimonial"]{
            _id,
            "userName": userName,
            userTitle,
            body,
            "userImage": userImage.asset->url,
            rating
        }`;
        const testimonials = await sanityClient.fetch(query);
        return testimonials;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        throw new Error("Failed to fetch testimonials");
    }
};


export const fetchMembers = async () => {
    try {
        const query = `*[_type == "member"]{
      _id,
      name,
      description,
      "image": image.asset->url
    }`;
        const faqs = await sanityClient.fetch(query);
        return faqs;
    } catch (error) {
        console.error("Error fetching faqs:", error);
        throw new Error("Failed to fetch faqs");
    }
};


export const fetchWhyUs = async () => {
    try {
        const query = `*[_type == "why-us"]{
      _id,
      title,
      answer
    }`;
        const faqs = await sanityClient.fetch(query);
        return faqs;
    } catch (error) {
        console.error("Error fetching whyus:", error);
        throw new Error("Failed to fetch whyus");
    }
};