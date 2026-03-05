"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Download, Filter } from "lucide-react";

export default function RegistrationsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Registrations</h1>
          <p className="text-gray-400 mt-1">View and manage event registrations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Placeholder */}
      <div className="text-center py-16 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No registrations yet</h3>
        <p className="text-gray-400">Registrations will appear here once participants start signing up</p>
      </div>
    </motion.div>
  );
}
