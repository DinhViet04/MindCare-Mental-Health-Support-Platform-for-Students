import React, { useState } from 'react';

const SystemSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState({
        siteName: 'MindCare',
        siteUrl: 'https://mindcare.com',
        supportEmail: 'support@mindcare.com',
        sessionDurationMin: '30',
        sessionDurationMax: '120',
        platformFeePercent: '15',
        maxUsersPerExpert: '50',
        autoApproveExperts: false,
        allowGuestAccess: true,
        maintenanceMode: false,
        debugMode: false,
        emailNotifications: true,
        smsNotifications: false,
        twoFactorAuth: false,
    });

    const [saved, setSaved] = useState(false);

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof settings] }));
        setSaved(false);
    };

    const updateSetting = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setSaved(false);
    };

    return (
        <div className="p-6 max-w-3xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">System Settings</h1>
                <p className="text-slate-500 text-sm">Configure core platform settings and preferences.</p>
            </div>

            <div className="space-y-5">
                {/* Site Info */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="font-bold mb-4">Site Information</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Site Name</label>
                                <input type="text" value={settings.siteName} onChange={e => updateSetting('siteName', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Site URL</label>
                                <input type="url" value={settings.siteUrl} onChange={e => updateSetting('siteUrl', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Support Email</label>
                            <input type="email" value={settings.supportEmail} onChange={e => updateSetting('supportEmail', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
                        </div>
                    </div>
                </div>

                {/* Business Rules */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="font-bold mb-4">Business Rules</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Min Session Duration (min)</label>
                            <input type="number" value={settings.sessionDurationMin} onChange={e => updateSetting('sessionDurationMin', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Max Session Duration (min)</label>
                            <input type="number" value={settings.sessionDurationMax} onChange={e => updateSetting('sessionDurationMax', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Platform Fee (%)</label>
                            <input type="number" value={settings.platformFeePercent} onChange={e => updateSetting('platformFeePercent', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Max Users Per Expert</label>
                            <input type="number" value={settings.maxUsersPerExpert} onChange={e => updateSetting('maxUsersPerExpert', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
                        </div>
                    </div>
                </div>

                {/* Feature Flags */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="font-bold mb-4">Feature Flags</h3>
                    <div className="space-y-4">
                        {[
                            { key: 'autoApproveExperts', label: 'Auto-Approve Experts', desc: 'Automatically approve expert signup requests' },
                            { key: 'allowGuestAccess', label: 'Allow Guest Access', desc: 'Let unregistered users browse public content' },
                            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send automated emails for key actions' },
                            { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Send SMS alerts for session reminders' },
                            { key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Require 2FA for all admin accounts' },
                            { key: 'debugMode', label: 'Debug Mode', desc: 'Enable verbose error logging (dev only)' },
                        ].map(item => (
                            <div key={item.key} className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-sm">{item.label}</p>
                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                </div>
                                <button onClick={() => toggleSetting(item.key as keyof typeof settings)}
                                    className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${settings[item.key as keyof typeof settings] ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings[item.key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {saved && (
                <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-600">check_circle</span>
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400">Settings saved successfully!</p>
                </div>
            )}

            <button onClick={() => setSaved(true)}
                className="mt-5 w-full py-4 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Save Settings
            </button>
        </div>
    );
};

export default SystemSettingsPage;
