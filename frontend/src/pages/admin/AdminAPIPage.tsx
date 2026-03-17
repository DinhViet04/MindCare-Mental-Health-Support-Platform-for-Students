import React, { useState } from 'react';

const AdminAPIPage: React.FC = () => {
    const [showKey, setShowKey] = useState(false);

    const apiKeys = [
        { id: '1', name: 'Production API Key', key: 'mk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', created: 'Jan 1, 2026', lastUsed: 'Mar 8, 2026', status: 'active' },
        { id: '2', name: 'Development API Key', key: 'mk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', created: 'Jan 1, 2026', lastUsed: 'Mar 5, 2026', status: 'active' },
    ];

    const endpoints = [
        { method: 'GET', path: '/api/v1/users', description: 'List all users', calls: 2450 },
        { method: 'POST', path: '/api/v1/bookings', description: 'Create new booking', calls: 512 },
        { method: 'GET', path: '/api/v1/experts', description: 'List all experts', calls: 1834 },
        { method: 'PUT', path: '/api/v1/payments/:id', description: 'Update payment', calls: 320 },
        { method: 'DELETE', path: '/api/v1/sessions/:id', description: 'Delete session', calls: 45 },
    ];

    const methodColors: Record<string, string> = {
        GET: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        POST: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        PUT: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
        <div className="p-6 max-w-5xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">API Management</h1>
                <p className="text-slate-500 text-sm">Manage API keys, monitor usage, and view endpoint analytics.</p>
            </div>

            {/* API Keys */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">API Keys</h3>
                    <button className="flex items-center gap-2 px-3 py-2 bg-primary text-slate-900 text-sm font-bold rounded-xl hover:bg-primary/90 transition-all">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Generate Key
                    </button>
                </div>
                <div className="space-y-4">
                    {apiKeys.map(k => (
                        <div key={k.id} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-sm">{k.name}</p>
                                <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">{k.status}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 font-mono text-xs bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300">
                                    {showKey ? k.key : k.key.slice(0, 12) + '•'.repeat(20)}
                                </code>
                                <button onClick={() => setShowKey(!showKey)} className="text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-base">{showKey ? 'visibility_off' : 'visibility'}</span>
                                </button>
                                <button onClick={() => navigator.clipboard.writeText(k.key)} className="text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-base">content_copy</span>
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Created: {k.created} • Last used: {k.lastUsed}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Endpoints */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold">Top Endpoints (Last 30 Days)</h3>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-6 py-3 text-left">Method</th>
                            <th className="px-6 py-3 text-left">Endpoint</th>
                            <th className="px-6 py-3 text-left">Description</th>
                            <th className="px-6 py-3 text-right">API Calls</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {endpoints.map((ep, i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${methodColors[ep.method]}`}>{ep.method}</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">{ep.path}</td>
                                <td className="px-6 py-4 text-slate-500">{ep.description}</td>
                                <td className="px-6 py-4 text-right font-bold">{ep.calls.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAPIPage;
