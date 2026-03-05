"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Copy,
    Check,
    Terminal,
    Shield,
    Code2,
    Globe,
    AlertTriangle,
    Webhook,
    BookOpen,
    ChevronRight
} from "lucide-react";
import Navbar from "@/layouts/navbar";
import Footer from "@/layouts/footer";
import Link from "next/link";
import APIDemoSection from "@/components/page-ui/APIDemoSection"

const languages = ["cURL", "JavaScript", "Python", "PHP"];

const codeExamples = {
    curl: `curl -X POST https://api.hackbytecodex.com/api-platform/events \\
  -H "X-API-Key: hb_api_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My Hackathon",
    "description": "An amazing event",
    "eventType": "HACKATHON",
    "mode": "online",
    "startDate": "2025-04-15T09:00:00Z",
    "endDate": "2025-04-17T18:00:00Z"
  }'`,
    javascript: `const response = await fetch('https://api.hackbytecodex.com/api-platform/events', {
  method: 'POST',
  headers: {
    'X-API-Key': 'hb_api_your_key_here',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My Hackathon',
    description: 'An amazing event',
    eventType: 'HACKATHON',
    mode: 'online',
    startDate: '2025-04-15T09:00:00Z',
    endDate: '2025-04-17T18:00:00Z',
  }),
});

const data = await response.json();`,
    python: `import requests

response = requests.post(
    'https://api.hackbytecodex.com/api-platform/events',
    headers={
        'X-API-Key': 'hb_api_your_key_here',
        'Content-Type': 'application/json',
    },
    json={
        'title': 'My Hackathon',
        'description': 'An amazing event',
        'eventType': 'HACKATHON',
        'mode': 'online',
        'startDate': '2025-04-15T09:00:00Z',
        'endDate': '2025-04-17T18:00:00Z',
    }
)

data = response.json()`,
    php: `<?php
$ch = curl_init('https://api.hackbytecodex.com/api-platform/events');

$data = [
    'title' => 'My Hackathon',
    'description' => 'An amazing event',
    'eventType' => 'HACKATHON',
    'mode' => 'online',
    'startDate' => '2025-04-15T09:00:00Z',
    'endDate' => '2025-04-17T18:00:00Z',
];

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-API-Key: hb_api_your_key_here',
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);`,
};

const endpoints = [
    {
        method: "POST",
        path: "/api-platform/events",
        description: "Create a new event",
        auth: "Platform Token",
    },
    {
        method: "GET",
        path: "/api-platform/events",
        description: "List all your events",
        auth: "Platform Token",
    },
    {
        method: "GET",
        path: "/api-platform/events/:id",
        description: "Get event details",
        auth: "Platform Token",
    },
    {
        method: "PUT",
        path: "/api-platform/events/:id",
        description: "Update an event",
        auth: "Platform Token",
    },
    {
        method: "POST",
        path: "/api-platform/events/:id/register",
        description: "Register for an event (public)",
        auth: "API Key",
    },
    {
        method: "GET",
        path: "/api-platform/events/:id/registrations",
        description: "List registrations",
        auth: "Platform Token",
    },
    {
        method: "POST",
        path: "/api-platform/events/:id/judges/invite",
        description: "Invite a judge",
        auth: "Platform Token",
    },
    {
        method: "POST",
        path: "/api-platform/judge/scores",
        description: "Submit a score",
        auth: "Judge Token",
    },
];

const errorCodes = [
    { code: "400", name: "Bad Request", description: "Invalid request payload or parameters" },
    { code: "401", name: "Unauthorized", description: "Missing or invalid authentication" },
    { code: "403", name: "Forbidden", description: "Insufficient permissions or plan limits exceeded" },
    { code: "404", name: "Not Found", description: "Resource not found" },
    { code: "429", name: "Too Many Requests", description: "Rate limit exceeded" },
    { code: "500", name: "Internal Server Error", description: "Something went wrong on our end" },
];

