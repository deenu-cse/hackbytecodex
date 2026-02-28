import { fetchColleges } from "@/lib/api/colleges";
import ChaptersClient from "./ChaptersClient";

export const metadata = {
  title: "Chapters | HackByte Codex",
  description: "Explore all HackByte Codex chapters across colleges. Connect with tech communities, join events, and build amazing projects together.",
  keywords: ["college chapters", "tech communities", "student clubs", "hackathons", "coding events"],
  openGraph: {
    title: "Chapters | HackByte Codex",
    description: "Explore all HackByte Codex chapters across colleges. Connect with tech communities, join events, and build amazing projects together.",
    type: "website",
    images: [
      {
        url: "/hackbytecodexLogo.jpg",
        width: 1200,
        height: 630,
        alt: "HackByte Codex Chapters"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapters | HackByte Codex",
    description: "Explore all HackByte Codex chapters across colleges.",
    images: ["/hackbytecodexLogo.jpg"]
  }
};

export default async function ChaptersPage() {
  const initialData = await fetchColleges(
    { status: "ACTIVE" },
    { page: 1, limit: 12 }
  );

  return (
    <ChaptersClient 
      initialColleges={initialData.colleges || []} 
      initialTotal={initialData.total || 0}
    />
  );
}
