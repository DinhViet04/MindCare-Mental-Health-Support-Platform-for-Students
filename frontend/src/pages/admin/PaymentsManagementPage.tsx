import React, { useState } from 'react';

const payments = [
    { id: 'PAY001', user: 'Alex Johnson', expert: 'Dr. Sarah Jenkins', amount: 85.00, method: 'Credit Card', date: 'Mar 8, 2026', status: 'completed' },
    { id: 'PAY002', user: 'Maria Lopez', amount: 29.99, method: 'PayPal', date: 'Mar 7, 2026', status: 'completed', expert: 'Subscription' },
    { id: 'PAY003', user: 'James Kim', expert: 'Dr. Linda Park', amount: 75.00, method: 'Wallet', date: 'Mar 6, 2026', status: 'refunded' },
    { id: 'PAY004', user: 'Sophie Nguyen', expert: 'Dr. Sarah Jenkins', amount: 40.00, method: 'Credit Card', date: 'Mar 5, 2026', status: 'pending' },
    { id: 'PAY005', user: 'David Chen', expert: 'Dr. Michael Torres', amount: 85.00, method: 'Credit Card', date: 'Mar 4, 2026', status: 'failed' },
];

const statusColors: Record<string, string> = {
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    refunded: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const PaymentsManagementPage: React.FC = () => {
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? payments : payments.filter(p => p.status === filter);
    const totalRevenue = payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);

    return (
        <div className="p-6 max-w-6xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Payments Management</h1>
                <p className="text-slate-500 text-sm">Monitor all platform transactions and payment activities.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: 'payments', color: 'text-primary', bg: 'bg-primary/10' },
                    { label: 'Transactions', value: payments.length, icon: 'receipt_long', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    { label: 'Refunds', value: payments.filter(p => p.status === 'refunded').length, icon: 'undo', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                    { label: 'Failed', value: payments.filter(p => p.status === 'failed').length, icon: 'error', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
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

            {/* Filters */}
            <div className="flex gap-2 mb-4">
                {['all', 'completed', 'pending', 'refunded', 'failed'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'}`}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">User</th>
                            <th className="px-6 py-3 text-left">Description</th>
                            <th className="px-6 py-3 text-left">Method</th>
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filtered.map(p => (
                            <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs text-slate-400">{p.id}</td>
                                <td className="px-6 py-4 font-semibold">{p.user}</td>
                                <td className="px-6 py-4 text-slate-500">{p.expert}</td>
                                <td className="px-6 py-4 text-slate-500">{p.method}</td>
                                <td className="px-6 py-4 text-slate-500">{p.date}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[p.status]}`}>{p.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right font-bold">${p.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentsManagementPage;
