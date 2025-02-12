import { FaNewspaper } from "react-icons/fa";
import { defineType } from "sanity";

export default defineType({
  name: "publication",
  title: "Publication",
  icon: FaNewspaper,
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of the publication.",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      description: "A short description of the publication.",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "link",
      title: "Link",
      description: "Optional link for the publication.",
      type: "url",
    },
    {
      name: "pdf",
      title: "PDF File",
      description: "Optional PDF file for the publication.",
      type: "file",
      options: {
        accept: ".pdf",
      },
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "publication-category" }],
    },
    {
      name: "authors",
      title: "Authors",
      description: "List of authors for the publication.",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
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
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (!fields?.link && !fields?.pdf) {
        return "Either a link or a PDF file must be provided.";
      }
      return true;
    }),
});
