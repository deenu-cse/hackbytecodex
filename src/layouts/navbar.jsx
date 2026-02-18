"use client";

import { Button } from "@/components/ui/button";
import { Menu, X, Github, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white italic tracking-tighter">
              hackbyte<span className="text-blue-500">codex</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#community" className="text-sm text-gray-300 hover:text-white transition-colors">
              Community
            </a>
            <a href="#chapters" className="text-sm text-gray-300 hover:text-white transition-colors">
              Chapters
            </a>
            <a href="#resources" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1">
              Resources
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#careers" className="text-sm text-gray-300 hover:text-white transition-colors">
              Careers
            </a>
            <a href="#events" className="text-sm text-gray-300 hover:text-white transition-colors">
              Events
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 border-r border-white/20 pr-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Sign in
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6">
              Get started
            </Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#community" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">
              Community
            </a>
            <a href="#chapters" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">
              Chapters
            </a>
            <a href="#resources" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">
              Resources
            </a>
            <a href="#careers" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">
              Careers
            </a>
            <a href="#events" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">
              Events
            </a>
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                Sign in
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Get started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}