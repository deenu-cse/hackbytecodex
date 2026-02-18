"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Calendar,
    Users,
    Banknote,
    ArrowRight,
    Globe,
    Building2,
    Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const typeColors = {
    HACKATHON: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    WORKSHOP: "bg-green-500/10 text-green-400 border-green-500/20",
    SEMINAR: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    COMPETITION: "bg-red-500/10 text-red-400 border-red-500/20",
};

const modeIcons = {
    ONLINE: Globe,
    OFFLINE: MapPin,
    HYBRID: Building2,
};

export function EventCard({ event }) {
    const [currentImage, setCurrentImage] = useState(0);
    const images = event.banners?.length > 0
        ? event.banners.map(b => b.url)
        : ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"];

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const ModeIcon = modeIcons[event.mode] || MapPin;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500"
        >
            <div className="flex flex-col lg:flex-row">
                <div className="relative lg:w-2/5 h-64 lg:h-auto overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImage}
                            src={images[currentImage]}
                            alt={event.title}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/50" />

                    {images.length > 1 && (
                        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                            <button
                                onClick={nextImage}
                                className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
                            >
                                <ArrowRight className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    )}

                    <div className="absolute bottom-4 left-4 flex gap-1.5 z-10">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-300 ${idx === currentImage ? "w-8 bg-blue-500" : "w-2 bg-white/30"
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="absolute top-4 left-4 z-10">
                        <Badge className={`${typeColors[event.eventType] || "bg-blue-500/10 text-blue-400"} border backdrop-blur-md`}>
                            {event.eventType}
                        </Badge>
                    </div>
                </div>

                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="space-y-4">
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-sm text-blue-400 mb-2">
                                    <Building2 className="w-4 h-4" />
                                    <span className="font-medium">{event.college?.collegeName || "College Name"}</span>
                                    {event.club?.clubName && (
                                        <>
                                            <span className="text-white/20">•</span>
                                            <span className="text-white/60">{event.club.clubName}</span>
                                        </>
                                    )}
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                                    {event.title}
                                </h3>
                            </div>
                            <div className="hidden sm:flex flex-col items-end gap-2">
                                <Badge variant="outline" className="border-white/10 text-white/60">
                                    <ModeIcon className="w-3 h-3 mr-1" />
                                    {event.mode}
                                </Badge>
                            </div>
                        </div>

                        <p className="text-gray-400 line-clamp-2 leading-relaxed">
                            {event.description || "Join us for an amazing event filled with learning, networking, and innovation."}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/40">Date</p>
                                    <p className="text-white font-medium">{new Date(event.startDate).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/40">Location</p>
                                    <p className="text-white font-medium truncate">{event.location.name || "TBA"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Banknote className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/40">Fee</p>
                                    <p className="text-white font-medium">
                                        {event.registration?.fee > 0 ? `₹${event.registration.fee}` : "Free"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/40">Registrations</p>
                                    <p className="text-white font-medium">{event.participantsCount || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>
                                {event.registration?.isOpen ? (
                                    <span className="text-green-400">Registration Open</span>
                                ) : (
                                    <span className="text-red-400">Closed</span>
                                )}
                            </span>
                            {event.registration?.lastDate && (
                                <span className="text-white/30">• Closes {new Date(event.registration.lastDate).toLocaleDateString()}</span>
                            )}
                        </div>
                        <Link href={`/events/${event.slug}`}>
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all group/btn cursor-pointer"
                            >
                                View Details
                                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}