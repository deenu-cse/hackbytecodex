"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  SlidersHorizontal, 
  X,
  ChevronDown,
  Banknote,
  Calendar as CalendarIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const eventTypes = ["ALL", "HACKATHON", "WORKSHOP", "SEMINAR", "COMPETITION"];
const modes = ["ALL", "ONLINE", "OFFLINE", "HYBRID"];

export function EventFilters({ filters, onFilterChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [date, setDate] = useState();

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'search') return false;
    if (Array.isArray(value)) return value[0] > 0;
    return value && value !== "ALL";
  }).length;

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Primary Row */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-1 gap-3 w-full lg:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search events, colleges..."
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl"
                value={filters.search}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              />
              {filters.search && (
                <button 
                  onClick={() => onFilterChange({ ...filters, search: "" })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <Select 
              value={filters.eventType} 
              onValueChange={(v) => onFilterChange({ ...filters, eventType: v })}
            >
              <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white rounded-xl">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f0f0f] border-white/10 text-white">
                {eventTypes.map(type => (
                  <SelectItem key={type} value={type} className="focus:bg-white/10 focus:text-white">
                    {type === "ALL" ? "All Types" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.mode} 
              onValueChange={(v) => onFilterChange({ ...filters, mode: v })}
            >
              <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white rounded-xl">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f0f0f] border-white/10 text-white">
                {modes.map(mode => (
                  <SelectItem key={mode} value={mode} className="focus:bg-white/10 focus:text-white">
                    {mode === "ALL" ? "All Modes" : mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`border-white/10 hover:bg-white/5 hover:text-white text-white bg-blue-600 cursor-pointer rounded-xl gap-2 ${isExpanded ? 'bg-white/10 border-blue-500/50' : ''}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Advanced</span>
              {activeFiltersCount > 0 && (
                <Badge className="ml-1 bg-blue-600 text-white border-0 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Sort by:</span>
            <Select 
              value={filters.sortBy} 
              onValueChange={(v) => onFilterChange({ ...filters, sortBy: v })}
            >
              <SelectTrigger className="w-[140px] bg-transparent border-0 text-blue-400 font-medium hover:text-blue-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0f0f0f] border-white/10 text-white">
                <SelectItem value="createdAt">Newest First</SelectItem>
                <SelectItem value="startDate">Event Date</SelectItem>
                <SelectItem value="registration.fee">Price: Low to High</SelectItem>
                <SelectItem value="performance.score">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Expanded Advanced Filters */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fee Range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2">
                  <Banknote className="w-4 h-4" />
                  Registration Fee
                </span>
                <span className="text-white font-medium">
                  ₹{filters.minFee} - ₹{filters.maxFee === 10000 ? "10k+" : filters.maxFee}
                </span>
              </div>
              <Slider
                defaultValue={[filters.minFee, filters.maxFee]}
                max={10000}
                step={100}
                onValueChange={([min, max]) => onFilterChange({ ...filters, minFee: min, maxFee: max })}
                className="py-2"
              />
            </div>

            {/* Date Filter */}
            <div className="space-y-3">
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Event Date
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl hover:text-white cursor-pointer"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#0f0f0f] border-white/10" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      onFilterChange({ ...filters, startDate: d });
                    }}
                    initialFocus
                    className="bg-transparent text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Status Filters */}
            <div className="space-y-3">
              <span className="text-gray-400 text-sm">Registration Status</span>
              <div className="flex gap-2">
                <Button
                  variant={filters.isOpen === undefined ? "default" : "outline"}
                  onClick={() => onFilterChange({ ...filters, isOpen: undefined })}
                  className={`flex-1 rounded-xl bg-white/5 hover:text-white cursor-pointer ${filters.isOpen === undefined ? 'bg-blue-600 hover:bg-blue-700' : 'border-white/10 hover:bg-white/5 text-white'}`}
                >
                  All
                </Button>
                <Button
                  variant={filters.isOpen === true ? "default" : "outline"}
                  onClick={() => onFilterChange({ ...filters, isOpen: true })}
                  className={`flex-1 bg-white/5 hover:text-white cursor-pointer rounded-xl ${filters.isOpen === true ? 'bg-green-600 hover:bg-green-700' : 'border-white/10 hover:bg-white/5 text-white'}`}
                >
                  Open
                </Button>
                <Button
                  variant={filters.isOpen === false ? "default" : "outline"}
                  onClick={() => onFilterChange({ ...filters, isOpen: false })}
                  className={`flex-1 bg-white/5 hover:text-white cursor-pointer rounded-xl ${filters.isOpen === false ? 'bg-red-600 hover:bg-red-700' : 'border-white/10 hover:bg-white/5 text-white'}`}
                >
                  Closed
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
            {filters.eventType !== "ALL" && (
              <Badge 
                variant="secondary" 
                className="bg-white/5 text-white border-white/10 hover:bg-white/10 cursor-pointer gap-1"
                onClick={() => onFilterChange({ ...filters, eventType: "ALL" })}
              >
                {filters.eventType}
                <X className="w-3 h-3" />
              </Badge>
            )}
            {filters.mode !== "ALL" && (
              <Badge 
                variant="secondary" 
                className="bg-white/5 text-white border-white/10 hover:bg-white/10 cursor-pointer gap-1"
                onClick={() => onFilterChange({ ...filters, mode: "ALL" })}
              >
                {filters.mode}
                <X className="w-3 h-3" />
              </Badge>
            )}
            {(filters.minFee > 0 || filters.maxFee < 10000) && (
              <Badge 
                variant="secondary" 
                className="bg-white/5 text-white border-white/10 hover:bg-white/10 cursor-pointer gap-1"
                onClick={() => onFilterChange({ ...filters, minFee: 0, maxFee: 10000 })}
              >
                ₹{filters.minFee} - ₹{filters.maxFee}
                <X className="w-3 h-3" />
              </Badge>
            )}
            {filters.isOpen !== undefined && (
              <Badge 
                variant="secondary" 
                className="bg-white/5 text-white border-white/10 hover:bg-white/10 cursor-pointer gap-1"
                onClick={() => onFilterChange({ ...filters, isOpen: undefined })}
              >
                {filters.isOpen ? "Registration Open" : "Registration Closed"}
                <X className="w-3 h-3" />
              </Badge>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}