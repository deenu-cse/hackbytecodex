import { notFound } from "next/navigation";
import { fetchCollegeByName } from "@/lib/api/colleges";
import ChapterDetailClient from "./ChapterDetailClient";

export async function generateMetadata({ params }) {
  const { "college-name": collegeNameParam } = await params;
  const collegeName = decodeURIComponent(collegeNameParam);
  const college = await fetchCollegeByName(collegeName);
  
  if (!college) {
    return {
      title: "Chapter Not Found | HackByte Codex",
      description: "The chapter you're looking for doesn't exist or has been removed."
    };
  }
  
  const location = college.address 
    ? `${college.address.city}${college.address.state ? `, ${college.address.state}` : ""}`
    : "";
    
  return {
    title: `${college.name} | HackByte Codex Chapter`,
    description: `Join ${college.name} chapter - ${location}. ${college.stats?.eventsHosted || 0}+ events hosted, ${college.stats?.activeStudents || 0}+ active students. Connect with the tech community and build amazing projects.`,
    keywords: [college.name, "college chapter", "tech community", "hackathons", "coding events", location],
    openGraph: {
      title: `${college.name} | HackByte Codex Chapter`,
      description: `Join ${college.name} chapter - ${location}. Connect with the tech community and build amazing projects.`,
      type: "website",
      images: college.logo?.url ? [
        {
          url: college.logo.url,
          width: 400,
          height: 400,
          alt: `${college.name} Logo`
        }
      ] : [
        {
          url: "/hackbytecodexLogo.jpg",
          width: 1200,
          height: 630,
          alt: "HackByte Codex"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${college.name} | HackByte Codex Chapter`,
      description: `Join ${college.name} chapter - ${location}. Connect with the tech community.`,
      images: college.logo?.url ? [college.logo.url] : ["/hackbytecodexLogo.jpg"]
    }
  };
}

export default async function ChapterPage({ params }) {
  const { "college-name": collegeNameParam } = await params;
  const collegeName = decodeURIComponent(collegeNameParam);
  const college = await fetchCollegeByName(collegeName);
  
  if (!college) {
    notFound();
  }
  
  return <ChapterDetailClient college={college} />;
}