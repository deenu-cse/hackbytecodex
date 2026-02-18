"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Calendar, Users, MapPin, Loader2 } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CollegeEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);

    const fetchEvents = useCallback(async (pageNum = 1, append = false) => {
        try {
            setLoading(true);
            setError(false);
            
            const params = new URLSearchParams({
                page: pageNum,
                limit: 6, 
                sortBy: "startDate",
                order: "asc",
                isOpen: "true" 
            });

            const res = await fetch(`${baseUrl}/user/events/all?${params}`);
            const data = await res.json();

            if (data.success) {
                if (append) {
                    setEvents(prev => [...prev, ...data.data]);
                } else {
                    setEvents(data.data);
                }
                setTotal(data.total);
                setHasMore(pageNum < data.pages);
                setPage(pageNum);
            } else {
                setError(true);
            }
        } catch (error) {
            console.error("Failed to fetch events:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents(1, false);
    }, [fetchEvents]);

    const loadMore = () => {
        if (!loading && hasMore) {
            fetchEvents(page + 1, true);
        }
    };

    const getEventStatus = (event) => {
        const now = new Date();
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        
        if (now >= startDate && now <= endDate) return "LIVE";
        if (now < startDate) return "Upcoming";
        return "Ended";
    };

    const formatDate = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const formatOpts = { month: 'short', day: 'numeric' };
        const startStr = start.toLocaleDateString('en-US', formatOpts);
        const endStr = end.toLocaleDateString('en-US', formatOpts);
        
        if (start.toDateString() === end.toDateString()) {
            return startStr;
        }
        return `${startStr}-${endStr}`;
    };

    const getEventColor = (eventType) => {
        const colors = {
            "Hackathon": "from-blue-600 to-purple-600",
            "Workshop": "from-green-600 to-teal-600",
            "Competition": "from-orange-600 to-red-600",
            "Seminar": "from-pink-600 to-rose-600",
            "Conference": "from-indigo-600 to-blue-600",
            "Meetup": "from-yellow-600 to-orange-600"
        };
        return colors[eventType] || "from-gray-600 to-slate-600";
    };

    // if there was an error or we finished loading with no events, render nothing
    if (!loading && (error || events.length === 0)) {
        return null;
    }

    return (
        <section className="relative bg-black py-24 px-4 overflow-hidden">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            Upcoming <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Events</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Discover hackathons, workshops, and competitions across the network
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="group h-12 px-6 border-white/10 hover:border-blue-500/50 hover:bg-white/5 text-blue-600 rounded-xl cursor-pointer hover:text-white"
                    >
                        Explore All Events
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>


                <motion.div 
                    layout
                    className="grid md:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {loading && events.length === 0 ? (
                            // skeleton cards
                            Array.from({ length: 6 }).map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group relative rounded-3xl bg-[#0f0f0f] border border-white/10 overflow-hidden"
                                >
                                    <div className="h-48 bg-gradient-to-br from-gray-600 to-slate-600 relative overflow-hidden">
                                        <Skeleton className="absolute inset-0" />
                                    </div>
                                    <div className="p-6">
                                        <Skeleton className="h-4 w-3/4 mb-4" />
                                        <Skeleton className="h-4 w-1/2 mb-4" />
                                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                                            <Skeleton className="h-4 w-1/4" />
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            events.map((event) => {
                            const status = getEventStatus(event);
                            const color = getEventColor(event.eventType);
                            
                            return (
                                <motion.div
                                    key={event._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group relative rounded-3xl bg-[#0f0f0f] border border-white/10 hover:border-blue-500/30 overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                >
                                    <div className={`h-48 relative overflow-hidden rounded-t-3xl ${color} flex items-end justify-start`}> 
                                        {/* banner image if available */}
                                        {event.banners && event.banners[0] && (
                                            <img
                                                src={event.banners[0].url}
                                                alt={event.title}
                                                className="absolute inset-0 w-full h-full object-cover opacity-40"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/30" />

                                        {/* status badge */}
                                        <div className="absolute top-4 right-4">
                                            {status === "LIVE" ? (
                                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                                                    LIVE NOW
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                                    {status}
                                                </Badge>
                                            )}
                                        </div>

                                        {/* event type badge */}
                                        <div className="absolute bottom-4 left-4">
                                            <Badge variant="secondary" className="bg-black/50 text-white border-0 backdrop-blur-md">
                                                {event.eventType}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(event.startDate, event.endDate)}</span>
                                            <span className="mx-2">•</span>
                                            <MapPin className="w-4 h-4" />
                                            <span>{event.mode === 'ONLINE' ? 'Online' : event.college?.name || 'TBD'}</span>
                                        </div>

                                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        {event.description && (
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {event.description}
                                            </p>
                                        )}
                                        {/* college/club info and mode */}
                                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-3">
                                            {event.college?.collegeName && (
                                                <span className="italic">{event.college.collegeName}</span>
                                            )}
                                            {event.club?.clubName && (
                                                <span className="italic">{event.club.clubName}</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <Users className="w-4 h-4" />
                                                <span>{event.registeredCount || 0} attending</span>
                                                {event.registration?.limit && (
                                                    <span className="ml-4">limit: {event.registration.limit}</span>
                                                )}
                                                {event.registration?.fee && (
                                                    <span className="ml-4">fee: ₹{event.registration.fee}</span>
                                                )}
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        }))}
                    </AnimatePresence>
                </motion.div>

                {!loading && hasMore && events.length > 0 && (
                    <div className="flex justify-center mt-12">
                        <Button
                            onClick={loadMore}
                            variant="outline"
                            disabled={loading}
                            className="h-12 px-8 border-white/10 hover:bg-white/5 text-white rounded-xl"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Load More Events"
                            )}
                        </Button>
                    </div>
                )}

                <div className="mt-8 text-center md:hidden">
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
                        View all events →
                    </Button>
                </div>
            </div>
        </section>
    );
}