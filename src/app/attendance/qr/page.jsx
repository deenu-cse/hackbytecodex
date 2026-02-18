"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    ScanLine, MapPin, CheckCircle2, XCircle,
    AlertCircle, Loader2, RefreshCw, ShieldCheck,
    Navigation, Crosshair, Sparkles, ArrowLeft
} from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function QRAttendancePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <QRAttendanceClient />
        </Suspense>
    );
}

function QRAttendanceClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const qrToken = searchParams.get("token");

    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [locationLoading, setLocationLoading] = useState(true);
    const [scanning, setScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [scanError, setScanError] = useState(null);
    const [manualToken, setManualToken] = useState("");
    const [hasAutoScanned, setHasAutoScanned] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('codexToken');
        if (!token) {
            router.push("/login?redirect=/attendance/qr");
        }
    }, [router]);

    const handleScan = useCallback(async (scannedToken, locData = null) => {
        const currentLocation = locData || location;
        
        if (!currentLocation) {
            setScanError("Location required. Please enable location access.");
            return;
        }

        if (currentLocation.accuracy > 500) {
            setScanError("Location accuracy too low. Please enable GPS or move to an open area.");
            return;
        }

        setScanning(true);
        setScanError(null);
        setScanResult(null);

        try {
            const authToken = localStorage.getItem("codexToken");
            
            if (!authToken) {
                throw new Error("Authentication required");
            }

            console.log("Sending attendance request:", {
                token: scannedToken,
                lat: currentLocation.lat,
                lng: currentLocation.lng
            });

            const response = await fetch(`${API_URL}/events/qr/attendance`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    token: scannedToken,
                    lat: currentLocation.lat,
                    lng: currentLocation.lng
                }),
            });

            const data = await response.json();
            console.log("Attendance response:", data);

            if (!response.ok) {
                throw new Error(data.message || "Failed to mark attendance");
            }

            setScanResult({
                success: true,
                message: data.message
            });

            triggerConfetti();

        } catch (err) {
            console.error("Scan error:", err);
            setScanError(err.message);
            setScanResult({
                success: false,
                message: err.message
            });
        } finally {
            setScanning(false);
        }
    }, [location, API_URL]);

    const requestLocation = useCallback(() => {
        setLocationLoading(true);
        setLocationError(null);
        setScanError(null);

        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser");
            setLocationLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const locData = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                
                console.log("Location acquired:", locData);
                setLocation(locData);
                setLocationLoading(false);
            },
            (error) => {
                let errorMessage = "Unable to retrieve your location";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location access denied. Please enable location permissions in your browser settings to mark attendance.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information unavailable. Please try again.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out. Please try again.";
                        break;
                }
                setLocationError(errorMessage);
                setLocationLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }
        );
    }, []);

    // Initial location request
    useEffect(() => {
        const token = localStorage.getItem('codexToken');
        if (token) {
            requestLocation();
        }
    }, [requestLocation]);

    // Auto-scan only once when QR token and location are available
    useEffect(() => {
        if (qrToken && location && !hasAutoScanned && !scanning) {
            setHasAutoScanned(true);
            console.log("Auto-scanning with token:", qrToken);
            handleScan(qrToken, location);
        }
    }, [qrToken, location, hasAutoScanned, scanning, handleScan]);

    const triggerConfetti = () => {
        const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#ffffff'];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 5000);
            }, i * 30);
        }
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-96 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[400px] border-[2px] border-blue-400/20 rounded-[100%]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[450px] border-[1px] border-blue-300/10 rounded-[100%]" />
            </div>

            <style jsx global>{`
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `}</style>

            <header className="relative z-10 p-6">
                <Link href="/">
                    <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full cursor-pointer">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to main page
                    </Button>
                </Link>
            </header>

            <main className="relative z-10 max-w-md mx-auto px-6 py-12">

                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                        <ScanLine className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-400 font-medium">QR Attendance</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        Mark Your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Attendance</span>
                    </h1>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto">
                        Scan the event QR code to check in. Make sure you're within 500m of the venue.
                    </p>
                </div>

                {/* Location Loading */}
                {locationLoading && (
                    <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                        <div className="relative w-24 h-24 mx-auto">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
                            <div className="relative w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                                <Navigation className="w-10 h-10 text-blue-400 animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-white">Getting Your Location</h3>
                            <p className="text-sm text-gray-400">Please allow location access when prompted...</p>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}

                {/* Location Error */}
                {!locationLoading && locationError && !location && (
                    <div className="rounded-3xl bg-red-950/20 border border-red-500/20 p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                            <MapPin className="w-10 h-10 text-red-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-white">Location Access Required</h3>
                            <p className="text-sm text-red-400/80">{locationError}</p>
                        </div>
                        <div className="space-y-3">
                            <Button
                                onClick={requestLocation}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/25"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Try Again
                            </Button>
                            <p className="text-xs text-gray-500">
                                Make sure location permissions are enabled in your browser settings
                            </p>
                        </div>
                    </div>
                )}

                {/* Location Success + Scanner */}
                {!locationLoading && location && !scanResult && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                        {/* Location Status */}
                        <div className={`rounded-2xl border p-4 flex items-center gap-3 ${
                            location.accuracy > 100 
                                ? 'bg-yellow-950/20 border-yellow-500/20' 
                                : 'bg-green-950/20 border-green-500/20'
                        }`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                location.accuracy > 100 ? 'bg-yellow-500/10' : 'bg-green-500/10'
                            }`}>
                                <Crosshair className={`w-5 h-5 ${
                                    location.accuracy > 100 ? 'text-yellow-400' : 'text-green-400'
                                }`} />
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${
                                    location.accuracy > 100 ? 'text-yellow-400' : 'text-green-400'
                                }`}>
                                    {location.accuracy > 100 ? 'Low Accuracy Location' : 'Location Acquired'}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Accuracy: {Math.round(location.accuracy)}m • {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                                </p>
                            </div>
                        </div>

                        {/* Warning for poor accuracy */}
                        {location.accuracy > 500 && (
                            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                                <p className="text-sm text-yellow-400">
                                    Location accuracy is poor. Please enable GPS or move outdoors for better signal.
                                </p>
                            </div>
                        )}

                        {/* Scanner Interface */}
                        <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-8 text-center space-y-6 relative overflow-hidden">
                            <div className="relative w-48 h-48 mx-auto">
                                <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-pulse" />
                                <div className="absolute inset-2 rounded-full border border-blue-400/10" />

                                <div className="absolute inset-4 rounded-2xl border-2 border-blue-500/40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                    {scanning ? (
                                        <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
                                    ) : (
                                        <ScanLine className="w-12 h-12 text-blue-400" />
                                    )}
                                </div>
                                
                                {/* Corner markers */}
                                <div className="absolute top-4 left-4 w-8 h-8 border-l-[3px] border-t-[3px] border-blue-500 rounded-tl-xl" />
                                <div className="absolute top-4 right-4 w-8 h-8 border-r-[3px] border-t-[3px] border-blue-500 rounded-tr-xl" />
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-[3px] border-b-[3px] border-blue-500 rounded-bl-xl" />
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-[3px] border-b-[3px] border-blue-500 rounded-br-xl" />

                                {!scanning && (
                                    <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" />
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-white">
                                    {scanning ? "Processing..." : "Ready to Scan"}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {scanning
                                        ? "Verifying your attendance..."
                                        : qrToken 
                                            ? "Processing QR code from URL..."
                                            : "Point your camera at the event QR code"}
                                </p>
                            </div>

                            {/* Manual Token Input */}
                            {!scanning && !qrToken && (
                                <div className="space-y-3 pt-4 border-t border-white/10">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Or enter token manually</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={manualToken}
                                            onChange={(e) => setManualToken(e.target.value)}
                                            placeholder="Paste QR token here..."
                                            className="flex-1 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:border-blue-500 outline-none"
                                        />
                                        <Button
                                            onClick={() => handleScan(manualToken)}
                                            disabled={!manualToken || scanning}
                                            className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50"
                                        >
                                            Go
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Retry button if auto-scan failed */}
                            {!scanning && qrToken && scanError && (
                                <Button
                                    onClick={() => handleScan(qrToken)}
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Retry Scan
                                </Button>
                            )}

                            {scanError && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-in slide-in-from-top-2">
                                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                    <p className="text-sm text-red-400 text-left">{scanError}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Secure check-in with location verification</span>
                        </div>
                    </div>
                )}

                {/* Success Result */}
                {scanResult?.success && (
                    <div className="rounded-3xl bg-[#0f0f0f] border border-green-500/30 p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
                        <div className="relative w-24 h-24 mx-auto">
                            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500/50 flex items-center justify-center">
                                <CheckCircle2 className="w-12 h-12 text-green-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">Checked In!</h3>
                            <p className="text-green-400">{scanResult.message}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                <span>Attendance recorded at {new Date().toLocaleTimeString()}</span>
                            </div>
                        </div>
                        <Button
                            onClick={() => {
                                setScanResult(null);
                                setScanError(null);
                                setManualToken("");
                                setHasAutoScanned(false);
                                requestLocation(); 
                            }}
                            variant="outline"
                            className="w-full h-12 border-white/10 text-white hover:bg-white/10 rounded-xl bg-blue-600 cursor-pointer"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Scan Another
                        </Button>
                    </div>
                )}

                {scanResult && !scanResult.success && !scanning && (
                    <div className="rounded-3xl bg-[#0f0f0f] border border-red-500/30 p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
                        <div className="w-24 h-24 mx-auto rounded-full bg-red-500/10 border-2 border-red-500/50 flex items-center justify-center">
                            <XCircle className="w-12 h-12 text-red-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">Check-in Failed</h3>
                            <p className="text-red-400">{scanResult.message}</p>
                        </div>
                        <div className="space-y-3">
                            <Button
                                onClick={() => {
                                    setScanResult(null);
                                    setScanError(null);
                                    setHasAutoScanned(false);
                                    if (qrToken) handleScan(qrToken);
                                }}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Try Again
                            </Button>
                            <Button
                                onClick={requestLocation}
                                variant="outline"
                                className="w-full h-12 border-white/10 text-white hover:bg-white/10 rounded-xl bg-bg-white/20 cursor-pointer"
                            >
                                <MapPin className="w-4 h-4 mr-2" />
                                Refresh Location
                            </Button>
                        </div>
                    </div>
                )}

            </main>

            <footer className="relative z-10 text-center pb-8 pt-12">
                <p className="text-xs text-gray-600">
                    Secured by HackByteCodex • Location-verified attendance
                </p>
            </footer>
        </div>
    );
}