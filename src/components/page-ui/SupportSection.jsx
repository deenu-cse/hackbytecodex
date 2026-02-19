"use client";

export default function SupportSection() {
    return (
        <section className="relative bg-black px-4 pb-24">
            <div className="max-w-7xl mx-auto">
                <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-8 md:p-12 relative overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Core support access
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Get timely help from our support team during business hours via email.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="bg-[#1a1a1a] rounded-2xl border border-blue-500/30 p-6 shadow-2xl">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0" />
                                        <div className="bg-[#252525] rounded-2xl rounded-tl-none py-3 px-4">
                                            <p className="text-gray-300">
                                                Hello I&apos;m Deenu, <br />
                                                how can I help you today?
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-1 opacity-50">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                                </div>
                            </div>

                            <div className="absolute -inset-4 bg-blue-500/5 rounded-full blur-3xl -z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}