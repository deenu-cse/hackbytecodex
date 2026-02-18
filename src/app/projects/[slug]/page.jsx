"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft, Github, Globe, ExternalLink, Heart,
    Eye, Calendar, Code2, Share2, Loader2, AlertCircle,
    ChevronLeft, ChevronRight, Play, X, User, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "../../../layouts/navbar";
import Footer from "../../../layouts/footer";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProjectDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [showVideoModal, setShowVideoModal] = useState(null);
    const [relatedProjects, setRelatedProjects] = useState([]);

    const fetchProject = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_URL}/projects/${slug}`);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 404) throw new Error("Project not found");
                throw new Error(data.message || "Failed to fetch project");
            }

            if (data.success) {
                setProject(data.data);
                setLikeCount(data.data.likeCount || 0);

                const token = localStorage.getItem("codexToken");
                if (token) {
                    fetch(`${API_URL}/projects/view/${data.data._id}`, {
                        method: "POST",
                        headers: { Authorization: `Bearer ${token}` },
                    }).catch(() => { });
                }

                const tech = data.data.techStack?.[0] || data.data.tags?.[0];
                if (tech) {
                    const relatedRes = await fetch(`${API_URL}/projects/all?tech=${tech}&limit=4`);
                    const relatedData = await relatedRes.json();
                    if (relatedData.success) {
                        setRelatedProjects(relatedData.data.filter(p => p.slug !== slug).slice(0, 3));
                    }
                }
            }
        } catch (err) {
            console.error("Fetch project error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    const handleLike = async () => {
        const token = localStorage.getItem("codexToken");
        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/projects/like/${project._id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                setIsLiked(data.liked);
                setLikeCount(prev => data.liked ? prev + 1 : prev - 1);
            }
        } catch (err) {
            console.error("Like error:", err);
        }
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: project.title,
                    text: project.shortDescription,
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                // Show toast notification
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl z-50 animate-in fade-in slide-in-from-bottom-4';
                toast.textContent = 'Link copied to clipboard!';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
            }
        } catch (err) {
            console.error("Share error:", err);
        }
    };

    if (loading) {
        return (
            <main className="bg-black min-h-screen">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
                <Footer />
            </main>
        );
    }

    if (error) {
        return (
            <main className="bg-black min-h-screen">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4">
                    <AlertCircle className="w-16 h-16 text-red-500" />
                    <h2 className="text-2xl font-bold text-white">Error</h2>
                    <p className="text-gray-400">{error}</p>
                    <div className="flex gap-3">
                        <Button onClick={fetchProject} variant="outline" className="border-white/10">
                            Retry
                        </Button>
                        <Link href="/projects">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Back to Projects
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    if (!project) return null;

    const allImages = [
        project.coverImage,
        ...(project.images || [])
    ].filter(Boolean);

    const allVideos = project.videos || [];

    return (
        <main className="bg-black min-h-screen">
            <Navbar />

            <article className="pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/projects">
                        <Button variant="ghost" className="text-gray-400 hover:text-black -ml-4 mb-6 group cursor-pointer">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Projects
                        </Button>
                    </Link>

                    <div className="relative rounded-3xl overflow-hidden bg-[#0f0f0f] border border-white/10 mb-8">
                        <div className="relative aspect-video bg-black">
                            {allImages[activeImageIndex] ? (
                                <img
                                    src={allImages[activeImageIndex].url}
                                    alt={project.title}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
                                    <Code2 className="w-24 h-24 text-white/20" />
                                </div>
                            )}

                            {allImages.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => setActiveImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </>
                            )}

                            {allImages.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {allImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`w-2 h-2 rounded-full transition-all ${idx === activeImageIndex ? 'bg-white w-6' : 'bg-white/30'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-6 lg:p-8">
                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags?.map(tag => (
                                            <Badge key={tag} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                                        {project.title}
                                    </h1>

                                    <p className="text-gray-400 text-lg mb-6">
                                        {project.shortDescription}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(project.createdAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                year: 'numeric'
                                            })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-4 h-4" />
                                            <span>{project.viewCount || 0} views</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Heart className={`w-4 h-4 ${isLiked ? 'text-red-400 fill-red-400' : ''}`} />
                                            <span>{likeCount} likes</span>
                                        </div>
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 hover:text-white transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                <span>View Source</span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        onClick={handleLike}
                                        className={`h-12 px-6 rounded-xl ${isLiked
                                                ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                                                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current scale-110' : ''} transition-transform`} />
                                        {isLiked ? 'Liked' : 'Like'}
                                    </Button>

                                    <Button
                                        onClick={handleShare}
                                        variant="outline"
                                        className="h-12 px-6 rounded-xl border-white/10 text-black hover:bg-white/10"
                                    >
                                        <Share2 className="w-5 h-5 mr-2 text-black" />
                                        Share
                                    </Button>

                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                                            <Button className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                                                <Globe className="w-5 h-5 mr-2" />
                                                Live Demo
                                            </Button>
                                        </a>
                                    )}

                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Button className="h-12 px-6 bg-white text-black hover:bg-gray-200 rounded-xl">
                                                <Github className="w-5 h-5 mr-2" />
                                                View Code
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-8">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <Code2 className="w-5 h-5 text-blue-400" />
                                    About This Project
                                </h3>
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-gray-400 whitespace-pre-line leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                            {project.images?.length > 0 && (
                                <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-8">
                                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-purple-400" />
                                        Screenshots
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {project.images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="aspect-video rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-white/10"
                                                onClick={() => setActiveImageIndex(idx + 1)}
                                            >
                                                <img
                                                    src={img.url}
                                                    alt={`Screenshot ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {allVideos.length > 0 && (
                                <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-8">
                                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                        <Play className="w-5 h-5 text-red-400" />
                                        Demo Videos
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {allVideos.map((video, idx) => (
                                            <div
                                                key={idx}
                                                className="aspect-video rounded-xl bg-black relative group cursor-pointer overflow-hidden border border-white/10"
                                                onClick={() => setShowVideoModal(idx)}
                                            >
                                                <video
                                                    src={video.url}
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Play className="w-6 h-6 text-white ml-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.links?.length > 0 && (
                                <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-8">
                                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <ExternalLink className="w-5 h-5 text-green-400" />
                                        Resources & Links
                                    </h3>
                                    <div className="space-y-3">
                                        {project.links.map((link, idx) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                                    <ExternalLink className="w-5 h-5 text-blue-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                                        {link.title}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">{link.url}</p>
                                                </div>
                                                <ArrowLeft className="w-5 h-5 text-gray-500 -rotate-45 group-hover:text-white transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="space-y-6">
                            <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-6">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                                    Created By
                                </h3>
                                {project.owner ? (
                                    <div className="flex items-center gap-4">
                                        {project.owner.avatar ? (
                                            <img
                                                src={project.owner.avatar}
                                                alt={project.owner.fullName}
                                                className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                                                {project.owner.fullName?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-white font-semibold text-lg">{project.owner.fullName}</p>
                                            <p className="text-gray-500 text-sm">{project.owner.email}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                                            <User className="w-8 h-8 text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Anonymous</p>
                                            <p className="text-gray-500 text-sm">Unknown creator</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-6">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack?.map(tech => (
                                        <Badge
                                            key={tech}
                                            className="bg-white/5 text-gray-300 border-white/10 px-3 py-1.5 text-sm hover:bg-white/10 transition-colors cursor-default"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-6">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                                    Project Stats
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                        <div className="flex items-center gap-3">
                                            <Eye className="w-5 h-5 text-blue-400" />
                                            <span className="text-gray-400">Total Views</span>
                                        </div>
                                        <span className="text-white font-semibold text-lg">{project.viewCount || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                        <div className="flex items-center gap-3">
                                            <Heart className="w-5 h-5 text-red-400" />
                                            <span className="text-gray-400">Total Likes</span>
                                        </div>
                                        <span className="text-white font-semibold text-lg">{likeCount}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-green-400" />
                                            <span className="text-gray-400">Published</span>
                                        </div>
                                        <span className="text-white text-sm">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {relatedProjects.length > 0 && (
                                <div className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-6">
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                                        Related Projects
                                    </h3>
                                    <div className="space-y-4">
                                        {relatedProjects.map(related => (
                                            <Link key={related._id} href={`/projects/${related.slug}`}>
                                                <div className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                                                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex-shrink-0 overflow-hidden">
                                                        {related.coverImage ? (
                                                            <img src={related.coverImage.url} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                                                            {related.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                                                            {related.shortDescription}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </article>

            {showVideoModal !== null && allVideos[showVideoModal] && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setShowVideoModal(null)}
                >
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <video
                            src={allVideos[showVideoModal].url}
                            controls
                            autoPlay
                            className="w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={() => setShowVideoModal(null)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}