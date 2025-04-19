import { Content } from "@/components/RichContent";
import { sanityClient } from "../sanity.client";

// TypeScript interfaces for type safety
interface Article {
  _id: string;
  title: string;
  excerpt: Content[];
  image: string;
  content: any;
  category: {
    _id: string;
    title: string;
  };
  authors: string[];
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}


export async function fetchArticles(
  page: number,
  pageSize: number,
  categoryId?: string
): Promise<PaginatedResponse<Article>> {
  const offset = (page - 1) * pageSize;

  try {
    let itemsQuery = `
        *[_type == "article"] | order(_createdAt desc) {
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
        count(*[_type == "article"])
      `;

    if (categoryId) {
      itemsQuery = `
            *[_type == "article" && category._ref == $categoryId] | order(_createdAt desc) {
              _id,
              title,
              excerpt,
              "image": image.asset->url,
              content,
              category->{_id, name},
              authors
            }[${offset}...${offset + pageSize}]
          `;

      countQuery = `
            count(*[_type == "article" && category._ref == $categoryId])
          `;
    }

    const [items, total] = await Promise.all([
      sanityClient.fetch<Article[]>(itemsQuery, categoryId ? { categoryId } : {}),
      sanityClient.fetch<number>(countQuery, categoryId ? { categoryId } : {}),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
    };
  } catch (error) {
    throw new Error("Failed to fetch articles");
  }
}


export async function fetchOnBoardingArticles(
): Promise<Article[]> {
  try {
    let itemsQuery = `
      *[_type == "article" && showOnBoarding == true] | order(_createdAt desc) {
        _id,
        title,
        excerpt,
        "image": image.asset->url,
        content,
        category->{_id, name},
        showOnBoarding,
        authors
      }
    `;

    const items = await sanityClient.fetch<Article[]>(itemsQuery);
    return items;
  } catch (error) {
    throw new Error("Failed to fetch articles");
  }
}



// Fetch a single article by its ID
export async function fetchArticleByID(id: string): Promise<Article | null> {
  const query = `
    *[_type == "article" && _id == $id] {
      _id,
      title,
      excerpt,
      "image": image.asset->url,
      content,
      category->{_id, name},
      authors
    }[0]
  `;

  try {
    const article = await sanityClient.fetch<Article | null>(query, { id });
    return article;
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    throw new Error("Failed to fetch article");
  }
}

interface ArticleCategory {
  _id: string;
  title: string;
}

// Function to fetch article categories
export async function fetchArticleCategories(): Promise<ArticleCategory[]> {
  const query = `
      *[_type == "article-category"] | order(title asc) {
        _id,
        name,
      }
    `;

  try {
    const categories = await sanityClient.fetch<ArticleCategory[]>(query);
    return categories;
  } catch (error) {
    console.error("Error fetching article categories:", error);
    throw new Error("Failed to fetch article categories");
  }
}