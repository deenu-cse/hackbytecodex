"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Eye,
    EyeOff,
    Lock,
    CheckCircle2,
    XCircle,
    Loader2,
    Shield,
    ArrowRight,
    AlertTriangle,
    Check,
    X,
    KeyRound,
    Sparkles
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Password strength rules
const PASSWORD_RULES = [
    { id: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
    { id: "upper", label: "One uppercase letter (A-Z)", test: (p) => /[A-Z]/.test(p) },
    { id: "lower", label: "One lowercase letter (a-z)", test: (p) => /[a-z]/.test(p) },
    { id: "digit", label: "One number (0-9)", test: (p) => /\d/.test(p) },
];

function getPasswordStrength(password) {
    const passed = PASSWORD_RULES.filter(r => r.test(password)).length;
    if (passed === 0) return { level: 0, label: "", color: "" };
    if (passed === 1) return { level: 1, label: "Weak", color: "#ef4444" };
    if (passed === 2) return { level: 2, label: "Fair", color: "#f97316" };
    if (passed === 3) return { level: 3, label: "Good", color: "#eab308" };
    return { level: 4, label: "Strong", color: "#22c55e" };
}

function SetPasswordInner() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [isWelcome, setIsWelcome] = useState(false);

    const [userData, setUserData] = useState(null);
    const [tokenStatus, setTokenStatus] = useState("verifying"); // verifying | valid | invalid | expired

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const strength = getPasswordStrength(password);
    const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
    const allRulesPassed = PASSWORD_RULES.every(r => r.test(password));

    // Extract params on mount
    useEffect(() => {
        const t = searchParams.get("token");
        const e = searchParams.get("email");
        const w = searchParams.get("welcome");
        if (t) setToken(t);
        if (e) setEmail(e);
        if (w === "1") setIsWelcome(true);
    }, [searchParams]);

    // Verify token with backend
    useEffect(() => {
        if (!token || !email) return;

        const verify = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/auth/verify-setup-token?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`
                );
                const data = await res.json();

                if (res.ok && data.success) {
                    setUserData(data.user);
                    setTokenStatus("valid");
                } else {
                    setTokenStatus(data.message?.includes("expired") ? "expired" : "invalid");
                }
            } catch (err) {
                console.error("Token verify error:", err);
                setTokenStatus("invalid");
            }
        };

        verify();
    }, [token, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!allRulesPassed) {
            setError("Please meet all password requirements.");
            return;
        }
        if (!passwordsMatch) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/set-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, email, password, confirmPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to set password.");
            }

            // Auto-login with returned token
            localStorage.setItem("codexToken", data.token);
            setSuccess(true);

            setTimeout(() => {
                router.push("/");
            }, 2500);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // ── Success Screen ──────────────────────────────────────────────────────
    if (success) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-600/10 to-teal-600/10" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center max-w-md relative z-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                        className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30"
                    >
                        <CheckCircle2 className="w-14 h-14 text-white" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-bold text-white mb-3"
                    >
                        You're All Set! 🎉
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-400 mb-2"
                    >
                        Your password has been saved. A confirmation email is on its way.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-500 text-sm mb-8"
                    >
                        Taking you to your dashboard...
                    </motion.p>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
                        />
                    </div>
                </motion.div>
            </div>
        );
    }

    // ── Verifying screen ────────────────────────────────────────────────────
    if (tokenStatus === "verifying") {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
                    <p className="text-gray-400">Verifying your link...</p>
                </div>
            </div>
        );
    }

    // ── Invalid / Expired token ─────────────────────────────────────────────
    if (tokenStatus === "invalid" || tokenStatus === "expired") {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-black to-black" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center max-w-md bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-sm"
                >
                    <div className="w-20 h-20 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="w-10 h-10 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        {tokenStatus === "expired" ? "Link Expired" : "Invalid Link"}
                    </h2>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                        {tokenStatus === "expired"
                            ? "This password setup link has expired (valid for 24 hours). Please sign in with Google again to receive a new link."
                            : "This link is invalid or has already been used. Please sign in with Google again."}
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
                    >
                        Back to Login
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        );
    }

    // ── Main Set Password Form ──────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[130px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-lg"
                >
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold text-white italic tracking-tighter">
                                hackbyte<span className="text-blue-500">codex</span>
                            </span>
                        </Link>
                    </div>

                    {/* Card */}
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-500/25"
                            >
                                <KeyRound className="w-8 h-8 text-white" />
                            </motion.div>

                            {isWelcome && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4"
                                >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Welcome to HackByteCodex!
                                </motion.div>
                            )}

                            <h1 className="text-2xl lg:text-3xl font-bold text-white">
                                {isWelcome ? "Set Your Password" : "Create New Password"}
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                                {isWelcome
                                    ? "Your account was created via Google. Set a password to also log in with email."
                                    : "Create a strong password for your account."}
                            </p>
                        </div>

                        {/* User info badge */}
                        {userData && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] mb-6"
                            >
                                {userData.avatar ? (
                                    <img
                                        src={userData.avatar}
                                        alt={userData.fullName}
                                        className="w-10 h-10 rounded-full border border-white/10"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                                        {userData.fullName?.[0]?.toUpperCase()}
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <p className="text-white font-medium text-sm truncate">{userData.fullName}</p>
                                    <p className="text-gray-500 text-xs truncate">{userData.email}</p>
                                </div>
                                <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Verified
                                </div>
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Password field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-gray-500" />
                                    New Password
                                </label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                        placeholder="Create a strong password"
                                        autoComplete="new-password"
                                        className={`w-full h-12 pl-4 pr-12 rounded-xl bg-white/5 border text-white placeholder:text-gray-600 text-sm outline-none transition-all focus:ring-2 ${
                                            password && !allRulesPassed
                                                ? "border-yellow-500/40 focus:border-yellow-500/60 focus:ring-yellow-500/10"
                                                : password && allRulesPassed
                                                ? "border-green-500/40 focus:border-green-500/60 focus:ring-green-500/10"
                                                : "border-white/10 group-hover:border-white/20 focus:border-indigo-500/60 focus:ring-indigo-500/10"
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

                                {/* Strength meter */}
                                {password.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="space-y-2 mt-1"
                                    >
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map((lvl) => (
                                                <div
                                                    key={lvl}
                                                    className="h-1 flex-1 rounded-full transition-all duration-300"
                                                    style={{
                                                        backgroundColor: strength.level >= lvl ? strength.color : "rgba(255,255,255,0.08)"
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        {strength.label && (
                                            <p className="text-xs font-medium" style={{ color: strength.color }}>
                                                {strength.label} password
                                            </p>
                                        )}
                                    </motion.div>
                                )}
                            </div>

                            {/* Password rules checklist */}
                            {password.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] grid grid-cols-2 gap-2"
                                >
                                    {PASSWORD_RULES.map((rule) => {
                                        const passed = rule.test(password);
                                        return (
                                            <div key={rule.id} className={`flex items-center gap-2 text-xs transition-colors ${passed ? "text-green-400" : "text-gray-500"}`}>
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${passed ? "bg-green-500/20" : "bg-white/5"}`}>
                                                    {passed ? <Check className="w-2.5 h-2.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-600 block" />}
                                                </div>
                                                {rule.label}
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            )}

                            {/* Confirm password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-gray-500" />
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                                        placeholder="Repeat your password"
                                        autoComplete="new-password"
                                        className={`w-full h-12 pl-4 pr-12 rounded-xl bg-white/5 border text-white placeholder:text-gray-600 text-sm outline-none transition-all focus:ring-2 ${
                                            confirmPassword && !passwordsMatch
                                                ? "border-red-500/40 focus:border-red-500/60 focus:ring-red-500/10"
                                                : confirmPassword && passwordsMatch
                                                ? "border-green-500/40 focus:border-green-500/60 focus:ring-green-500/10"
                                                : "border-white/10 group-hover:border-white/20 focus:border-indigo-500/60 focus:ring-indigo-500/10"
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                                    >
                                        {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <AnimatePresence mode="wait">
                                    {confirmPassword && (
                                        <motion.p
                                            key={passwordsMatch ? "match" : "nomatch"}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0 }}
                                            className={`text-xs flex items-center gap-1.5 ${passwordsMatch ? "text-green-400" : "text-red-400"}`}
                                        >
                                            {passwordsMatch ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                            {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Error message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                                    >
                                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                        <p>{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={loading || !allRulesPassed || !passwordsMatch}
                                className="w-full h-14 text-base font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Set Password & Continue
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </button>
                        </form>

                        {/* Footer note */}
                        <p className="text-center text-xs text-gray-600 mt-6">
                            You can still log in with Google anytime.{" "}
                            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                Back to Login
                            </Link>
                        </p>
                    </div>

                    {/* Security note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-600"
                    >
                        <Shield className="w-4 h-4" />
                        <span>256-bit encrypted · Your data is secure</span>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default function SetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        }>
            <SetPasswordInner />
        </Suspense>
    );
}
