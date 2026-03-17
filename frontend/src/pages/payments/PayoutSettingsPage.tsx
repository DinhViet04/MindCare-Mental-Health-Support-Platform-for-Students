import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PayoutSettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        method: 'bank',
        bankName: 'Vietcombank (VCB)',
        accountNumber: '1234567890',
        accountName: 'NGUYEN VAN A',
        routingNumber: '970436',
        momoPhone: '0901234567',
        paypalEmail: 'expert@example.com',
        schedule: 'monthly',
        minPayout: '100',
    });

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <main className="max-w-2xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold mb-2">Payout Settings</h1>
                    <p className="text-slate-500">Configure how and when you receive your earnings from MindCare.</p>
                </div>

                {/* Payout Method */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-5">
                    <h3 className="font-bold mb-4">Payout Method</h3>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                        {[
                            { id: 'bank', label: 'Bank Transfer', icon: 'account_balance' },
                            { id: 'momo', label: 'MoMo', icon: 'smartphone' },
                            { id: 'paypal', label: 'PayPal', icon: 'account_balance_wallet' },
                        ].map(m => (
                            <label key={m.id} className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all ${form.method === m.id ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 hover:border-primary/40'
                                }`}>
                                <input type="radio" name="method" value={m.id} checked={form.method === m.id} onChange={() => handleChange('method', m.id)} className="hidden" />
                                <span className="material-symbols-outlined text-2xl text-primary">{m.icon}</span>
                                <span className="text-xs font-bold">{m.label}</span>
                                {form.method === m.id && (
                                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-[12px]">check</span>
                                    </div>
                                )}
                            </label>
                        ))}
                    </div>

                    {/* Bank Details */}
                    {form.method === 'bank' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Bank Name</label>
                                <select value={form.bankName} onChange={e => handleChange('bankName', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none">
                                    <option>Vietcombank (VCB)</option>
                                    <option>Techcombank (TCB)</option>
                                    <option>BIDV</option>
                                    <option>Agribank</option>
                                    <option>VPBank</option>
                                    <option>MB Bank</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Account Number</label>
                                    <input type="text" value={form.accountNumber} onChange={e => handleChange('accountNumber', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Account Name</label>
                                    <input type="text" value={form.accountName} onChange={e => handleChange('accountName', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none uppercase" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MoMo */}
                    {form.method === 'momo' && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">MoMo Phone Number</label>
                            <input type="tel" value={form.momoPhone} onChange={e => handleChange('momoPhone', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                    )}

                    {/* PayPal */}
                    {form.method === 'paypal' && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">PayPal Email</label>
                            <input type="email" value={form.paypalEmail} onChange={e => handleChange('paypalEmail', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                    )}
                </div>

                {/* Payout Schedule */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-5">
                    <h3 className="font-bold mb-4">Payout Schedule</h3>
                    <div className="space-y-3">
                        {[
                            { id: 'weekly', label: 'Weekly', desc: 'Paid every Monday for the previous week' },
                            { id: 'monthly', label: 'Monthly', desc: 'Paid on the 1st of each month' },
                            { id: 'on-demand', label: 'On Demand', desc: 'Withdraw manually anytime above minimum' },
                        ].map(s => (
                            <label key={s.id} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${form.schedule === s.id ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 hover:border-primary/40'
                                }`}>
                                <input type="radio" name="schedule" value={s.id} checked={form.schedule === s.id} onChange={() => handleChange('schedule', s.id)} className="text-primary" />
                                <div>
                                    <p className="font-semibold text-sm">{s.label}</p>
                                    <p className="text-xs text-slate-500">{s.desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Minimum Payout Amount ($)</label>
                        <input type="number" min={10} value={form.minPayout} onChange={e => handleChange('minPayout', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                        <p className="text-xs text-slate-400 mt-1">Minimum: $10. Payouts below this amount will roll over to the next period.</p>
                    </div>
                </div>

                {saved && (
                    <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                        <span className="material-symbols-outlined text-green-600">check_circle</span>
                        <p className="text-sm font-semibold text-green-700 dark:text-green-400">Payout settings saved!</p>
                    </div>
                )}

                <button
                    onClick={() => setSaved(true)}
                    className="w-full py-4 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                    Save Payout Settings
                </button>
            </main>
        </div>
    );
};

export default PayoutSettingsPage;
