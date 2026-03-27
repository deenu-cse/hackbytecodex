import { fetchColleges } from "@/lib/api/colleges";
import { slugify } from "@/lib/slugify";

export default async function sitemap() {

  try {

    const res = await fetch(`${process.env.API_URL}/user/events/all`, {
      cache: "no-store"
    });

    if (!res.ok) {
      console.error("API failed for sitemap");
      return [];
    }

    const data = await res.json();

    const events = data?.data || [];
    
    // Fetch colleges for sitemap
    let colleges = [];
    try {
      const collegesRes = await fetchColleges({}, { page: 1, limit: 1000 });
      colleges = collegesRes?.colleges || [];
    } catch (err) {
      console.error("Failed to fetch colleges for sitemap");
    }

    return [
      {
        url: "https://hackbytecodex.com",
        lastModified: new Date(),
      },
      ...events.map((event) => ({
        url: `https://hackbytecodex.com/events/${event.slug}`,
        lastModified: new Date(event.updatedAt),
      })),
      ...colleges.map((college) => ({
        url: `https://hackbytecodex.com/chapter/${slugify(college.name)}`,
        lastModified: new Date(),
      })),
    ];

  } catch (error) {
    console.error("Sitemap generation failed:", error);
    return [];
  }
}