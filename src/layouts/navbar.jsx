"use client";

import { Button } from "@/components/ui/button";
import { Menu, X, Github, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useAuth } from "../app/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

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
            <a href="/landing" className="text-sm text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="/events" className="text-sm text-gray-300 hover:text-white transition-colors">Events</a>
            <a href="/projects" className="text-sm text-gray-300 hover:text-white transition-colors">Projects</a>
            <a href="/chapter/demo" className="text-sm text-gray-300 hover:text-white transition-colors">Chapters</a>
            <a href="/clubs/demo/join" className="text-sm text-gray-300 hover:text-white transition-colors">Clubs</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 border-r border-white/20 pr-4">
              <a href="https://wa.me/916378837030 " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors" title="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/hackbytecodex/ " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/deenu-cse/hackbytecodex " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
            {isAuthenticated && user ? (
              <Popover>
                <PopoverTrigger >
                  <Avatar size="default">
                    <AvatarImage src={user.avatar} alt={user.fullName} />
                    <AvatarFallback>{user.fullName?.[0]}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent align="end" sideOffset={8} className="w-64 p-4 bg-black/40">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar size="lg">
                      <AvatarImage src={user.avatar} alt={user.fullName} />
                      <AvatarFallback>{user.fullName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white text-lg">{user.fullName}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>
                  <div className="mb-2 text-sm text-gray-300">{user.college?.collegeName || "-"}</div>
                  <Button variant="destructive" className="w-full mt-3" onClick={logout}>Logout</Button>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <a href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Sign in</a>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6" asChild>
                  <a href="/register">Get started</a>
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${isOpen ? 'pointer-events-auto bg-black/40' : 'pointer-events-none bg-transparent'}`}
        style={{ backdropFilter: isOpen ? 'blur(2px)' : 'none' }}
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      >
        <aside
          className={`fixed top-0 right-0 h-full w-72 max-w-full bg-[#0a0f1c] border-l border-blue-500/20 shadow-2xl shadow-blue-900/20 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-blue-950/20 pointer-events-none" />
          
          <div className="relative flex items-center justify-between px-5 py-4 border-b border-blue-500/20 bg-[#0d1220]">
            <span className="text-xl font-bold text-white italic tracking-tighter">
              hackbyte<span className="text-blue-500">codex</span>
            </span>
            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
              <X className="w-7 h-7" />
            </button>
          </div>
          
          <nav className="relative flex flex-col gap-1 px-5 py-4 bg-[#0d1220]">
            <a href="/landing" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-all border border-transparent hover:border-blue-500/20">Home</a>
            <a href="/events" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-all border border-transparent hover:border-blue-500/20">Events</a>
            <a href="/projects" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-all border border-transparent hover:border-blue-500/20">Projects</a>
            <a href="/chapter/demo" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-all border border-transparent hover:border-blue-500/20">Chapters</a>
            <a href="/clubs/demo/join" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-all border border-transparent hover:border-blue-500/20">Clubs</a>
          </nav>
          
          <div className="relative flex items-center gap-4 px-5 pt-2 pb-4 border-b border-blue-500/20 bg-[#0d1220]">
            <a href="https://wa.me/916378837030 " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors" title="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/hackbytecodex/ " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" title="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/deenu-cse/hackbytecodex " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </div>
          
          <div className="relative px-5 pt-4 pb-6 flex flex-col gap-2 bg-[#0d1220]">
            {isAuthenticated && user ? (
              <div className="flex flex-col gap-2 items-start">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar size="default">
                    <AvatarImage src={user.avatar} alt={user.fullName} />
                    <AvatarFallback>{user.fullName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white text-base">{user.fullName}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                </div>
                <div className="mb-1 text-xs text-blue-200/70">College: {user.college?.collegeName || "-"}</div>
                <div className="mb-1 text-xs text-blue-200/70">Role: {user.role}</div>
                <div className="mb-1 text-xs text-blue-200/70">Tier: {user.rewards?.tier || "-"}</div>
                <Button variant="destructive" className="w-full mt-2" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <>
                <a href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Sign in</a>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6" asChild>
                  <a href="/register">Get started</a>
                </Button>
              </>
            )}
          </div>
        </aside>
      </div>
    </nav>
  );
}