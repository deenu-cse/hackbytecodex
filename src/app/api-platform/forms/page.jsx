"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FormInput, Plus, Settings } from "lucide-react";

export default function FormsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Form Builder</h1>
          <p className="text-gray-400 mt-1">Create custom registration forms for your events</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Form
        </Button>
      </div>

      {/* Placeholder */}
      <div className="text-center py-16 rounded-2xl bg-[#0a0a0a] border border-white/10">
        <FormInput className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Form Builder Coming Soon</h3>
        <p className="text-gray-400 mb-6">Create dynamic forms with drag-and-drop interface</p>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <Settings className="w-4 h-4 mr-2" />
          Configure Fields
        </Button>
      </div>
    </motion.div>
  );
}
