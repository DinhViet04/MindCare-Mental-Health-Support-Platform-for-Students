import React, { useState } from 'react';

const templates = [
    { id: '1', name: 'Welcome Email', subject: 'Welcome to MindCare!', trigger: 'User Registration', lastUpdated: 'Mar 1, 2026', status: 'active' },
    { id: '2', name: 'Booking Confirmation', subject: 'Your Session is Confirmed ✓', trigger: 'Booking Created', lastUpdated: 'Feb 15, 2026', status: 'active' },
    { id: '3', name: 'Password Reset', subject: 'Reset Your Password', trigger: 'Password Reset Request', lastUpdated: 'Feb 10, 2026', status: 'active' },
    { id: '4', name: 'Session Reminder', subject: 'Your Session is in 1 Hour', trigger: '1 Hour Before Session', lastUpdated: 'Jan 20, 2026', status: 'active' },
    { id: '5', name: 'Refund Processed', subject: 'Your Refund Has Been Processed', trigger: 'Refund Approved', lastUpdated: 'Jan 5, 2026', status: 'draft' },
    { id: '6', name: 'Expert Approval', subject: 'Congratulations! Your Profile is Approved', trigger: 'Expert Approved', lastUpdated: 'Dec 20, 2025', status: 'active' },
];

const AdminEmailTemplatesPage: React.FC = () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="p-6 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Email Templates</h1>
                    <p className="text-slate-500 text-sm">Manage automated email templates sent to users and experts.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                    New Template
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-6 py-3 text-left">Template Name</th>
                            <th className="px-6 py-3 text-left">Subject</th>
                            <th className="px-6 py-3 text-left">Trigger</th>
                            <th className="px-6 py-3 text-left">Last Updated</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {templates.map(t => (
                            <tr key={t.id} className={`hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer ${selected === t.id ? 'bg-primary/5' : ''}`}
                                onClick={() => setSelected(t.id)}>
                                <td className="px-6 py-4 font-semibold">{t.name}</td>
                                <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{t.subject}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold px-2 py-1 rounded-full">{t.trigger}</span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{t.lastUpdated}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${t.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500'}`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-primary" onClick={e => e.stopPropagation()}>
                                            <span className="material-symbols-outlined text-base">edit</span>
                                        </button>
                                        <button className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-primary" onClick={e => e.stopPropagation()}>
                                            <span className="material-symbols-outlined text-base">send</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminEmailTemplatesPage;
