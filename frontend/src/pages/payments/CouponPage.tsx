import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CouponPage: React.FC = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [applied, setApplied] = useState<{ code: string; discount: string } | null>(null);
    const [error, setError] = useState('');

    const availableCoupons = [
        { code: 'MINDCARE20', discount: '20% off', description: 'Get 20% off your next session', expires: 'Mar 31, 2026', icon: 'local_offer' },
        { code: 'FIRST10', discount: '$10 off', description: 'First-time user discount', expires: 'Jun 30, 2026', icon: 'redeem' },
        { code: 'WELLNESS15', discount: '15% off', description: 'Wellness promotion discount', expires: 'Apr 15, 2026', icon: 'favorite' },
    ];

    const handleApply = () => {
        const found = availableCoupons.find(c => c.code.toLowerCase() === code.toLowerCase().trim());
        if (found) {
            setApplied({ code: found.code, discount: found.discount });
            setError('');
        } else {
            setApplied(null);
            setError('Invalid or expired coupon code.');
        }
    };

    const handleUse = (couponCode: string) => {
        setCode(couponCode);
        setApplied({ code: couponCode, discount: availableCoupons.find(c => c.code === couponCode)?.discount || '' });
        setError('');
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <main className="max-w-3xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold mb-2">My Coupons</h1>
                    <p className="text-slate-500">Enter a coupon code to unlock savings on your next booking.</p>
                </div>

                {/* Apply Coupon */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
                    <h3 className="font-bold mb-4">Apply Coupon Code</h3>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={code}
                            onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); setApplied(null); }}
                            placeholder="Enter coupon code..."
                            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none uppercase font-mono tracking-widest"
                        />
                        <button
                            onClick={handleApply}
                            disabled={!code.trim()}
                            className="px-6 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Apply
                        </button>
                    </div>

                    {applied && (
                        <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-600">check_circle</span>
                            <div>
                                <p className="font-bold text-green-700 dark:text-green-400">Coupon applied! You save {applied.discount}</p>
                                <p className="text-xs text-green-600 dark:text-green-500">Code: {applied.code}</p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-red-500">error</span>
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}
                </div>

                {/* Available Coupons */}
                <h3 className="font-bold text-lg mb-4">Available Coupons</h3>
                <div className="space-y-4">
                    {availableCoupons.map(coupon => (
                        <div key={coupon.code} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex">
                            {/* Left stripe */}
                            <div className="w-2 bg-primary flex-shrink-0" />
                            <div className="flex-1 p-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-primary">{coupon.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-mono font-bold text-primary tracking-widest">{coupon.code}</span>
                                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{coupon.discount}</span>
                                    </div>
                                    <p className="text-sm text-slate-500">{coupon.description}</p>
                                    <p className="text-xs text-slate-400 mt-1">Expires: {coupon.expires}</p>
                                </div>
                                <button
                                    onClick={() => handleUse(coupon.code)}
                                    className="px-4 py-2 border border-primary text-primary text-sm font-bold rounded-lg hover:bg-primary hover:text-slate-900 transition-all"
                                >
                                    Use
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                <div className="mt-8 text-center text-slate-400 text-sm">
                    <span className="material-symbols-outlined text-3xl mb-2 block">confirmation_number</span>
                    <p>Have a coupon from a newsletter? Enter it above!</p>
                </div>
            </main>
        </div>
    );
};

export default CouponPage;
