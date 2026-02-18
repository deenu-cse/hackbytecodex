"use client";

import { Button } from "@/components/ui/button";
import { Quote, Star, ArrowRight, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    quote: "HackByteCodex transformed how our college collaborates. We went from isolated projects to winning inter-college hackathons together. The platform is incredible!",
    name: "Arjun Sharma",
    role: "Chapter Lead, IIT Delhi",
    avatar: "AS",
    color: "from-blue-500 to-cyan-400",
    rating: 5
  },
  {
    quote: "The leaderboard system keeps our members motivated. Seeing our chapter rank climb up each week has boosted participation by 300% in just one semester.",
    name: "Priya Patel",
    role: "Core Team Member, BITS Pilani",
    avatar: "PP",
    color: "from-purple-500 to-pink-500",
    rating: 5
  },
  {
    quote: "Finally, a platform that understands student tech communities. Event management, resource sharing, and networking - all in one place. Couldn't ask for more!",
    name: "Rahul Kumar",
    role: "Founding Member, MIT Manipal",
    avatar: "RK",
    color: "from-orange-500 to-red-500",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="relative bg-black py-24 pt-4 px-4 overflow-hidden">
      <div className="absolute top-20 left-10 text-[20rem] text-white/[0.02] font-serif leading-none pointer-events-none select-none">
        "
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Community <span className="italic text-blue-500">Voices</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hear from chapter leads and students who are building the future with HackByteCodex
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((item, idx) => (
            <div 
              key={idx}
              className="group relative rounded-3xl bg-[#0f0f0f] border border-white/10 hover:border-white/20 p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-blue-500/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10">
                "{item.quote}"
              </p>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} p-0.5`}>
                  <div className="w-full h-full rounded-full bg-[#0f0f0f] flex items-center justify-center text-white font-semibold text-sm">
                    {item.avatar}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{item.name}</span>
                    <BadgeCheck className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-sm text-blue-400">{item.role}</p>
                </div>
              </div>

              <div className={`absolute -inset-px rounded-3xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity -z-10`} />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="outline" 
            className="group h-12 px-8 border-white/10 hover:border-blue-500/50 hover:bg-white/5 text-blue-600 rounded-xl cursor-pointer"
          >
            Read More Stories
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            className="group h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          >
            Share Your Story
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/5">
          {[
            { label: "Active Chapters", value: "50+" },
            { label: "Events Hosted", value: "200+" },
            { label: "Student Members", value: "10k+" },
            { label: "Projects Built", value: "1,500+" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}