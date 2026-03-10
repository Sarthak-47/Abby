'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useAuthStore from '../../store/useAuthStore';
import { Activity, MessageCircle, TrendingUp } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = useAuthStore(state => state.token);

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5000/api/dashboard/summary', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => {
                    setData(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [token]);

    if (loading) return <div className="h-full flex items-center justify-center">Loading insights...</div>;
    if (!data) return <div className="h-full flex items-center justify-center">Error loading dashboard</div>;

    const chartData = {
        labels: Object.keys(data.emotionCounts),
        datasets: [
            {
                data: Object.values(data.emotionCounts),
                backgroundColor: [
                    '#6366f1', '#14b8a6', '#f43f5e', '#f59e0b', '#8b5cf6', '#64748b'
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Mental Health Insights</h1>
                <p className="text-slate-500">Your emotional journey over the past 7 days, analyzed by Abby.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
                    <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                        <MessageCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Messages Sent</p>
                        <p className="text-3xl font-bold text-slate-800">{data.totalMessages}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 md:col-span-2">
                    <h3 className="flex items-center space-x-2 font-semibold text-slate-700 mb-4">
                        <TrendingUp className="w-5 h-5 text-teal-500" />
                        <span>Abby's Weekly Analysis</span>
                    </h3>
                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-teal-50 rounded-2xl border border-indigo-50/50">
                        {data.insight ? (
                            <p className="text-slate-700 italic leading-relaxed text-lg">"{data.insight.aiSummary}"</p>
                        ) : (
                            <p className="text-slate-500">Chat more with Abby to generate insights for this week.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <h3 className="flex items-center space-x-2 text-xl font-bold text-slate-800 mb-8">
                    <Activity className="w-6 h-6 text-indigo-500" />
                    <span>Emotion Distribution</span>
                </h3>

                {Object.keys(data.emotionCounts).length > 0 ? (
                    <div className="h-80 flex justify-center">
                        <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} />
                    </div>
                ) : (
                    <div className="text-center py-10 text-slate-500">Not enough data to graph this week.</div>
                )}
            </div>

        </div>
    );
}
