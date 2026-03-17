import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WithdrawPage: React.FC = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('bank');
    const [submitted, setSubmitted] = useState(false);

    const balance = 320.50;
    const presets = [50, 100, 200];

    const methods = [
        { id: 'bank', label: 'Bank Transfer', detail: 'VCB •••• 7823', icon: 'account_balance', eta: '2–3 business days' },
        { id: 'momo', label: 'MoMo Wallet', detail: '090 *** 1234', icon: 'smartphone', eta: 'Within 24 hours' },
        { id: 'paypal', label: 'PayPal', detail: 'expert@example.com', icon: 'account_balance_wallet', eta: '1–2 business days' },
    ];

    const handleSubmit = () => {
        if (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance) return;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-10 max-w-md w-full text-center mx-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Withdrawal Requested</h2>
                    <p className="text-slate-500 mb-6">Your withdrawal of <span className="font-bold text-primary">${parseFloat(amount).toFixed(2)}</span> has been submitted and will be processed shortly.</p>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Amount</span>
                            <span className="font-bold">${parseFloat(amount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Method</span>
                            <span className="font-bold">{methods.find(m => m.id === method)?.label}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">ETA</span>
                            <span className="font-bold">{methods.find(m => m.id === method)?.eta}</span>
                        </div>
                    </div>
                    <button onClick={() => navigate('/transactions')} className="w-full py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all">
                        View Transactions
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <main className="max-w-2xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold mb-2">Withdraw Earnings</h1>
                    <p className="text-slate-500">Transfer your earnings to your preferred payout method.</p>
                </div>

                {/* Balance Summary */}
                <div className="relative overflow-hidden bg-gradient-to-br from-primary to-teal-400 rounded-2xl p-6 mb-8 text-slate-900 shadow-lg shadow-primary/30">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
                    <div className="relative z-10">
                        <p className="text-sm font-semibold opacity-80 mb-1">Available to Withdraw</p>
                        <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
                    </div>
                </div>

                {/* Amount */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-5">
                    <h3 className="font-bold mb-4">Withdrawal Amount</h3>
                    <div className="flex gap-2 mb-4">
                        {presets.map(p => (
                            <button
                                key={p}
                                onClick={() => setAmount(String(p))}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg border-2 transition-all ${amount === String(p) ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-600 hover:border-primary/50'
                                    }`}
                            >
                                ${p}
                            </button>
                        ))}
                        <button
                            onClick={() => setAmount(String(balance))}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg border-2 transition-all ${amount === String(balance) ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-600 hover:border-primary/50'
                                }`}
                        >
                            All
                        </button>
                    </div>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">$</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            max={balance}
                            min={1}
                            placeholder="0.00"
                            className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none text-lg font-bold"
                        />
                    </div>
                    {parseFloat(amount) > balance && (
                        <p className="text-xs text-red-500 mt-2">Amount exceeds available balance.</p>
                    )}
                </div>

                {/* Payout Method */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
                    <h3 className="font-bold mb-4">Payout Method</h3>
                    <div className="space-y-3">
                        {methods.map(m => (
                            <label key={m.id} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${method === m.id ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 hover:border-primary/40'
                                }`}>
                                <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} className="text-primary" />
                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-xl">{m.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{m.label}</p>
                                    <p className="text-xs text-slate-500">{m.detail}</p>
                                </div>
                                <p className="text-xs text-slate-400">{m.eta}</p>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
                    className="w-full py-4 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined">north</span>
                    Withdraw ${parseFloat(amount || '0').toFixed(2)}
                </button>
            </main>
        </div>
    );
};

export default WithdrawPage;
