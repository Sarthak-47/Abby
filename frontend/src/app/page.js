'use client';

import Link from 'next/link';
import { HeartPulse } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

export default function LandingPage() {
    const { user, loading } = useAuthStore();

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-100 relative overflow-hidden">
            {/* Decorative Blur Circles */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 text-center px-4 max-w-3xl">
                <div className="flex justify-center mb-6">
                    <div className="bg-white/50 p-4 rounded-full shadow-lg backdrop-blur-md">
                        <HeartPulse className="w-12 h-12 text-indigo-500" />
                    </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight mb-6">
                    Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400">Abby</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-light">
                    Your personal, AI-powered mental wellness companion. Reflect on your day, talk through your stress, and find clarity securely.
                </p>

                {!loading && (
                    <div className="space-x-4">
                        {user ? (
                            <Link href="/chat" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                Continue to Chat
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                    Get Started for Free
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
