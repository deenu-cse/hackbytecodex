"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useApiPlatform } from "@/app/context/ApiPlatformContext";
import {
  Calendar,
  Users,
  Gavel,
  Key,
  Zap,
  TrendingUp,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { platformUser, subscription, apiKey, fetchEvents, fetchAnalytics, events, analytics } = useApiPlatform();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchEvents();
    fetchAnalytics();
  }, [fetchEvents, fetchAnalytics]);

  const handleCopyKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case "BASIC":
        return "from-gray-500 to-gray-600";
      case "PRO":
        return "from-blue-500 to-cyan-500";
      case "ENTERPRISE":
        return "from-purple-500 to-pink-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back, {platformUser?.fullName || "Developer"}
          </p>
        </div>
        <Link href="/api-platform/events/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Zap className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Events Count */}
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs text-green-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{events?.length || 0}</p>
          <p className="text-sm text-gray-500">Total Events</p>
        </div>

        {/* Registrations */}
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-xs text-green-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +28%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{analytics?.totalRegs || 0}</p>
          <p className="text-sm text-gray-500">Total Registrations</p>
        </div>

        {/* Judges */}
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Gavel className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{analytics?.activeJudges || 0}</p>
          <p className="text-sm text-gray-500">Active Judges</p>
        </div>

        {/* API Requests */}
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{analytics?.apiRequests || 0}</p>
          <p className="text-sm text-gray-500">API Requests</p>
        </div>
      </motion.div>

      {/* API Key & Subscription */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* API Key Card */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">API Key</h3>
              <p className="text-sm text-gray-500">Use this key to authenticate requests</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-xl bg-black border border-white/10">
            <code className="flex-1 text-sm font-mono text-gray-400 truncate">
              {apiKey ? `${apiKey.slice(0, 20)}...` : "No API key found"}
            </code>
            <button
              onClick={handleCopyKey}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="flex gap-3 mt-4">
            <Link href="/api-platform/keys" className="flex-1">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                Manage Keys
              </Button>
            </Link>
            <Link href="/api-docs" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                View Docs
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Subscription Card */}
        <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getPlanColor(subscription?.plan)} flex items-center justify-center`}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {subscription?.plan || "FREE"} Plan
                </h3>
                <p className="text-sm text-gray-500">
                  {subscription?.status === "ACTIVE" ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              subscription?.status === "ACTIVE" 
                ? "bg-green-500/20 text-green-400" 
                : "bg-red-500/20 text-red-400"
            }`}>
              {subscription?.status || "INACTIVE"}
            </span>
          </div>

          {/* Usage Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Events Used</span>
                <span className="text-white">{subscription?.usage?.eventsCreated || 0} / {subscription?.plan === "ENTERPRISE" ? "∞" : subscription?.plan === "PRO" ? "25" : "5"}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${Math.min(((subscription?.usage?.eventsCreated || 0) / (subscription?.plan === "PRO" ? 25 : 5)) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <Link href="/pricing">
            <Button variant="outline" className="w-full mt-4 border-white/20 text-white hover:bg-white/10">
              Upgrade Plan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Recent Events */}
      <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Events</h3>
          <Link href="/api-platform/events" className="text-sm text-blue-400 hover:underline">
            View All
          </Link>
        </div>
        
        {events?.length > 0 ? (
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div
                key={event._id}
                className="flex items-center justify-between p-4 rounded-xl bg-black border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === "PUBLISHED" 
                      ? "bg-green-500/20 text-green-400"
                      : event.status === "DRAFT"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}>
                    {event.status}
                  </span>
                  <Link href={`/api-platform/events/${event._id}`}>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No events yet</p>
            <Link href="/api-platform/events/new">
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                Create Your First Event
              </Button>
            </Link>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
