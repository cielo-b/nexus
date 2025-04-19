import { sanityClient } from "@/sanity/sanity.client";

// Fetch all services
export const fetchServices = async () => {
  try {
    const query = `*[_type == "service"]{
      _id,
      title,
      excerpt,
      "image": image.asset->url,
      content,
      titleOfExpertise,
      descriptionOfExpertise
    }`;
    const services = await sanityClient.fetch(query);
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to fetch services");
  }
};

// Fetch all cases given a service ID
export const fetchCases = async (serviceId: string) => {
  try {
    const query = `*[_type == "case" && service._ref == $serviceId]{
      _id,
      title,
      excerpt,
      "image": image.asset->url,
      content,
      service->{_id,title},
      authors
    }`;
    const cases = await sanityClient.fetch(query, { serviceId });
    return cases;
  } catch (error) {
    console.error("Error fetching cases:", error);
    throw new Error("Failed to fetch cases");
  }
};

// Fetch a single service by its ID
export const fetchServiceById = async (serviceId: string) => {
  try {
    const query = `*[_type == "service" && _id == $serviceId][0]{
      _id,
      title,
      excerpt,
      "image": image.asset->url,
      content
    }`;
    const service = await sanityClient.fetch(query, { serviceId });
    return service;
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw new Error("Failed to fetch service by ID");
  }
};

// Fetch a single case by its ID
export const fetchCaseById = async (caseId: string) => {
  try {
    const query = `*[_type == "case" && _id == $caseId][0]{
      _id,
      title,
      excerpt,
      "image": image.asset->url,
      content,
      service->{_id,title},
      authors
    }`;
    const caseData = await sanityClient.fetch(query, { caseId });
    return caseData;
  } catch (error) {
    console.error("Error fetching case by ID:", error);
    throw new Error("Failed to fetch case by ID");
  }
};