export default function ApiDocsPage() {
    const [selectedLang, setSelectedLang] = useState("curl");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeExamples[selectedLang]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="bg-black min-h-screen">
            <Navbar />
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Event API{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                Reference
                            </span>
                        </h1>

                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Build powerful event experiences with our RESTful API.
                            Create events, manage registrations, and track analytics programmatically.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                    <Terminal className="w-5 h-5 text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Quick Start</h2>
                            </div>

                            <div className="space-y-6 text-gray-400">
                                <div>
                                    <h3 className="text-white font-semibold mb-2">1. Get your API key</h3>
                                    <p>Sign up for an API Platform account and get your unique API key from the dashboard.</p>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-2">2. Make your first request</h3>
                                    <p>Use your API key in the X-API-Key header to authenticate requests.</p>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-2">3. Start building</h3>
                                    <p>Create events, manage registrations, and integrate with your applications.</p>
                                </div>
                            </div>

                            <Link href="/pricing">
                                <Button className="mt-8 bg-blue-600 hover:bg-blue-700">
                                    Get API Key
                                    <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden"
                        >
                            {/* Language Selector */}
                            <div className="flex items-center gap-2 p-4 border-b border-white/10 overflow-x-auto">
                                {languages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setSelectedLang(lang.toLowerCase())}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedLang === lang.toLowerCase()
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                                <button
                                    onClick={handleCopy}
                                    className="ml-auto p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Code */}
                            <div className="p-4 overflow-x-auto">
                                <pre className="text-sm font-mono text-gray-300">
                                    <code>{codeExamples[selectedLang]}</code>
                                </pre>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <APIDemoSection />
            <section className="py-16 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Authentication</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">API Key Authentication</h3>
                            <p className="text-gray-400 mb-4">
                                For public endpoints like event registration, use your API key in the header:
                            </p>
                            <code className="block p-4 rounded-xl bg-black text-sm font-mono text-cyan-400">
                                X-API-Key: hb_api_your_key_here
                            </code>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
                            <h3 className="text-lg font-semibold text-white mb-4">Bearer Token Authentication</h3>
                            <p className="text-gray-400 mb-4">
                                For platform management endpoints, use your JWT token:
                            </p>
                            <code className="block p-4 rounded-xl bg-black text-sm font-mono text-cyan-400">
                                Authorization: Bearer your_jwt_token
                            </code>
                        </div>
                    </div>
                </div>
            </section>

            {/* Base URL */}
            <section className="py-16 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Base URL</h2>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
                        <code className="text-lg font-mono text-cyan-400">
                            https://api.hackbytecodex.com
                        </code>
                        <p className="text-gray-400 mt-4">
                            All API requests should be made to this base URL. HTTPS is required for all requests.
                        </p>
                    </div>
                </div>
            </section>

            {/* <section className="py-16 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                            <Code2 className="w-5 h-5 text-orange-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Endpoints</h2>
                    </div>

                    <div className="space-y-4">
                        {endpoints.map((endpoint, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-colors"
                            >
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${endpoint.method === "GET" ? "bg-green-500/20 text-green-400" :
                                        endpoint.method === "POST" ? "bg-blue-500/20 text-blue-400" :
                                            endpoint.method === "PUT" ? "bg-yellow-500/20 text-yellow-400" :
                                                "bg-red-500/20 text-red-400"
                                    }`}>
                                    {endpoint.method}
                                </span>
                                <code className="text-sm font-mono text-cyan-400">{endpoint.path}</code>
                                <span className="text-gray-400 text-sm flex-1">{endpoint.description}</span>
                                <span className="text-xs text-gray-500">{endpoint.auth}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            <section className="py-16 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Error Handling</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {errorCodes.map((error) => (
                            <div
                                key={error.code}
                                className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg font-bold text-red-400">{error.code}</span>
                                    <span className="text-white font-medium">{error.name}</span>
                                </div>
                                <p className="text-sm text-gray-400">{error.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Webhooks */}
            <section className="py-16 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                            <Webhook className="w-5 h-5 text-pink-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Webhooks</h2>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10">
                        <p className="text-gray-400 mb-6">
                            Webhooks allow you to receive real-time notifications when events occur in your account.
                            Available on Pro and Enterprise plans.
                        </p>

                        <h3 className="text-white font-semibold mb-4">Event Types</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                "registration.created",
                                "registration.cancelled",
                                "payment.received",
                                "judge.invited",
                                "score.submitted",
                                "event.published",
                            ].map((event) => (
                                <code key={event} className="block p-3 rounded-lg bg-black text-sm font-mono text-cyan-400">
                                    {event}
                                </code>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to start building?</h2>
                    <p className="text-gray-400 mb-8">Get your API key and start creating amazing event experiences.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/pricing">
                            <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                                Get API Access
                            </Button>
                        </Link>
                        <Link href="/platform-login/login">
                            <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10">
                                Platform Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
