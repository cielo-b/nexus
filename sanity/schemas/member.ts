import { FaNewspaper } from "react-icons/fa";
import { defineType } from "sanity";

export default defineType({
  name: "member",
  title: "Team Member",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      description: "Name of the member.",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Short Description",
      description: "A short description of the member.",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
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
