import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Transaction {
    id: string;
    type: 'credit' | 'debit';
    category: string;
    description: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed' | 'refunded';
}

const transactions: Transaction[] = [
    { id: 'txn001', type: 'debit', category: 'Session', description: 'Session with Dr. Sarah Jenkins', amount: 85.00, date: 'Mar 5, 2026', status: 'completed' },
    { id: 'txn002', type: 'credit', category: 'Refund', description: 'Refund - Cancelled Session #B0091', amount: 30.00, date: 'Feb 28, 2026', status: 'refunded' },
    { id: 'txn003', type: 'credit', category: 'Top-up', description: 'Wallet Top-up via Visa •••4242', amount: 100.00, date: 'Feb 20, 2026', status: 'completed' },
    { id: 'txn004', type: 'debit', category: 'Session', description: 'Session with Dr. Michael Torres', amount: 60.00, date: 'Feb 15, 2026', status: 'completed' },
    { id: 'txn005', type: 'debit', category: 'Subscription', description: 'MindCare Premium - Monthly', amount: 29.99, date: 'Feb 1, 2026', status: 'completed' },
    { id: 'txn006', type: 'debit', category: 'Session', description: 'Session with Dr. Linda Park', amount: 75.00, date: 'Jan 28, 2026', status: 'failed' },
    { id: 'txn007', type: 'credit', category: 'Top-up', description: 'Wallet Top-up via PayPal', amount: 50.00, date: 'Jan 10, 2026', status: 'completed' },
];

const statusColors: Record<string, string> = {
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    refunded: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

const TransactionHistoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');

    const filtered = transactions.filter(tx => {
        const matchSearch = tx.description.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'all' || tx.status === filterStatus;
        const matchType = filterType === 'all' || tx.type === filterType;
        return matchSearch && matchStatus && matchType;
    });

    const totalCredits = transactions.filter(t => t.type === 'credit' && t.status === 'completed').reduce((s, t) => s + t.amount, 0);
    const totalDebits = transactions.filter(t => t.type === 'debit' && t.status === 'completed').reduce((s, t) => s + t.amount, 0);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <main className="max-w-5xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
                    <p className="text-slate-500">A full record of all your payments, refunds, and wallet activity.</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Spent', value: `$${totalDebits.toFixed(2)}`, icon: 'shopping_cart', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
                        { label: 'Total Added', value: `$${totalCredits.toFixed(2)}`, icon: 'savings', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
                        { label: 'Transactions', value: transactions.length.toString(), icon: 'receipt_long', color: 'text-primary', bg: 'bg-primary/10' },
                        { label: 'Refunds', value: transactions.filter(t => t.status === 'refunded').length.toString(), icon: 'undo', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    ].map(stat => (
                        <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                                <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
                            </div>
                            <p className="text-2xl font-bold mb-1">{stat.value}</p>
                            <p className="text-xs text-slate-500">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-4 flex flex-wrap gap-3">
                    <div className="relative flex-1 min-w-48">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search transactions..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                    <select
                        value={filterType}
                        onChange={e => setFilterType(e.target.value)}
                        className="px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                    >
                        <option value="all">All Types</option>
                        <option value="credit">Credits</option>
                        <option value="debit">Debits</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>

                {/* Transactions Table */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filtered.length === 0 ? (
                            <div className="py-16 text-center text-slate-400">
                                <span className="material-symbols-outlined text-5xl mb-3 block">receipt_long</span>
                                <p className="font-semibold">No transactions found</p>
                            </div>
                        ) : filtered.map(tx => (
                            <div key={tx.id} className="p-5 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === 'credit' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                                    }`}>
                                    <span className={`material-symbols-outlined text-lg ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                                        {tx.type === 'credit' ? 'south' : 'north'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm truncate">{tx.description}</p>
                                    <p className="text-xs text-slate-500">{tx.date} • {tx.category}</p>
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[tx.status]}`}>
                                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                </span>
                                <span className={`font-bold text-sm min-w-16 text-right ${tx.type === 'credit' ? 'text-green-600' : 'text-slate-700 dark:text-slate-200'}`}>
                                    {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                                </span>
                                <button onClick={() => navigate(`/invoice/${tx.id}`)} className="text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TransactionHistoryPage;
