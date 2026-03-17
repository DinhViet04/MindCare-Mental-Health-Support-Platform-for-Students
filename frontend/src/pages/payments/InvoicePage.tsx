import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InvoicePage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const invoice = {
        id: id || 'INV-2026-001',
        date: 'March 5, 2026',
        dueDate: 'March 5, 2026',
        status: 'Paid',
        client: { name: 'Alex Johnson', email: 'alex@example.com', address: '123 Main St, Ho Chi Minh City, Vietnam' },
        provider: { name: 'Dr. Sarah Jenkins', specialty: 'Clinical Psychologist', email: 'sarah.jenkins@mindcare.com' },
        items: [
            { description: 'Online Therapy Session (60 min)', qty: 1, unitPrice: 80.00, total: 80.00 },
            { description: 'Platform Service Fee', qty: 1, unitPrice: 5.00, total: 5.00 },
        ],
        subtotal: 85.00,
        tax: 0.00,
        total: 85.00,
        paymentMethod: 'Visa •••• 4242',
    };

    const handlePrint = () => window.print();

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <main className="max-w-3xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <div className="flex gap-3">
                        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined text-sm">print</span>
                            Print
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all">
                            <span className="material-symbols-outlined text-sm">download</span>
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Invoice Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    {/* Top Banner */}
                    <div className="bg-gradient-to-r from-primary to-teal-400 p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">INVOICE</h1>
                                <p className="text-slate-800 font-semibold mt-1">{invoice.id}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                    <p className="text-xs font-semibold text-slate-800">Status</p>
                                    <p className="font-bold text-slate-900">{invoice.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Bill To / Bill From */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <p className="text-xs font-bold uppercase text-slate-400 mb-3">Bill To</p>
                                <p className="font-bold text-lg">{invoice.client.name}</p>
                                <p className="text-sm text-slate-500">{invoice.client.email}</p>
                                <p className="text-sm text-slate-500 mt-1">{invoice.client.address}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase text-slate-400 mb-3">Service Provider</p>
                                <p className="font-bold text-lg">{invoice.provider.name}</p>
                                <p className="text-sm text-primary font-medium">{invoice.provider.specialty}</p>
                                <p className="text-sm text-slate-500">{invoice.provider.email}</p>
                            </div>
                        </div>

                        {/* Invoice Details */}
                        <div className="grid grid-cols-3 gap-4 mb-8 bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Invoice Date</p>
                                <p className="font-semibold text-sm">{invoice.date}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Payment Date</p>
                                <p className="font-semibold text-sm">{invoice.dueDate}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Payment Method</p>
                                <p className="font-semibold text-sm">{invoice.paymentMethod}</p>
                            </div>
                        </div>

                        {/* Line Items */}
                        <div className="mb-6">
                            <div className="grid grid-cols-12 gap-4 text-xs font-bold uppercase text-slate-400 mb-3 px-3">
                                <div className="col-span-6">Description</div>
                                <div className="col-span-2 text-center">Qty</div>
                                <div className="col-span-2 text-right">Unit Price</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>
                            <div className="space-y-2">
                                {invoice.items.map((item, i) => (
                                    <div key={i} className="grid grid-cols-12 gap-4 bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3">
                                        <div className="col-span-6 font-medium text-sm">{item.description}</div>
                                        <div className="col-span-2 text-center text-sm text-slate-500">{item.qty}</div>
                                        <div className="col-span-2 text-right text-sm text-slate-500">${item.unitPrice.toFixed(2)}</div>
                                        <div className="col-span-2 text-right font-bold text-sm">${item.total.toFixed(2)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 ml-auto max-w-xs space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Subtotal</span>
                                <span className="font-medium">${invoice.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Tax</span>
                                <span className="font-medium">${invoice.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t border-slate-200 dark:border-slate-700 pt-2">
                                <span>Total</span>
                                <span className="text-primary">${invoice.total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-400">
                            <p>Thank you for using MindCare. Your mental wellness journey matters to us.</p>
                            <p className="mt-1">Questions? Contact us at support@mindcare.com</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InvoicePage;
