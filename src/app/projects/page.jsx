import ProjectsClient from "./ProjectsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const metadata = {
  title: "Explore Student Projects | HackByteCodex - Showcase Your Work",
  description: "Discover innovative student projects built by developers worldwide. Explore AI/ML, Web3, mobile apps, and web development projects. Perfect for learning and collaboration.",
  keywords: [
    "student projects",
    "coding projects",
    "AI/ML projects",
    "Web3 projects",
    "mobile apps",
    "web development projects",
    "GitHub projects",
    "open source projects",
    "developer portfolio",
    "project showcase",
    "tech innovation",
    "student portfolio"
  ].join(", "),

  openGraph: {
    title: "Explore Student Projects | HackByteCodex",
    description: "Discover and showcase innovative student projects. AI/ML, Web3, Mobile, Web Dev and more.",
    type: "website",
    url: "https://hackbytecodex.com/projects",
    siteName: "HackByteCodex",
    locale: "en_US",
    images: [
      {
        url: "https://hackbytecodex.com/og-projects.jpg",
        width: 1200,
        height: 630,
        alt: "HackByteCodex Projects Showcase",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Explore Student Projects | HackByteCodex",
    description: "Discover innovative student projects on HackByteCodex.",
    images: ["https://hackbytecodex.com/og-projects.jpg"],
    creator: "@hackbytecodex",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://hackbytecodex.com/projects",
  },

  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

async function getInitialProjects() {
  try {
    const params = new URLSearchParams({
      page: "1",
      limit: "12",
      sort: "latest",
    });

    const response = await fetch(`${API_URL}/projects/all?${params}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    const data = await response.json();

    if (data.success) {
      // Get featured project (most liked)
      const mostLiked = data.data.length > 0 
        ? [...data.data].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))[0]
        : null;

      // Get all unique tags and tech
      const allTags = [...new Set(data.data.flatMap(p => p.tags || []))];
      const allTech = [...new Set(data.data.flatMap(p => p.techStack || []))];

      return {
        projects: data.data,
        pagination: {
          page: data.page,
          pages: data.pages,
          total: data.total,
        },
        tags: allTags,
        tech: allTech,
        featured: mostLiked,
      };
    }
  } catch (error) {
    console.error("Error fetching initial projects:", error);
  }

  // Return empty data if fetch fails
  return {
    projects: [],
    pagination: { page: 1, pages: 1, total: 0 },
    tags: [],
    tech: [],
    featured: null,
  };
}

export default async function ProjectsPage() {
  const initialData = await getInitialProjects();

  return (
    <ProjectsClient
      initialProjects={initialData.projects}
      initialPagination={initialData.pagination}
      initialAvailableTags={initialData.tags}
      initialAvailableTech={initialData.tech}
      initialFeaturedProject={initialData.featured}
    />
  );
}