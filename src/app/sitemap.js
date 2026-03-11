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

    return [
      {
        url: "https://hackbytecodex.com",
        lastModified: new Date(),
      },
      ...events.map((event) => ({
        url: `https://hackbytecodex.com/events/${event.slug}`,
        lastModified: new Date(event.updatedAt),
      })),
    ];

  } catch (error) {
    console.error("Sitemap generation failed:", error);
    return [];
  }
}