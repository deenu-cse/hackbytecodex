"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Sparkles,
    Users,
    Trophy,
    Calendar,
    Zap,
    GraduationCap,
    Target,
    Star,
    ChevronRight,
    CheckCircle2,
    Rocket,
    Globe,
    Award,
    TrendingUp,
    MessageCircle,
    Heart,
    Shield
} from "lucide-react";

const features = [
    {
        title: "Discover Events",
        description: "Find hackathons, workshops, and competitions happening across 200+ colleges. Filter by type, mode, or your interests.",
        icon: Calendar,
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Build Your Profile",
        description: "Track your participation, earn reward points, climb tiers from Bronze to Platinum, and unlock exclusive opportunities.",
        icon: Trophy,
        color: "from-yellow-500 to-orange-500"
    },
    {
        title: "Connect & Collaborate",
        description: "Meet like-minded students, form teams for hackathons, and build your network across the national tech community.",
        icon: Users,
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "Get Recognized",
        description: "Win badges, get featured on leaderboards, earn certificates, and receive LinkedIn shoutouts for your achievements.",
        icon: Award,
        color: "from-green-500 to-emerald-500"
    }
];

const howItWorks = [
    {
        step: "01",
        title: "Find Your College",
        description: "Search for your college in our database of 200+ institutions. Can't find it? Request to add it in 24 hours."
    },
    {
        step: "02",
        title: "Register & Verify",
        description: "Sign up with your college email. Get verified as a student and unlock full platform access."
    },
    {
        step: "03",
        title: "Join Events",
        description: "Browse events, register for competitions, submit your projects, and get judged by industry experts."
    },
    {
        step: "04",
        title: "Earn & Grow",
        description: "Collect reward points, climb tiers, earn badges, and unlock internship opportunities and exclusive perks."
    }
];

const stats = [
    { value: "50K+", label: "Active Students" },
    { value: "200+", label: "Partner Colleges" },
    { value: "150+", label: "Events Hosted" },
    { value: "₹10L+", label: "Prizes Awarded" }
];

const testimonials = [
    {
        quote: "HackByteCodex helped me find my dream team for the national hackathon. We won 2nd place!",
        author: "Priya Sharma",
        role: "Computer Science, IIT Delhi",
        tier: "GOLD"
    },
    {
        quote: "From Bronze to Platinum in 6 months. The platform pushed me to participate in events I never knew existed.",
        author: "Rahul Verma",
        role: "Electronics, BITS Pilani",
        tier: "PLATINUM"
    },
    {
        quote: "As a College Lead, managing 15+ clubs and 50+ events per year became seamless with this platform.",
        author: "Ananya Gupta",
        role: "College Lead, VIT Vellore",
        tier: "CORE_TEAM"
    }
];

