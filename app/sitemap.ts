import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://www.open.ug";
  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/about/charter`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects/makerere-cs-website`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects/makerere-cs-website/apply`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];
}
