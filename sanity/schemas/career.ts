import { FaNewspaper } from "react-icons/fa";
import { defineType } from "sanity";

export default defineType({
  name: "career",
  title: "Career",
  icon: FaNewspaper,
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of the career position",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      description: "Brief description of the career position",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "details",
      title: "Details",
      description: "Full details of the career position",
      type: "blockContent",
      validation: (Rule) => Rule.required()
    },
    {
      name: "link",
      title: "Application Link",
      description: "Link to apply for the position",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        media,
      };
    },
  },
});