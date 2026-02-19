"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Trophy,
  ArrowRight,
  Share2,
  Bookmark,
  ChevronLeft,
  Globe,
  Building2,
  Banknote,
  CheckCircle2,
  XCircle,
  Sparkles,
  CalendarDays,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EventLeaderboard from "@/components/events/EventLeaderboard";

const typeConfig = {
  HACKATHON: {
    color: "from-purple-500 to-indigo-600",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    icon: Trophy,
    gradient: "from-purple-500/20 via-transparent to-transparent"
  },
  WORKSHOP: {
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-400",
    icon: CheckCircle2,
    gradient: "from-green-500/20 via-transparent to-transparent"
  },
  SEMINAR: {
    color: "from-yellow-500 to-orange-600",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    text: "text-yellow-400",
    icon: Users,
    gradient: "from-yellow-500/20 via-transparent to-transparent"
  },
  COMPETITION: {
    color: "from-red-500 to-rose-600",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400",
    icon: Trophy,
    gradient: "from-red-500/20 via-transparent to-transparent"
  },
};

const modeIcons = {
  ONLINE: Globe,
  OFFLINE: MapPin,
  HYBRID: Building2,
};

export function EventDetailClient({ event }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const router = useRouter();

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const images = event.banners?.length > 0
    ? event.banners.map(b => b.url)
    : ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80"];

  const config = typeConfig[event.eventType] || typeConfig.COMPETITION;
  const TypeIcon = config.icon;
  const ModeIcon = modeIcons[event.mode] || MapPin;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description?.slice(0, 100),
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  const formatDate = (date) => {
    if (!date) return "TBA";
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isUpcoming = new Date(event.startDate) > new Date();
  const isOngoing = new Date(event.startDate) <= new Date() && new Date(event.endDate) >= new Date();
  const isPast = new Date(event.endDate) < new Date();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-white hover:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Button>
          <h1 className="font-semibold text-lg truncate max-w-md hidden sm:block">{event.title}</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare} className="hover:bg-white/10">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="hover:bg-white/10"
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-blue-500 text-blue-500" : ""}`} />
            </Button>
          </div>
        </div>
      </motion.header>

      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt={event.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover"
              priority
            />
          </AnimatePresence>
        </motion.div>

        <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient} opacity-60`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Link href="/events" className="hover:text-white transition-colors">Events</Link>
                <ChevronLeft className="w-4 h-4 rotate-180" />
                <span className="text-white">{event.eventType}</span>
              </div>

              {/* Title & Badges */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={`${config.bg} ${config.text} ${config.border} border text-sm px-3 py-1`}>
                    <TypeIcon className="w-4 h-4 mr-1" />
                    {event.eventType}
                  </Badge>

                  {isUpcoming && (
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 border">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Upcoming
                    </Badge>
                  )}
                  {isOngoing && (
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 border animate-pulse">
                      Live Now
                    </Badge>
                  )}

                  <Badge variant="outline" className="border-white/20 text-white/80">
                    <ModeIcon className="w-3 h-3 mr-1" />
                    {event.mode}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl">
                  {event.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-lg text-white/80">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">{event.college?.collegeName}</span>
                    {event.club?.clubName && (
                      <span className="text-white/50">• {event.club.clubName}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Stats Row */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3">
                  <CalendarDays className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-white/50">Date</p>
                    <p className="font-semibold">{formatDate(event.startDate)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-white/50">Time</p>
                    <p className="font-semibold">{formatTime(event.startDate)} - {formatTime(event.endDate)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-white/50">Location</p>
                    <p className="font-semibold">{event.location.name || "Virtual Event"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-white/50">Participants</p>
                    <p className="font-semibold">{event.participantsCount} registered</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Image Navigation Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-8 right-8 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImage ? "w-8 bg-white" : "bg-white/30 hover:bg-white/50"
                  }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className={`w-1 h-8 rounded-full bg-gradient-to-b ${config.color}`} />
                About This Event
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                <p className="whitespace-pre-wrap">{event.description || "No description available."}</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className={`w-1 h-8 rounded-full bg-gradient-to-b ${config.color}`} />
                Event Timeline
              </h2>

              {event.timeline && event.timeline.length > 0 ? (
                <div className="space-y-6">
                  {event.timeline.map((day, dayIndex) => (
                    <div key={dayIndex} className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white font-bold`}>
                          {dayIndex + 1}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-lg">
                            {formatDate(day.date)}
                          </p>
                          <p className="text-gray-400 text-sm">
                            Day {dayIndex + 1} of {event.timeline.length}
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-8 space-y-4 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-transparent">
                        {day.activities?.map((activity, actIndex) => (
                          <div key={actIndex} className="relative">
                            <div className={`absolute -left-8 top-1 w-6 h-6 rounded-full bg-gradient-to-br ${config.color} opacity-20 border-2 flex items-center justify-center`}
                              style={{ borderColor: 'currentColor' }}>
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${config.color}`} />
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                <h3 className="text-white font-semibold text-lg">{activity.title}</h3>
                                <Badge variant="outline" className="border-white/20 text-white/80 text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {activity.startTime}{activity.endTime ? ` - ${activity.endTime}` : ''}
                                </Badge>
                              </div>

                              {activity.description && (
                                <p className="text-gray-400 text-sm mb-3">{activity.description}</p>
                              )}

                              {activity.location && (
                                <div className="flex items-center gap-2 text-sm text-blue-400">
                                  <MapPin className="w-4 h-4" />
                                  <span>{activity.location.name || activity.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-transparent">
                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <p className="text-sm text-blue-400 font-medium">Registration Opens</p>
                      <p className="text-white">{formatDate(event.createdAt)}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <p className="text-sm text-purple-400 font-medium">Registration Deadline</p>
                      <p className="text-white">{formatDate(event.registration?.lastDate) || "No deadline"}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <p className="text-sm text-green-400 font-medium">Event Starts</p>
                      <p className="text-white">{formatDate(event.startDate)} at {formatTime(event.startDate)}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <p className="text-sm text-red-400 font-medium">Event Ends</p>
                      <p className="text-white">{formatDate(event.endDate)} at {formatTime(event.endDate)}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.section>

            <EventLeaderboard eventId={event._id} />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Organized by</h3>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-blue-500/30">
                  <AvatarImage src={event.createdBy?.avatar} />
                  <AvatarFallback className="bg-blue-500/20 text-blue-400 text-xl">
                    {event.createdBy?.fullName?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{event.createdBy?.fullName || "Anonymous"}</p>
                  <p className="text-gray-400 text-sm">Event Coordinator</p>
                  <p className="text-blue-400 text-sm">{event.college?.collegeName}</p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right Sidebar - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Registration Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 space-y-6 relative overflow-hidden"
              >
                {/* Glow Effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${config.color} opacity-20 blur-3xl rounded-full`} />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Registration Fee</span>
                    <span className="text-3xl font-bold text-white">
                      {event.registration?.fee > 0 ? `₹${event.registration.fee}` : "Free"}
                    </span>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Status</span>
                      <div className="flex items-center gap-2">
                        {event.registration?.isOpen ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-green-400 font-medium">Open</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-400" />
                            <span className="text-red-400 font-medium">Closed</span>
                          </>
                        )}
                      </div>
                    </div>

                    {event.registration?.limit && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Spots Left</span>
                        <span className="text-white font-medium">
                          {Math.max(0, event.registration.limit - (event.participantsCount || 0))} / {event.registration.limit}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Registration Ends</span>
                      <span className="text-white font-medium">
                        {event.registration?.lastDate
                          ? new Date(event.registration.lastDate).toLocaleDateString()
                          : "No deadline"}
                      </span>
                    </div>
                  </div>

                  <Button
                    className={`w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r ${config.color} hover:opacity-90 transition-all shadow-lg group cursor-pointer`}
                    disabled={!event.registration?.isOpen}
                    onClick={() => {
                      if (event.registration?.isOpen) {
                        router.push(`/events/${event.slug}/register`);
                      }
                    }}
                  >
                    {event.registration?.isOpen ? (
                      <>
                        Register Now
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      "Registration Closed"
                    )}
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-white/10 hover:bg-white/5 bg-orange-400 cursor-pointer hover:text-white text-white rounded-xl"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-white/10 hover:bg-white/5 text-white rounded-xl bg-orange-400 cursor-pointer hover:text-white"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-blue-500 text-blue-500" : ""}`} />
                      {isBookmarked ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
              </motion.div>

              {(event.rewardPoints?.organizer > 0 || event.rewardPoints?.participant > 0) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-6"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Reward Points
                  </h3>
                  <div className="space-y-3">
                    {event.rewardPoints?.participant > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Participants</span>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          +{event.rewardPoints.participant} pts
                        </Badge>
                      </div>
                    )}
                    {event.rewardPoints?.organizer > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Organizers</span>
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                          +{event.rewardPoints.organizer} pts
                        </Badge>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Performance Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Event Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Popularity Score</span>
                      <span className="text-white font-medium">{event.performance?.score || 0}/100</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${event.performance?.score || 0}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-400">Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="text-white font-medium">{event.performance?.rating || "N/A"}</span>
                      <span className="text-gray-500 text-sm">/5</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-between text-gray-300 hover:text-white hover:bg-white/5">
                    Visit College Page
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" className="w-full justify-between text-gray-300 hover:text-white hover:bg-white/5">
                    View All Events
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}