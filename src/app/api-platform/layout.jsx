"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiPlatform } from "@/app/context/ApiPlatformContext";
import Sidebar from "@/components/api-platform/Sidebar";
import { motion } from "framer-motion";

export default function ApiPlatformLayout({ children }) {
  const { isAuthenticated, loading } = useApiPlatform();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/platform-login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
