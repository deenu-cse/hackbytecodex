"use client";

import { Check, ChevronDown, Figma, Github, GitBranch, Triangle } from "lucide-react";

export default function CollabFeatureGrid() {
    return (
        <section className="relative bg-black px-4 pb-3">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-8 h-[400px] relative overflow-hidden group hover:border-white/20 transition-colors">
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Shared workspaces or projects
                    </h3>
                    <p className="text-gray-400 mb-8">
                        Drive alignment and productivity with secure, shared environments for cross-functional work.
                    </p>

                    <div className="absolute bottom-8 left-8 right-8">
                        <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 shadow-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`w-10 h-10 rounded-full border-2 border-[#1a1a1a] ${i === 1 ? "bg-blue-500" :
                                                    i === 2 ? "bg-purple-500" :
                                                        i === 3 ? "bg-pink-500" :
                                                            "bg-yellow-500"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                                    <div className="w-6 h-6 text-gray-500">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#1a1a1a] rounded-2xl -z-10 opacity-50" />
                    </div>
                </div>

                <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-8 h-[400px] relative overflow-hidden hover:border-white/20 transition-colors">
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Role-based permissions
                    </h3>
                    <p className="text-gray-400 mb-8">
                        From shared access to real-time edits, our core collaboration tools help your team stay in sync to iterate and ship faster.
                    </p>

                    <div className="space-y-4">
                        {[
                            { label: "Private", desc: "Only owner can access", checked: false, muted: true },
                            { label: "Secret", desc: "Accessible via shared URL", checked: true, muted: false },
                            { label: "Public", desc: "Everyone can view", checked: true, muted: false },
                        ].map((item, idx) => (
                            <div key={idx} className={`flex items-start gap-4 ${item.muted ? 'opacity-40' : ''}`}>
                                <div className={`w-6 h-6 rounded flex items-center justify-center mt-0.5 ${item.checked ? "bg-blue-500" : "bg-blue-500/20"
                                    }`}>
                                    {item.checked && <Check className="w-4 h-4 text-white" />}
                                </div>
                                <div>
                                    <span className="text-white font-medium block">
                                        {idx + 1}. {item.label}
                                    </span>
                                    <span className="text-gray-500 text-sm">{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-8 h-[300px] relative overflow-hidden hover:border-white/20 transition-colors">
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Streamlined integrations
                    </h3>
                    <p className="text-gray-400 mb-8">
                        We&apos;ve integrated with the tools you already use to streamline your workflow.
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-white/5 hover:scale-110 transition-transform">
                            <Figma className="w-6 h-6 text-orange-400" />
                        </div>
                        <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-white/5 hover:scale-110 transition-transform">
                            <Github className="w-6 h-6 text-white" />
                        </div>
                        <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-white/5 hover:scale-110 transition-transform">
                            <GitBranch className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-white/5 hover:scale-110 transition-transform">
                            <Triangle className="w-6 h-6 text-green-400 fill-green-400" />
                        </div>
                    </div>

                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 right-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl" />
                </div>

                <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-8 h-[300px] relative overflow-hidden hover:border-white/20 transition-colors">
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Team-level admin controls
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Control who can view, edit, or manage projects with simple role permissions.
                    </p>

                    <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
                                M
                            </div>
                            <div>
                                <div className="text-white font-medium">Michael Scott</div>
                                <div className="text-gray-500 text-sm">email@example.com</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
                            <span className="text-sm">Admin (you)</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}