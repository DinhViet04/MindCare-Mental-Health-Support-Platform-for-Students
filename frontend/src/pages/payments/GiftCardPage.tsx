import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GiftCard {
    id: string;
    amount: number;
    code: string;
    balance: number;
    expiryDate: string;
    status: 'active' | 'used' | 'expired';
}

const GiftCardPage: React.FC = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState<'redeem' | 'purchase' | 'my-cards'>('redeem');
    const [redeemCode, setRedeemCode] = useState('');
    const [redeemSuccess, setRedeemSuccess] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(50);

    const myCards: GiftCard[] = [
        { id: '1', amount: 50, code: 'GIFT-XXXX-XXXX-1234', balance: 30.00, expiryDate: 'Dec 31, 2026', status: 'active' },
        { id: '2', amount: 100, code: 'GIFT-YYYY-YYYY-5678', balance: 0, expiryDate: 'Jan 15, 2026', status: 'used' },
    ];

    const amounts = [25, 50, 100, 200];

    const handleRedeem = () => {
        if (redeemCode.length > 4) setRedeemSuccess(true);
    };

    const statusColors: Record<string, string> = {
        active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        used: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
        expired: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
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
                    <h1 className="text-3xl font-bold mb-2">Gift Cards</h1>
                    <p className="text-slate-500">Give the gift of mental wellness — purchase or redeem a MindCare gift card.</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1.5 mb-8 gap-1">
                    {[
                        { key: 'redeem', label: 'Redeem' },
                        { key: 'purchase', label: 'Purchase' },
                        { key: 'my-cards', label: 'My Cards' },
                    ].map(t => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key as typeof tab)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === t.key ? 'bg-white dark:bg-slate-700 shadow text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Redeem Tab */}
                {tab === 'redeem' && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-primary text-4xl">redeem</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Redeem a Gift Card</h3>
                            <p className="text-slate-500 text-sm">Enter your gift card code below to add the balance to your wallet.</p>
                        </div>

                        {!redeemSuccess ? (
                            <div className="max-w-sm mx-auto space-y-4">
                                <input
                                    type="text"
                                    value={redeemCode}
                                    onChange={e => setRedeemCode(e.target.value.toUpperCase())}
                                    placeholder="GIFT-XXXX-XXXX-XXXX"
                                    className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-center font-mono tracking-widest focus:ring-2 focus:ring-primary outline-none"
                                />
                                <button
                                    onClick={handleRedeem}
                                    disabled={!redeemCode.trim()}
                                    className="w-full py-4 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Redeem Card
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
                                </div>
                                <p className="font-bold text-xl mb-2">Gift Card Redeemed!</p>
                                <p className="text-slate-500 mb-6">Balance has been added to your wallet.</p>
                                <button onClick={() => navigate('/wallet')} className="px-6 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all">
                                    View Wallet
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Purchase Tab */}
                {tab === 'purchase' && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
                        {/* Gift Card Preview */}
                        <div className="bg-gradient-to-br from-primary via-teal-400 to-emerald-400 rounded-2xl p-6 mb-8 text-slate-900 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
                            <div className="relative z-10">
                                <p className="text-sm font-semibold opacity-80 mb-1">MindCare Gift Card</p>
                                <p className="text-5xl font-bold mb-4">${selectedAmount}</p>
                                <p className="text-xs opacity-70">Valid for 12 months from purchase date</p>
                            </div>
                        </div>

                        <h3 className="font-bold mb-4">Select Amount</h3>
                        <div className="grid grid-cols-4 gap-3 mb-6">
                            {amounts.map(a => (
                                <button
                                    key={a}
                                    onClick={() => setSelectedAmount(a)}
                                    className={`py-3 rounded-xl font-bold border-2 transition-all ${selectedAmount === a ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                        }`}
                                >
                                    ${a}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Recipient's Email</label>
                                <input type="email" placeholder="friend@example.com" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Personal Message (optional)</label>
                                <textarea rows={3} placeholder="Wishing you mental wellness and peace..." className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none text-sm" />
                            </div>
                            <button className="w-full py-4 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                Purchase Gift Card — ${selectedAmount}
                            </button>
                        </div>
                    </div>
                )}

                {/* My Cards Tab */}
                {tab === 'my-cards' && (
                    <div className="space-y-4">
                        {myCards.map(card => (
                            <div key={card.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-primary">card_giftcard</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="font-mono font-bold text-sm">{card.code}</p>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusColors[card.status]}`}>
                                            {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500">Balance: <span className="font-bold text-primary">${card.balance.toFixed(2)}</span> / ${card.amount}</p>
                                    <p className="text-xs text-slate-400">Expires: {card.expiryDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default GiftCardPage;
