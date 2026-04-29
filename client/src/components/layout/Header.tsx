'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CalendarDays, LogOut, User } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <CalendarDays className="w-6 h-6" />
          <span>EventPlanner</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
            <User className="w-4 h-4" />
            <span>{user?.name || user?.email}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="w-5 h-5 text-slate-500" />
          </Button>
        </div>
      </div>
    </header>
  );
}
