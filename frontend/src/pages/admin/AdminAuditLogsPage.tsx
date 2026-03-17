import React, { useState } from 'react';

const logs = [
    { id: '1', action: 'USER_BANNED', actor: 'Admin John', target: 'user@example.com', ip: '192.168.1.1', date: 'Mar 8, 2026 22:14', severity: 'high' },
    { id: '2', action: 'EXPERT_APPROVED', actor: 'Admin Sarah', target: 'Dr. Michael Torres', ip: '192.168.1.2', date: 'Mar 8, 2026 18:30', severity: 'medium' },
    { id: '3', action: 'COUPON_CREATED', actor: 'Admin John', target: 'SPRING25', ip: '192.168.1.1', date: 'Mar 7, 2026 14:00', severity: 'low' },
    { id: '4', action: 'REFUND_APPROVED', actor: 'Admin Sarah', target: 'TXN-001 ($85.00)', ip: '192.168.1.2', date: 'Mar 7, 2026 11:20', severity: 'medium' },
    { id: '5', action: 'SYSTEM_SETTINGS_CHANGED', actor: 'Admin John', target: 'Maintenance Mode', ip: '192.168.1.1', date: 'Mar 6, 2026 09:45', severity: 'high' },
    { id: '6', action: 'CONTENT_DELETED', actor: 'Moderator Lisa', target: 'Article #456', ip: '10.0.0.5', date: 'Mar 5, 2026 16:00', severity: 'medium' },
];

const severityColors: Record<string, string> = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const AdminAuditLogsPage: React.FC = () => {
    const [search, setSearch] = useState('');
    const [severity, setSeverity] = useState('all');

    const filtered = logs.filter(l => {
        const matchSearch = l.action.toLowerCase().includes(search.toLowerCase()) || l.actor.toLowerCase().includes(search.toLowerCase());
        const matchSeverity = severity === 'all' || l.severity === severity;
        return matchSearch && matchSeverity;
    });

    return (
        <div className="p-6 max-w-6xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Audit Logs</h1>
                <p className="text-slate-500 text-sm">Track all administrative actions for security and compliance.</p>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-5 flex-wrap">
                <div className="relative flex-1 min-w-48">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search actions or admins..."
                        className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <select value={severity} onChange={e => setSeverity(e.target.value)}
                    className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none">
                    <option value="all">All Severity</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-sm">download</span>
                    Export CSV
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-6 py-3 text-left">Action</th>
                            <th className="px-6 py-3 text-left">Actor</th>
                            <th className="px-6 py-3 text-left">Target</th>
                            <th className="px-6 py-3 text-left">IP Address</th>
                            <th className="px-6 py-3 text-left">Date & Time</th>
                            <th className="px-6 py-3 text-center">Severity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filtered.map(log => (
                            <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs font-bold">{log.action}</td>
                                <td className="px-6 py-4 font-semibold">{log.actor}</td>
                                <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{log.target}</td>
                                <td className="px-6 py-4 font-mono text-xs text-slate-400">{log.ip}</td>
                                <td className="px-6 py-4 text-slate-500 text-xs">{log.date}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${severityColors[log.severity]}`}>{log.severity}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAuditLogsPage;
