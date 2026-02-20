"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EventCard } from "../../components/events/EventCard";
import { EventFilters } from "../../components/events/EventFilters";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  
  const [filters, setFilters] = useState({
    search: "",
    eventType: "ALL",
    mode: "ALL",
    minFee: 0,
    maxFee: 10000,
    isOpen: undefined,
    startDate: undefined,
    sortBy: "createdAt",
    order: "desc"
  });

  const fetchEvents = useCallback(async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      
      // Build query params
      const params = new URLSearchParams({
        page: pageNum,
        limit: 10,
        sortBy: filters.sortBy,
        order: filters.order
      });

      if (filters.search) params.append("search", filters.search);
      if (filters.eventType !== "ALL") params.append("eventType", filters.eventType);
      if (filters.mode !== "ALL") params.append("mode", filters.mode);
      if (filters.minFee > 0) params.append("minFee", filters.minFee);
      if (filters.maxFee < 10000) params.append("maxFee", filters.maxFee);
      if (filters.isOpen !== undefined) params.append("isOpen", filters.isOpen);
      if (filters.startDate) params.append("startDate", filters.startDate.toISOString());

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
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Initial fetch and filter changes
  useEffect(() => {
    fetchEvents(1, false);
  }, [fetchEvents]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchEvents(page + 1, true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <EventFilters filters={filters} onFilterChange={setFilters} />

      <main className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Discover Events</h1>
            <p className="text-gray-400">
              Found <span className="text-blue-400 font-semibold">{total}</span> events matching your criteria
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Live Updates</span>
          </div>
        </div>

        <motion.div 
          layout
          className="space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </AnimatePresence>
        </motion.div>

        {!loading && events.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters to see more results</p>
            <Button 
              onClick={() => setFilters({
                search: "",
                eventType: "ALL",
                mode: "ALL",
                minFee: 0,
                maxFee: 10000,
                isOpen: undefined,
                startDate: undefined,
                sortBy: "createdAt",
                order: "desc"
              })}
              variant="outline"
              className="border-white/10 hover:bg-white/5 bg-white/5 cursor-pointer hover:text-white text-white rounded-xl"
            >
              Clear all filters
            </Button>
          </motion.div>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}

        {/* Load More */}
        {!loading && hasMore && events.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={loadMore}
              variant="outline"
              className="h-12 px-8 border-white/10 hover:bg-white/5 text-white rounded-xl"
            >
              Load More Events
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}