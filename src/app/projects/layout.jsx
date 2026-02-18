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

  // OpenGraph for Social Media
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

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Explore Student Projects | HackByteCodex",
    description: "Discover innovative student projects on HackByteCodex.",
    images: ["https://hackbytecodex.com/og-projects.jpg"],
    creator: "@hackbytecodex",
  },

  // Robots & Indexing
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

  // Canonical URL
  alternates: {
    canonical: "https://hackbytecodex.com/projects",
  },

  // Additional Meta Tags
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  language: "en-US",
  themeColor: "#000000",

  // Verification
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

export default function ProjectsLayout({ children }) {
  return children;
}
