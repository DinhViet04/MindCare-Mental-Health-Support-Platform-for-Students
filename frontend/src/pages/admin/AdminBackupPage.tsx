import React, { useState } from 'react';

const AdminBackupPage: React.FC = () => {
    const [backing, setBacking] = useState(false);
    const [lastBackup] = useState('Mar 8, 2026 02:00 AM');

    const backups = [
        { id: '1', name: 'backup-2026-03-08.zip', size: '2.4 GB', date: 'Mar 8, 2026 02:00 AM', type: 'automatic', status: 'success' },
        { id: '2', name: 'backup-2026-03-07.zip', size: '2.3 GB', date: 'Mar 7, 2026 02:00 AM', type: 'automatic', status: 'success' },
        { id: '3', name: 'backup-manual-2026-03-05.zip', size: '2.3 GB', date: 'Mar 5, 2026 14:30 PM', type: 'manual', status: 'success' },
        { id: '4', name: 'backup-2026-03-04.zip', size: '2.2 GB', date: 'Mar 4, 2026 02:00 AM', type: 'automatic', status: 'failed' },
    ];

    const handleBackup = () => {
        setBacking(true);
        setTimeout(() => setBacking(false), 3000);
    };

    return (
        <div className="p-6 max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Backup & Recovery</h1>
                <p className="text-slate-500 text-sm">Manage system backups and restore points.</p>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: 'Last Backup', value: 'Mar 8, 2026', icon: 'check_circle', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
                    { label: 'Backup Size', value: '2.4 GB', icon: 'storage', color: 'text-primary', bg: 'bg-primary/10' },
                    { label: 'Auto Schedule', value: 'Daily 2:00 AM', icon: 'schedule', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                ].map(s => (
                    <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                        <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                            <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
                        </div>
                        <p className="text-xl font-bold mb-1">{s.value}</p>
                        <p className="text-xs text-slate-500">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Manual Backup */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
                <h3 className="font-bold mb-3">Manual Backup</h3>
                <p className="text-sm text-slate-500 mb-4">Create an immediate backup of all platform data including databases, files, and configurations.</p>
                <button onClick={handleBackup} disabled={backing}
                    className="flex items-center gap-2 px-5 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70">
                    {backing ? (
                        <><div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /> Creating Backup...</>
                    ) : (
                        <><span className="material-symbols-outlined text-lg">backup</span> Create Manual Backup</>
                    )}
                </button>
            </div>

            {/* Backup History */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold">Backup History</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {backups.map(b => (
                        <div key={b.id} className="p-5 flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${b.status === 'success' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                                }`}>
                                <span className={`material-symbols-outlined text-lg ${b.status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                    {b.status === 'success' ? 'check_circle' : 'error'}
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">{b.name}</p>
                                <p className="text-xs text-slate-500">{b.date} • {b.size} • <span className="capitalize">{b.type}</span></p>
                            </div>
                            <div className="flex gap-2">
                                {b.status === 'success' && (
                                    <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                        <span className="material-symbols-outlined text-sm">download</span>
                                        Download
                                    </button>
                                )}
                                <button className="text-slate-400 hover:text-red-500 transition-colors w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-base">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminBackupPage;
