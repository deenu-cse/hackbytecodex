import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../../../layouts/navbar";
import Footer from "../../../layouts/footer";

export default function ChapterLoading() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Banner Skeleton */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-12 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-4 md:gap-6">
            {/* Avatar Skeleton */}
            <div className="relative">
              <Skeleton className="w-24 h-24 md:w-40 md:h-40 rounded-2xl md:rounded-3xl bg-white/10" />
            </div>
            
            {/* Info Skeleton */}
            <div className="flex-1 mb-0 md:mb-2 space-y-2">
              <Skeleton className="h-8 md:h-12 w-48 md:w-96 bg-white/10" />
              <Skeleton className="h-4 md:h-6 w-32 md:w-64 bg-white/10" />
            </div>
            
            {/* Buttons Skeleton */}
            <div className="flex gap-2 md:gap-3 w-full md:w-auto">
              <Skeleton className="flex-1 md:flex-none h-10 md:h-12 w-24 md:w-32 bg-white/10" />
              <Skeleton className="flex-1 md:flex-none h-10 md:h-12 w-24 md:w-32 bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Badges Skeleton */}
      <section className="px-4 py-6 md:py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-3">
            <Skeleton className="h-7 md:h-8 w-20 bg-white/5" />
            <Skeleton className="h-7 md:h-8 w-24 bg-white/5" />
            <Skeleton className="h-7 md:h-8 w-28 bg-white/5" />
          </div>
        </div>
      </section>

      {/* Stats Grid Skeleton */}
      <section className="px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl md:rounded-2xl bg-[#0f0f0f] border border-white/10 p-4 md:p-6">
              <Skeleton className="w-5 h-5 md:w-6 md:h-6 bg-white/5 mb-2 md:mb-3" />
              <Skeleton className="h-8 md:h-10 w-16 bg-white/5 mb-0.5 md:mb-1" />
              <Skeleton className="h-3 md:h-4 w-20 bg-white/5" />
            </div>
          ))}
        </div>
      </section>

      {/* Clubs Section Skeleton */}
      <section className="px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 md:h-10 w-32 bg-white/5 mb-6 md:mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-[#0f0f0f] border border-white/10 p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <Skeleton className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/5 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 md:h-6 w-3/4 bg-white/5" />
                    <Skeleton className="h-3 md:h-4 w-full bg-white/5" />
                    <Skeleton className="h-3 md:h-4 w-20 bg-white/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Cards Skeleton */}
      <section className="px-4 py-8 md:py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-[#0f0f0f] border border-white/10 p-5 md:p-6">
                <Skeleton className="h-6 md:h-7 w-40 bg-white/5 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 md:h-5 w-full bg-white/5" />
                  <Skeleton className="h-4 md:h-5 w-3/4 bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Skeleton className="h-10 md:h-14 w-64 md:w-96 bg-white/5 mx-auto mb-4 md:mb-6" />
          <Skeleton className="h-5 md:h-6 w-full max-w-xl bg-white/5 mx-auto mb-6 md:mb-8" />
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Skeleton className="h-12 md:h-14 w-full sm:w-40 bg-white/5" />
            <Skeleton className="h-12 md:h-14 w-full sm:w-40 bg-white/5" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
