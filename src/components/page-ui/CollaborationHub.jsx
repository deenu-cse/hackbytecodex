
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CollaborationHub() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const avatars = [
    { color: "bg-pink-400", delay: "0s", top: "10%", left: "50%" },
    { color: "bg-yellow-400", delay: "0.5s", top: "30%", right: "10%" },
    { color: "bg-blue-400", delay: "1s", bottom: "30%", right: "10%" },
    { color: "bg-purple-400", delay: "1.5s", bottom: "10%", left: "50%" },
    { color: "bg-green-400", delay: "2s", bottom: "30%", left: "10%" },
    { color: "bg-red-400", delay: "2.5s", top: "30%", left: "10%" },
  ];

  return (
    <section className="relative bg-black py-3 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We&apos;ve thought of everything so you don&apos;t have to. Focus on your vision while we handle the rest.
          </p>
        </div>

        <div className="relative rounded-3xl bg-[#0f0f0f] border border-white/10 p-2 md:p-8 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Cutting edge collaboration tools
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                From shared access to real-time edits, our core collaboration tools help your team stay in sync to iterate and ship faster.
              </p>
            </div>

            <div className="relative h-[400px] flex items-center justify-center">
              <div className="absolute w-64 h-64 border border-white/10 rounded-full" />
              <div className="absolute w-48 h-48 border border-white/10 rounded-full" />
              <div className="absolute w-32 h-32 border border-white/10 rounded-full" />

              <Button 
                className="relative z-20 bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-xl text-lg font-medium shadow-lg shadow-blue-500/25"
                style={{
                  transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                Invite teammates
              </Button>

              {avatars.map((avatar, idx) => (
                <div
                  key={idx}
                  className={`absolute w-12 h-12 rounded-full ${avatar.color} border-2 border-[#0f0f0f] shadow-xl`}
                  style={{
                    ...avatar,
                    animation: `orbit 20s linear infinite`,
                    animationDelay: avatar.delay,
                  }}
                />
              ))}

              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <circle
                  cx="50%"
                  cy="50%"
                  r="120"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(140px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(140px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}