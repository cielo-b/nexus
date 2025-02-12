import { FaNewspaper } from "react-icons/fa";
import { defineType } from "sanity";

export default defineType({
  name: "why-us",
  title: "Why Us",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of the why-us.",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "answer",
      title: "Answer",
      description: "A short description of the why-us.",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
      };
    },
  },
});
