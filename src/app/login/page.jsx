"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowRight,
    Sparkles,
    CheckCircle2,
    XCircle,
    Loader2,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Zap,
    Globe,
    Shield,
    Rocket,
    ChevronRight,
    Github,
    Chrome
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const quotes = [
    { text: "Code. Create. Conquer.", author: "HackByteCodex" },
    { text: "The best way to predict the future is to build it.", author: "Peter Drucker" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Your college tech journey continues here.", author: "HB Community" },
    { text: "Join 50,000+ builders shaping tomorrow.", author: "HB Network" }
];

export default function LoginPage() {
    const router = useRouter();
    const [currentQuote, setCurrentQuote] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Invalid credentials");
            }

            localStorage.setItem("codexToken", data.token);

            if (formData.rememberMe) {
                localStorage.setItem("codexRemember", "true");
            }

            setLoginSuccess(true);

            setTimeout(() => {
                router.push("/");
            }, 1500);

        } catch (err) {
            setErrors({ submit: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        window.location.href = `${API_URL}/auth/${provider}`;
    };

    if (loginSuccess) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-md relative z-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                    >
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
                    <p className="text-gray-400 mb-6">Redirecting to your dashboard...</p>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                        />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/5 rounded-full blur-[150px]" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-32 left-20 opacity-10"
                >
                    <Rocket className="w-24 h-24 text-blue-400" />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -10, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-32 right-20 opacity-10"
                >
                    <Shield className="w-20 h-20 text-purple-400" />
                </motion.div>

                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/3 right-1/4 opacity-5"
                >
                    <Globe className="w-32 h-32 text-cyan-400" />
                </motion.div>
            </div>

            <div className="relative z-10 min-h-screen flex">
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-black" />

                    <div className="relative z-10 flex flex-col justify-between p-16 h-full">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <span className="text-2xl font-bold text-white italic tracking-tighter cursor-pointer group-hover:text-blue-400 transition-colors">
                                hackbyte<span className="text-blue-500">codex</span>
                            </span>
                        </Link>

                        <div className="space-y-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuote}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-4"
                                >
                                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                                    <blockquote className="text-4xl font-bold leading-tight">
                                        "{quotes[currentQuote].text}"
                                    </blockquote>
                                    <cite className="text-lg text-gray-400 not-italic">
                                        — {quotes[currentQuote].author}
                                    </cite>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex gap-2">
                                {quotes.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentQuote(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentQuote ? "w-8 bg-blue-500" : "bg-white/20 hover:bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-white">50K+</p>
                                <p className="text-sm text-gray-400">Active Members</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-white">200+</p>
                                <p className="text-sm text-gray-400">Partner Colleges</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-white">150+</p>
                                <p className="text-sm text-gray-400">Events Hosted</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent" />
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-md space-y-8"
                    >
                        <div className="lg:hidden text-center mb-8">
                            <Link href="/" className="inline-flex items-center gap-2 justify-center">
                                <span className="text-2xl font-bold text-white italic tracking-tighter cursor-pointer group-hover:text-blue-400 transition-colors">
                                    hackbyte<span className="text-blue-500">codex</span>
                                </span>
                            </Link>
                        </div>

                        <div className="text-center lg:text-left space-y-2">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl lg:text-4xl font-bold"
                            >
                                Welcome Back,{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                    Builder
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-400"
                            >
                                Sign in to continue your tech journey
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <button
                                type="button"
                                onClick={() => handleSocialLogin("google")}
                                className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer"
                            >
                                <Chrome className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium">Google</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin("github")}
                                className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer"
                            >
                                <Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium">GitHub</span>
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-black px-2 text-gray-500">Or continue with</span>
                            </div>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Input
                                        type="email"
                                        placeholder="you@college.ac.in"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if (errors.email) setErrors({ ...errors, email: "" });
                                        }}
                                        className={`h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all ${errors.email ? "border-red-500/50" : "group-hover:border-white/20"
                                            }`}
                                    />
                                    {formData.email && !errors.email && (
                                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                    )}
                                </div>
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-xs text-red-400 flex items-center gap-1"
                                    >
                                        <XCircle className="w-3 h-3" /> {errors.email}
                                    </motion.p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-gray-500" />
                                        Password
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) => {
                                            setFormData({ ...formData, password: e.target.value });
                                            if (errors.password) setErrors({ ...errors, password: "" });
                                        }}
                                        className={`h-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all ${errors.password ? "border-red-500/50" : "group-hover:border-white/20"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-xs text-red-400 flex items-center gap-1"
                                    >
                                        <XCircle className="w-3 h-3" /> {errors.password}
                                    </motion.p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${formData.rememberMe
                                        ? "bg-blue-500 border-blue-500"
                                        : "border-white/20 group-hover:border-white/40"
                                        }`}>
                                        {formData.rememberMe && <CheckCircle2 className="w-3 h-3 text-white" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={formData.rememberMe}
                                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                        className="hidden"
                                    />
                                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                                </label>
                            </div>

                            {errors.submit && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                                        <XCircle className="w-4 h-4" />
                                    </div>
                                    <p>{errors.submit}</p>
                                </motion.div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all group relative overflow-hidden disabled:opacity-70 cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </motion.form>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-center text-gray-500"
                        >
                            Don't have an account?{" "}
                            <Link
                                href="/register"
                                className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 group"
                            >
                                Create one now
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-center justify-center gap-2 text-xs text-gray-600"
                        >
                            <Shield className="w-4 h-4" />
                            <span>Secured with 256-bit encryption</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}