import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const plans = [
    {
        id: 'basic',
        name: 'Basic',
        price: 0,
        period: 'Free Forever',
        features: [
            '2 sessions per month',
            'Access to community forums',
            'Mental health assessments',
            'Basic messaging',
        ],
        cta: 'Current Plan',
        current: true,
        color: 'border-slate-200 dark:border-slate-700',
        badge: null,
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 29.99,
        period: '/month',
        features: [
            'Unlimited sessions',
            'Priority expert matching',
            'Advanced analytics & progress tracking',
            'Group therapy sessions',
            'Video & chat consultations',
            'Ad-free experience',
        ],
        cta: 'Upgrade to Premium',
        current: false,
        color: 'border-primary',
        badge: 'Most Popular',
    },
    {
        id: 'teams',
        name: 'Teams',
        price: 99.99,
        period: '/month',
        features: [
            'Everything in Premium',
            'Up to 10 team members',
            'Dedicated account manager',
            'Custom wellness programs',
            'Detailed team analytics',
            'Priority support 24/7',
        ],
        cta: 'Contact Sales',
        current: false,
        color: 'border-slate-200 dark:border-slate-700',
        badge: null,
    },
];

const SubscriptionPage: React.FC = () => {
    const navigate = useNavigate();
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <main className="max-w-5xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-10 text-center">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-6 transition-colors mx-auto">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <h1 className="text-4xl font-bold mb-3">Choose Your Plan</h1>
                    <p className="text-slate-500 max-w-xl mx-auto">Invest in your mental wellness. Upgrade or downgrade anytime — no hidden fees.</p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <span className={`text-sm font-semibold ${billing === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
                        <button
                            onClick={() => setBilling(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                            className={`relative w-14 h-7 rounded-full transition-colors ${billing === 'annual' ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600'}`}
                        >
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${billing === 'annual' ? 'translate-x-8' : 'translate-x-1'}`} />
                        </button>
                        <span className={`text-sm font-semibold ${billing === 'annual' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                            Annual
                            <span className="ml-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">Save 20%</span>
                        </span>
                    </div>
                </div>

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map(plan => (
                        <div key={plan.id} className={`relative bg-white dark:bg-slate-800 rounded-2xl border-2 ${plan.color} p-7 flex flex-col ${plan.id === 'premium' ? 'shadow-xl shadow-primary/20' : ''}`}>
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow">{plan.badge}</span>
                                </div>
                            )}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    {plan.price === 0 ? (
                                        <span className="text-3xl font-bold">Free</span>
                                    ) : (
                                        <>
                                            <span className="text-3xl font-bold">${billing === 'annual' ? (plan.price * 0.8).toFixed(2) : plan.price.toFixed(2)}</span>
                                            <span className="text-slate-500 text-sm">{plan.period}</span>
                                        </>
                                    )}
                                </div>
                                {billing === 'annual' && plan.price > 0 && (
                                    <p className="text-xs text-green-600 mt-1">Billed annually (save ${(plan.price * 12 * 0.2).toFixed(2)}/yr)</p>
                                )}
                            </div>

                            <ul className="space-y-3 flex-1 mb-7">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-start gap-2 text-sm">
                                        <span className="material-symbols-outlined text-primary text-base flex-shrink-0 mt-0.5">check_circle</span>
                                        <span className="text-slate-600 dark:text-slate-300">{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${plan.current ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                        : plan.id === 'premium' ? 'bg-primary text-slate-900 hover:bg-primary/90 shadow-lg shadow-primary/20'
                                            : 'border-2 border-slate-200 dark:border-slate-600 hover:border-primary hover:text-primary'
                                    }`}
                                disabled={plan.current}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* FAQ teaser */}
                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm">Have questions? <a href="/faq" className="text-primary font-semibold hover:underline">View our FAQ</a> or <a href="/contact" className="text-primary font-semibold hover:underline">contact us</a>.</p>
                </div>
            </main>
        </div>
    );
};

export default SubscriptionPage;
