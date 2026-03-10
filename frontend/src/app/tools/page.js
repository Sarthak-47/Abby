'use client';

import { useState } from 'react';
import { Wind, NotebookPen, Sparkles } from 'lucide-react';

export default function ToolsPage() {
    const [activeTool, setActiveTool] = useState(null);

    const renderBreathing = () => (
        <div className="text-center p-12 bg-indigo-50 rounded-3xl animate-in fade-in duration-500">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">4-7-8 Breathing</h3>
            <div className="w-48 h-48 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse mb-8">
                <Wind className="w-16 h-16 text-teal-400" />
            </div>
            <p className="text-slate-600 text-lg">Inhale for 4s - Hold for 7s - Exhale for 8s</p>
        </div>
    );

    const renderJournal = () => (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" /> Daily Reflection
            </h3>
            <p className="text-slate-500 mb-4">What's one thing that went well today?</p>
            <textarea
                className="w-full h-40 p-4 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Start typing..."
            ></textarea>
            <div className="mt-4 flex justify-end">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition">Save Entry</button>
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Self-Help Tools</h1>
                <p className="text-slate-500">Guided exercises to help manage stress and find calm.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => setActiveTool('breathing')}
                    className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition text-left group"
                >
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl group-hover:scale-110 transition-transform">
                            <Wind className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">Breathing Exercise</h3>
                    </div>
                    <p className="text-slate-500 text-sm">Follow a guided 4-7-8 breathing pattern to quickly reduce anxiety.</p>
                </button>

                <button
                    onClick={() => setActiveTool('journal')}
                    className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition text-left group"
                >
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform">
                            <NotebookPen className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">Guided Journaling</h3>
                    </div>
                    <p className="text-slate-500 text-sm">Reflect on your day with structured, psychologically-informed prompts.</p>
                </button>
            </div>

            <div className="mt-8">
                {activeTool === 'breathing' && renderBreathing()}
                {activeTool === 'journal' && renderJournal()}
            </div>
        </div>
    );
}
