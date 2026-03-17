import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EarningsPage: React.FC = () => {
    const navigate = useNavigate();
    const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

    const earnings = [
        { id: 'E001', user: 'Alex Johnson', service: 'Individual Session (60 min)', date: 'Mar 8, 2026', gross: 85.00, fee: 12.75, net: 72.25 },
        { id: 'E002', user: 'Maria Lopez', service: 'Individual Session (45 min)', date: 'Mar 6, 2026', gross: 65.00, fee: 9.75, net: 55.25 },
        { id: 'E003', user: 'James Kim', service: 'Group Session', date: 'Mar 5, 2026', gross: 40.00, fee: 6.00, net: 34.00 },
        { id: 'E004', user: 'Sophie Nguyen', service: 'Individual Session (60 min)', date: 'Mar 3, 2026', gross: 85.00, fee: 12.75, net: 72.25 },
        { id: 'E005', user: 'David Chen', service: 'Individual Session (30 min)', date: 'Mar 1, 2026', gross: 45.00, fee: 6.75, net: 38.25 },
    ];

    const totalGross = earnings.reduce((s, e) => s + e.gross, 0);
    const totalFee = earnings.reduce((s, e) => s + e.fee, 0);
    const totalNet = earnings.reduce((s, e) => s + e.net, 0);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <main className="max-w-5xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">My Earnings</h1>
                            <p className="text-slate-500">Track your earnings, fees, and net income per session.</p>
                        </div>
                        <div className="flex gap-2">
                            {(['week', 'month', 'year'] as const).map(p => (
                                <button key={p} onClick={() => setPeriod(p)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${period === p ? 'bg-primary text-slate-900 shadow-md shadow-primary/20' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'}`}>
                                    {p.charAt(0).toUpperCase() + p.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-5 mb-8">
                    {[
                        { label: 'Gross Earnings', value: `$${totalGross.toFixed(2)}`, icon: 'payments', bg: 'bg-primary/10', color: 'text-primary', sub: '5 sessions' },
                        { label: 'Platform Fees (15%)', value: `-$${totalFee.toFixed(2)}`, icon: 'remove_circle', bg: 'bg-red-50 dark:bg-red-900/20', color: 'text-red-500', sub: 'Deducted' },
                        { label: 'Net Earnings', value: `$${totalNet.toFixed(2)}`, icon: 'account_balance_wallet', bg: 'bg-green-50 dark:bg-green-900/20', color: 'text-green-600', sub: 'Your take-home' },
                    ].map(s => (
                        <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
                                <span className={`material-symbols-outlined text-xl ${s.color}`}>{s.icon}</span>
                            </div>
                            <p className={`text-2xl font-bold mb-1 ${s.color}`}>{s.value}</p>
                            <p className="text-xs text-slate-500">{s.label}</p>
                            <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Earnings table */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <h3 className="font-bold text-lg">Earnings Breakdown</h3>
                        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors font-semibold">
                            <span className="material-symbols-outlined text-sm">download</span>
                            Export CSV
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                                    <th className="px-6 py-3 text-left">Client</th>
                                    <th className="px-6 py-3 text-left">Service</th>
                                    <th className="px-6 py-3 text-left">Date</th>
                                    <th className="px-6 py-3 text-right">Gross</th>
                                    <th className="px-6 py-3 text-right">Fee</th>
                                    <th className="px-6 py-3 text-right">Net</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {earnings.map(e => (
                                    <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                        <td className="px-6 py-4 font-semibold">{e.user}</td>
                                        <td className="px-6 py-4 text-slate-500 text-xs">{e.service}</td>
                                        <td className="px-6 py-4 text-slate-500">{e.date}</td>
                                        <td className="px-6 py-4 text-right font-semibold">${e.gross.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right text-red-500">-${e.fee.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-bold text-green-600">${e.net.toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr className="bg-slate-50 dark:bg-slate-700/50 font-bold">
                                    <td className="px-6 py-4" colSpan={3}>Total</td>
                                    <td className="px-6 py-4 text-right">${totalGross.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right text-red-500">-${totalFee.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right text-green-600">${totalNet.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Withdraw CTA */}
                <div className="mt-6 bg-gradient-to-r from-primary/10 to-teal-400/10 border border-primary/20 rounded-xl p-6 flex items-center justify-between">
                    <div>
                        <p className="font-bold text-lg">Ready to withdraw?</p>
                        <p className="text-sm text-slate-500">Your available balance: <span className="font-bold text-primary">${totalNet.toFixed(2)}</span></p>
                    </div>
                    <button onClick={() => navigate('/expert/withdraw')}
                        className="px-6 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        Withdraw Now
                    </button>
                </div>
            </main>
        </div>
    );
};

export default EarningsPage;
