import { defineType } from "sanity";

export default defineType({
  name: "publication-category",
  title: "Publication Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      validation: (Rule) => Rule.required(),
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
  ],
});
