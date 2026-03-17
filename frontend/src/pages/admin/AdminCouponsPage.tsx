import React, { useState } from 'react';

const AdminCouponsPage: React.FC = () => {
    const [coupons, setCoupons] = useState([
        { id: '1', code: 'MINDCARE20', discount: '20%', type: 'percentage', usageLimit: 100, usedCount: 43, validUntil: 'Mar 31, 2026', status: 'active' },
        { id: '2', code: 'FIRST10', discount: '$10', type: 'fixed', usageLimit: 500, usedCount: 312, validUntil: 'Jun 30, 2026', status: 'active' },
        { id: '3', code: 'WINTER30', discount: '30%', type: 'percentage', usageLimit: 50, usedCount: 50, validUntil: 'Jan 1, 2026', status: 'expired' },
        { id: '4', code: 'WELLNESS15', discount: '15%', type: 'percentage', usageLimit: 200, usedCount: 88, validUntil: 'Apr 15, 2026', status: 'active' },
    ]);

    const statusColors: Record<string, string> = {
        active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        expired: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
        draft: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
    };

    return (
        <div className="p-6 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Coupons</h1>
                    <p className="text-slate-500 text-sm">Create and manage discount coupon codes.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Create Coupon
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: 'Active Coupons', value: coupons.filter(c => c.status === 'active').length, icon: 'confirmation_number', color: 'text-primary', bg: 'bg-primary/10' },
                    { label: 'Total Uses', value: coupons.reduce((s, c) => s + c.usedCount, 0), icon: 'touch_app', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
                    { label: 'Expired', value: coupons.filter(c => c.status === 'expired').length, icon: 'event_busy', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
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

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-6 py-3 text-left">Code</th>
                            <th className="px-6 py-3 text-left">Discount</th>
                            <th className="px-6 py-3 text-left">Usage</th>
                            <th className="px-6 py-3 text-left">Expires</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {coupons.map(c => (
                            <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                <td className="px-6 py-4 font-mono font-bold text-primary">{c.code}</td>
                                <td className="px-6 py-4 font-semibold">{c.discount} {c.type === 'percentage' ? 'off' : 'discount'}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min((c.usedCount / c.usageLimit) * 100, 100)}%` }} />
                                        </div>
                                        <span className="text-xs text-slate-500">{c.usedCount}/{c.usageLimit}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{c.validUntil}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[c.status]}`}>{c.status}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-base">edit</span></button>
                                        <button onClick={() => setCoupons(prev => prev.filter(x => x.id !== c.id))} className="text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-base">delete</span></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCouponsPage;
