"use client";

import FeatureGrid from './FeatureGrid'

export default function Features() {
  return (
    <section className="relative bg-black py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
      
      <div className="absolute top-1 left-1/2 -translate-x-1/2">
        <div className="relative">
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-blue-500 to-transparent mx-auto" />
          
          <div className="absolute top-32 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
            <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full blur-lg animate-pulse" />
          </div>
          
          <div className="absolute top-32 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-8">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
          Empowering student developers <br />
          with the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            most powerful
          </span>{" "}
          collaborative platform
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed mb-20">
          HackByteCodex does the heavy lifting for you, so you can focus on innovation 
          instead of coordination. Connect central teams, college chapters, and individual 
          students in one seamless ecosystem.
        </p>

        <div>
          <FeatureGrid/>
        </div>
      </div>
    </section>
  );
}