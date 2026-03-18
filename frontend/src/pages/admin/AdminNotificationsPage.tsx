import React, { useState } from 'react';

const AdminNotificationsPage: React.FC = () => {
    const [settings, setSettings] = useState({
        newUserRegistration: true,
        expertApprovalRequest: true,
        paymentReceived: true,
        reportSubmitted: true,
        systemAlerts: true,
        sessionCompleted: false,
        refundRequested: true,
        lowBalance: false,
    });

    const [announcements, setAnnouncements] = useState([
        { id: '1', title: 'System Maintenance Scheduled', message: 'The platform will be down for maintenance on March 15.', sentTo: 'All Users', date: 'Mar 5, 2026', status: 'sent' },
        { id: '2', title: 'New Feature: Group Sessions', message: 'We have launched group therapy sessions!', sentTo: 'All Users', date: 'Feb 20, 2026', status: 'sent' },
    ]);

    const toggle = (key: keyof typeof settings) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

    const notifItems = [
        { key: 'newUserRegistration', label: 'New User Registration', desc: 'Alert when a new user signs up' },
        { key: 'expertApprovalRequest', label: 'Expert Approval Request', desc: 'When an expert submits for approval' },
        { key: 'paymentReceived', label: 'Payment Received', desc: 'When a payment is processed successfully' },
        { key: 'reportSubmitted', label: 'Report Submitted', desc: 'When a user report is filed' },
        { key: 'systemAlerts', label: 'System Alerts', desc: 'Critical system errors and warnings' },
        { key: 'sessionCompleted', label: 'Session Completed', desc: 'When a consultation session ends' },
        { key: 'refundRequested', label: 'Refund Requested', desc: 'When a user requests a refund' },
        { key: 'lowBalance', label: 'Low Payout Balance', desc: 'When an expert has low pending balance' },
    ] as const;

    return (
        <div className="p-6 max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Admin Notifications</h1>
                <p className="text-slate-500 text-sm">Configure which events trigger admin notifications and send announcements.</p>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
                <h3 className="font-bold mb-4">Notification Triggers</h3>
                <div className="space-y-4">
                    {notifItems.map(item => (
                        <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                            <div>
                                <p className="font-semibold text-sm">{item.label}</p>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                            <button onClick={() => toggle(item.key)}
                                className={`relative w-12 h-6 rounded-full transition-colors ${settings[item.key] ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600'}`}>
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings[item.key] ? 'translate-x-7' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Announcements */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Broadcast Announcements</h3>
                    <button className="flex items-center gap-2 px-3 py-2 bg-primary text-slate-900 text-sm font-bold rounded-xl hover:bg-primary/90 transition-all">
                        <span className="material-symbols-outlined text-sm">campaign</span>
                        New Announcement
                    </button>
                </div>
                <div className="space-y-3">
                    {announcements.map(a => (
                        <div key={a.id} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-primary">campaign</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">{a.title}</p>
                                <p className="text-xs text-slate-500 mt-1">{a.message}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs text-slate-400">Sent to: {a.sentTo}</span>
                                    <span className="text-xs text-slate-400">•</span>
                                    <span className="text-xs text-slate-400">{a.date}</span>
                                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">{a.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminNotificationsPage;
