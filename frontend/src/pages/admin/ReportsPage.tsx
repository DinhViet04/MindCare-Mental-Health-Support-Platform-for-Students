import React, { useState } from 'react';

const AdminReportsPage: React.FC = () => {
    const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('month');

    const monthlyData = [
        { month: 'Oct', users: 120, sessions: 340, revenue: 4200 },
        { month: 'Nov', users: 145, sessions: 420, revenue: 5100 },
        { month: 'Dec', users: 130, sessions: 390, revenue: 4800 },
        { month: 'Jan', users: 180, sessions: 510, revenue: 6200 },
        { month: 'Feb', users: 210, sessions: 580, revenue: 7100 },
        { month: 'Mar', users: 230, sessions: 640, revenue: 7800 },
    ];

    const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

    const topExperts = [
        { name: 'Dr. Sarah Jenkins', sessions: 148, revenue: 12580, rating: 4.9 },
        { name: 'Dr. Michael Torres', sessions: 121, revenue: 9680, rating: 4.8 },
        { name: 'Dr. Linda Park', sessions: 98, revenue: 7350, rating: 4.7 },
        { name: 'Dr. Emma Davis', sessions: 87, revenue: 6960, rating: 4.9 },
    ];

    return (
        <div className="p-6 max-w-6xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Reports & Analytics</h1>
                    <p className="text-slate-500 text-sm">Platform-wide performance overview and insights.</p>
                </div>
                <div className="flex gap-2">
                    {(['week', 'month', 'quarter'] as const).map(p => (
                        <button key={p} onClick={() => setPeriod(p)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${period === p ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'}`}>
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                    ))}
                    <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total Revenue', value: '$7,800', change: '+9.8%', icon: 'payments', up: true },
                    { label: 'New Users', value: '230', change: '+9.5%', icon: 'person_add', up: true },
                    { label: 'Sessions', value: '640', change: '+10.3%', icon: 'video_call', up: true },
                    { label: 'Avg. Rating', value: '4.82', change: '+0.05', icon: 'star', up: true },
                ].map(s => (
                    <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                            <span className="material-symbols-outlined text-primary">{s.icon}</span>
                        </div>
                        <p className="text-2xl font-bold mb-1">{s.value}</p>
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-slate-500">{s.label}</span>
                            <span className={`text-xs font-bold ml-1 ${s.up ? 'text-green-600' : 'text-red-500'}`}>{s.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
                <h3 className="font-bold text-lg mb-5">Monthly Revenue</h3>
                <div className="flex items-end gap-4 h-40">
                    {monthlyData.map(d => (
                        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                            <p className="text-xs font-bold">${(d.revenue / 1000).toFixed(1)}k</p>
                            <div style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                                className="w-full bg-gradient-to-t from-primary to-teal-300 rounded-t-lg" />
                            <p className="text-xs text-slate-500">{d.month}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Experts */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold">Top Performing Experts</h3>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-6 py-3 text-left">Expert</th>
                            <th className="px-6 py-3 text-center">Sessions</th>
                            <th className="px-6 py-3 text-center">Rating</th>
                            <th className="px-6 py-3 text-right">Revenue</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {topExperts.map((e, i) => (
                            <tr key={e.name} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">{i + 1}</div>
                                        <span className="font-semibold">{e.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center font-semibold">{e.sessions}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="flex items-center justify-center gap-1 text-amber-500 font-semibold">
                                        <span className="material-symbols-outlined text-sm">star</span>{e.rating}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-primary">${e.revenue.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminReportsPage;
