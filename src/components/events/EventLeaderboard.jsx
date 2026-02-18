"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Medal, 
  Users, 
  Star, 
  TrendingUp, 
  Clock, 
  RefreshCw, 
  Lock, 
  Unlock,
  ChevronDown,
  ChevronUp,
  Target,
  Award,
  Activity,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getRankColor = (rank) => {
  if (rank === 1) return "from-yellow-400 via-orange-500 to-yellow-600";
  if (rank === 2) return "from-gray-300 via-gray-400 to-gray-500";
  if (rank === 3) return "from-orange-400 via-orange-600 to-orange-700";
  return "from-blue-500 via-purple-500 to-pink-500";
};

const getRankBadge = (rank) => {
  if (rank === 1) return "👑";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
};

export default function EventLeaderboard({ eventId }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(15);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const token = localStorage.getItem("codexdashtoken");
      
      const res = await fetch(`${API_URL}/judges/leaderboard/${eventId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) {
        setLeaderboard([]);
        setIsLocked(false);
        return;
      }

      const data = await res.json();
      
      if (!data.success || !data.data) {
        setLeaderboard([]);
        setIsLocked(false);
        return;
      }

      setLeaderboard(data.data);
      setIsLocked(data.locked || false);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setLeaderboard([]);
      setIsLocked(false);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeaderboard();
      setCountdown(15);
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 15));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setLoading(true);
    fetchLeaderboard();
    setCountdown(15);
  };

  const toggleExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  if (!loading && leaderboard.length === 0) {
    return null;
  }

  const topThree = leaderboard.slice(0, 3);
  const restList = leaderboard.slice(3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Live Leaderboard
              {!isLocked && (
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              )}
            </h2>
            <p className="text-gray-400 text-sm">
              {isLocked ? "Final rankings locked" : "Auto-updating every 15 seconds"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge 
            variant="outline" 
            className={`${isLocked 
              ? "bg-red-500/10 text-red-400 border-red-500/30" 
              : "bg-green-500/10 text-green-400 border-green-500/30"
            }`}
          >
            {isLocked ? <Lock className="w-3 h-3 mr-1" /> : <Unlock className="w-3 h-3 mr-1" />}
            {isLocked ? "Locked" : "Live"}
          </Badge>

          {!isLocked && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
              <Clock className="w-3 h-3" />
              <span className="w-4 text-center">{countdown}s</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            disabled={loading}
            className="border-white/10 hover:bg-white/10 text-white bg-blue-600 cursor-pointer hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {lastUpdated && (
        <p className="text-xs text-gray-500 ">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}

      {topThree.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {topThree.map((participant, idx) => {
            const actualRank = participant.rank || idx + 1;
            const isFirst = actualRank === 1;
            
            return (
              <motion.div
                key={participant._id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-3xl p-6 border transition-all duration-300 ${
                  isFirst
                    ? "bg-gradient-to-b from-yellow-500/20 via-yellow-500/5 to-transparent border-yellow-500/30 md:scale-110 md:-mt-4 z-10"
                    : actualRank === 2
                    ? "bg-gradient-to-b from-gray-400/10 to-transparent border-gray-500/20 md:translate-y-4"
                    : "bg-gradient-to-b from-orange-500/10 to-transparent border-orange-500/20 md:translate-y-4"
                }`}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getRankColor(actualRank)} flex items-center justify-center text-lg font-bold text-white shadow-lg`}>
                    {actualRank}
                  </div>
                </div>

                <div className="text-center pt-4">
                  {isFirst && (
                    <motion.div 
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-2"
                    >
                      <span className="text-4xl">👑</span>
                    </motion.div>
                  )}

                  <div className="relative inline-block mb-3">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getRankColor(actualRank)} p-1`}>
                      <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                        <Avatar className="w-full h-full">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback className="bg-transparent text-white text-2xl font-bold">
                            {participant.name?.charAt(0) || "?"}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    {getRankBadge(actualRank) && (
                      <div className="absolute -bottom-1 -right-1 text-2xl">
                        {getRankBadge(actualRank)}
                      </div>
                    )}
                  </div>

                  <h3 className="text-white font-bold text-lg mb-1 truncate px-2">
                    {participant.name}
                  </h3>
                  {participant.teamName && (
                    <p className="text-gray-400 text-sm mb-2 truncate px-2">
                      {participant.teamName}
                    </p>
                  )}

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl font-bold text-white">
                      {participant.avgScore}
                    </span>
                    <span className="text-gray-500 text-sm">/10</span>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{participant.judges} judges</span>
                    </div>
                    {participant.trend && (
                      <div className={`flex items-center gap-1 ${
                        participant.trend > 0 ? "text-green-400" : "text-red-400"
                      }`}>
                        <TrendingUp className={`w-4 h-4 ${participant.trend < 0 ? "rotate-180" : ""}`} />
                        <span>{Math.abs(participant.trend)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {leaderboard.length > 3 && (
        <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              All Rankings
            </h3>
            <Badge variant="outline" className="border-white/10 text-gray-400">
              {leaderboard.length} participants
            </Badge>
          </div>

          <div className="divide-y divide-white/5">
            <AnimatePresence>
              {restList.map((participant, idx) => {
                const actualIndex = idx + 3;
                const isExpanded = expandedRow === actualIndex;
                
                return (
                  <motion.div
                    key={participant._id || actualIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group"
                  >
                    <div 
                      onClick={() => toggleExpand(actualIndex)}
                      className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                        participant.rank <= 10 
                          ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/20"
                          : "bg-white/5 text-gray-500"
                      }`}>
                        {participant.rank}
                      </div>

                      <Avatar className="w-12 h-12 border-2 border-white/10">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                          {participant.name?.charAt(0) || "?"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold truncate group-hover:text-blue-400 transition-colors">
                          {participant.name}
                        </h4>
                        {participant.teamName && (
                          <p className="text-gray-500 text-sm truncate">{participant.teamName}</p>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-xl font-bold text-white">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          {participant.avgScore}
                        </div>
                        <p className="text-xs text-gray-500">{participant.judges} judges</p>
                      </div>

                      <div className="text-gray-600 group-hover:text-white transition-colors">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-white/5"
                        >
                          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500 uppercase tracking-wider">Innovation</p>
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-400" />
                                <span className="text-white font-semibold">
                                  {(participant.breakdown?.innovation || 0).toFixed(1)}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500 uppercase tracking-wider">Technical</p>
                              <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-purple-400" />
                                <span className="text-white font-semibold">
                                  {(participant.breakdown?.technical || 0).toFixed(1)}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500 uppercase tracking-wider">Presentation</p>
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-pink-400" />
                                <span className="text-white font-semibold">
                                  {(participant.breakdown?.presentation || 0).toFixed(1)}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500 uppercase tracking-wider">Design</p>
                              <div className="flex items-center gap-2">
                                <Medal className="w-4 h-4 text-green-400" />
                                <span className="text-white font-semibold">
                                  {(participant.breakdown?.design || 0).toFixed(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {!loading && leaderboard.length === 0 && (
        <div className="text-center py-12 rounded-3xl bg-[#0f0f0f] border border-white/10">
          <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">No Rankings Yet</h3>
          <p className="text-gray-500">Judging hasn't started or no scores submitted</p>
        </div>
      )}
    </motion.section>
  );
}