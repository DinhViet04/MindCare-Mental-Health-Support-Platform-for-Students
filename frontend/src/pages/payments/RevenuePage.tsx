import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RevenuePage: React.FC = () => {
    const navigate = useNavigate();
    const [period, setPeriod] = useState('month');

    const stats = [
        { label: 'Total Revenue', value: '$4,820.00', change: '+12.3%', up: true, icon: 'payments' },
        { label: 'Sessions Completed', value: '58', change: '+8', up: true, icon: 'video_call' },
        { label: 'Pending Payout', value: '$320.50', change: '', up: true, icon: 'schedule' },
        { label: 'Avg. Per Session', value: '$83.10', change: '+$4.20', up: true, icon: 'trending_up' },
    ];

    const recentPayouts = [
        { date: 'Mar 1, 2026', amount: 580.00, sessions: 7, status: 'paid' },
        { date: 'Feb 1, 2026', amount: 720.00, sessions: 9, status: 'paid' },
        { date: 'Jan 1, 2026', amount: 640.00, sessions: 8, status: 'paid' },
        { date: 'Dec 1, 2025', amount: 500.00, sessions: 6, status: 'paid' },
    ];

    const monthlyData = [
        { month: 'Oct', value: 480 },
        { month: 'Nov', value: 620 },
        { month: 'Dec', value: 500 },
        { month: 'Jan', value: 640 },
        { month: 'Feb', value: 720 },
        { month: 'Mar', value: 580 },
    ];

    const maxVal = Math.max(...monthlyData.map(d => d.value));

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <main className="max-w-5xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Revenue Overview</h1>
                            <p className="text-slate-500">Track your earnings and payout history.</p>
                        </div>
                        <button onClick={() => navigate('/expert/withdraw')} className="flex items-center gap-2 px-5 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                            <span className="material-symbols-outlined text-lg">north</span>
                            Withdraw
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map(s => (
                        <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                                <span className="material-symbols-outlined text-primary">{s.icon}</span>
                            </div>
                            <p className="text-2xl font-bold mb-1">{s.value}</p>
                            <p className="text-xs text-slate-500 mb-2">{s.label}</p>
                            {s.change && (
                                <span className={`text-xs font-bold ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                                    {s.change} vs last month
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Chart + Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Revenue Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg">Monthly Revenue</h3>
                            <div className="flex gap-2">
                                {['month', 'quarter', 'year'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPeriod(p)}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${period === p ? 'bg-primary text-slate-900' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                                            }`}
                                    >
                                        {p.charAt(0).toUpperCase() + p.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Bar Chart */}
                        <div className="flex items-end gap-4 h-40">
                            {monthlyData.map(d => (
                                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                                    <div
                                        className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden"
                                        style={{ height: `${(d.value / maxVal) * 100}%` }}
                                    >
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-teal-400 rounded-t-lg"
                                            style={{ height: '100%' }}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">{d.month}</p>
                                    <p className="text-xs font-bold">${d.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payout Breakdown */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                        <h3 className="font-bold text-lg mb-5">Earnings Split</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Your Earnings (80%)', value: '$3,856', color: 'bg-primary' },
                                { label: 'Platform Fee (15%)', value: '$723', color: 'bg-slate-300 dark:bg-slate-600' },
                                { label: 'Tax Withheld (5%)', value: '$241', color: 'bg-slate-200 dark:bg-slate-700' },
                            ].map(item => (
                                <div key={item.label}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">{item.label}</span>
                                        <span className="font-bold">{item.value}</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                        <div className={`h-full ${item.color} rounded-full`} style={{ width: item.label.includes('80') ? '80%' : item.label.includes('15') ? '15%' : '5%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Payout History */}
                <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-lg">Payout History</h3>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                        {recentPayouts.map((payout, i) => (
                            <div key={i} className="p-5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-600 text-lg">south</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">Payout — {payout.date}</p>
                                    <p className="text-xs text-slate-500">{payout.sessions} sessions completed</p>
                                </div>
                                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold px-2 py-1 rounded-full">
                                    {payout.status}
                                </span>
                                <span className="font-bold text-green-600">+${payout.amount.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RevenuePage;
