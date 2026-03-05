"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gavel, Trophy, Users, Calendar, BarChart3 } from "lucide-react";

export default function JudgePanelDashboard() {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    scoredSubmissions: 0,
    pendingSubmissions: 0,
    events: []
  });

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalSubmissions: 24,
        scoredSubmissions: 18,
        pendingSubmissions: 6,
        events: [
          { id: 1, name: "AI Innovation Challenge", submissions: 12 },
          { id: 2, name: "Web Development Hackathon", submissions: 8 },
          { id: 3, name: "Mobile App Contest", submissions: 4 }
        ]
      });
    }, 500);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Judge Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, Judge! Review and score submissions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalSubmissions}</p>
          <p className="text-sm text-gray-500">Total Submissions</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.scoredSubmissions}</p>
          <p className="text-sm text-gray-500">Scored</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Gavel className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.pendingSubmissions}</p>
          <p className="text-sm text-gray-500">Pending Review</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="h-14 bg-purple-600 hover:bg-purple-700 justify-start">
            <Trophy className="w-5 h-5 mr-3" />
            Review Submissions
          </Button>
          <Button className="h-14 bg-blue-600 hover:bg-blue-700 justify-start">
            <Users className="w-5 h-5 mr-3" />
            View Leaderboard
          </Button>
        </div>
      </div>

      {/* Assigned Events */}
      <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">Assigned Events</h2>
        <div className="space-y-3">
          {stats.events.map((event) => (
            <div 
              key={event.id} 
              className="flex items-center justify-between p-4 rounded-lg bg-black border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{event.name}</h3>
                  <p className="text-sm text-gray-400">{event.submissions} submissions</p>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Review
              </Button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}