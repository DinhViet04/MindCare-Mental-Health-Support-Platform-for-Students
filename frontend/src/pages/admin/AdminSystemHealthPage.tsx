import React from 'react';

const AdminSystemHealthPage: React.FC = () => {
    const services = [
        { name: 'API Server', status: 'healthy', uptime: '99.98%', responseTime: '45ms', icon: 'dns' },
        { name: 'Database (PostgreSQL)', status: 'healthy', uptime: '99.99%', responseTime: '12ms', icon: 'storage' },
        { name: 'Redis Cache', status: 'healthy', uptime: '100%', responseTime: '3ms', icon: 'memory' },
        { name: 'File Storage', status: 'degraded', uptime: '98.5%', responseTime: '320ms', icon: 'folder' },
        { name: 'Email Service', status: 'healthy', uptime: '99.9%', responseTime: '200ms', icon: 'email' },
        { name: 'Payment Gateway', status: 'healthy', uptime: '99.95%', responseTime: '180ms', icon: 'payments' },
        { name: 'Video Streaming', status: 'healthy', uptime: '99.7%', responseTime: '95ms', icon: 'videocam' },
        { name: 'Notification Service', status: 'offline', uptime: '95.2%', responseTime: 'N/A', icon: 'notifications' },
    ];

    const statusStyles: Record<string, { dot: string; badge: string }> = {
        healthy: { dot: 'bg-green-500', badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
        degraded: { dot: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
        offline: { dot: 'bg-red-500', badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
    };

    const metrics = [
        { label: 'CPU Usage', value: 34, unit: '%', color: 'bg-blue-500' },
        { label: 'Memory Usage', value: 62, unit: '%', color: 'bg-purple-500' },
        { label: 'Disk Usage', value: 48, unit: '%', color: 'bg-primary' },
        { label: 'Network I/O', value: 22, unit: '%', color: 'bg-amber-500' },
    ];

    return (
        <div className="p-6 max-w-5xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">System Health</h1>
                <p className="text-slate-500 text-sm">Monitor real-time system performance and service status.</p>
            </div>

            {/* Overall Status */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl p-6 mb-6 text-white">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-4xl">verified</span>
                    <div>
                        <p className="text-xl font-bold">All Systems Operational</p>
                        <p className="text-sm opacity-80">6 of 8 services running normally • Last checked: 30 seconds ago</p>
                    </div>
                </div>
            </div>

            {/* Server Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {metrics.map(m => (
                    <div key={m.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                        <p className="text-xs text-slate-500 mb-2">{m.label}</p>
                        <p className="text-2xl font-bold mb-3">{m.value}{m.unit}</p>
                        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.value}%` }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Services */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold">Service Status</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {services.map(svc => (
                        <div key={svc.name} className="p-5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-primary">{svc.icon}</span>
                            </div>
                            <div className="flex items-center gap-2 flex-1">
                                <div className={`w-2 h-2 rounded-full ${statusStyles[svc.status].dot} animate-pulse`} />
                                <span className="font-semibold text-sm">{svc.name}</span>
                            </div>
                            <span className="text-xs text-slate-500">Uptime: {svc.uptime}</span>
                            <span className="text-xs text-slate-500">Response: {svc.responseTime}</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusStyles[svc.status].badge}`}>
                                {svc.status.charAt(0).toUpperCase() + svc.status.slice(1)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminSystemHealthPage;
