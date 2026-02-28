"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, Users, Trophy, Calendar, 
  Github, ExternalLink, ChevronLeft, ChevronRight, 
  Star, GitBranch, Clock, ArrowRight, X, 
  CheckCircle2, Medal, Flame, Target, Building2,
  Mail, Phone, Globe, Award, TrendingUp, Sparkles,
  Zap, Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../../../layouts/navbar";
import Footer from "../../../layouts/footer";
import TierBadge from "@/components/chapters/TierBadge";

export default function ChapterDetailClient({ college }) {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  
  const clubs = college.clubs || [];
  const events = college.recentEvents || [];
  const collegeLead = college.collegeLead;
  const loadingClubs = false;

  const nextEvent = () => setActiveEventIndex((prev) => (prev + 1) % (events.length || 1));
  const prevEvent = () => setActiveEventIndex((prev) => (prev - 1 + (events.length || 1)) % (events.length || 1));

  const getTierGradient = (tier) => {
    switch (tier) {
      case "PLATINUM": return "from-cyan-600 via-blue-600 to-purple-600";
      case "GOLD": return "from-yellow-600 via-amber-600 to-orange-600";
      case "SILVER": return "from-gray-500 via-slate-500 to-zinc-500";
      default: return "from-blue-600 via-purple-600 to-pink-600";
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const coverGradient = getTierGradient(college.performance?.tier);
  const location = college.address 
    ? `${college.address.city}${college.address.state ? `, ${college.address.state}` : ""}`
    : "Location not available";

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        {/* Cover Image with Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${coverGradient}`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-12 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-4 md:gap-6">
            {/* College Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-40 md:h-40 rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-2xl md:rounded-3xl bg-[#0f0f0f] flex items-center justify-center text-2xl md:text-5xl font-bold text-white overflow-hidden">
                  {college.logo?.url ? (
                    <Image
                      src={college.logo.url}
                      alt={college.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover rounded-2xl md:rounded-3xl"
                    />
                  ) : (
                    college.name?.substring(0, 2).toUpperCase()
                  )}
                </div>
              </div>
              {college.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1.5 md:p-2 border-4 border-black">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
              )}
            </div>
            
            {/* College Info */}
            <div className="flex-1 mb-0 md:mb-2">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white">{college.name}</h1>
                {college.isVerified && (
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm font-medium">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-300 text-sm md:text-base">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {location}
                </span>
                <span className="hidden md:block w-1 h-1 bg-gray-500 rounded-full" />
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {college.stats?.activeStudents || college.stats?.clubsCount * 50 || 0}+ members
                </span>
                <span className="hidden md:block w-1 h-1 bg-gray-500 rounded-full" />
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-500" />
                  {college.performance?.tier || "BRONZE"} Tier
                </span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex gap-2 md:gap-3 w-full md:w-auto">
              <Button 
                variant="outline" 
                className="flex-1 md:flex-none h-10 md:h-12 px-4 md:px-6 border-white/20 text-white hover:bg-white/10 rounded-xl bg-black/30 backdrop-blur-md text-sm md:text-base"
                asChild
              >
                <a href={`mailto:${college.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </Button>
              <Button 
                onClick={() => setIsJoinOpen(true)}
                className="flex-1 md:flex-none h-10 md:h-12 px-4 md:px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/25 text-sm md:text-base"
              >
                Join Chapter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Badges */}
      <section className="px-4 py-6 md:py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-3">
            <TierBadge tier={college.performance?.tier || "BRONZE"} size="small" />
            
            {college.performance?.rating > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs md:text-sm text-yellow-400 font-medium">{college.performance.rating.toFixed(1)} Rating</span>
              </div>
            )}
            
            {college.stats?.eventsHosted > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs md:text-sm text-gray-300 font-medium">{college.stats.eventsHosted} Events</span>
              </div>
            )}
            
            {college.stats?.hackathonsHosted > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Trophy className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs md:text-sm text-gray-300 font-medium">{college.stats.hackathonsHosted} Hackathons</span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Target className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs md:text-sm text-blue-400 font-medium">Hiring Now</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "Events Hosted", value: college.stats?.eventsHosted || 0, icon: Calendar },
            { label: "Hackathons", value: college.stats?.hackathonsHosted || 0, icon: Trophy },
            { label: "Active Clubs", value: college.stats?.clubsCount || clubs.length || 0, icon: Building2 },
            { label: "Total Students", value: (college.stats?.activeStudents || 0).toLocaleString(), icon: Users }
          ].map((stat, idx) => (
            <div key={idx} className="rounded-xl md:rounded-2xl bg-[#0f0f0f] border border-white/10 p-4 md:p-6 hover:border-white/20 transition-colors">
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-500 mb-2 md:mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-0.5 md:mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* College Lead Section */}
      {collegeLead && (
        <section className="px-4 py-8 md:py-12 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Chapter Lead</h2>
                <p className="text-sm md:text-base text-gray-400">Meet the leader of this chapter</p>
              </div>
            </div>
            
            <div className="rounded-2xl bg-[#0f0f0f] border border-white/10 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  {collegeLead.avatar ? (
                    <Image
                      src={collegeLead.avatar}
                      alt={collegeLead.fullName}
                      width={100}
                      height={100}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                      {collegeLead.fullName?.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1.5">
                    <Crown className="w-4 h-4 text-black" />
                  </div>
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{collegeLead.fullName}</h3>
                  <p className="text-blue-400 mb-3">{collegeLead.role?.replace(/_/g, " ")}</p>
                  
                  {collegeLead.performance?.badges?.length > 0 && (
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      {collegeLead.performance.badges.map((badge, idx) => (
                        <Badge key={idx} className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <a 
                    href={`mailto:${collegeLead.email}`}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {collegeLead.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Clubs Section */}
      <section className="px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Clubs</h2>
              <p className="text-sm md:text-base text-gray-400">Active clubs under this chapter</p>
            </div>
          </div>
          
          {loadingClubs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 bg-white/5 rounded-2xl" />
              ))}
            </div>
          ) : clubs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {clubs.map((club) => (
                <div 
                  key={club._id} 
                  className="group relative rounded-2xl bg-[#0f0f0f] border border-white/10 hover:border-blue-500/30 p-4 md:p-6 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    {club.logo?.url ? (
                      <Image
                        src={club.logo.url}
                        alt={club.name}
                        width={56}
                        height={56}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg md:text-xl font-bold text-white flex-shrink-0">
                        {club.name?.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                        {club.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 line-clamp-2 mt-1">{club.description}</p>
                      <div className="flex items-center gap-3 mt-2 md:mt-3 text-xs md:text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {club.membersCount || 0} members
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {club.eventsCount || 0} events
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Join Club Button */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Button 
                      asChild
                      className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30"
                    >
                      <Link href={`/clubs/${club.code}/join`}>
                        <Zap className="w-4 h-4 mr-2" />
                        Join Club
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16 rounded-2xl bg-[#0f0f0f] border border-white/10">
              <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">No clubs yet</h3>
              <p className="text-sm md:text-base text-gray-400">Be the first to start a club at this chapter!</p>
            </div>
          )}
        </div>
      </section>

      {events.length > 0 && (
        <section className="px-4 py-8 md:py-12 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Recent Events</h2>
                <p className="text-sm md:text-base text-gray-400">Upcoming and past events</p>
              </div>
              {events.length > 1 && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={prevEvent}
                    className="border-white/10 hover:bg-white/10 text-white rounded-full bg-black/30 text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={nextEvent}
                    className="border-white/10 hover:bg-white/10 text-white rounded-full bg-black/30 text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="relative overflow-hidden">
              <div 
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeEventIndex * (100 / Math.min(events.length, 3))}%)` }}
              >
                {events.map((event) => (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug}`}
                    className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group"
                  >
                    <div className="rounded-2xl bg-[#0f0f0f] border border-white/10 hover:border-blue-500/30 overflow-hidden transition-all duration-300 hover:-translate-y-1">
                      {/* Event Banner */}
                      <div className="relative h-40 overflow-hidden">
                        {event.banners?.[0]?.url ? (
                          <Image
                            src={event.banners[0].url}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
                        )}
                        <div className="absolute inset-0 bg-black/30" />
                        
                        {/* Event Type Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-black/50 text-white border-0 backdrop-blur-md">
                            {event.eventType}
                          </Badge>
                        </div>
                        
                        {/* Mode Badge */}
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-blue-500/50 text-white border-0 backdrop-blur-md">
                            {event.mode}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Event Content */}
                      <div className="p-4 md:p-5">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-3">{event.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(event.startDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.participantsCount || 0} joined
                          </span>
                        </div>
                        
                        {event.registration?.fee > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <span className="text-blue-400 font-medium">
                              Registration Fee: ₹{event.registration.fee}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Pagination Dots */}
            {events.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {events.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveEventIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeEventIndex ? "w-8 bg-blue-500" : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contact & Info Section */}
      <section className="px-4 py-8 md:py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Contact Info */}
            <div className="rounded-2xl bg-[#0f0f0f] border border-white/10 p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                Contact Information
              </h3>
              <div className="space-y-3">
                {college.code && (
                  <div className="flex items-center gap-3 text-gray-400">
                    <span className="text-xs bg-white/10 px-2 py-1 rounded">Code</span>
                    <span className="text-sm md:text-base font-mono">{college.code}</span>
                  </div>
                )}
                {college.email && (
                  <a href={`mailto:${college.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm md:text-base">{college.email}</span>
                  </a>
                )}
                {college.phone && (
                  <a href={`tel:${college.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm md:text-base">{college.phone}</span>
                  </a>
                )}
                {college.website && (
                  <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm md:text-base truncate">{college.website}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Performance */}
            <div className="rounded-2xl bg-[#0f0f0f] border border-white/10 p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm md:text-base">Score</span>
                  <span className="text-white font-medium">{college.performance?.score || 0}/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm md:text-base">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">{college.performance?.rating?.toFixed(1) || "0.0"}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm md:text-base">Tier</span>
                  <TierBadge tier={college.performance?.tier || "BRONZE"} size="small" />
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="rounded-2xl bg-[#0f0f0f] border border-white/10 p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Rewards
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm md:text-base">Total Points</span>
                  <span className="text-yellow-400 font-medium text-lg">{college.rewards?.points || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm md:text-base">Achievements</span>
                  <span className="text-white font-medium">{college.rewards?.history?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="px-4 py-16 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Ready to join {college.name}?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Become part of the most active tech community on campus. Build projects, win hackathons, and grow your network.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Button 
              onClick={() => setIsJoinOpen(true)}
              className="h-12 md:h-14 px-6 md:px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base md:text-lg shadow-lg shadow-blue-500/25"
            >
              Apply for Membership
            </Button>
            <Button 
              variant="outline"
              className="h-12 md:h-14 px-6 md:px-8 border-white/20 text-white hover:bg-white/10 rounded-xl text-base md:text-lg"
            >
              View Requirements
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-gray-500 text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Free Registration
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Instant Approval
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Lifetime Access
            </span>
          </div>
        </div>
      </section>

      <Footer />

      {/* Join Modal */}
      <Dialog open={isJoinOpen} onOpenChange={setIsJoinOpen}>
        <DialogContent className="bg-[#0f0f0f] border-white/10 text-white max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl">Join {college.name}</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm md:text-base">
              Fill out the application below. Our team will review and get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          
          <form className="space-y-4 md:space-y-6 mt-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-sm text-gray-300">Full Name</label>
              <Input 
                placeholder="John Doe" 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500 h-11"
              />
            </div>
            
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-sm text-gray-300">College Email</label>
              <Input 
                type="email"
                placeholder="john@college.edu" 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500 h-11"
              />
            </div>
            
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-sm text-gray-300">Enrollment Number</label>
              <Input 
                placeholder="2023CS101" 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500 h-11"
              />
            </div>
            
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-sm text-gray-300">Why do you want to join?</label>
              <Textarea 
                placeholder="Tell us about your interests and what you hope to achieve..." 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500 min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setIsJoinOpen(false)}
                className="flex-1 border-white/10 text-white hover:bg-white/10 h-11"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
