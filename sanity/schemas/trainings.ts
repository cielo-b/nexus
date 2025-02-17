import { FaNewspaper } from "react-icons/fa";
import { defineType } from "sanity";

export default defineType({
  name: "training",
  title: "Training",
  icon: FaNewspaper,
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of the training.",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      description: "A short description of the training.",
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
      name: "link",
      title: "Link",
      description: "Optional link for the publication.",
      type: "url",
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
