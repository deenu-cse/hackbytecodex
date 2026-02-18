"use client";

import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative bg-black py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-blue-500/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-xl leading-tight">
            Ready to bring your ideas to <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">life faster?</span>
          </h2>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="h-14 px-8 border-white/20 text-blue-600 hover:bg-white/10 rounded-xl text-lg cursor-pointer"
            >
              Get in touch
            </Button>
            <Button
              className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg shadow-lg shadow-blue-500/25"
            >
              Start your free trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}