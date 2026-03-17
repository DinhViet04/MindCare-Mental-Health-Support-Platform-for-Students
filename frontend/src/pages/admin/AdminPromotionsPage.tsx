import React from 'react';

const promotions = [
    { id: '1', title: 'Spring Wellness Week', discount: '25% Off', code: 'SPRING25', usedCount: 128, validUntil: 'Mar 31, 2026', status: 'active' },
    { id: '2', title: 'Referral Bonus', discount: '$15 Credit', code: 'REFER15', usedCount: 243, validUntil: 'Jun 30, 2026', status: 'active' },
    { id: '3', title: 'Premium Upgrade Sale', discount: '40% Off', code: 'PREMIUM40', usedCount: 57, validUntil: 'Apr 15, 2026', status: 'active' },
    { id: '4', title: 'Holiday Special', discount: '35% Off', code: 'HOLIDAY35', usedCount: 501, validUntil: 'Jan 1, 2026', status: 'expired' },
];

const AdminPromotionsPage: React.FC = () => {
    return (
        <div className="p-6 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Promotions</h1>
                    <p className="text-slate-500 text-sm">Create and manage promotional campaigns and special offers.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Create Promotion
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {promotions.map(p => (
                    <div key={p.id} className={`bg-white dark:bg-slate-800 rounded-xl border-2 overflow-hidden ${p.status === 'active' ? 'border-primary/30' : 'border-slate-200 dark:border-slate-700 opacity-60'}`}>
                        <div className={`p-4 ${p.status === 'active' ? 'bg-gradient-to-r from-primary/10 to-teal-400/10' : 'bg-slate-50 dark:bg-slate-700/30'}`}>
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold">{p.title}</h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500'}`}>
                                    {p.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-5 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Discount</span>
                                <span className="font-bold text-primary">{p.discount}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Code</span>
                                <span className="font-mono font-bold">{p.code}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Uses</span>
                                <span className="font-semibold">{p.usedCount}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Expires</span>
                                <span className="font-semibold">{p.validUntil}</span>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    Edit
                                </button>
                                <button className="flex-1 py-2 border border-red-200 dark:border-red-800 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                    {p.status === 'active' ? 'Deactivate' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPromotionsPage;
