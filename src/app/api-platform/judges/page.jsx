"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gavel, Plus, Mail, User, Trash2, CheckCircle, Clock, AlertCircle, X } from "lucide-react";
import { useApiPlatform } from "@/app/context/ApiPlatformContext";

export default function JudgesPage() {
  const { getAuthHeaders, API_URL } = useApiPlatform();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [judges, setJudges] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [judgeData, setJudgeData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    eventId: ""
  });

  useEffect(() => {
    loadEventsAndJudges();
  }, []);

  const loadEventsAndJudges = async () => {
    setLoading(true);
    try {
      // Load events
      const eventsResponse = await fetch(`${API_URL}/api-platform/events`, {
        headers: getAuthHeaders()
      });
      const eventsData = await eventsResponse.json();
      if (eventsData.success) {
        setEvents(eventsData.data || []);
        
        // If there are events, load judges for the first one
        if (eventsData.data && eventsData.data.length > 0) {
          setSelectedEvent(eventsData.data[0]._id);
          await loadJudges(eventsData.data[0]._id);
        }
      }

      // Load all judges
      if (selectedEvent) {
        await loadJudges(selectedEvent);
      }
    } catch (err) {
      setError("Failed to load events and judges");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadJudges = async (eventId) => {
    try {
      const response = await fetch(`${API_URL}/api-platform/judges/events/${eventId}/judges`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setJudges(data.data || []);
      } else {
        setError("Failed to load judges");
      }
    } catch (err) {
      setError("Failed to load judges");
      console.error("Error loading judges:", err);
    }
  };

  const handleEventChange = async (eventId) => {
    setSelectedEvent(eventId);
    await loadJudges(eventId);
  };

  const handleInviteJudge = async () => {
    if (!judgeData.email || !judgeData.firstName || !judgeData.lastName || !judgeData.eventId) {
      setError("Please fill all required fields");
      return;
    }

    setInviting(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api-platform/judges/events/${judgeData.eventId}/judges/invite`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          email: judgeData.email,
          name: `${judgeData.firstName} ${judgeData.lastName}`,
          role: "JUDGE"
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setShowInviteModal(false);
        setJudgeData({
          email: "",
          firstName: "",
          lastName: "",
          eventId: selectedEvent
        });
        await loadJudges(selectedEvent);
        alert("Judge invited successfully! Credentials sent via email.");
      } else {
        setError(data.message || "Failed to invite judge");
      }
    } catch (err) {
      setError("Failed to invite judge");
      console.error("Error inviting judge:", err);
    } finally {
      setInviting(false);
    }
  };

  const handleRemoveJudge = async (judgeId) => {
    if (!window.confirm("Are you sure you want to remove this judge?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api-platform/judges/events/${selectedEvent}/judges/${judgeId}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });

      const data = await response.json();
      
      if (data.success) {
        await loadJudges(selectedEvent);
        alert("Judge removed successfully!");
      } else {
        alert(data.message || "Failed to remove judge");
      }
    } catch (err) {
      alert("Failed to remove judge");
      console.error("Error removing judge:", err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'INVITED':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-400" />;
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Judges</h1>
          <p className="text-gray-400 mt-1">Invite and manage event judges</p>
        </div>
        <Button 
          onClick={() => {
            setJudgeData({...judgeData, eventId: selectedEvent});
            setShowInviteModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Invite Judge
        </Button>
      </div>

      {/* Event Selector */}
      {events.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
          <label className="block text-sm font-medium text-gray-300 mb-2">Select Event</label>
          <select
            value={selectedEvent}
            onChange={(e) => handleEventChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {events.map(event => (
              <option key={event._id} value={event._id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Judges List */}
      <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">Event Judges</h2>
        
        {judges.length > 0 ? (
          <div className="space-y-3">
            {judges.map(judge => (
              <div 
                key={judge._id} 
                className="flex items-center justify-between p-4 rounded-lg bg-black border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      {judge.firstName} {judge.lastName}
                    </h3>
                    <p className="text-sm text-gray-400">{judge.email}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {getStatusIcon(judge.status)}
                    <span className="text-sm capitalize text-gray-400">{judge.status}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    onClick={() => handleRemoveJudge(judge._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Gavel className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400">No judges yet</h3>
            <p className="text-gray-500">Invite judges to evaluate submissions and provide scores</p>
          </div>
        )}
      </div>

      {/* Invite Judge Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl bg-[#0a0a0a] border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Invite Judge</h3>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Event</label>
                <select
                  value={judgeData.eventId}
                  onChange={(e) => setJudgeData({...judgeData, eventId: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {events.map(event => (
                    <option key={event._id} value={event._id}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">First Name *</label>
                <input
                  type="text"
                  value={judgeData.firstName}
                  onChange={(e) => setJudgeData({...judgeData, firstName: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter judge's first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={judgeData.lastName}
                  onChange={(e) => setJudgeData({...judgeData, lastName: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter judge's last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                <input
                  type="email"
                  value={judgeData.email}
                  onChange={(e) => setJudgeData({...judgeData, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter judge's email"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleInviteJudge}
                disabled={inviting}
              >
                {inviting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  "Send Invitation"
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
