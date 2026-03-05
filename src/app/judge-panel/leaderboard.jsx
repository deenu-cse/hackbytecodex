"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Award, Star } from "lucide-react";

export default function JudgeLeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading leaderboard data
    setTimeout(() => {
      const mockLeaderboard = [
        {
          rank: 1,
          teamName: "Tech Innovators",
          projectName: "Smart Agriculture System",
          totalScore: 45,
          innovation: 9,
          complexity: 9,
          functionality: 14,
          impact: 13,
          members: 4
        },
        {
          rank: 2,
          teamName: "AI Pioneers",
          projectName: "Intelligent Healthcare Assistant",
          totalScore: 43,
          innovation: 10,
          complexity: 8,
          functionality: 13,
          impact: 12,
          members: 3
        },
        {
          rank: 3,
          teamName: "Code Masters",
          projectName: "Healthcare Management Portal",
          totalScore: 41,
          innovation: 8,
          complexity: 9,
          functionality: 12,
          impact: 12,
          members: 5
        },
        {
          rank: 4,
          teamName: "Data Wizards",
          projectName: "Predictive Analytics Dashboard",
          totalScore: 39,
          innovation: 9,
          complexity: 7,
          functionality: 12,
          impact: 11,
          members: 4
        },
        {
          rank: 5,
          teamName: "Web Warriors",
          projectName: "Eco-Friendly Lifestyle App",
          totalScore: 37,
          innovation: 8,
          complexity: 8,
          functionality: 11,
          impact: 10,
          members: 3
        }
      ];
      setLeaderboard(mockLeaderboard);
      setLoading(false);
    }, 1000);
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Award className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Star className="w-5 h-5 text-amber-600" />;
    return <span className="text-white font-bold">#{rank}</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
          <p className="text-gray-400 mt-1">Current rankings based on evaluation scores</p>
        </div>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#0a0a0a] border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Events</option>
          <option value="ai-challenge">AI Innovation Challenge</option>
          <option value="web-hackathon">Web Development Hackathon</option>
        </select>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaderboard.slice(0, 3).map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl border ${
              entry.rank === 1 
                ? "bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/30" 
                : entry.rank === 2
                ? "bg-gradient-to-br from-gray-400/10 to-gray-500/10 border-gray-400/30"
                : "bg-gradient-to-br from-amber-600/10 to-amber-700/10 border-amber-600/30"
            }`}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {getRankIcon(entry.rank)}
              </div>
              <h3 className="text-xl font-bold text-white">{entry.teamName}</h3>
              <p className="text-gray-400 text-sm mb-2">{entry.projectName}</p>
              <div className="text-3xl font-bold text-white">{entry.totalScore}</div>
              <p className="text-gray-400 text-sm">Total Points</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Full Rankings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Team</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Project</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Innovation</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Complexity</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Functionality</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Impact</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <motion.tr
                  key={entry.rank}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getRankIcon(entry.rank)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-white">{entry.teamName}</div>
                    <div className="text-sm text-gray-400">{entry.members} members</div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{entry.projectName}</td>
                  <td className="py-4 px-4 text-center text-white">{entry.innovation}</td>
                  <td className="py-4 px-4 text-center text-white">{entry.complexity}</td>
                  <td className="py-4 px-4 text-center text-white">{entry.functionality}</td>
                  <td className="py-4 px-4 text-center text-white">{entry.impact}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="text-lg font-bold text-white">{entry.totalScore}</div>
                    <div className="text-xs text-gray-400">points</div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{leaderboard.length}</p>
          <p className="text-sm text-gray-500">Total Teams</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {leaderboard.reduce((sum, entry) => sum + entry.totalScore, 0)}
          </p>
          <p className="text-sm text-gray-500">Total Points Awarded</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {leaderboard.reduce((sum, entry) => sum + entry.members, 0)}
          </p>
          <p className="text-sm text-gray-500">Total Participants</p>
        </div>
      </div>
    </motion.div>
  );
}