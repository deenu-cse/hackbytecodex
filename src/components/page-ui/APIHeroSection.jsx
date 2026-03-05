"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Code2, Shield, Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const codeLines = [
  { text: 'curl -X POST https://api.hackbytecodex.com/v1/events', color: 'text-blue-400' },
  { text: '  -H "X-API-Key: hb_api_••••••••••••••••"', color: 'text-green-400' },
  { text: '  -H "Content-Type: application/json"', color: 'text-gray-400' },
  { text: '  -d \'{', color: 'text-yellow-400' },
  { text: '    "title": "Hackathon 2025",', color: 'text-cyan-300' },
  { text: '    "mode": "online",', color: 'text-cyan-300' },
  { text: '    "startDate": "2025-03-15"', color: 'text-cyan-300' },
  { text: '  }\'', color: 'text-yellow-400' },
];

export default function APIHeroSection() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [requestCount, setRequestCount] = useState(1234);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => (prev + 1) % (codeLines.length + 1));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequestCount((prev) => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-6 overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Event API Platform</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Build powerful event experiences with our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Developer API
              </span>
            </h2>

            <p className="text-lg text-gray-400 max-w-xl">
              Create events, manage registrations, invite judges, and track analytics programmatically. 
              Scale from hackathons to conferences with our robust API infrastructure.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/pricing">
                <Button className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/25 group cursor-pointer">
                  Get API Access
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/api-docs">
                <Button variant="outline" className="h-12 px-6 border-white/20 text-white bg-white/10 rounded-xl cursor-pointer">
                  <Code2 className="mr-2 w-5 h-5" />
                  View Documentation
                </Button>
              </Link>
            </div>

            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-500">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">&lt;50ms</div>
                <div className="text-sm text-gray-500">Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{requestCount.toLocaleString()}+</div>
                <div className="text-sm text-gray-500">API Requests</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Code Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
           
            <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 ml-4 text-xs text-gray-500">
                  <Terminal className="w-3 h-3" />
                  <span>api-request.sh</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: index < visibleLines ? 1 : 0.3,
                      x: 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex"
                  >
                    <span className="text-gray-600 w-8 select-none">{index + 1}</span>
                    <span className={line.color}>{line.text}</span>
                  </motion.div>
                ))}
                
                {/* Cursor */}
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="flex mt-2"
                >
                  <span className="text-gray-600 w-8 select-none">{codeLines.length + 1}</span>
                  <span className="w-2 h-5 bg-blue-400" />
                </motion.div>

                {/* Response Preview */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: visibleLines >= codeLines.length ? 1 : 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 pt-4 border-t border-white/10"
                >
                  <div className="text-green-400 mb-2">HTTP/1.1 201 Created</div>
                  <div className="text-gray-400">{`{`}</div>
                  <div className="text-cyan-300 pl-4">"success": true,</div>
                  <div className="text-cyan-300 pl-4">"eventId": "evt_abc123",</div>
                  <div className="text-cyan-300 pl-4">"slug": "hackathon-2025"</div>
                  <div className="text-gray-400">{`}`}</div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
