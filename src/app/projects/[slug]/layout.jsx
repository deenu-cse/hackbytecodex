import Script from "next/script";
import { notFound } from "next/navigation";

const API_URL = process.env.API_URL || "http://localhost:5000";

async function getProject(slug) {
  try {
    const res = await fetch(`${API_URL}/projects/${slug}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch project");
    }

    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

// Generate static params for popular projects
export async function generateStaticParams() {
  try {
    // Fetch top projects for static generation
    const res = await fetch(`${API_URL}/projects/all?limit=50&sort=trending`);
    const data = await res.json();

    if (data.success && Array.isArray(data.data)) {
      return data.data.map((project) => ({
        slug: project.slug,
      }));
    }
  } catch (error) {
    console.error("Error generating static params:", error);
  }

  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | HackByteCodex",
      description: "The project you are looking for does not exist or has been removed.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const imageUrl = project.coverImage?.url || "https://hackbytecodex.com/default-project.jpg";
  const projectUrl = `https://hackbytecodex.com/projects/${project.slug}`;
  const techStackStr = project.techStack?.join(", ") || "";
  const tagsStr = project.tags?.join(", ") || "";

  return {
    // Basic Meta Tags
    title: `${project.title} | Student Project on HackByteCodex`,
    description: project.shortDescription || project.description?.slice(0, 160) || "Discover this innovative project on HackByteCodex.",
    keywords: [
      project.title,
      ...(project.tags || []),
      ...(project.techStack || []),
      "student project",
      "coding project",
      "open source",
      "GitHub",
      "portfolio project"
    ]
      .filter(Boolean)
      .join(", "),

    // Open Graph Meta Tags (for Social Media)
    openGraph: {
      title: project.title,
      description: project.shortDescription || project.description?.slice(0, 200),
      type: "article",
      url: projectUrl,
      siteName: "HackByteCodex",
      locale: "en_US",
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
      authors: [project.owner?.fullName || "Anonymous"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
          type: "image/jpeg",
        },
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: project.title,
          type: "image/jpeg",
        },
      ],
      tags: [...(project.tags || []), ...(project.techStack || [])],
    },

    // Twitter Card Meta Tags
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription || project.description?.slice(0, 200),
      images: [imageUrl],
      creator: "@hackbytecodex",
      site: "@hackbytecodex",
    },

    // Canonical URL
    alternates: {
      canonical: projectUrl,
    },

    // Robot Directives
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
      "bingbot": {
        index: true,
        follow: true,
      },
    },

    // Additional Meta Tags
    viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    authors: [{ name: project.owner?.fullName || "Anonymous" }],
    creator: project.owner?.fullName,
  };
}

export default function ProjectDetailLayout({ children, params }) {
  return (
    <>
      {/* Structured Data (JSON-LD) for Rich Snippets */}
      <Script
        id="project-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Project Details",
            url: `https://hackbytecodex.com/projects/${params.slug}`,
          }),
        }}
        strategy="afterInteractive"
      />
      
      {/* Preload images and resources */}
      <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"} />
      
      {children}
    </>
  );
}
