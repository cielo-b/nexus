import { sanityClient } from "../sanity.client";

// TypeScript interfaces
interface Career {
  _id: string;
  title: string;
  description: any; // For blockContent
  details: any; // For blockContent
  link: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Fetch all careers with pagination
export async function fetchCareers(
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Career>> {
  const offset = (page - 1) * pageSize;

  try {
    const itemsQuery = `
      *[_type == "career"] | order(_createdAt desc) {
        _id,
        title,
        description,
        details,
        link
      }[${offset}...${offset + pageSize}]
    `;

    const countQuery = `count(*[_type == "career"])`;

    const [items, total] = await Promise.all([
      sanityClient.fetch<Career[]>(itemsQuery),
      sanityClient.fetch<number>(countQuery),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
    };
  } catch (error) {
    console.error("Error fetching careers:", error);
    throw new Error("Failed to fetch careers");
  }
}

// Fetch a single career by ID
export async function fetchCareerById(id: string): Promise<Career | null> {
  try {
    const query = `
      *[_type == "career" && _id == $id][0] {
        _id,
        title,
        description,
        details,
        link
      }
    `;

    const career = await sanityClient.fetch<Career | null>(query, { id });
    return career;
  } catch (error) {
    console.error("Error fetching career by ID:", error);
    throw new Error("Failed to fetch career");
  }
}

// Fetch all careers without pagination (if needed)
export async function fetchAllCareers(): Promise<Career[]> {
  try {
    const query = `
      *[_type == "career"] | order(_createdAt desc) {
        _id,
        title,
        description,
        details,
        link
      }
    `;
    
    const careers = await sanityClient.fetch<Career[]>(query);
    return careers;
  } catch (error) {
    console.error("Error fetching all careers:", error);
    throw new Error("Failed to fetch careers");
  }
}