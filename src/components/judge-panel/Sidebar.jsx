import { Button } from "@/components/ui/button";
import { Gavel, Home, Users, Trophy, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('judgeToken');
    router.push('/judge-panel/login');
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/10 z-40">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Gavel className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Judge Panel</h1>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        <Link href="/judge-panel/dashboard">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/10"
          >
            <Home className="w-4 h-4 mr-3" />
            Dashboard
          </Button>
        </Link>
        <Link href="/judge-panel/submissions">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/10"
          >
            <Trophy className="w-4 h-4 mr-3" />
            Submissions
          </Button>
        </Link>
        <Link href="/judge-panel/leaderboard">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/10"
          >
            <Users className="w-4 h-4 mr-3" />
            Leaderboard
          </Button>
        </Link>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="outline"
          className="w-full justify-start border-white/20 text-white hover:bg-white/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}