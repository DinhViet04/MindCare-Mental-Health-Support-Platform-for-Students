import React from 'react';
import { useNavigate } from 'react-router-dom';

const promotions = [
    {
        id: 'promo1',
        title: 'Spring Wellness Week',
        description: 'Save 25% on your first 3 sessions throughout March. Invest in your mental health this season.',
        discount: '25% Off',
        code: 'SPRING25',
        validUntil: 'Mar 31, 2026',
        category: 'Featured',
        color: 'from-emerald-500 to-teal-400',
        icon: 'eco',
    },
    {
        id: 'promo2',
        title: 'Referral Bonus',
        description: 'Refer a friend and both of you get $15 wallet credit when they complete their first session.',
        discount: '$15 Credit',
        code: 'REFER15',
        validUntil: 'Jun 30, 2026',
        category: 'Referral',
        color: 'from-purple-500 to-violet-400',
        icon: 'group_add',
    },
    {
        id: 'promo3',
        title: 'Premium Upgrade Discount',
        description: 'Upgrade to MindCare Premium at 40% off for your first 3 months and enjoy unlimited consultations.',
        discount: '40% Off',
        code: 'PREMIUM40',
        validUntil: 'Apr 15, 2026',
        category: 'Subscription',
        color: 'from-amber-500 to-orange-400',
        icon: 'workspace_premium',
    },
    {
        id: 'promo4',
        title: 'Weekend Wellness',
        description: 'Book a session on Saturday or Sunday and get 10% cashback directly to your wallet.',
        discount: '10% Cashback',
        code: 'WEEKEND10',
        validUntil: 'Mar 30, 2026',
        category: 'Cashback',
        color: 'from-blue-500 to-cyan-400',
        icon: 'weekend',
    },
];

const PromotionPage: React.FC = () => {
    const navigate = useNavigate();

    const handleUsePromo = (code: string) => {
        navigate(`/coupons?code=${code}`);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <main className="max-w-5xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-10">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold mb-2">Promotions & Offers</h1>
                    <p className="text-slate-500">Exclusive deals and discounts to help you on your wellness journey.</p>
                </div>

                {/* Featured Banner */}
                <div className="relative overflow-hidden bg-gradient-to-r from-primary via-teal-400 to-emerald-400 rounded-2xl p-8 mb-10 text-slate-900">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
                    <div className="relative z-10 max-w-lg">
                        <span className="bg-slate-900/20 text-slate-900 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">🔥 Limited Time</span>
                        <h2 className="text-3xl font-bold mb-2">Get 3 Sessions for the Price of 2</h2>
                        <p className="opacity-80 mb-6">Book a care plan and save $85 on your mental wellness journey this month.</p>
                        <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
                            Claim Offer
                        </button>
                    </div>
                </div>

                {/* Promo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {promotions.map(promo => (
                        <div key={promo.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            {/* Gradient Header */}
                            <div className={`bg-gradient-to-r ${promo.color} p-6`}>
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-2xl">{promo.icon}</span>
                                    </div>
                                    <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-full">
                                        {promo.discount}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-lg">{promo.title}</h3>
                                    <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 px-2 py-1 rounded-full">{promo.category}</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4">{promo.description}</p>

                                {/* Code Box */}
                                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-3 mb-4">
                                    <span className="material-symbols-outlined text-primary text-lg">confirmation_number</span>
                                    <span className="font-mono font-bold text-primary tracking-widest flex-1">{promo.code}</span>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(promo.code)}
                                        className="text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">content_copy</span>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-slate-400">Valid until {promo.validUntil}</p>
                                    <button
                                        onClick={() => handleUsePromo(promo.code)}
                                        className="px-4 py-2 bg-primary text-slate-900 text-sm font-bold rounded-lg hover:bg-primary/90 transition-all"
                                    >
                                        Use Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Note */}
                <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">info</span>
                    <p className="text-sm text-slate-500">Promotions cannot be combined. Only one discount applies per transaction. Terms and conditions may apply.</p>
                </div>
            </main>
        </div>
    );
};

export default PromotionPage;
