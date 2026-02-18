// app/components/Leaderboard.jsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Users, ArrowRight, Crown, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Leaderboard() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("codexToken");
        
        const res = await fetch(`${API_URL}/judges/global/leaderboard?limit=5`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!res.ok) {
          setChapters([]);
          setLoading(false);
          return;
        }

        const data = await res.json();
        
        // If no data or empty array, keep empty
        if (!data.success || !data.data || data.data.length === 0) {
          setChapters([]);
          setLoading(false);
          return;
        }

        // Map backend data to component format
        const mappedData = data.data.map((item, idx) => ({
          rank: item.rank || idx + 1,
          name: item.name || "Unknown",
          location: item.college?.collegeName || item.location || "",
          score: item.totalScore || 0,
          growth: Math.round((item.avgScore || 0) * 10), // Convert avg to growth-like metric
          members: item.eventsCount || 0,
          color: idx === 0 
            ? "from-yellow-400 to-orange-500" 
            : idx === 1 
              ? "from-gray-300 to-gray-400" 
              : idx === 2 
                ? "from-orange-400 to-orange-600" 
                : "from-blue-500 to-purple-600",
          badge: idx === 0 ? "🏆" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null
        }));

        setChapters(mappedData);
      } catch (err) {
        // Silently fail - no error display
        setChapters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Don't render anything if no data and not loading
  if (!loading && chapters.length === 0) {
    return null;
  }

  // Show loading state briefly then disappear if no data
  if (loading) {
    return (
      <section className="relative bg-black py-24 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </section>
    );
  }

  const topThree = chapters.slice(0, 3);
  const restList = chapters.slice(3);

  return (
    <section className="relative bg-black py-24 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-blue-500" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Chapter <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Leaderboard</span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg">
              Top performing college chapters this season
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="h-12 px-6 border-white/10 hover:border-white/20 text-black rounded-xl cursor-pointer"
            >
              This Month
            </Button>
            <Button 
              className="group h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer"
            >
              View Full Rankings
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {topThree.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {topThree.map((chapter, idx) => (
              <div 
                key={chapter.rank}
                className={`relative rounded-3xl p-6 border transition-all duration-300 ${
                  idx === 0 
                    ? "bg-gradient-to-b from-yellow-500/10 to-transparent border-yellow-500/20 scale-110 z-10" 
                    : idx === 1 
                      ? "bg-gradient-to-b from-gray-400/10 to-transparent border-gray-500/20 translate-y-4"
                      : "bg-gradient-to-b from-orange-500/10 to-transparent border-orange-500/20 translate-y-4"
                }`}
              >
                <div className="text-center">
                  {chapter.badge && <div className="text-3xl mb-2">{chapter.badge}</div>}
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${chapter.color} p-0.5 mb-3`}>
                    <div className="w-full h-full rounded-full bg-[#0f0f0f] flex items-center justify-center text-white font-bold text-xl">
                      {chapter.name.substring(0, 1)}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-1 truncate px-2">{chapter.name}</h3>
                  <p className="text-2xl font-bold text-white mb-2">{chapter.score.toLocaleString()}</p>
                  <div className="flex items-center justify-center gap-1 text-green-400 text-sm">
                    <TrendingUp className="w-3 h-3" />
                    <span>+{chapter.growth}%</span>
                  </div>
                </div>
                
                {idx === 0 && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500">
                    <Crown className="w-8 h-8 fill-yellow-500 text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Rest of List */}
        {restList.length > 0 && (
          <div className="space-y-3">
            {restList.map((chapter) => (
              <div 
                key={chapter.rank}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-blue-500/30 hover:bg-[#131313] transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 font-bold text-lg group-hover:text-white transition-colors">
                  {chapter.rank}
                </div>
                
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {chapter.name.substring(0, 1)}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors truncate">{chapter.name}</h4>
                  <p className="text-sm text-gray-500 truncate">{chapter.location}</p>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-gray-500 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{chapter.members}</span>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl font-bold text-white">{chapter.score.toLocaleString()}</div>
                  <div className="text-xs text-green-400 flex items-center justify-end">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{chapter.growth}%
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-blue-400 group cursor-pointer"
          >
            See how rankings are calculated
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}