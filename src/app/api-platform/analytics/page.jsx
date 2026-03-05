"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Calendar, Eye, Award, Clock } from "lucide-react";
import { useApiPlatform } from "@/app/context/ApiPlatformContext";

export default function AnalyticsPage() {
  const { getAuthHeaders, API_URL } = useApiPlatform();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Load events
      const eventsResponse = await fetch(`${API_URL}/api-platform/events`, {
        headers: getAuthHeaders()
      });
      const eventsData = await eventsResponse.json();
      if (eventsData.success) {
        setEvents(eventsData.data || []);
      }

      // Load dashboard analytics
      const analyticsResponse = await fetch(`${API_URL}/api-platform/analytics/dashboard`, {
        headers: getAuthHeaders()
      });
      const analyticsResult = await analyticsResponse.json();
      if (analyticsResult.success) {
        setAnalyticsData(analyticsResult.data);
      }
    } catch (err) {
      console.error("Error loading analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-gray-400 mt-1">Track event performance and engagement metrics</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#0a0a0a] border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Events</option>
          {events.map(event => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-gray-500">Total Events</span>
          </div>
          <p className="text-3xl font-bold text-white">{analyticsData?.totalEvents || 0}</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-gray-500">Registrations</span>
          </div>
          <p className="text-3xl font-bold text-white">{analyticsData?.totalRegs || 0}</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-gray-500">Avg. Conversion</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {analyticsData?.avgConversionRate ? `${analyticsData.avgConversionRate}%` : '0%'}
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-sm text-gray-500">API Calls</span>
          </div>
          <p className="text-3xl font-bold text-white">{analyticsData?.apiRequests || 0}</p>
        </div>
      </div>

      {/* Event-Specific Analytics */}
      {selectedEvent !== "all" && (
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">
            {events.find(e => e._id === selectedEvent)?.title || 'Selected Event'} Analytics
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-black border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">Views</span>
              </div>
              <p className="text-xl font-bold text-white">{analyticsData?.eventViews || 0}</p>
            </div>
            <div className="p-4 rounded-xl bg-black border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">Registrations</span>
              </div>
              <p className="text-xl font-bold text-white">{analyticsData?.eventRegs || 0}</p>
            </div>
            <div className="p-4 rounded-xl bg-black border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-400">Completion</span>
              </div>
              <p className="text-xl font-bold text-white">
                {analyticsData?.completionRate ? `${analyticsData.completionRate}%` : '0%'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Registration Trends Chart Placeholder */}
      <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">Registration Trends</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Registration trend chart</p>
            <p className="text-sm text-gray-500">This would show daily/monthly registration patterns</p>
          </div>
        </div>
      </div>

      {/* Top Performing Events */}
      <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">Top Performing Events</h3>
        <div className="space-y-4">
          {analyticsData?.topEvents?.slice(0, 5).map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-black border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{event.title}</h4>
                  <p className="text-sm text-gray-400">{event.registrations} registrations</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Conversion</p>
                  <p className="font-medium text-white">{event.conversionRate}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Revenue</p>
                  <p className="font-medium text-white">₹{event.revenue?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {analyticsData?.recentActivity?.slice(0, 5).map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-black border border-white/10">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                {activity.type === 'REGISTRATION' ? <Users className="w-5 h-5 text-purple-400" /> :
                 activity.type === 'EVENT_CREATED' ? <Calendar className="w-5 h-5 text-purple-400" /> :
                 activity.type === 'PAYMENT' ? <BarChart3 className="w-5 h-5 text-purple-400" /> :
                 <Clock className="w-5 h-5 text-purple-400" />}
              </div>
              <div className="flex-1">
                <p className="text-white">{activity.action}</p>
                <p className="text-sm text-gray-400">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
