"use client";

import { useState } from "react";
import { 
  verify, MapPin, Users, Trophy, Calendar, 
  Github, ExternalLink, ChevronLeft, ChevronRight, 
  Star, GitBranch, Clock, ArrowRight, X, 
  CheckCircle2, Medal, Flame, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "../../../layouts/navbar";
import Footer from "../../../layouts/footer";

const chapterData = {
  name: "IIT Delhi",
  location: "New Delhi, India",
  established: "2023",
  members: 450,
  rank: 1,
  verified: true,
  avatar: "IIT",
  coverGradient: "from-blue-600 via-purple-600 to-pink-600",
  badges: [
    { icon: Trophy, label: "Top Chapter 2024", color: "text-yellow-400" },
    { icon: Users, label: "500+ Active Members", color: "text-blue-400" },
    { icon: Star, label: "Best Hackathon Host", color: "text-purple-400" },
    { icon: Flame, label: "Most Active", color: "text-orange-400" }
  ],
  stats: {
    eventsHosted: 24,
    projectsBuilt: 89,
    hackathonsWon: 12,
    totalParticipants: 3200
  }
};

const projects = [
  {
    title: "AI Campus Navigator",
    description: "AR-based navigation system for campus buildings with AI voice assistance",
    tech: ["React Native", "TensorFlow", "Node.js"],
    stars: 128,
    forks: 34,
    image: "gradient1",
    team: ["Rahul", "Priya", "Arjun"]
  },
  {
    title: "Blockchain Voting",
    description: "Decentralized voting system for college elections with zero-knowledge proofs",
    tech: ["Solidity", "Next.js", "Hardhat"],
    stars: 89,
    forks: 21,
    image: "gradient2",
    team: ["Vikram", "Sneha"]
  },
  {
    title: "Smart Library System",
    description: "IoT-enabled library management with auto-checkout and recommendation engine",
    tech: ["Python", "Raspberry Pi", "FastAPI"],
    stars: 256,
    forks: 67,
    image: "gradient3",
    team: ["Karan", "Divya", "Nitin", "Anjali"]
  },
  {
    title: "HealthTrack Pro",
    description: "Real-time health monitoring dashboard for campus medical facilities",
    tech: ["Vue.js", "Firebase", "D3.js"],
    stars: 45,
    forks: 12,
    image: "gradient4",
    team: ["Rohan", "Meera"]
  }
];

const pastEvents = [
  {
    title: "CodeJam 2024",
    date: "Jan 2024",
    participants: 1200,
    winner: "Team ByteForce",
    image: "from-blue-600 to-cyan-600",
    category: "Hackathon",
    prize: "₹2,00,000"
  },
  {
    title: "AI Workshop Series",
    date: "Dec 2023",
    participants: 450,
    winner: null,
    image: "from-purple-600 to-pink-600",
    category: "Workshop",
    prize: null
  },
  {
    title: "Inter-College Tech Fest",
    date: "Nov 2023",
    participants: 3000,
    winner: "IIT Delhi Chapter",
    image: "from-orange-600 to-red-600",
    category: "Competition",
    prize: "Trophy + Credits"
  },
  {
    title: "Winter of Code",
    date: "Oct 2023",
    participants: 800,
    winner: "Multiple Projects",
    image: "from-green-600 to-teal-600",
    category: "Open Source",
    prize: "Swags + Internships"
  },
  {
    title: "Web3 Summit",
    date: "Sep 2023",
    participants: 600,
    winner: null,
    image: "from-indigo-600 to-blue-600",
    category: "Summit",
    prize: null
  }
];

const topMembers = [
  {
    name: "Arjun Sharma",
    role: "Chapter Lead",
    contributions: 156,
    avatar: "AS",
    color: "from-blue-500 to-blue-600",
    badges: ["Founder", "Top Contributor"]
  },
  {
    name: "Priya Patel",
    role: "Tech Lead",
    contributions: 142,
    avatar: "PP",
    color: "from-purple-500 to-pink-500",
    badges: ["AI Expert", "Mentor"]
  },
  {
    name: "Rahul Kumar",
    role: "Event Coordinator",
    contributions: 128,
    avatar: "RK",
    color: "from-orange-500 to-red-500",
    badges: ["Orator", "Organizer"]
  },
  {
    name: "Sneha Gupta",
    role: "DevOps Lead",
    contributions: 115,
    avatar: "SG",
    color: "from-green-500 to-teal-500",
    badges: ["Cloud Expert"]
  }
];

export default function ChapterProfile({ params }) {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);

  const nextEvent = () => setActiveEventIndex((prev) => (prev + 1) % pastEvents.length);
  const prevEvent = () => setActiveEventIndex((prev) => (prev - 1 + pastEvents.length) % pastEvents.length);
  
  const nextMember = () => setActiveMemberIndex((prev) => (prev + 1) % topMembers.length);
  const prevMember = () => setActiveMemberIndex((prev) => (prev - 1 + topMembers.length) % topMembers.length);

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Cover Image with Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${chapterData.coverGradient}`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 pb-12 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
            {/* College Avatar */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-3xl bg-[#0f0f0f] flex items-center justify-center text-4xl md:text-5xl font-bold text-white">
                  {chapterData.avatar}
                </div>
              </div>
              {chapterData.verified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 border-4 border-black">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            
            {/* College Info */}
            <div className="flex-1 mb-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-6xl font-bold text-white">{chapterData.name}</h1>
                {chapterData.verified && (
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1 text-sm font-medium">
                    Verified Chapter
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-gray-300">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {chapterData.location}
                </span>
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {chapterData.members} members
                </span>
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                <span className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  Rank #{chapterData.rank}
                </span>
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                <span>Est. {chapterData.established}</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex gap-3 mb-4">
              <Button 
                variant="outline" 
                className="h-12 px-6 border-white/20 text-white hover:bg-white/10 rounded-xl bg-black/30 backdrop-blur-md"
              >
                Contact Lead
              </Button>
              <Button 
                onClick={() => setIsJoinOpen(true)}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/25"
              >
                Join Chapter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Badges */}
      <section className="px-4 py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {chapterData.badges.map((badge, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
                <span className="text-sm text-gray-300 font-medium">{badge.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">Hiring Now</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Events Hosted", value: chapterData.stats.eventsHosted, icon: Calendar },
            { label: "Projects Built", value: chapterData.stats.projectsBuilt, icon: GitBranch },
            { label: "Hackathons Won", value: chapterData.stats.hackathonsWon, icon: Trophy },
            { label: "Total Participants", value: chapterData.stats.totalParticipants.toLocaleString(), icon: Users }
          ].map((stat, idx) => (
            <div key={idx} className="rounded-2xl bg-[#0f0f0f] border border-white/10 p-6 hover:border-white/20 transition-colors">
              <stat.icon className="w-6 h-6 text-blue-500 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Current Projects Grid */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Current Projects</h2>
              <p className="text-gray-400">Active repositories and ongoing builds</p>
            </div>
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300 group">
              View all projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div 
                key={idx}
                className="group relative rounded-3xl bg-[#0f0f0f] border border-white/10 hover:border-blue-500/30 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex gap-6">
                  {/* Project Image/Gradient */}
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${project.image} flex-shrink-0 flex items-center justify-center`}>
                    <GitBranch className="w-8 h-8 text-white/80" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-white/5 text-gray-300 border-0">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitBranch className="w-4 h-4" />
                          {project.forks}
                        </span>
                      </div>
                      
                      {/* Team Avatars */}
                      <div className="flex -space-x-2">
                        {project.team.map((member, i) => (
                          <div 
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-[#0f0f0f] flex items-center justify-center text-xs text-white font-medium"
                            title={member}
                          >
                            {member[0]}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Timeline */}
      <section className="px-4 py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Past Events</h2>
              <p className="text-gray-400">Legacy of successful gatherings and competitions</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={prevEvent}
                className="border-white/10 hover:bg-white/10 text-white rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={nextEvent}
                className="border-white/10 hover:bg-white/10 text-white rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeEventIndex * (350 + 24)}px)` }}
            >
              {pastEvents.map((event, idx) => (
                <div 
                  key={idx}
                  className="flex-shrink-0 w-[350px] group"
                >
                  <div className="relative h-48 rounded-3xl bg-gradient-to-br overflow-hidden mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.image}`} />
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/50 text-white border-0 backdrop-blur-md">
                        {event.category}
                      </Badge>
                    </div>
                    
                    {/* Date */}
                    <div className="absolute bottom-4 left-4 text-white/90 text-sm font-medium">
                      {event.date}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.participants} participants
                    </span>
                  </div>
                  
                  {event.winner && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                      <Medal className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-300">Winner: <span className="text-white font-medium">{event.winner}</span></span>
                    </div>
                  )}
                  
                  {event.prize && (
                    <div className="text-sm text-blue-400 font-medium mt-2">
                      Prize: {event.prize}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {pastEvents.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveEventIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === activeEventIndex ? "w-8 bg-blue-500" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Member Spotlight */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Member Spotlight</h2>
              <p className="text-gray-400">Top contributors driving innovation</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={prevMember}
                className="border-white/10 hover:bg-white/10 text-white rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={nextMember}
                className="border-white/10 hover:bg-white/10 text-white rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="relative h-[400px] flex items-center justify-center">
            {topMembers.map((member, idx) => {
              const offset = idx - activeMemberIndex;
              const isActive = idx === activeMemberIndex;
              
              return (
                <div
                  key={idx}
                  onClick={() => setActiveMemberIndex(idx)}
                  className={`absolute w-[300px] transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? "scale-100 z-20 opacity-100" 
                      : offset === -1 || offset === topMembers.length - 1
                        ? "-translate-x-[320px] scale-90 z-10 opacity-50"
                        : offset === 1 || offset === -(topMembers.length - 1)
                          ? "translate-x-[320px] scale-90 z-10 opacity-50"
                          : "opacity-0 scale-75"
                  }`}
                >
                  <div className={`rounded-3xl bg-[#0f0f0f] border ${isActive ? 'border-blue-500/30' : 'border-white/10'} p-8 text-center`}>
                    <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${member.color} p-1 mb-4`}>
                      <div className="w-full h-full rounded-full bg-[#0f0f0f] flex items-center justify-center text-2xl font-bold text-white">
                        {member.avatar}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-400 mb-4">{member.role}</p>
                    
                    <div className="flex justify-center gap-2 mb-6">
                      {member.badges.map((badge, i) => (
                        <Badge key={i} className="bg-white/5 text-gray-300 border-white/10">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="pt-6 border-t border-white/10">
                      <div className="text-3xl font-bold text-white mb-1">{member.contributions}</div>
                      <div className="text-sm text-gray-500">Contributions</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {topMembers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMemberIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === activeMemberIndex ? "w-8 bg-blue-500" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="px-4 py-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to join {chapterData.name}?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Become part of the most active tech community on campus. Build projects, win hackathons, and grow your network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setIsJoinOpen(true)}
              className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg shadow-lg shadow-blue-500/25"
            >
              Apply for Membership
            </Button>
            <Button 
              variant="outline"
              className="h-14 px-8 border-white/20 text-white hover:bg-white/10 rounded-xl text-lg"
            >
              View Requirements
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Free Registration
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Instant Approval
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Lifetime Access
            </span>
          </div>
        </div>
      </section>

      <Footer />

      {/* Join Modal */}
      <Dialog open={isJoinOpen} onOpenChange={setIsJoinOpen}>
        <DialogContent className="bg-[#0f0f0f] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Join {chapterData.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill out the application below. Our team will review and get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          
          <form className="space-y-6 mt-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Full Name</label>
              <Input 
                placeholder="John Doe" 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-300">College Email</label>
              <Input 
                type="email"
                placeholder="john@iitd.ac.in" 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Enrollment Number</label>
              <Input 
                placeholder="2023CS101" 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Why do you want to join?</label>
              <Textarea 
                placeholder="Tell us about your interests and what you hope to achieve..." 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500 min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setIsJoinOpen(false)}
                className="flex-1 border-white/10 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}