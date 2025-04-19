import { FaNewspaper } from "react-icons/fa";
import { defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of the service.",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      description: "A short description of the service.",
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "titleOfExpertise",
      title: "Title of Expertise",
      description: "Title related to the area of expertise.",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "descriptionOfExpertise",
      title: "Description of Expertise",
      description: "Detailed description of the area of expertise.",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
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
});
