export default async function sitemap() {

  // fetch events
  const eventRes = await fetch(`${process.env.API_URL}/user/events`);
  const eventData = await eventRes.json();

  // fetch colleges (chapters)
  const collegeRes = await fetch(`${process.env.API_URL}/user/colleges`);
  const collegeData = await collegeRes.json();

  const events = eventData?.data || [];
  const colleges = collegeData?.data || [];

  const eventUrls = events.map((event) => ({
    url: `https://hackbytecodex.com/events/${event.slug}`,
    lastModified: new Date(event.updatedAt),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const chapterUrls = colleges.map((college) => ({
    url: `https://hackbytecodex.com/chapters/${encodeURIComponent(college.name)}`,
    lastModified: new Date(college.updatedAt || Date.now()),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://hackbytecodex.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://hackbytecodex.com/events",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://hackbytecodex.com/chapters",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    ...eventUrls,
    ...chapterUrls,
  ];
}