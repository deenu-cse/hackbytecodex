"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Play, FileJson, Users, Trophy } from "lucide-react";
import Link from "next/link";

const tabs = [
  { id: "create", label: "Create Event", icon: FileJson },
  { id: "registrations", label: "Get Registrations", icon: Users },
  { id: "score", label: "Submit Score", icon: Trophy },
];

const codeExamples = {
  create: {
    request: `POST /api-platform/events
Content-Type: application/json
X-API-Key: hb_api_xxxxxxxxxxxx

{
  "title": "AI Hackathon 2025",
  "description": "Build the future with AI",
  "eventType": "HACKATHON",
  "mode": "hybrid",
  "startDate": "2025-04-15T09:00:00Z",
  "endDate": "2025-04-17T18:00:00Z",
  "location": "Bangalore, India",
  "registration": {
    "isOpen": true,
    "lastDate": "2025-04-10T23:59:59Z",
    "limit": 500
  }
}`,
    response: `{
  "success": true,
  "data": {
    "eventId": "evt_abc123xyz",
    "slug": "ai-hackathon-2025",
    "title": "AI Hackathon 2025",
    "status": "DRAFT",
    "createdAt": "2025-03-01T10:30:00Z"
  }
}`
  },
  registrations: {
    request: `GET /api-platform/events/evt_abc123xyz/registrations?page=1&limit=10
X-API-Key: hb_api_xxxxxxxxxxxx`,
    response: `{
  "success": true,
  "data": {
    "registrations": [
      {
        "id": "reg_001",
        "registrantName": "John Doe",
        "registrantEmail": "john@example.com",
        "teamName": "Code Ninjas",
        "status": "REGISTERED",
        "registeredAt": "2025-03-15T08:20:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 156,
      "pages": 16
    }
  }
}`
  },
  score: {
    request: `POST /api-platform/judge/scores
Content-Type: application/json
Authorization: Bearer judge_token

{
  "registrationId": "reg_001",
  "criteria": {
    "innovation": 9.5,
    "technical": 8.5,
    "presentation": 9.0
  },
  "feedback": "Excellent project with great potential!"
}`,
    response: `{
  "success": true,
  "data": {
    "scoreId": "scr_789",
    "total": 27.0,
    "maxPossible": 30,
    "submittedAt": "2025-04-17T14:30:00Z"
  }
}`
  }
};

export default function APIDemoSection() {
  const [activeTab, setActiveTab] = useState("create");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentExample = codeExamples[activeTab];

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Try it yourself{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              in seconds
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See how simple it is to integrate with our API. Copy, paste, and start building.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Code Demo */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Request */}
          <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-sm text-gray-400">Request</span>
              </div>
              <button
                onClick={() => handleCopy(currentExample.request)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-gray-300 whitespace-pre">
                {currentExample.request}
              </pre>
            </div>
          </div>

          {/* Response */}
          <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-gray-400">Response</span>
              </div>
              <span className="text-xs text-green-400">200 OK</span>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-gray-300 whitespace-pre">
                {currentExample.response}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/api-docs">
            <Button className="h-12 px-8 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-xl">
              <Play className="mr-2 w-4 h-4" />
              Explore Full Documentation
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
