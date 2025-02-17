import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Nexus CMS",
  projectId: "3wthhc90",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool(), media()],
  schema: {
    types: schemaTypes,
  },
});
