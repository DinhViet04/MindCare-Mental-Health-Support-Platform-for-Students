import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BillingAddressPage: React.FC = () => {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        fullName: 'Alex Johnson',
        phone: '+84 090 123 4567',
        address: '123 Nguyen Hue Street',
        city: 'Ho Chi Minh City',
        province: 'Ho Chi Minh',
        postalCode: '700000',
        country: 'Vietnam',
    });

    const handleSave = () => setSaved(true);
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
                    <h1 className="text-3xl font-bold mb-2">Billing Address</h1>
                    <p className="text-slate-500">Your billing address is used for invoices and payment verification.</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-7 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={form.fullName}
                                onChange={e => handleChange('fullName', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={e => handleChange('phone', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Street Address</label>
                            <input
                                type="text"
                                value={form.address}
                                onChange={e => handleChange('address', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">City</label>
                            <input
                                type="text"
                                value={form.city}
                                onChange={e => handleChange('city', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Province / State</label>
                            <input
                                type="text"
                                value={form.province}
                                onChange={e => handleChange('province', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Postal Code</label>
                            <input
                                type="text"
                                value={form.postalCode}
                                onChange={e => handleChange('postalCode', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Country</label>
                            <select
                                value={form.country}
                                onChange={e => handleChange('country', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                            >
                                <option>Vietnam</option>
                                <option>United States</option>
                                <option>Singapore</option>
                                <option>Thailand</option>
                                <option>Malaysia</option>
                                <option>Philippines</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    {saved && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-600">check_circle</span>
                            <p className="text-sm font-semibold text-green-700 dark:text-green-400">Billing address saved successfully!</p>
                        </div>
                    )}

                    <button
                        onClick={handleSave}
                        className="w-full py-4 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        Save Billing Address
                    </button>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Your information is used only for billing and invoicing purposes. We do not share your address with third parties.
                </p>
            </main>
        </div>
    );
};

export default BillingAddressPage;
