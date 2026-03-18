import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentAnalyticsPage: React.FC = () => {
    const navigate = useNavigate();
    const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

    const stats = [
        { label: 'Total Revenue', value: '$24,680', change: '+18.4%', up: true, icon: 'payments' },
        { label: 'Transactions', value: '312', change: '+42', up: true, icon: 'receipt_long' },
        { label: 'Avg. Transaction', value: '$79.10', change: '+$3.20', up: true, icon: 'trending_up' },
        { label: 'Refund Rate', value: '2.3%', change: '-0.5%', up: true, icon: 'undo' },
    ];

    const monthlyRevenue = [
        { month: 'Oct', revenue: 1800, refunds: 120 },
        { month: 'Nov', revenue: 2200, refunds: 80 },
        { month: 'Dec', revenue: 2050, refunds: 150 },
        { month: 'Jan', revenue: 2600, refunds: 100 },
        { month: 'Feb', revenue: 2900, refunds: 90 },
        { month: 'Mar', revenue: 3200, refunds: 60 },
    ];

    const maxRev = Math.max(...monthlyRevenue.map(d => d.revenue));

    const paymentMethods = [
        { method: 'Credit Card', percent: 58, amount: '$14,314', color: 'bg-primary' },
        { method: 'Wallet', percent: 22, amount: '$5,430', color: 'bg-teal-400' },
        { method: 'PayPal', percent: 12, amount: '$2,962', color: 'bg-purple-400' },
        { method: 'Gift Card', percent: 8, amount: '$1,974', color: 'bg-amber-400' },
    ];

    const recentTx = [
        { id: 'T001', user: 'Alex J.', amount: 85.00, method: 'Card', status: 'completed', date: 'Mar 7, 2026' },
        { id: 'T002', user: 'Maria L.', amount: 60.00, method: 'Wallet', status: 'completed', date: 'Mar 6, 2026' },
        { id: 'T003', user: 'James K.', amount: 29.99, method: 'PayPal', status: 'pending', date: 'Mar 6, 2026' },
        { id: 'T004', user: 'Sophie N.', amount: 100.00, method: 'Card', status: 'refunded', date: 'Mar 5, 2026' },
        { id: 'T005', user: 'David R.', amount: 75.00, method: 'Gift Card', status: 'completed', date: 'Mar 5, 2026' },
    ];

    const statusColors: Record<string, string> = {
        completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        refunded: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <main className="max-w-6xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Payment Analytics</h1>
                            <p className="text-slate-500">Monitor revenue trends, transactions, and payment performance.</p>
                        </div>
                        <div className="flex gap-2">
                            {(['week', 'month', 'year'] as const).map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPeriod(p)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${period === p ? 'bg-primary text-slate-900 shadow-md shadow-primary/20' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'
                                        }`}
                                >
                                    {p.charAt(0).toUpperCase() + p.slice(1)}
                                </button>
                            ))}
                        </div>
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
                            <span className={`text-xs font-bold ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                                {s.change} vs last period
                            </span>
                        </div>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Revenue Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                        <h3 className="font-bold text-lg mb-6">Revenue vs Refunds</h3>
                        <div className="flex items-end gap-3 h-44">
                            {monthlyRevenue.map(d => (
                                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                                    <div className="w-full flex flex-col items-center" style={{ height: `${(d.revenue / maxRev) * 100}%` }}>
                                        {/* Refund portion */}
                                        <div style={{ height: `${(d.refunds / d.revenue) * 100}%` }}
                                            className="w-full bg-red-200 dark:bg-red-800/40 rounded-t-sm" />
                                        {/* Revenue */}
                                        <div style={{ height: `${(1 - d.refunds / d.revenue) * 100}%` }}
                                            className="w-full bg-gradient-to-t from-primary to-teal-300 rounded-t-lg" />
                                    </div>
                                    <p className="text-xs text-slate-500">{d.month}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-primary to-teal-300" />
                                <span className="text-xs text-slate-500">Revenue</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-sm bg-red-200 dark:bg-red-800/40" />
                                <span className="text-xs text-slate-500">Refunds</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                        <h3 className="font-bold text-lg mb-5">Payment Methods</h3>
                        <div className="space-y-4">
                            {paymentMethods.map(pm => (
                                <div key={pm.method}>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="font-medium">{pm.method}</span>
                                        <span className="font-bold text-slate-500">{pm.percent}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className={`h-full ${pm.color} rounded-full`} style={{ width: `${pm.percent}%` }} />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">{pm.amount}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <h3 className="font-bold text-lg">Recent Transactions</h3>
                        <button onClick={() => navigate('/transactions')} className="text-sm text-primary font-semibold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                                    <th className="px-6 py-3 text-left">ID</th>
                                    <th className="px-6 py-3 text-left">User</th>
                                    <th className="px-6 py-3 text-left">Method</th>
                                    <th className="px-6 py-3 text-left">Date</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {recentTx.map(tx => (
                                    <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-400">{tx.id}</td>
                                        <td className="px-6 py-4 font-semibold">{tx.user}</td>
                                        <td className="px-6 py-4 text-slate-500">{tx.method}</td>
                                        <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[tx.status]}`}>
                                                {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold">${tx.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PaymentAnalyticsPage;
