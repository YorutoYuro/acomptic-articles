import { getCollection } from "astro:content";

export async function getArticlesIndex() {
  const allArticles = await getCollection("articles");
  
  return allArticles
    .map((art) => {
      const normalizedId = art.id.replace(/\\/g, "/");
      const parts = normalizedId.split("/");
      const category = parts.length > 1 ? parts[0] : "insights";
      const rawSlug = parts.length > 1 ? parts.slice(1).join("/") : parts[0];
      const slug = rawSlug.replace(/\.mdx?$/, "");

      return {
        title: art.data.title,
        excerpt: art.data.description || "",
        date: art.data.date,
        readTime: art.data.readTime || 4,
        category,
        url: `/${category}/${slug}`,
        // Strict normalization of the author field to match @username keys
        authorHandle: (art.data.author || "").trim().toLowerCase(),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
