import { sanityClient } from "../sanity.client";

// TypeScript interfaces for type safety
interface Career {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  content: any;
  link: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}


export async function fetchCareers(
  page: number,
  pageSize: number,
): Promise<PaginatedResponse<Career>> {
  const offset = (page - 1) * pageSize;

  try {
    let itemsQuery = `
        *[_type == "career"] | order(_createdAt desc) {
          _id,
          title,
          excerpt,
          "image": image.asset->url,
          content,
          category->{_id, name},
          authors
        }[${offset}...${offset + pageSize}]
      `;

    let countQuery = `
        count(*[_type == "career"])
      `;


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
    throw new Error("Failed to fetch careers");
  }
}


// Fetch a single career by its ID
export async function fetchCareerByID(id: string): Promise<Career | null> {
  const query = `
    *[_type == "career" && _id == $id] {
      _id,
      title,
      excerpt,
      "image": image.asset->url,
      content,
      link
    }[0]
  `;

  try {
    const career = await sanityClient.fetch<Career | null>(query, { id });
    return career;
  } catch (error) {
    console.error("Error fetching career by ID:", error);
    throw new Error("Failed to fetch career");
  }
}
