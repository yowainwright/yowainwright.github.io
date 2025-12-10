import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({
          label: "Date",
          validation: { isRequired: true },
        }),
        path: fields.text({
          label: "URL Path",
          description: "The URL path for this post (e.g., /my-post)",
        }),
        meta: fields.text({
          label: "Meta Description",
          description: "SEO description for this post",
          multiline: true,
        }),
        categories: fields.array(fields.text({ label: "Category" }), {
          label: "Categories",
          itemLabel: (props) => props.value,
        }),
        content: fields.markdoc({
          label: "Content",
        }),
      },
    }),
  },
});
