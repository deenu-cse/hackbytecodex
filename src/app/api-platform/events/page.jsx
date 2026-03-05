"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useApiPlatform } from "@/app/context/ApiPlatformContext";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, ArrowRight, Users, Eye } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const { events, fetchEvents } = useApiPlatform();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const getStatusColor = (status) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-500/20 text-green-400";
      case "DRAFT":
        return "bg-yellow-500/20 text-yellow-400";
      case "COMPLETED":
        return "bg-blue-500/20 text-blue-400";
      case "CANCELLED":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Events</h1>
          <p className="text-gray-400 mt-1">Manage your events and track registrations</p>
        </div>
        <Link href="/api-platform/events/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Events List */}
      {events?.length > 0 ? (
        <div className="grid gap-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex items-center justify-between p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">{event.slug}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{event.participantsCount || 0} registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/api-platform/events/${event._id}`}>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/api-platform/events/${event._id}/edit`}>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      Edit
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No events yet</h3>
          <p className="text-gray-400 mb-6">Create your first event to get started</p>
          <Link href="/api-platform/events/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
