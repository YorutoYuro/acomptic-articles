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

      // 1. Extract handle from authorUrl if available (e.g. ".../@test1" -> "test1")
      let extractedHandle = "";
      if (art.data.authorUrl) {
        const parts = art.data.authorUrl.split("@");
        if (parts.length > 1) {
          extractedHandle = parts[parts.length - 1];
        }
      }

      // 2. Fallback order: authorHandle -> extracted from URL -> author display name
      const rawAuthor = art.data.authorHandle || extractedHandle || art.data.author || "";
      
      // 3. Clean normalization (removes '@', spaces, and converts to lowercase)
      const authorHandle = rawAuthor
        .toString()
        .replace(/^@/, "")
        .replace(/\s+/g, "")
        .trim()
        .toLowerCase();

      return {
        title: art.data.title,
        excerpt: art.data.description || "",
        date: art.data.date,
        readTime: art.data.readTime || 4,
        category,
        url: `/${category}/${slug}`,
        authorHandle,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
