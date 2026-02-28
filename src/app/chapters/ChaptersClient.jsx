"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Building2, Users, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ChapterCard from "@/components/chapters/ChapterCard";
import ChapterFilters from "@/components/chapters/ChapterFilters";
import Pagination from "@/components/chapters/Pagination";
import { fetchColleges } from "@/lib/api/colleges";

export default function ChaptersClient({ initialColleges, initialTotal }) {
    const [colleges, setColleges] = useState(initialColleges || []);
    const [total, setTotal] = useState(initialTotal || 0);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        search: "",
        city: "",
        state: "",
        tier: "",
        status: "ACTIVE",
        minRating: "",
        sortBy: ""
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12
    });
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const loadColleges = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchColleges(filters, pagination);
            setColleges(data.colleges || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error("Error loading colleges:", error);
        } finally {
            setLoading(false);
        }
    }, [filters, pagination]);

    useEffect(() => {
        loadColleges();
    }, [loadColleges]);

    function handleFilterChange(newFilters) {
        setFilters(newFilters);
        setPagination(prev => ({ ...prev, page: 1 }));
    }

    function handlePageChange(newPage) {
        setPagination(prev => ({ ...prev, page: newPage }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleClearFilters() {
        setFilters({
            search: "",
            city: "",
            state: "",
            tier: "",
            status: "ACTIVE",
            minRating: "",
            sortBy: ""
        });
    }

    const totalPages = Math.ceil(total / pagination.limit);

    const hasActiveFilters = Object.values(filters).some(v => v && v !== "" && v !== "ACTIVE");

    const activeFilterCount = Object.entries(filters).filter(([k, v]) => v && v !== "" && k !== "status").length;

    return (
        <div className="min-h-screen bg-black">
            <section className="relative py-5 md:py-8 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-black to-black" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                <div className="relative max-w-7xl mx-auto text-center">

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Chapters</span>
                    </h1>

                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <Input
                            placeholder="Search by college name, city, or state..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
                            className="w-full pl-12 pr-4 py-5 bg-white/5 border-white/10 text-white text-base rounded-xl focus:border-blue-500 placeholder:text-gray-600"
                        />
                    </div>

                    <div className="flex justify-center gap-6 md:gap-8 mt-2">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white">{total}+</div>
                            <div className="text-xs md:text-sm text-gray-500">Active Chapters</div>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white">50K+</div>
                            <div className="text-xs md:text-sm text-gray-500">Students</div>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white">100+</div>
                            <div className="text-xs md:text-sm text-gray-500">Events/Year</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 pb-20 pt-5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:hidden flex items-center justify-between mb-4">
                            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                                        Filters
                                        {activeFilterCount > 0 && (
                                            <Badge className="ml-2 bg-blue-500 text-white text-xs">
                                                {activeFilterCount}
                                            </Badge>
                                        )}
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="bg-[#0f0f0f] border-white/10 w-80">
                                    <SheetHeader className="pb-4 border-b border-white/10">
                                        <SheetTitle className="text-white">Filters</SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-6">
                                        <ChapterFilters
                                            filters={filters}
                                            onFilterChange={handleFilterChange}
                                            totalResults={total}
                                        />
                                        {hasActiveFilters && (
                                            <Button
                                                onClick={handleClearFilters}
                                                className="w-full mt-6 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30"
                                                variant="outline"
                                            >
                                                <X className="w-4 h-4 mr-2" />
                                                Clear all filters
                                            </Button>
                                        )}
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <p className="text-gray-400 text-sm">
                                Showing <span className="text-white font-medium">{colleges.length}</span> of <span className="text-white font-medium">{total}</span>
                            </p>
                        </div>

                        <aside className="hidden lg:block w-64 flex-shrink-0">
                            <div className="sticky top-24">
                                <div className="rounded-2xl bg-[#0f0f0f] border border-white/10 p-5">
                                    <div className="flex items-center justify-between mb-5">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <SlidersHorizontal className="w-5 h-5" />
                                            Filters
                                        </h3>
                                        {hasActiveFilters && (
                                            <button
                                                onClick={handleClearFilters}
                                                className="text-sm text-blue-400 hover:text-blue-300"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                    <ChapterFilters
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                        totalResults={total}
                                    />
                                </div>
                            </div>
                        </aside>

                        <div className="flex-1 min-w-0">
                            <div className="hidden lg:flex items-center justify-between mb-6">
                                <p className="text-gray-400">
                                    Showing <span className="text-white font-medium">{colleges.length}</span> of <span className="text-white font-medium">{total}</span> chapters
                                </p>
                                
                                {hasActiveFilters && (
                                    <div className="flex gap-2 flex-wrap justify-end">
                                        {Object.entries(filters).map(([key, value]) => {
                                            if (!value || key === "search" || key === "status") return null;
                                            return (
                                                <Badge 
                                                    key={key}
                                                    className="bg-blue-500/20 text-blue-400 border-blue-500/30 cursor-pointer hover:bg-blue-500/30"
                                                    onClick={() => handleFilterChange({ ...filters, [key]: "" })}
                                                >
                                                    {key}: {value} <X className="w-3 h-3 ml-1" />
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="rounded-2xl bg-[#0f0f0f] border border-white/10 overflow-hidden">
                                            <Skeleton className="h-28 w-full bg-white/5" />
                                            <div className="p-4 pt-8">
                                                <Skeleton className="h-5 w-3/4 mb-2 bg-white/5" />
                                                <Skeleton className="h-3 w-1/2 mb-3 bg-white/5" />
                                                <Skeleton className="h-3 w-full mb-2 bg-white/5" />
                                                <Skeleton className="h-6 w-16 bg-white/5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    {colleges.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                            {colleges.map((college) => (
                                                <ChapterCard key={college._id} college={college} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-16 rounded-2xl bg-[#0f0f0f] border border-white/10">
                                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                                                <Building2 className="w-10 h-10 text-gray-500" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-white mb-2">No chapters found</h3>
                                            <p className="text-gray-400 max-w-md mx-auto px-4">
                                                Try adjusting your filters or search query to find what you&apos;re looking for.
                                            </p>
                                            {hasActiveFilters && (
                                                <Button
                                                    onClick={handleClearFilters}
                                                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                                                >
                                                    Clear all filters
                                                </Button>
                                            )}
                                        </div>
                                    )}

                                    {colleges.length > 0 && (
                                        <Pagination
                                            currentPage={pagination.page}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
