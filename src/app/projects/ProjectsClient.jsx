"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, Filter, Trophy, ExternalLink, Github, Heart,
  ChevronDown, X, Eye, Star, GitBranch, Users, Code2,
  Cpu, Globe, Smartphone, Database, ArrowUpRight, Zap,
  Loader2, AlertCircle, LayoutGrid, List, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "../../layouts/navbar";
import Footer from "../../layouts/footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const categories = [
  { id: "all", label: "All Projects", icon: Globe },
  { id: "aiml", label: "AI/ML", icon: Cpu },
  { id: "web3", label: "Web3", icon: Database },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "web", label: "Web Dev", icon: Code2 },
];

const sortOptions = [
  { value: "latest", label: "Latest First", icon: Calendar },
  { value: "trending", label: "Most Liked", icon: Heart },
  { value: "mostViewed", label: "Most Viewed", icon: Eye },
];

export default function ProjectsClient({
  initialProjects = [],
  initialPagination = { page: 1, pages: 1, total: 0 },
  initialAvailableTags = [],
  initialAvailableTech = [],
  initialFeaturedProject = null,
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("All Tags");
  const [selectedTech, setSelectedTech] = useState("All Tech");
  const [sortBy, setSortBy] = useState("latest");
  const [projects, setProjects] = useState(initialProjects);
  const [featuredProject, setFeaturedProject] = useState(initialFeaturedProject);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [pagination, setPagination] = useState(initialPagination);
  const [availableTags, setAvailableTags] = useState(initialAvailableTags);
  const [availableTech, setAvailableTech] = useState(initialAvailableTech);
  const [viewMode, setViewMode] = useState("grid");
  
  const bannerRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  // Fetch all projects with filters
  const fetchProjects = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        sort: sortBy,
        ...(searchQuery && { search: searchQuery }),
        ...(selectedTag !== "All Tags" && { tag: selectedTag }),
        ...(selectedTech !== "All Tech" && { tech: selectedTech }),
      });

      const response = await fetch(`${API_URL}/projects/all?${params}`);
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
        setPagination({
          page: data.page,
          pages: data.pages,
          total: data.total,
        });
        
        const allTags = [...new Set(data.data.flatMap(p => p.tags || []))];
        const allTech = [...new Set(data.data.flatMap(p => p.techStack || []))];
        setAvailableTags(allTags);
        setAvailableTech(allTech);

        // Set featured project (most liked from first page)
        if (page === 1 && data.data.length > 0) {
          const mostLiked = [...data.data].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))[0];
          setFeaturedProject(mostLiked);
        }
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Fetch projects error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedTag, selectedTech, sortBy]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedTag, selectedTech, sortBy, fetchProjects]);

  const handleMouseMove = (e) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  const toggleLike = async (e, projectId) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("codexdashtoken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/projects/like/${projectId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setLikedProjects(prev => {
          const newSet = new Set(prev);
          if (data.liked) {
            newSet.add(projectId);
          } else {
            newSet.delete(projectId);
          }
          return newSet;
        });

        // Update local project data
        setProjects(prev => prev.map(p => 
          p._id === projectId 
            ? { ...p, likeCount: data.liked ? (p.likeCount || 0) + 1 : (p.likeCount || 0) - 1 }
            : p
        ));
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSelectedTag("All Tags");
    setSelectedTech("All Tech");
    setSortBy("latest");
    fetchProjects(1);
  };

  const hasActiveFilters = searchQuery || selectedTag !== "All Tags" || selectedTech !== "All Tech";

  // Filter projects by category client-side (since backend doesn't have category field)
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => {
        // Map tags/tech to categories
        const techAndTags = [...(p.techStack || []), ...(p.tags || [])].map(t => t.toLowerCase());
        switch(activeCategory) {
          case "aiml": return techAndTags.some(t => ["ai", "ml", "tensorflow", "pytorch", "openai", "machine learning"].includes(t));
          case "web3": return techAndTags.some(t => ["blockchain", "solidity", "web3", "ethereum", "smart contract"].includes(t));
          case "mobile": return techAndTags.some(t => ["flutter", "react native", "ios", "android", "mobile"].includes(t));
          case "web": return techAndTags.some(t => ["react", "next.js", "vue", "angular", "web"].includes(t));
          default: return true;
        }
      });

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      <section className="relative pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Project <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Showcase</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover amazing projects built by students across our network. From hackathon winners to open-source gems.
            </p>
          </div>

          <div className="sticky top-20 z-30 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input 
                  placeholder="Search projects, tech stacks, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:border-blue-500"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(isDropdownOpen === 'tag' ? null : 'tag')}
                    className="flex items-center gap-2 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors min-w-[140px]"
                  >
                    <Trophy className="w-4 h-4 text-gray-400" />
                    <span className="text-sm truncate max-w-[80px]">{selectedTag}</span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isDropdownOpen === 'tag' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen === 'tag' && (
                    <div className="absolute top-full mt-2 w-56 max-h-64 overflow-y-auto bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden z-50 scrollbar-hide">
                      <button
                        onClick={() => { setSelectedTag("All Tags"); setIsDropdownOpen(null); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${selectedTag === "All Tags" ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300'}`}
                      >
                        All Tags
                      </button>
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => { setSelectedTag(tag); setIsDropdownOpen(null); }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${selectedTag === tag ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300'}`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(isDropdownOpen === 'tech' ? null : 'tech')}
                    className="flex items-center gap-2 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors min-w-[140px]"
                  >
                    <Code2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm truncate max-w-[80px]">{selectedTech}</span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isDropdownOpen === 'tech' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen === 'tech' && (
                    <div className="absolute top-full mt-2 w-56 max-h-64 overflow-y-auto bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden z-50 scrollbar-hide">
                      <button
                        onClick={() => { setSelectedTech("All Tech"); setIsDropdownOpen(null); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${selectedTech === "All Tech" ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300'}`}
                      >
                        All Tech
                      </button>
                      {availableTech.map(tech => (
                        <button
                          key={tech}
                          onClick={() => { setSelectedTech(tech); setIsDropdownOpen(null); }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${selectedTech === tech ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300'}`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(isDropdownOpen === 'sort' ? null : 'sort')}
                    className="flex items-center gap-2 h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors min-w-[140px]"
                  >
                    <Zap className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{sortOptions.find(s => s.value === sortBy)?.label}</span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isDropdownOpen === 'sort' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen === 'sort' && (
                    <div className="absolute top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden z-50">
                      {sortOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value); setIsDropdownOpen(null); }}
                          className={`w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortBy === option.value ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300'}`}
                        >
                          <option.icon className="w-4 h-4" />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                    className="h-12 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}

                <div className="flex bg-white/5 rounded-xl border border-white/10 p-1 h-12">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <span className="text-gray-400 text-sm">
              Showing <span className="text-white font-semibold">{filteredProjects.length}</span> of {pagination.total} projects
            </span>
            {loading && <Loader2 className="w-5 h-5 animate-spin text-blue-500" />}
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400">{error}</span>
              <Button onClick={() => fetchProjects()} variant="outline" size="sm" className="ml-auto border-red-500/30 text-red-400">
                Retry
              </Button>
            </div>
          )}

          {!loading && featuredProject && !searchQuery && activeCategory === "all" && selectedTag === "All Tags" && selectedTech === "All Tech" && (
            <div 
              ref={bannerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={tiltStyle}
              className="relative rounded-3xl bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-cyan-900/50 border border-white/20 p-1 mb-16 group cursor-pointer"
              onClick={() => router.push(`/projects/${featuredProject.slug}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative rounded-3xl bg-[#0a0a0a] overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 py-1">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400" />
                        Featured Project
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Top Rated</Badge>
                    </div>
                    
                    <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                      {featuredProject.title}
                    </h2>
                    
                    <p className="text-xl text-gray-400 leading-relaxed">
                      {featuredProject.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {featuredProject.techStack?.slice(0, 5).map(tech => (
                        <Badge key={tech} variant="secondary" className="bg-white/10 text-gray-300 border-0">
                          {tech}
                        </Badge>
                      ))}
                      {featuredProject.tags?.slice(0, 3).map(tag => (
                        <Badge key={tag} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {featuredProject.owner && (
                      <div className="flex items-center gap-4 pt-4">
                        {featuredProject.owner.avatar ? (
                          <img 
                            src={featuredProject.owner.avatar} 
                            alt={featuredProject.owner.fullName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                            {featuredProject.owner.fullName?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-white font-semibold">{featuredProject.owner.fullName}</p>
                          <p className="text-sm text-gray-500">Project Creator</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <Button className="bg-white text-black hover:bg-gray-200 rounded-xl h-12 px-6">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                      {featuredProject.github && (
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl h-12 px-6">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="relative lg:h-auto h-64">
                    {featuredProject.coverImage ? (
                      <img 
                        src={featuredProject.coverImage.url} 
                        alt={featuredProject.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600" />
                    )}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 rounded-2xl" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                      <div className="bg-black/50 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
                        <div className="text-2xl font-bold text-white">{featuredProject.viewCount || 0}</div>
                        <div className="text-xs text-gray-400">Views</div>
                      </div>
                      <div className="bg-black/50 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
                        <div className="text-2xl font-bold text-white">{featuredProject.likeCount || 0}</div>
                        <div className="text-xs text-gray-400">Likes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-3xl bg-[#0f0f0f] border border-white/10 p-6 animate-pulse">
                  <div className="h-48 bg-white/5 rounded-2xl mb-4" />
                  <div className="h-6 bg-white/5 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project._id} 
                    project={project} 
                    isLiked={likedProjects.has(project._id)}
                    onLike={(e) => toggleLike(e, project._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <ProjectListItem 
                    key={project._id} 
                    project={project} 
                    isLiked={likedProjects.has(project._id)}
                    onLike={(e) => toggleLike(e, project._id)}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-24">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
              <Button 
                variant="outline" 
                className="mt-6 border-white/10 text-white hover:bg-white/10"
                onClick={clearFilters}
              >
                Clear all filters
              </Button>
            </div>
          )}

          {!loading && pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <Button
                variant="outline"
                onClick={() => fetchProjects(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="border-white/10 text-white hover:bg-white/10 disabled:opacity-50"
              >
                Previous
              </Button>
              
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => fetchProjects(pageNum)}
                    className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                      pagination.page === pageNum 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <Button
                variant="outline"
                onClick={() => fetchProjects(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="border-white/10 text-white hover:bg-white/10 disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProjectCard({ project, isLiked, onLike }) {
  const router = useRouter();
  
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group relative rounded-3xl bg-[#0f0f0f] border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <div className="h-48 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          {project.coverImage ? (
            <img
              src={project.coverImage.url}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
          
          {/* Stats Overlay */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={onLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all ${
                isLiked ? 'bg-red-500/20 text-red-400 scale-110' : 'bg-black/50 text-white hover:bg-black/70'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''} transition-transform`} />
              <span className="text-sm font-medium">{(project.likeCount || 0) + (isLiked ? 1 : 0)}</span>
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-2">
              {project.techStack?.slice(0, 3).map(tech => (
                <Badge key={tech} className="bg-black/50 backdrop-blur-md text-white border-white/20 text-xs">
                  {tech}
                </Badge>
              ))}
              {project.techStack?.length > 3 && (
                <Badge className="bg-black/50 backdrop-blur-md text-white border-white/20 text-xs">
                  +{project.techStack.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
            {project.shortDescription}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              {project.owner && (
                <div className="flex items-center gap-2">
                  {project.owner.avatar ? (
                    <img src={project.owner.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                      {project.owner.fullName?.[0] || "U"}
                    </div>
                  )}
                  <span className="text-sm text-gray-400 truncate max-w-[100px]">
                    {project.owner.fullName}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <span className="flex items-center gap-1 text-sm">
                <Eye className="w-4 h-4" />
                {project.viewCount || 0}
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ProjectListItem({ project, isLiked, onLike }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group flex gap-6 p-6 rounded-3xl bg-[#0f0f0f] border border-white/10 hover:border-blue-500/30 transition-all">
        <div className="w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900">
          {project.coverImage ? (
            <img
              src={project.coverImage.url}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.techStack?.map(tech => (
                  <Badge key={tech} className="bg-white/5 text-gray-400 border-white/10">
                    {tech}
                  </Badge>
                ))}
                {project.tags?.map(tag => (
                  <Badge key={tag} className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <button
                onClick={onLike}
                className={`flex items-center gap-1.5 hover:text-red-400 transition-colors ${
                  isLiked ? 'text-red-400' : ''
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{(project.likeCount || 0) + (isLiked ? 1 : 0)}</span>
              </button>
              <div className="flex items-center gap-1.5">
                <Eye className="w-5 h-5" />
                <span className="text-sm">{project.viewCount || 0}</span>
              </div>
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}