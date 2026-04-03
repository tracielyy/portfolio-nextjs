export default function sitemap() {
  return [
    {
      url: "https://tracielyy.com/en",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://tracielyy.com/zh",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}