import { FaNewspaper } from "react-icons/fa";
import { defineType } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
  icon: FaNewspaper,
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of the article.",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      description: "A short description of the article.",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "blockContent",
      validation: (Rule) => Rule.required()
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "article-category" }],
      validation: (Rule) => Rule.required()
    },
    {
      name: "authors",
      title: "Authors",
      description: "List of authors for the article.",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "showOnBoarding",
      title: "Show On Boarding",
      description: "Should this article be shown on the onboarding screen?",
      type: "boolean",
      initialValue: false,
    }

  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "image",
    },
    prepare(selection) {
      const { title, date, media } = selection;
      return {
        title,
        subtitle: date,
        media,
      };
    },
  },
});
