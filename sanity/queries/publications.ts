import { sanityClient } from "../sanity.client";

type Category = {
  _id: string;
  name: string;
  image?: string;
};

type Article = {
  _id: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  link?: string;
  authors: string[];
  pdf?: string;
  category: Category;
};

export const getAllCategories = async (): Promise<Category[]> => {
  const categories = await sanityClient.fetch(
    `*[_type == "publication-category"]{
      _id,
      name,
      "image": image.asset->url
    }`
  );
  console.log(categories);
  return categories;
};

export const getArticlesByCategory = async (
  categoryId: string
): Promise<Article[]> => {
  const articles = await sanityClient.fetch(
    `*[_type == "publication" && references($categoryId)]{
      _id,
      title,
      excerpt,
      "image": image.asset->url,
      category->{
        _id,
        name
      },
      link,
      authors,
      pdf {
        asset-> {
          url
        }
      }
    }`,
    { categoryId }
  );

  return articles.map((article: any) => ({
    _id: article._id,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    category: {
      _id: article.category?._id || "",
      name: article.category?.name || "Unknown",
    },
    link: article.link || null,
    authors: article.authors || [],
    pdf: article.pdf?.asset?.url || null,
  }));
};
