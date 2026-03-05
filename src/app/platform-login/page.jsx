"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiPlatform } from "@/app/context/ApiPlatformContext";
import { Key, Eye, EyeOff, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function PlatformLoginPage() {
    const [platformId, setPlatformId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login, error } = useApiPlatform();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await login(platformId, password);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white">API Platform Login</h1>
                    <p className="text-gray-400 mt-2">Sign in to manage your events</p>
                </div>

                {/* Login Form */}
                <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="platformId" className="text-gray-300">
                                Platform ID or Email
                            </Label>
                            <Input
                                id="platformId"
                                type="text"
                                placeholder="EPU-XXXXXX or email@example.com"
                                value={platformId}
                                onChange={(e) => setPlatformId(e.target.value)}
                                className="h-12 bg-black border-white/20 text-white placeholder:text-gray-600"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-300">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 bg-black border-white/20 text-white placeholder:text-gray-600 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/forgot-password" className="text-sm text-blue-400 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 mb-4">Don&apos;t have API access yet?</p>
                    <Link href="/pricing">
                        <Button variant="outline" className="border-white/20 text-white bg-white/10 cursor-pointer">
                            <Zap className="mr-2 w-4 h-4" />
                            Get API Access
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
