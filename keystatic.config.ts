import { config, singleton, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: import.meta.env.DEV ? "local" : "github",
    repo: "hoyt-steele-design/temtefadezzz",
  },
  singletons: {
    hero: singleton({
      label: "Hero Section",
      schema: {
        title: fields.text({ label: "Title" }),
        image: fields.image({
          label: "Image",
          directory: "public/images",
          publicPath: "/images",
        }),
      },
    }),
  },
});
