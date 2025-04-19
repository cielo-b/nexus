import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityConfig: any = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3wthhc90",
  // jgw7ezer
  useCdn:
    typeof document !== "undefined" && process.env.NODE_ENV === "production",
  apiVersion: "2022-11-16",
  token: process.env.SANITY_TOKEN ?? process.env.NEXT_PUBLIC_TOKEN,
};

export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  // if (!source) return null as any;
  return builder.image(source);
}

export const getImageUrl = (source: any) => {
  return source ? builder.image(source).url() : null;
};
