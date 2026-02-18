"use client";

export default function FeatureGrid() {
    return (
        <section className="relative bg-black px-0 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="group relative h-[330px] rounded-3xl bg-[#0f0f0f] border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500">
                        <div className="p-8 relative z-10">
                            <h3 className="text-xl font-semibold text-white">Multi-College Network</h3>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center translate-y-8">
                            <svg width="300" height="200" viewBox="0 0 300 200" className="opacity-90">
                                <defs>
                                    <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#1e40af" />
                                        <stop offset="50%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#1e40af" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <path
                                    d="M 80 100 C 80 50 130 50 150 100 C 170 150 220 150 220 100 C 220 50 170 50 150 100 C 130 150 80 150 80 100"
                                    fill="none"
                                    stroke="url(#infinityGrad)"
                                    strokeWidth="40"
                                    strokeLinecap="round"
                                    filter="url(#glow)"
                                    className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                />
                                <path
                                    d="M 80 100 C 80 50 130 50 150 100 C 170 150 220 150 220 100 C 220 50 170 50 150 100 C 130 150 80 150 80 100"
                                    fill="none"
                                    stroke="url(#infinityGrad)"
                                    strokeWidth="40"
                                    strokeLinecap="round"
                                    opacity="0.3"
                                />
                            </svg>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                    </div>

                    <div className="group relative h-[330px] rounded-3xl bg-[#0f0f0f] border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500">
                        <div className="p-8 relative z-10">
                            <h3 className="text-xl font-semibold text-white">Centralized Management</h3>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg width="300" height="300" viewBox="0 0 300 300" className="opacity-90">
                                <defs>
                                    <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="transparent" />
                                        <stop offset="50%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#60a5fa" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M 50 200 Q 150 50 280 120"
                                    fill="none"
                                    stroke="url(#orbitGrad)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                />
                                <circle cx="50" cy="200" r="8" fill="white" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                            </svg>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                    </div>

                    <div className="group relative h-[330px] rounded-3xl bg-[#0f0f0f] border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500">
                        <div className="p-8 relative z-10">
                            <h3 className="text-xl font-semibold text-white">Role-Based Access</h3>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center translate-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150" />
                                <svg width="140" height="180" viewBox="0 0 140 180" className="relative z-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                    <defs>
                                        <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#374151" />
                                            <stop offset="50%" stopColor="#1f2937" />
                                            <stop offset="100%" stopColor="#111827" />
                                        </linearGradient>
                                        <linearGradient id="keyholeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#60a5fa" />
                                            <stop offset="100%" stopColor="#3b82f6" />
                                        </linearGradient>
                                    </defs>
                                    <rect x="20" y="70" width="100" height="90" rx="20" fill="url(#lockGrad)" stroke="#374151" strokeWidth="2" />
                                    <path d="M 40 70 L 40 45 C 40 25 55 15 70 15 C 85 15 100 25 100 45 L 100 70"
                                        fill="none"
                                        stroke="#4b5563"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                    />
                                    <circle cx="70" cy="105" r="12" fill="url(#keyholeGrad)" className="drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                    <path d="M 70 115 L 70 135" stroke="url(#keyholeGrad)" strokeWidth="8" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="group relative h-[330px] rounded-3xl bg-[#0f0f0f] border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500">
                        <div className="p-8 relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-16 h-16">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="32" cy="32" r="28" stroke="#1e293b" strokeWidth="6" fill="none" />
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r="28"
                                            stroke="url(#scoreGrad)"
                                            strokeWidth="6"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray="175"
                                            strokeDashoffset="0"
                                            className="drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                                        />
                                        <defs>
                                            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#3b82f6" />
                                                <stop offset="100%" stopColor="#60a5fa" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">100</span>
                                </div>
                            </div>
                            <p className="text-white font-medium leading-tight">
                                Performance tracking so your chapters rank from day one.
                            </p>
                        </div>

                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                    </div>

                    <div className="group relative h-[330px] rounded-3xl bg-[#0f0f0f] border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-500 md:col-span-2">
                        <div className="p-8 relative z-10">
                            <h3 className="text-xl font-semibold text-white mb-2">Event Publishing</h3>
                            <p className="text-gray-400 text-sm">Deploy hackathons with analytics & custom branding</p>
                        </div>

                        <div className="absolute right-10 top-1/2 -translate-y-1/2 translate-x-4">
                            <div className="relative transform perspective-1000 rotate-x-12 -rotate-y-12 hover:rotate-x-0 hover:rotate-y-0 transition-transform duration-500">
                                <div className="w-48 h-32 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center justify-center border border-blue-300/30">
                                    <span className="text-3xl font-bold text-white/90 tracking-tight">Publish</span>
                                </div>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                            </div>
                        </div>

                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                                backgroundSize: '40px 40px'
                            }} />
                        </div>
                    </div>

                </div>

                <div className="mt-16 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-blue-500/50 to-transparent" />

                    <div className="pt-24 text-center">
                        <h3 className="text-3xl md:text-4xl font-semibold text-white max-w-4xl mx-auto leading-tight">
                            HackByteCodex gives you everything you need inside one familiar interface,{" "}
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">no extra accounts, no steep learning curve.</span>
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}