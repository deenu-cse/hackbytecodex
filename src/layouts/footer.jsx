"use client";

import { Disc, Linkedin, Youtube, Twitter, Instagram } from "lucide-react";


export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <span className="text-3xl font-bold text-white italic tracking-tighter">
              hackbyte<span className="text-blue-500">codex</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building the largest student tech network across colleges. 
              Innovate, collaborate, and grow together.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {['Pricing', 'Support', 'Blog', 'Status'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                    {item}
                    <svg 
                      className="w-3 h-3 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {['Careers', 'Privacy', 'Terms', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Social</h4>
            <ul className="space-y-3">
              {[
                { name: 'Discord', icon: <Disc className="w-4 h-4" /> },
                { name: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
                { name: 'YouTube', icon: <Youtube className="w-4 h-4" /> },
                { name: 'Twitter/X', icon: <Twitter className="w-4 h-4" /> },
                { name: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
                { name: 'GitHub', icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                ) }
              ].map((social) => (
                <li key={social.name}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    {social.icon}
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>© {currentYear} HackByteCodex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}