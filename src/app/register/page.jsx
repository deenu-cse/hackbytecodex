"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    GraduationCap,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    XCircle,
    Loader2,
    Building2,
    Mail,
    Lock,
    User,
    Phone,
    ChevronDown,
    ChevronUp,
    Send,
    X,
    Eye,
    EyeOff,
    Zap,
    Globe,
    Users,
    Trophy
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const taglines = [
    "Join 50,000+ student innovators",
    "Build your future with the best",
    "Connect. Collaborate. Create.",
    "Your college tech journey starts here",
    "Where code meets community"
];

export default function RegisterPage() {
    const router = useRouter();
    const [currentTagline, setCurrentTagline] = useState(0);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        college: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [colleges, setColleges] = useState([]);
    const [collegeSearch, setCollegeSearch] = useState("");
    const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
    const [collegeLoading, setCollegeLoading] = useState(false);
    const [showCollegeRequest, setShowCollegeRequest] = useState(false);
    const [requestCollegeName, setRequestCollegeName] = useState("");
    const [requestSubmitted, setRequestSubmitted] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTagline((prev) => (prev + 1) % taglines.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowCollegeDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        // whenever the dropdown opens, or the search term changes, we want to
        // show items from the last API response first. only if that local
        // filter returns nothing do we hit the backend again. this keeps us from
        // querying on every keystroke and fulfils the behaviour described by
        // the user.
        if (!showCollegeDropdown) return;

        const fetchColleges = async () => {
            setCollegeLoading(true);
            try {
                const res = await fetch(`${API_URL}/auth/colleges?search=${collegeSearch}&limit=20`);
                if (res.ok) {
                    const data = await res.json();
                    setColleges(data.data || []);
                }
            } catch (err) {
                console.error("Failed to fetch colleges");
            } finally {
                setCollegeLoading(false);
            }
        };

        // if the search box is empty, always grab a fresh batch of colleges
        if (!collegeSearch.trim()) {
            const timeout = setTimeout(fetchColleges, 300);
            return () => clearTimeout(timeout);
        }

        // otherwise try filtering the already‑loaded list first
        const localFiltered = colleges.filter(c =>
            c.name?.toLowerCase().includes(collegeSearch.toLowerCase()) ||
            c.address?.city?.toLowerCase().includes(collegeSearch.toLowerCase()) ||
            c.address?.state?.toLowerCase().includes(collegeSearch.toLowerCase())
        );

        if (localFiltered.length === 0) {
            // no matches locally – fall back to the API after a short debounce
            const timeout = setTimeout(fetchColleges, 300);
            return () => clearTimeout(timeout);
        } else {
            // there are matches; make sure the loader is hidden
            setCollegeLoading(false);
        }
    }, [collegeSearch, showCollegeDropdown]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (!formData.college) newErrors.college = "Please select your college";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    college: formData.college ? {
                        collegeId: formData.college._id,
                        collegeName: formData.college.name  
                    } : undefined
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            localStorage.setItem("codexToken", data.token);
            setSuccess(true);

            setTimeout(() => {
                router.push("/");
            }, 2000);

        } catch (err) {
            setErrors({ submit: err.message });
        } finally {
            setLoading(false);
        }
    };

    const submitCollegeRequest = async () => {
        if (!requestCollegeName.trim()) return;

        try {
            const res = await fetch(`${API_URL}/auth/colleges/request`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ collegeName: requestCollegeName }),
            });

            if (res.ok) {
                setRequestSubmitted(true);
                setTimeout(() => {
                    setShowCollegeRequest(false);
                    setRequestSubmitted(false);
                    setRequestCollegeName("");
                }, 3000);
            }
        } catch (err) {
            console.error("Failed to submit request");
        }
    };

    const filteredColleges = colleges.filter(c =>
        c.name?.toLowerCase().includes(collegeSearch.toLowerCase()) ||
        c.address?.city?.toLowerCase().includes(collegeSearch.toLowerCase()) ||
        c.address?.state?.toLowerCase().includes(collegeSearch.toLowerCase())
    );

    if (success) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-md"
                >
                    <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Welcome to HackByteCodex!</h2>
                    <p className="text-gray-400 mb-6">Your account has been created successfully. Redirecting to dashboard...</p>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2 }}
                            className="h-full bg-green-500"
                        />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-40 right-20 opacity-20"
                >
                </motion.div>
            </div>

            <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
                <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                            <span className="text-2xl font-bold text-white italic tracking-tighter cursor-pointer group-hover:text-blue-400 transition-colors">
                                hackbyte<span className="text-blue-500">codex</span>
                            </span>
                        </Link>


                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                            Start Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
                                Tech Journey
                            </span>
                        </h1>
                        <motion.div
                            key={currentTagline}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <p className="text-xl text-gray-400">{taglines[currentTagline]}</p>
                        </motion.div>
                    </div>

                    <div className="space-y-6 mt-12 lg:mt-0">
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-black flex items-center justify-center text-xs font-bold">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-400">
                                <span className="text-white font-semibold">2,500+</span> students joined this month
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
                                <p className="text-2xl font-bold">150+</p>
                                <p className="text-xs text-gray-500">Hackathons</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <Users className="w-6 h-6 text-blue-400 mb-2" />
                                <p className="text-2xl font-bold">50K+</p>
                                <p className="text-xs text-gray-500">Members</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <Building2 className="w-6 h-6 text-purple-400 mb-2" />
                                <p className="text-2xl font-bold">200+</p>
                                <p className="text-xs text-gray-500">Colleges</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full max-w-md space-y-6"
                    >
                        <div className="text-center lg:text-left mb-8">
                            <h2 className="text-2xl font-bold mb-2">Create Account</h2>
                            <p className="text-gray-400">Join the most powerful student tech network</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-500" />
                                    Full Name
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className={`h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 ${errors.fullName ? "border-red-500/50" : ""
                                        }`}
                                />
                                {errors.fullName && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 flex items-center gap-1">
                                        <XCircle className="w-3 h-3" /> {errors.fullName}
                                    </motion.p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    Email Address
                                </label>
                                <Input
                                    type="email"
                                    placeholder="you@college.edu"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 ${errors.email ? "border-red-500/50" : ""
                                        }`}
                                />
                                {errors.email && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 flex items-center gap-1">
                                        <XCircle className="w-3 h-3" /> {errors.email}
                                    </motion.p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-gray-500" />
                                    Phone Number <span className="text-gray-600">(Optional)</span>
                                </label>
                                <Input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:border-blue-500 focus:ring-blue-500/20"
                                />
                            </div>

                            <div className="space-y-2" ref={dropdownRef}>
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4 text-gray-500" />
                                    College/University
                                </label>

                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowCollegeDropdown(!showCollegeDropdown)}
                                        className={`w-full h-12 px-4 rounded-xl bg-white/5 border text-left flex items-center justify-between transition-all ${formData.college ? "border-blue-500/50 text-white" : "border-white/10 text-gray-500"
                                            } ${errors.college ? "border-red-500/50" : ""}`}
                                    >
                                        <span className={formData.college ? "text-white" : "text-gray-500"}>
                                            {formData.college ? formData.college.name : "Search your college..."} 
                                        </span>
                                        <ChevronDown className={`w-5 h-5 transition-transform ${showCollegeDropdown ? "rotate-180" : ""}`} />
                                    </button>

                                    <AnimatePresence>
                                        {showCollegeDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute top-full left-0 right-0 mt-2 bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 max-h-80"
                                            >
                                                <div className="p-3 border-b border-white/5">
                                                    <div className="relative">
                                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                        <Input
                                                            placeholder="Search colleges..."
                                                            value={collegeSearch}
                                                            onChange={(e) => setCollegeSearch(e.target.value)}
                                                            className="pl-9 h-10 bg-white/5 border-white/10 text-white text-sm rounded-lg"
                                                            autoFocus
                                                        />
                                                    </div>
                                                </div>

                                                <div className="overflow-y-auto max-h-60">
                                                    {collegeLoading ? (
                                                        <div className="p-4 text-center text-gray-500">
                                                            <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                                                            Searching...
                                                        </div>
                                                    ) : filteredColleges.length > 0 ? (
                                                        filteredColleges.map((college) => (
                                                            <button
                                                                key={college._id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setFormData({ ...formData, college });
                                                                    setShowCollegeDropdown(false);
                                                                    setErrors({ ...errors, college: "" });
                                                                }}
                                                                className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
                                                            >
                                                                <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                                                                    {college.logo?.url ? (
                                                                        <img
                                                                            src={college.logo.url}
                                                                            alt={college.name}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <Building2 className="w-5 h-5 text-blue-400" />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-white font-medium truncate">{college.name}</p> 
                                                                    <p className="text-xs text-gray-500 truncate">
                                                                        {college.address?.city ? `${college.address.city}, ${college.address.state || 'India'}` : "India"}
                                                                    </p>  
                                                                </div>
                                                                {formData.college?._id === college._id && (
                                                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                                                )}
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="p-4 text-center">
                                                            <p className="text-gray-500 mb-3">No colleges found</p>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowCollegeDropdown(false);
                                                                    setShowCollegeRequest(true);
                                                                    setRequestCollegeName(collegeSearch);
                                                                }}
                                                                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 mx-auto"
                                                            >
                                                                <Send className="w-4 h-4" />
                                                                Request to add your college
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {errors.college && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 flex items-center gap-1">
                                        <XCircle className="w-3 h-3" /> {errors.college}
                                    </motion.p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-gray-500" />
                                    Password
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className={`h-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 ${errors.password ? "border-red-500/50" : ""
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 flex items-center gap-1">
                                        <XCircle className="w-3 h-3" /> {errors.password}
                                    </motion.p>
                                )}
                            </div>

                            {errors.submit && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
                                >
                                    <XCircle className="w-4 h-4" />
                                    {errors.submit}
                                </motion.div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all group relative overflow-hidden cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>

                            <p className="text-center text-sm text-gray-500">
                                Already have an account?{" "}
                                <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {showCollegeRequest && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 relative"
                        >
                            <button
                                onClick={() => setShowCollegeRequest(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>

                            {!requestSubmitted ? (
                                <>
                                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                                        <Building2 className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-center mb-2">Request New College</h3>
                                    <p className="text-gray-400 text-center text-sm mb-6">
                                        Can't find your college? Submit a request and we'll add it within 24 hours.
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-300 mb-2 block">College Name</label>
                                            <Input
                                                value={requestCollegeName}
                                                onChange={(e) => setRequestCollegeName(e.target.value)}
                                                placeholder="e.g., Delhi Technological University"
                                                className="h-12 bg-white/5 border-white/10 text-white rounded-xl"
                                            />
                                        </div>

                                        <Button
                                            onClick={submitCollegeRequest}
                                            disabled={!requestCollegeName.trim()}
                                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            Submit Request
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
                                    <p className="text-gray-400 text-sm">
                                        We'll review and add your college soon. Check back in 24 hours!
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}