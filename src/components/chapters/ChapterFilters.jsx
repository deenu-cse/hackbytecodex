"use client";

import { useState, useEffect } from "react";
import { Search, X, SlidersHorizontal, MapPin, Trophy, Star, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchFilterOptions } from "@/lib/api/colleges";

const tiers = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];
const statuses = ["PENDING", "ACTIVE", "SUSPENDED"];
const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "score", label: "Performance Score" },
  { value: "events", label: "Most Events" },
  { value: "name", label: "Name (A-Z)" }
];

export default function ChapterFilters({ filters, onFilterChange, totalResults }) {
  const [filterOptions, setFilterOptions] = useState({ cities: [], states: [] });
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange({ ...filters, search: searchInput });
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  async function loadFilterOptions() {
    const options = await fetchFilterOptions();
    setFilterOptions(options);
  }

  function handleClearFilters() {
    setSearchInput("");
    onFilterChange({
      search: "",
      city: "",
      state: "",
      tier: "",
      status: "",
      minRating: "",
      sortBy: ""
    });
  }

  function hasActiveFilters() {
    return Object.values(filters).some(v => v && v !== "");
  }

  function getActiveFilterCount() {
    return Object.values(filters).filter(v => v && v !== "").length;
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <Search className="w-4 h-4" />
          Search
        </label>
        <Input
          placeholder="Search colleges..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
        />
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Sort By</label>
        <Select
          value={filters.sortBy || "default"}
          onValueChange={(value) => onFilterChange({ ...filters, sortBy: value === "default" ? "" : value })}
        >
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Select sort order" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-white/10">
            <SelectItem value="default" className="text-white">Default</SelectItem>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-white">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City Filter */}
      {filterOptions.cities?.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm text-gray-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            City
          </label>
          <Select
            value={filters.city || "all"}
            onValueChange={(value) => onFilterChange({ ...filters, city: value === "all" ? "" : value })}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 max-h-60">
              <SelectItem value="all" className="text-white">All Cities</SelectItem>
              {filterOptions.cities.map((city) => (
                <SelectItem key={city} value={city} className="text-white">
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* State Filter */}
      {filterOptions.states?.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm text-gray-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            State
          </label>
          <Select
            value={filters.state || "all"}
            onValueChange={(value) => onFilterChange({ ...filters, state: value === "all" ? "" : value })}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 max-h-60">
              <SelectItem value="all" className="text-white">All States</SelectItem>
              {filterOptions.states.map((state) => (
                <SelectItem key={state} value={state} className="text-white">
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Tier Filter */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          Tier
        </label>
        <div className="flex flex-wrap gap-2">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => onFilterChange({ 
                ...filters, 
                tier: filters.tier === tier ? "" : tier 
              })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                filters.tier === tier
                  ? tier === "BRONZE" ? "bg-orange-500/20 border-orange-500/50 text-orange-400"
                  : tier === "SILVER" ? "bg-gray-500/20 border-gray-500/50 text-gray-300"
                  : tier === "GOLD" ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                  : "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => onFilterChange({ 
                ...filters, 
                status: filters.status === status ? "" : status 
              })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                filters.status === status
                  ? status === "ACTIVE" ? "bg-green-500/20 border-green-500/50 text-green-400"
                  : status === "PENDING" ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                  : "bg-red-500/20 border-red-500/50 text-red-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Min Rating Filter */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 flex items-center gap-2">
          <Star className="w-4 h-4" />
          Minimum Rating
        </label>
        <Select
          value={filters.minRating?.toString() || "any"}
          onValueChange={(value) => onFilterChange({ 
            ...filters, 
            minRating: value === "any" ? "" : parseInt(value)
          })}
        >
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Any Rating" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-white/10">
            <SelectItem value="any" className="text-white">Any Rating</SelectItem>
            {[4, 3, 2, 1].map((rating) => (
              <SelectItem key={rating} value={rating.toString()} className="text-white">
                {rating}+ Stars
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    </div>
  );

  return <FilterContent />;
}