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
              <a href="https://wa.me/916378837030" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors" title="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/hackbytecodex/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/deenu-cse/hackbytecodex" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="GitHub">
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6">Get started</Button>
                </PopoverTrigger>
                <PopoverContent align="end" sideOffset={8} className="w-56 p-4">
                  <div className="flex flex-col gap-2">
                    <Button variant="ghost" className="w-full text-white" asChild>
                      <a href="/register">Register</a>
                    </Button>
                    <Button variant="outline" className="w-full text-white" asChild>
                      <a href="/login">Sign in</a>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
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
            <a href="/landing" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Home</a>
            <a href="/events" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Events</a>
            <a href="/projects" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Projects</a>
            <a href="/chapter/demo" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Chapters</a>
            <a href="/clubs/demo/join" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Clubs</a>
            <div className="flex items-center gap-3 pt-4 pb-2">
              <a href="https://wa.me/916378837030" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors" title="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/hackbytecodex/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/deenu-cse/hackbytecodex" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              {isAuthenticated && user ? (
                <Popover>
                  <PopoverTrigger>
                    <Avatar size="default">
                      <AvatarImage src={user.avatar} alt={user.fullName} />
                      <AvatarFallback>{user.fullName?.[0]}</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent align="end" sideOffset={8} className="w-64 p-4">
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
                    <div className="mb-2 text-sm text-gray-300">College: {user.college?.collegeName || "-"}</div>
                    <div className="mb-2 text-sm text-gray-300">Role: {user.role}</div>
                    <div className="mb-2 text-sm text-gray-300">Tier: {user.rewards?.tier || "-"}</div>
                    <Button variant="destructive" className="w-full mt-3" onClick={logout}>Logout</Button>
                  </PopoverContent>
                </Popover>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get started</Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" sideOffset={8} className="w-56 p-4">
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" className="w-full text-white" asChild>
                        <a href="/register">Register</a>
                      </Button>
                      <Button variant="outline" className="w-full text-white" asChild>
                        <a href="/login">Sign in</a>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}