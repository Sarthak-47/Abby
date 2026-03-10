'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, PieChart, LogOut, Code } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

export default function Sidebar() {
    const pathname = usePathname();
    const logout = useAuthStore((state) => state.logout);

    const links = [
        { href: '/chat', label: 'Chat', icon: MessageSquare },
        { href: '/dashboard', label: 'Insights', icon: PieChart },
        { href: '/tools', label: 'Self-Help', icon: Code },
    ];

    return (
        <div className="w-64 bg-white border-r border-slate-100 flex flex-col h-full shadow-sm">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400">
                    Abby
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 text-slate-500 hover:text-red-500 px-4 py-2 w-full transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
}
