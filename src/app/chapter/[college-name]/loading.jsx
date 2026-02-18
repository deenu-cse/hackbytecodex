import { Skeleton } from "@/components/ui/skeleton";

export default function ChapterLoading() {
  return (
    <div className="bg-black min-h-screen animate-pulse">
      <div className="h-[500px] bg-gradient-to-br from-gray-900 to-gray-800" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <Skeleton className="h-10 w-32 bg-white/10" />
          <Skeleton className="h-10 w-32 bg-white/10" />
        </div>
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 bg-white/10 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}