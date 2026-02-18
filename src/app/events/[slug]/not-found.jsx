import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";

export default function EventNotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 mx-auto rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <Search className="w-10 h-10 text-gray-600" />
        </div>
        <h1 className="text-4xl font-bold text-white">Event Not Found</h1>
        <p className="text-gray-400 text-lg">
          The event you're looking for doesn't exist or may have been removed.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/events">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}