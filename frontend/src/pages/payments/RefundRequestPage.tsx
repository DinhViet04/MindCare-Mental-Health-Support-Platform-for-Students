import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RefundRequestPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const booking = {
        id: id || 'B0091',
        expertName: 'Dr. Sarah Jenkins',
        date: 'March 3, 2026',
        time: '10:00 AM',
        amount: 85.00,
        status: 'completed',
    };

    const reasons = [
        'Session did not happen as scheduled',
        'Technical issues prevented the session',
        'Expert was unprofessional or inappropriate',
        'I accidentally double-booked',
        'Health emergency prevented attendance',
        'Other',
    ];

    const handleSubmit = () => {
        if (!reason) return;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-10 max-w-md w-full text-center mx-4">
                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Request Submitted</h2>
                    <p className="text-slate-500 mb-6">Your refund request has been submitted successfully. Our team will review and respond within 3–5 business days.</p>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6 text-left">
                        <p className="text-xs text-slate-400 mb-1">Reference Number</p>
                        <p className="font-bold text-primary">REF-{Date.now().toString().slice(-6)}</p>
                    </div>
                    <button
                        onClick={() => navigate('/transactions')}
                        className="w-full py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all"
                    >
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
                    <h1 className="text-3xl font-bold mb-2">Request a Refund</h1>
                    <p className="text-slate-500">Please fill in the details below. Refund requests are reviewed within 3–5 business days.</p>
                </div>

                {/* Booking Summary */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 mb-6">
                    <h3 className="font-bold mb-4">Booking Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-slate-500 mb-1">Booking ID</p>
                            <p className="font-semibold">#{booking.id}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 mb-1">Expert</p>
                            <p className="font-semibold">{booking.expertName}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 mb-1">Session Date</p>
                            <p className="font-semibold">{booking.date} at {booking.time}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 mb-1">Amount Paid</p>
                            <p className="font-bold text-primary text-base">${booking.amount.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Refund Form */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">
                    <h3 className="font-bold">Reason for Refund</h3>
                    <div className="space-y-3">
                        {reasons.map(r => (
                            <label key={r} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${reason === r ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 hover:border-primary/40'
                                }`}>
                                <input
                                    type="radio"
                                    name="reason"
                                    value={r}
                                    checked={reason === r}
                                    onChange={() => setReason(r)}
                                    className="text-primary focus:ring-primary"
                                />
                                <span className="text-sm font-medium">{r}</span>
                            </label>
                        ))}
                    </div>

                    {reason === 'Other' && (
                        <textarea
                            value={otherReason}
                            onChange={e => setOtherReason(e.target.value)}
                            rows={4}
                            placeholder="Please describe your reason..."
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                        />
                    )}

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex items-start gap-3">
                        <span className="material-symbols-outlined text-yellow-600 text-xl">info</span>
                        <p className="text-xs text-yellow-700 dark:text-yellow-400">
                            Refunds are processed to the original payment method within 5–10 business days after approval. Sessions completed more than 7 days ago may not be eligible for a full refund.
                        </p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!reason}
                        className="w-full py-4 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Refund Request
                    </button>
                </div>
            </main>
        </div>
    );
};

export default RefundRequestPage;
