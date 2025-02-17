import { Content } from "@/components/RichContent";
import { sanityClient } from "../sanity.client";

// TypeScript interfaces for type safety
interface Training {
  _id: string;
  title: string;
  excerpt: Content[];
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


export async function fetchTrainings(
  page: number,
  pageSize: number,
): Promise<PaginatedResponse<Training>> {
  const offset = (page - 1) * pageSize;

  try {
    let itemsQuery = `
        *[_type == "training"] | order(_createdAt desc) {
          _id,
          title,
          excerpt,
          "image": image.asset->url,
          content,
          link
        }[${offset}...${offset + pageSize}]
      `;

    let countQuery = `
        count(*[_type == "training"])
      `;


    const [items, total] = await Promise.all([
      sanityClient.fetch<Training[]>(itemsQuery),
      sanityClient.fetch<number>(countQuery),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
    };
  } catch (error) {
    throw new Error("Failed to fetch testimonials");
  }
}


// Fetch a single training by its ID
export async function fetchTrainingByID(id: string): Promise<Training | null> {
  const query = `
    *[_type == "training" && _id == $id] {
      _id,
      title,
      excerpt,
      "image": image.asset->url,
      content,
      link
    }[0]
  `;

  try {
    const training = await sanityClient.fetch<Training | null>(query, { id });
    return training;
  } catch (error) {
    console.error("Error fetching training by ID:", error);
    throw new Error("Failed to fetch training");
  }
}
