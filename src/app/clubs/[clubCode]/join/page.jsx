"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Calendar, 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  Shield, 
  CheckCircle2,
  X,
  Loader2,
  MapPin,
  Activity,
  Star,
  Building
} from "lucide-react";

export default function ClubJoinPage() {
  const params = useParams();
  const router = useRouter();
  const clubCode = params.clubCode;

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(null);
  const [joined, setJoined] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await fetch(`${baseUrl}/clubs/code/${clubCode}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('codexToken')}` 
          }
        });
        
        if (!response.ok) throw new Error("Club not found");
        
        const data = await response.json();
        console.log("API Response:", data); // Debug log
        setClub(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (clubCode) fetchClub();
  }, [clubCode]);

  const handleJoin = async () => {
    setJoining(true);
    setError(null); // Clear previous errors
    try {
      const response = await fetch(`${baseUrl}/clubs/join/${clubCode}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('codexToken')}`,
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json();
      console.log("Join Response:", responseData); // Debug log

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to join club");
      }

      setJoined(true);
      setTimeout(() => {
        router.push(`/clubs/${club?._id}`);
      }, 2000);
    } catch (err) {
      setError(err.message);
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-gray-400 text-sm">Loading club details...</span>
        </div>
      </div>
    );
  }

  if (error && !club) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Club Not Found</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Button 
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  if (joined) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-md w-full bg-[#0f0f0f] border border-green-500/30 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(34,197,94,0.2)]">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to {club?.name}!</h2>
          <p className="text-gray-400 mb-6">You've successfully joined the club. Redirecting to club page...</p>
          <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-green-500 animate-[progress_2s_ease-in-out]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">HackByteCodex</span>
          </div>
        </div>

        <div className="w-full max-w-2xl bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:border-blue-500/30 transition-all duration-500">
          
          <div className="relative h-32 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-white/10 rounded-full" />
          </div>

          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6 flex justify-between items-end">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-[#0f0f0f] border border-white/20 p-1 shadow-2xl">
                  {club?.logo?.url ? (
                    <img 
                      src={club.logo.url} 
                      alt={club.name}
                      className="w-full h-full rounded-xl object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-3xl font-bold text-white">
                            ${club?.name?.charAt(0) || 'C'}
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-3xl font-bold text-white">
                      {club?.name?.charAt(0) || 'C'}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0f0f0f] border-2 border-black flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                {club?.rankInCollege && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-300">Rank #{club.rankInCollege} in College</span>
                  </div>
                )}
                
                {club?.performance?.tier && (
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm ${
                    club.performance.tier === "BRONZE" 
                      ? "bg-yellow-900/20 border-yellow-700/30 text-yellow-500"
                      : club.performance.tier === "SILVER"
                      ? "bg-gray-300/20 border-gray-400/30 text-gray-300"
                      : "bg-yellow-500/20 border-yellow-400/30 text-yellow-300"
                  }`}>
                    <Star className="w-4 h-4" />
                    <span className="text-gray-300">{club.performance.tier} TIER</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                {club?.name}
                <Shield className="w-6 h-6 text-blue-400" />
              </h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{club?.college?.name}</span>
                </div>
                <div className="text-gray-500">•</div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Building className="w-4 h-4" />
                  <span className="text-sm">{club?.code}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-blue-500/20 transition-colors group">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Members</span>
                </div>
                <p className="text-2xl font-bold text-white">{club?.membersCount || 0}</p>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-blue-500/20 transition-colors group">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Events</span>
                </div>
                <p className="text-2xl font-bold text-white">{club?.eventsCount || 0}</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-blue-500/20 transition-colors group">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Score</span>
                </div>
                <p className="text-2xl font-bold text-white">{club?.performance?.score || 0}</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-blue-500/20 transition-colors group">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Rating</span>
                </div>
                <p className="text-2xl font-bold text-white">{club?.performance?.rating || 0}</p>
              </div>
            </div>

            {club?.description && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">About Club</p>
                <p className="text-gray-400 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                  {club.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {club?.college && (
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    College
                  </p>
                  <div className="flex items-center gap-3">
                    {club.college.logo?.url && (
                      <img 
                        src={club.college.logo.url} 
                        alt={club.college.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-white">{club.college.name}</p>
                      {club.college.website && (
                        <a 
                          href={club.college.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Visit Website →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {club?.stats && (
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Stats
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Events Hosted</p>
                      <p className="text-xl font-bold text-white">{club.stats.eventsHosted || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Active Members</p>
                      <p className="text-xl font-bold text-white">{club.stats.activeMembers || 0}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {club?.admins && club.admins.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider">Club Leadership</p>
                <div className="space-y-3">
                  {club.admins.map((admin, idx) => (
                    <div 
                      key={admin._id || idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-colors"
                    >
                      {admin.avatar ? (
                        <img 
                          src={admin.avatar} 
                          alt={admin.fullName} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                          {admin.fullName?.charAt(0) || 'A'}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-white">{admin.fullName}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                            {admin.role?.replace('_', ' ') || 'Admin'}
                          </span>
                          {admin.email && (
                            <span className="text-xs text-gray-500">{admin.email}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && !joined && (
              <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                <X className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-4 border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleJoin}
                  disabled={joining || club?.status !== "ACTIVE"}
                  className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {joining ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Joining...
                    </>
                  ) : club?.status === "ACTIVE" ? (
                    <>
                      Join Club Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 mr-2" />
                      Club Not Active
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={joining}
                  className="h-14 px-8 border-white/20 text-gray-600 hover:bg-white/10 hover:text-white rounded-xl cursor-pointer"
                >
                  Maybe Later
                </Button>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-xs">
                <p className="text-gray-500">
                  Club Status: <span className={`font-medium ${
                    club?.status === "ACTIVE" ? "text-green-500" : "text-red-500"
                  }`}>
                    {club?.status || "UNKNOWN"}
                  </span>
                </p>
                <p className="text-gray-500">
                  Created: {club?.createdAt ? new Date(club.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
              
              <p className="mt-3 text-center text-xs text-gray-500">
                By joining, you agree to the club guidelines and HackByteCodex terms of service.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Part of the <span className="text-blue-400 font-semibold">HackByteCodex</span> Network
          </p>
        </div>
      </div>
    </div>
  );
}