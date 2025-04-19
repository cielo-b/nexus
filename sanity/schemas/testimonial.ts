import { FaNewspaper } from "react-icons/fa";
import { defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  icon: FaNewspaper,
  type: "document",
  fields: [
    {
      name: "userName",
      title: "User Name",
      description: "Name of the Testimonial User.",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "userTitle",
      title: "User Title",
      description: "Title/Job of the user.",
      type: "blockContent",
    },
    {
      name: "body",
      title: "Body",
      description: "Description for the testimonial.",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "userImage",
      title: "User Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      title: "Rating",
      description: "User rating (1 to 5 stars).",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    },
  ],
  preview: {
    select: {
      title: "userName",
      subtitle: "rating",
      media: "userImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: `Rating: ${subtitle}/5`,
        media,
      };
    },
  },
});
