import { defineType } from "sanity";

export default defineType({
  name: "article-category",
  title: "Article Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      validation: (Rule) => Rule.required(),
      type: "string",
    }
  ],
});
