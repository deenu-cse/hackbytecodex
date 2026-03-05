"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Key,
  Calendar,
  FormInput,
  Users,
  Gavel,
  BarChart3,
  Settings,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useApiPlatform } from "@/app/context/ApiPlatformContext";
import { useState } from "react";

const navItems = [
  { href: "/api-platform/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/api-platform/keys", label: "API Keys", icon: Key },
  { href: "/api-platform/events", label: "Events", icon: Calendar },
  { href: "/api-platform/forms", label: "Forms", icon: FormInput },
  { href: "/api-platform/registrations", label: "Registrations", icon: Users },
  { href: "/api-platform/judges", label: "Judges", icon: Gavel },
  { href: "/api-platform/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/api-platform/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, platformUser } = useApiPlatform();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-[#0a0a0a] border-r border-white/10 transition-all duration-300 z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        {!collapsed && (
          <Link href="/api-platform/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">API</span>
            </div>
            <span className="text-white font-semibold">Platform</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">API</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg hover:bg-white/10 text-gray-400"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              {isActive && !collapsed && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Docs Link */}
      <div className="absolute bottom-20 left-0 right-0 px-4">
        <Link
          href="/api-docs"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <FileText className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Documentation</span>}
        </Link>
      </div>

      {/* User & Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        {!collapsed && platformUser && (
          <div className="mb-3 px-3">
            <p className="text-xs text-gray-500">Platform ID</p>
            <p className="text-sm text-white font-mono">{platformUser.platformId}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
