import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Calendar, CheckCircle2, Star } from "lucide-react";
import TierBadge from "./TierBadge";

export default function ChapterCard({ college }) {
  const location = college.address?.city 
    ? `${college.address.city}${college.address.state ? `, ${college.address.state}` : ""}`
    : college.address?.country || "Location not available";
    
  const tier = college.performance?.tier || "BRONZE";
  const rating = college.performance?.rating || 0;
  const eventsHosted = college.stats?.eventsHosted || 0;
  const clubsCount = college.stats?.clubsCount || 0;
  const activeStudents = college.stats?.activeStudents || 0;
  
  return (
    <Link href={`/chapter/${encodeURIComponent(college.name)}`}>
      <div className="group relative rounded-2xl bg-[#0f0f0f] border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* Banner */}
        <div className="relative h-32 overflow-hidden">
          {college.banners?.[0]?.url ? (
            <Image
              src={college.banners[0].url}
              alt={college.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
          )}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Verified Badge */}
          {college.isVerified && (
            <div className="absolute top-3 right-3 bg-blue-500 rounded-full p-1">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
          
          <div className="absolute bottom-0 left-2">
            {/* <div className="w-16 h-16 rounded-xl bg-[#0f0f0f] border-2 border-white/10 p-0.5"> */}
              {college.logo?.url ? (
                <Image
                  src={college.logo.url}
                  alt={college.name}
                  width={60}
                  height={60}
                  className="w-full h-full rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white">
                  {college.name?.substring(0, 2).toUpperCase()}
                </div>
              )}
            {/* </div> */}
          </div>
        </div>
        
        <div className="pt-1 pb-3 px-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
              {college.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
              />
            ))}
            <span className="text-sm text-gray-400 ml-1">({rating.toFixed(1)})</span>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {eventsHosted} events
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {activeStudents || clubsCount * 50}+ members
            </span>
          </div>
          
          {/* Tier Badge */}
          <TierBadge tier={tier} size="small" />
        </div>
        
        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  );
}
