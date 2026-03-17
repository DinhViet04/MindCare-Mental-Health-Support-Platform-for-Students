import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PaymentMethod {
    id: string;
    type: 'card' | 'paypal' | 'bank';
    label: string;
    detail: string;
    expiry?: string;
    isDefault: boolean;
    icon: string;
}

const PaymentMethodsPage: React.FC = () => {
    const navigate = useNavigate();
    const [methods, setMethods] = useState<PaymentMethod[]>([
        { id: '1', type: 'card', label: 'Visa ending in 4242', detail: '•••• •••• •••• 4242', expiry: '12/26', isDefault: true, icon: 'credit_card' },
        { id: '2', type: 'card', label: 'Mastercard ending in 5555', detail: '•••• •••• •••• 5555', expiry: '08/25', isDefault: false, icon: 'credit_card' },
        { id: '3', type: 'paypal', label: 'PayPal', detail: 'user@example.com', isDefault: false, icon: 'account_balance_wallet' },
    ]);
    const [showAddForm, setShowAddForm] = useState(false);

    const setDefault = (id: string) => {
        setMethods(prev => prev.map(m => ({ ...m, isDefault: m.id === id })));
    };

    const removeMethod = (id: string) => {
        setMethods(prev => prev.filter(m => m.id !== id));
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
                    <h1 className="text-3xl font-bold mb-2">Payment Methods</h1>
                    <p className="text-slate-500">Manage your saved payment methods for fast and easy checkout.</p>
                </div>

                {/* Payment Methods List */}
                <div className="space-y-4 mb-8">
                    {methods.map(method => (
                        <div key={method.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">{method.icon}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold">{method.label}</p>
                                    {method.isDefault && (
                                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">Default</span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500">{method.detail}{method.expiry ? ` • Expires ${method.expiry}` : ''}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {!method.isDefault && (
                                    <button
                                        onClick={() => setDefault(method.id)}
                                        className="text-xs font-semibold text-primary hover:underline"
                                    >
                                        Set Default
                                    </button>
                                )}
                                <button
                                    onClick={() => removeMethod(method.id)}
                                    className="w-9 h-9 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add New Method */}
                {!showAddForm ? (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full py-4 border-2 border-dashed border-primary/30 rounded-xl text-primary font-semibold hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Add New Payment Method
                    </button>
                ) : (
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                        <h3 className="text-lg font-bold mb-5">Add New Card</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Cardholder Name</label>
                                <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Card Number</label>
                                <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Expiry Date</label>
                                    <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="MM/YY" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">CVV</label>
                                    <input type="password" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="***" />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="flex-1 py-3 border border-slate-200 dark:border-slate-600 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                    Save Card
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Note */}
                <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">verified_user</span>
                    <div>
                        <p className="font-semibold text-sm mb-1">Your payment data is safe</p>
                        <p className="text-xs text-slate-500">All payment information is encrypted with 256-bit SSL. We never store your full card details.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PaymentMethodsPage;
