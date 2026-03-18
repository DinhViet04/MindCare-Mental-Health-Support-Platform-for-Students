import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WalletPage: React.FC = () => {
    const navigate = useNavigate();
    const [topUpAmount, setTopUpAmount] = useState('');
    const presetAmounts = [10, 25, 50, 100];

    const transactions = [
        { id: '1', type: 'credit', description: 'Wallet Top-up', amount: 50.00, date: 'Mar 5, 2026', status: 'completed' },
        { id: '2', type: 'debit', description: 'Session with Dr. Sarah Jenkins', amount: -85.00, date: 'Mar 3, 2026', status: 'completed' },
        { id: '3', type: 'credit', description: 'Refund - Cancelled Booking', amount: 30.00, date: 'Feb 28, 2026', status: 'completed' },
        { id: '4', type: 'debit', description: 'Session with Dr. Michael Torres', amount: -60.00, date: 'Feb 20, 2026', status: 'completed' },
        { id: '5', type: 'credit', description: 'Wallet Top-up', amount: 100.00, date: 'Feb 10, 2026', status: 'completed' },
    ];

    const balance = 35.00;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <main className="max-w-4xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold mb-2">My Wallet</h1>
                    <p className="text-slate-500">Manage your wallet balance and view transaction history.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Balance + Top-up */}
                    <div className="lg:col-span-1 space-y-5">
                        {/* Balance Card */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-primary to-teal-400 rounded-2xl p-6 text-slate-900 shadow-lg shadow-primary/30">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <p className="text-sm font-semibold opacity-80 mb-1">Available Balance</p>
                                <p className="text-4xl font-bold mb-4">${balance.toFixed(2)}</p>
                                <div className="flex items-center gap-1 text-xs font-semibold opacity-70">
                                    <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                                    MindCare Wallet
                                </div>
                            </div>
                        </div>

                        {/* Top-Up Card */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                            <h3 className="font-bold mb-4">Top Up Wallet</h3>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {presetAmounts.map(amount => (
                                    <button
                                        key={amount}
                                        onClick={() => setTopUpAmount(String(amount))}
                                        className={`py-2 rounded-lg text-sm font-bold border-2 transition-all ${topUpAmount === String(amount)
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : 'border-slate-200 dark:border-slate-600 hover:border-primary/50'
                                            }`}
                                    >
                                        ${amount}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="number"
                                value={topUpAmount}
                                onChange={e => setTopUpAmount(e.target.value)}
                                placeholder="Custom amount"
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none mb-3"
                            />
                            <button className="w-full py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                                Add Funds
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                            <h3 className="font-bold mb-3">Quick Actions</h3>
                            <div className="space-y-2">
                                {[
                                    { icon: 'north', label: 'Withdraw Funds', path: '/expert/withdraw' },
                                    { icon: 'receipt_long', label: 'View Transactions', path: '/transactions' },
                                    { icon: 'credit_card', label: 'Payment Methods', path: '/payments/methods' },
                                ].map(action => (
                                    <button
                                        key={action.label}
                                        onClick={() => navigate(action.path)}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                                    >
                                        <span className="material-symbols-outlined text-primary text-xl">{action.icon}</span>
                                        <span className="text-sm font-semibold">{action.label}</span>
                                        <span className="material-symbols-outlined ml-auto text-slate-400 text-sm">chevron_right</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Recent Transactions */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                                <h3 className="font-bold text-lg">Recent Transactions</h3>
                                <button onClick={() => navigate('/transactions')} className="text-sm text-primary font-semibold hover:underline">
                                    View All
                                </button>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                {transactions.map(tx => (
                                    <div key={tx.id} className="p-5 flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                                            }`}>
                                            <span className={`material-symbols-outlined text-xl ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'
                                                }`}>
                                                {tx.type === 'credit' ? 'south' : 'north'}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">{tx.description}</p>
                                            <p className="text-xs text-slate-500">{tx.date}</p>
                                        </div>
                                        <span className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                                            {tx.type === 'credit' ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WalletPage;
