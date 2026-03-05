"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/judge-panel/Sidebar";

export default function JudgePanelLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('judgeToken');
    if (!token) {
      router.push('/judge-panel/login');
    }
  }, [router]);

  const token = localStorage.getItem('judgeToken');
  if (!token) {
    return null; // Render nothing while redirecting
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