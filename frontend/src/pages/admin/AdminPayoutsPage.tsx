import React, { useState } from 'react';

const payouts = [
    { id: 'P001', expert: 'Dr. Sarah Jenkins', amount: 580.00, sessions: 7, method: 'Bank Transfer', status: 'pending', date: 'Mar 1, 2026' },
    { id: 'P002', expert: 'Dr. Michael Torres', amount: 720.00, sessions: 9, method: 'PayPal', status: 'completed', date: 'Feb 1, 2026' },
    { id: 'P003', expert: 'Dr. Linda Park', amount: 480.00, sessions: 6, method: 'MoMo', status: 'completed', date: 'Feb 1, 2026' },
    { id: 'P004', expert: 'Dr. James Wilson', amount: 340.00, sessions: 4, method: 'Bank Transfer', status: 'failed', date: 'Jan 1, 2026' },
    { id: 'P005', expert: 'Dr. Emma Davis', amount: 620.00, sessions: 8, method: 'Bank Transfer', status: 'pending', date: 'Mar 1, 2026' },
];

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const AdminPayoutsPage: React.FC = () => {
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? payouts : payouts.filter(p => p.status === filter);
    const totalPending = payouts.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);

    return (
        <div className="p-6 max-w-6xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Expert Payouts</h1>
                <p className="text-slate-500 text-sm">Manage and process payout requests from experts.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: 'Pending Payouts', value: `$${totalPending.toFixed(2)}`, icon: 'schedule', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
                    { label: 'This Month Paid', value: '$1,300.00', icon: 'check_circle', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
                    { label: 'Total Experts', value: '5', icon: 'people', color: 'text-primary', bg: 'bg-primary/10' },
                ].map(s => (
                    <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                        <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                            <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
                        </div>
                        <p className="text-2xl font-bold mb-1">{s.value}</p>
                        <p className="text-xs text-slate-500">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-4">
                {['all', 'pending', 'completed', 'failed'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === f ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'}`}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-6 py-3 text-left">Expert</th>
                            <th className="px-6 py-3 text-left">Sessions</th>
                            <th className="px-6 py-3 text-left">Method</th>
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filtered.map(p => (
                            <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                <td className="px-6 py-4 font-semibold">{p.expert}</td>
                                <td className="px-6 py-4 text-slate-500">{p.sessions}</td>
                                <td className="px-6 py-4 text-slate-500">{p.method}</td>
                                <td className="px-6 py-4 text-slate-500">{p.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[p.status]}`}>
                                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-bold">${p.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 text-center">
                                    {p.status === 'pending' && (
                                        <button className="px-3 py-1 bg-primary text-slate-900 text-xs font-bold rounded-lg hover:bg-primary/90 transition-all">
                                            Approve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPayoutsPage;
