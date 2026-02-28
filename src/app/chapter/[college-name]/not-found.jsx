import Link from "next/link";
import { Building2, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../../../layouts/navbar";
import Footer from "../../../layouts/footer";

export const metadata = {
  title: "Chapter Not Found | HackByte Codex",
  description: "The chapter you're looking for doesn't exist or has been removed."
};

export default function ChapterNotFound() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          {/* Icon */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <Building2 className="w-12 h-12 text-gray-500" />
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Chapter Not Found
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-400 mb-8">
            The chapter you&apos;re looking for doesn&apos;t exist or may have been removed. 
            Check the URL or explore our other chapters.
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              <Link href="/chapters">
                <Search className="w-4 h-4 mr-2" />
                Browse Chapters
              </Link>
            </Button>
            
            <Button
              variant="outline"
              asChild
              className="h-12 px-6 border-white/20 text-white hover:bg-white/10 rounded-xl"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
          
          {/* Suggestions */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-500 mb-4">Popular chapters you might like:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["IIT Delhi", "IIT Bombay", "NIT Trichy", "BITS Pilani"].map((college) => (
                <Link
                  key={college}
                  href={`/chapter/${encodeURIComponent(college)}`}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors text-sm"
                >
                  {college}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
