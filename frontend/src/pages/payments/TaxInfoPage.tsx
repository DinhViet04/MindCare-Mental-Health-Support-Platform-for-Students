import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaxInfoPage: React.FC = () => {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        taxId: 'MST-1234567890',
        businessType: 'individual',
        fullName: 'Nguyen Van A',
        businessName: '',
        country: 'Vietnam',
        vatRegistered: false,
        vatNumber: '',
    });

    const handleChange = (field: string, value: string | boolean) => {
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
                    <h1 className="text-3xl font-bold mb-2">Tax Information</h1>
                    <p className="text-slate-500">Provide your tax details for accurate invoicing and compliance reporting.</p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 mb-6 flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-600">info</span>
                    <div>
                        <p className="font-semibold text-sm text-blue-700 dark:text-blue-400 mb-1">Why we need this information</p>
                        <p className="text-xs text-blue-600 dark:text-blue-500">Tax information is required for generating accurate invoices, annual tax summaries, and ensuring compliance with local regulations. This information is kept strictly confidential.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-7 space-y-5">
                    {/* Business Type */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Account Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            {['individual', 'business'].map(t => (
                                <label key={t} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${form.businessType === t ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 hover:border-primary/40'
                                    }`}>
                                    <input type="radio" name="businessType" value={t} checked={form.businessType === t} onChange={() => handleChange('businessType', t)} className="text-primary" />
                                    <span className="font-semibold text-sm capitalize">{t}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {form.businessType === 'individual' ? (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Legal Name</label>
                            <input type="text" value={form.fullName} onChange={e => handleChange('fullName', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Business / Company Name</label>
                            <input type="text" value={form.businessName} onChange={e => handleChange('businessName', e.target.value)}
                                placeholder="Nguyen Van A Mental Health Services"
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tax Identification Number (MSST / TIN)</label>
                        <input type="text" value={form.taxId} onChange={e => handleChange('taxId', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none font-mono" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Country of Tax Residence</label>
                        <select value={form.country} onChange={e => handleChange('country', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none">
                            <option>Vietnam</option>
                            <option>United States</option>
                            <option>Singapore</option>
                            <option>Thailand</option>
                            <option>Malaysia</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* VAT */}
                    <div className="border-t border-slate-100 dark:border-slate-700 pt-5">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.vatRegistered}
                                onChange={e => handleChange('vatRegistered', e.target.checked)}
                                className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            <span className="font-semibold text-sm">I am VAT registered</span>
                        </label>
                        {form.vatRegistered && (
                            <div className="mt-4">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">VAT Registration Number</label>
                                <input type="text" value={form.vatNumber} onChange={e => handleChange('vatNumber', e.target.value)}
                                    placeholder="VN12345678"
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none font-mono" />
                            </div>
                        )}
                    </div>

                    {saved && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-600">check_circle</span>
                            <p className="text-sm font-semibold text-green-700 dark:text-green-400">Tax information saved successfully!</p>
                        </div>
                    )}

                    <button
                        onClick={() => setSaved(true)}
                        className="w-full py-4 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        Save Tax Information
                    </button>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Tax information is encrypted and stored securely. For questions, contact our billing team at billing@mindcare.com
                </p>
            </main>
        </div>
    );
};

export default TaxInfoPage;