export default function LandingPage() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f0e8] text-[#2d2a26] overflow-x-hidden">

            <section className="relative pt-14 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d2a26' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-8"
                    >

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl mx-auto">
                            Build. Compete.{" "}
                            <span className="relative">
                                <span className="relative z-10 text-[#4a9b8e]">Connect.</span>
                                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#4a9b8e]/30" viewBox="0 0 200 9" fill="none">
                                    <path d="M2.00025 6.99997C25.7509 9.37499 94.9017 8.50003 198.001 2.00003" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-xl text-[#2d2a26]/70 max-w-2xl mx-auto leading-relaxed">
                            The unified platform where 50,000+ students from 200+ colleges discover events,
                            form teams, compete in hackathons, and build their tech careers.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/register">
                                <Button className="h-14 px-8 text-lg bg-[#4a9b8e] hover:bg-[#3d7a70] text-white rounded-full shadow-lg shadow-[#4a9b8e]/25 group cursor-pointer">
                                    Join the Network
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="#how-it-works">
                                <Button variant="outline" className="h-14 px-8 text-lg border-[#2d2a26]/20 text-[#2d2a26] hover:bg-[#2d2a26]/5 rounded-full cursor-pointer">
                                    How It Works
                                </Button>
                            </Link>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-3xl mx-auto"
                        >
                            {stats.map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <p className="text-3xl font-bold text-[#2d2a26]">{stat.value}</p>
                                    <p className="text-sm text-[#2d2a26]/60">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#4a9b8e]/10 blur-xl" />
                <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-[#d4a574]/20 blur-xl" />
            </section>

            {/* What is HackByteCodex */}
            <section id="about" className="py-20 px-6 bg-[#ebe5db]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl font-bold">What is HackByteCodex?</h2>
                            <p className="text-lg text-[#2d2a26]/70 leading-relaxed">
                                HackByteCodex is India's premier student technology platform that connects
                                college students across the country through hackathons, workshops, seminars,
                                and competitions.
                            </p>
                            <p className="text-lg text-[#2d2a26]/70 leading-relaxed">
                                Whether you're a beginner looking to learn or a pro ready to compete,
                                we provide the infrastructure for colleges to host events and for students
                                to discover, register, and participate seamlessly.
                            </p>

                            <div className="space-y-4 pt-4">
                                {[
                                    "Event discovery across 200+ partner colleges",
                                    "Team formation and collaboration tools",
                                    "Automated judging and leaderboard systems",
                                    "Reward points, badges, and tier progression",
                                    "Certificates and LinkedIn integrations"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#4a9b8e]" />
                                        <span className="text-[#2d2a26]/80">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="bg-[#f5f0e8] rounded-3xl p-8 shadow-xl border border-[#2d2a26]/10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                            <Calendar className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Hackathon: CodeFest 2024</p>
                                            <p className="text-sm text-[#2d2a26]/60">IIT Delhi • 2 days left</p>
                                        </div>
                                        <Button size="sm" className="ml-auto bg-[#4a9b8e]">Register</Button>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                            <Trophy className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">You earned GOLD tier!</p>
                                            <p className="text-sm text-[#2d2a26]/60">1,250 reward points</p>
                                        </div>
                                        <Award className="w-8 h-8 text-yellow-500 ml-auto" />
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Team "ByteBuilders"</p>
                                            <p className="text-sm text-[#2d2a26]/60">3 members • Looking for 1 more</p>
                                        </div>
                                        <Button size="sm" variant="outline" className="ml-auto">Join</Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 px-6">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold">Everything You Need</h2>
                        <p className="text-lg text-[#2d2a26]/70 max-w-2xl mx-auto">
                            From event discovery to career growth, we've built tools that empower
                            students and simplify college event management.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl bg-[#ebe5db] hover:bg-[#e0d9cd] transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-[#2d2a26]/70 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-6 bg-[#2d2a26] text-[#f5f0e8]">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold">How It Works</h2>
                        <p className="text-lg text-[#f5f0e8]/70 max-w-2xl mx-auto">
                            Getting started is easy. Four simple steps to unlock the full
                            potential of India's student tech network.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {howItWorks.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative"
                            >
                                <div className="text-6xl font-bold text-[#4a9b8e]/20 mb-4">{step.step}</div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-[#f5f0e8]/70 text-sm leading-relaxed">{step.description}</p>

                                {idx < howItWorks.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#4a9b8e]/20">
                                        <ChevronRight className="absolute right-0 -top-2 w-4 h-4 text-[#4a9b8e]/40" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 p-8 rounded-3xl bg-[#4a9b8e]/10 border border-[#4a9b8e]/20 text-center"
                    >
                        <GraduationCap className="w-12 h-12 text-[#4a9b8e] mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Can't Find Your College?</h3>
                        <p className="text-[#f5f0e8]/70 max-w-xl mx-auto mb-6">
                            We're expanding rapidly! Request to add your college and our team will
                            verify and onboard it within 24 hours. You'll be notified once it's live.
                        </p>
                        <Link href="/request-college">
                            <Button className="bg-[#4a9b8e] hover:bg-[#3d7a70] text-white rounded-full px-8 cursor-pointer">
                                Request College Addition
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#f5f0e8]">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold">Climb the Tiers</h2>
                        <p className="text-lg text-[#2d2a26]/70 max-w-2xl mx-auto">
                            Earn reward points by participating in events, hosting hackathons,
                            and contributing to the community. Unlock exclusive perks at each tier.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { name: "BRONZE", range: "0-40 pts", perks: ["Certificate of Participation", "Community Badge"], color: "from-orange-400 to-orange-600" },
                            { name: "SILVER", range: "41-70 pts", perks: ["HackByteCodex Swag", "Priority Event Access", "LinkedIn Shoutout"], color: "from-gray-400 to-gray-600" },
                            { name: "GOLD", range: "71-85 pts", perks: ["Internship Eligibility", "Letter of Recommendation", "Paid Workshop Access"], color: "from-yellow-400 to-yellow-600" },
                            { name: "PLATINUM", range: "86-100 pts", perks: ["National Leadership Role", "Stipend / Revenue Share", "CSR Project Ownership"], color: "from-cyan-400 to-blue-600" }
                        ].map((tier, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 rounded-3xl bg-white border border-[#2d2a26]/10 hover:shadow-xl transition-all"
                            >
                                <div className={`w-full h-2 rounded-full bg-gradient-to-r ${tier.color} mb-6`} />
                                <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                                <p className="text-sm text-[#2d2a26]/60 mb-4">{tier.range}</p>
                                <ul className="space-y-2">
                                    {tier.perks.map((perk, pidx) => (
                                        <li key={pidx} className="flex items-start gap-2 text-sm text-[#2d2a26]/80">
                                            <Star className="w-4 h-4 text-[#4a9b8e] mt-0.5 shrink-0" />
                                            {perk}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-[#ebe5db]">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl font-bold">Student Stories</h2>

                    <div className="relative h-64">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute inset-0 flex flex-col items-center justify-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4a9b8e] to-[#3d7a70] flex items-center justify-center mb-6">
                                    <MessageCircle className="w-8 h-8 text-white" />
                                </div>
                                <blockquote className="text-2xl font-medium text-[#2d2a26] mb-6 max-w-2xl">
                                    "{testimonials[currentTestimonial].quote}"
                                </blockquote>
                                <div>
                                    <p className="font-semibold text-[#2d2a26]">{testimonials[currentTestimonial].author}</p>
                                    <p className="text-sm text-[#2d2a26]/60">{testimonials[currentTestimonial].role}</p>
                                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#4a9b8e]/10 text-[#4a9b8e] text-xs font-medium">
                                        {testimonials[currentTestimonial].tier} MEMBER
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-2">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentTestimonial(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentTestimonial ? "w-8 bg-[#4a9b8e]" : "bg-[#2d2a26]/20"}`}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20 px-6 bg-[#2d2a26] text-[#f5f0e8]">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold">Ready to Start Your Journey?</h2>
                    <p className="text-xl text-[#f5f0e8]/70 max-w-2xl mx-auto">
                        Join 50,000+ students already building their tech careers through
                        HackByteCodex. Your college adventure starts here.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register">
                            <Button className="h-14 px-10 text-lg bg-[#4a9b8e] hover:bg-[#3d7a70] text-white rounded-full shadow-lg shadow-[#4a9b8e]/25 group cursor-pointer">
                                Create Free Account
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" className="h-14 px-10 text-lg border-[#f5f0e8]/20 text-[#949494] hover:bg-[#f5f0e8]/10 rounded-full cursor-pointer">
                                Already a Member? Sign In
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-8 flex items-center justify-center gap-8 text-sm text-[#f5f0e8]/60">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <span>Secure & Verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span>Made for Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            <span>200+ Colleges</span>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-0 px-6 bg-[#1a1816] text-[#f5f0e8]/60">
                <div className="max-w-6xl mx-auto mt-0 pt-1 border-t border-[#f5f0e8]/50 text-center text-sm">
                    © 2024 HackByteCodex. Built with ❤️ for students, by students.
                </div>
            </footer>
        </div>
    );
}