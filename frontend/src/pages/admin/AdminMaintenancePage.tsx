import React, { useState } from 'react';

const AdminMaintenancePage: React.FC = () => {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [message, setMessage] = useState("We are currently performing scheduled maintenance. We'll be back shortly. Thank you for your patience.");
    const [scheduledTime, setScheduledTime] = useState('');

    return (
        <div className="p-6 max-w-3xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Maintenance Mode</h1>
                <p className="text-slate-500 text-sm">Put the platform in maintenance mode to perform updates or repairs.</p>
            </div>

            {/* Status Banner */}
            <div className={`rounded-2xl p-6 mb-6 flex items-center gap-4 ${maintenanceMode ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'}`}>
                <span className={`material-symbols-outlined text-3xl ${maintenanceMode ? 'text-yellow-600' : 'text-green-600'}`}>
                    {maintenanceMode ? 'construction' : 'check_circle'}
                </span>
                <div>
                    <p className={`font-bold ${maintenanceMode ? 'text-yellow-700 dark:text-yellow-400' : 'text-green-700 dark:text-green-400'}`}>
                        {maintenanceMode ? 'Maintenance Mode is ACTIVE' : 'Platform is Running Normally'}
                    </p>
                    <p className="text-sm text-slate-500">
                        {maintenanceMode ? 'Only administrators can access the platform.' : 'All users have full access to MindCare.'}
                    </p>
                </div>
            </div>

            {/* Toggle */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold">Enable Maintenance Mode</p>
                        <p className="text-sm text-slate-500">This will immediately block all non-admin user access.</p>
                    </div>
                    <button onClick={() => setMaintenanceMode(!maintenanceMode)}
                        className={`relative w-14 h-7 rounded-full transition-colors ${maintenanceMode ? 'bg-yellow-500' : 'bg-slate-200 dark:bg-slate-600'}`}>
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${maintenanceMode ? 'translate-x-8' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>

            {/* Maintenance Message */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-5">
                <h3 className="font-bold mb-3">Maintenance Message</h3>
                <p className="text-sm text-slate-500 mb-3">This message will be shown to users during maintenance:</p>
                <textarea rows={4} value={message} onChange={e => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm resize-none" />
            </div>

            {/* Schedule */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-5">
                <h3 className="font-bold mb-3">Schedule Maintenance</h3>
                <p className="text-sm text-slate-500 mb-3">Optionally schedule when maintenance mode will be automatically activated:</p>
                <input type="datetime-local" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm" />
            </div>

            <div className="flex gap-3">
                <button className="flex-1 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all">
                    Save Settings
                </button>
                {maintenanceMode && (
                    <button onClick={() => setMaintenanceMode(false)}
                        className="flex-1 py-3 border border-red-300 dark:border-red-700 text-red-600 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                        Disable Maintenance Mode
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminMaintenancePage;
