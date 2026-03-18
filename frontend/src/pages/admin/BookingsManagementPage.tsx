import React, { useState } from 'react';

const bookings = [
    { id: 'B001', user: 'Alex Johnson', expert: 'Dr. Sarah Jenkins', date: 'Mar 8, 2026', time: '10:00 AM', duration: 60, amount: 85.00, status: 'completed' },
    { id: 'B002', user: 'Maria Lopez', expert: 'Dr. Michael Torres', date: 'Mar 9, 2026', time: '14:00 PM', duration: 45, amount: 60.00, status: 'upcoming' },
    { id: 'B003', user: 'James Kim', expert: 'Dr. Linda Park', date: 'Mar 7, 2026', time: '09:00 AM', duration: 60, amount: 75.00, status: 'cancelled' },
    { id: 'B004', user: 'Sophie Nguyen', expert: 'Dr. Sarah Jenkins', date: 'Mar 10, 2026', time: '11:00 AM', duration: 30, amount: 40.00, status: 'upcoming' },
    { id: 'B005', user: 'David Chen', expert: 'Dr. Michael Torres', date: 'Mar 6, 2026', time: '16:00 PM', duration: 60, amount: 85.00, status: 'no-show' },
];

const statusColors: Record<string, string> = {
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    upcoming: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'no-show': 'bg-slate-100 text-slate-500',
};

const BookingsManagementPage: React.FC = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const filtered = bookings.filter(b => {
        const matchFilter = filter === 'all' || b.status === filter;
        const matchSearch = b.user.toLowerCase().includes(search.toLowerCase()) || b.expert.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    return (
        <div className="p-6 max-w-6xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Bookings Management</h1>
                <p className="text-slate-500 text-sm">View and manage all session bookings across the platform.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total Bookings', value: bookings.length, icon: 'calendar_month', color: 'text-primary', bg: 'bg-primary/10' },
                    { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, icon: 'task_alt', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
                    { label: 'Upcoming', value: bookings.filter(b => b.status === 'upcoming').length, icon: 'schedule', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    { label: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, icon: 'cancel', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
                ].map(s => (
                    <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                        <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                            <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
                        </div>
                        <p className="text-2xl font-bold mb-1">{s.value}</p>
                        <p className="text-xs text-slate-500">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-4 flex-wrap">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..."
                        className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
                {['all', 'upcoming', 'completed', 'cancelled', 'no-show'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'}`}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-6 py-3 text-left">ID</th>
                            <th className="px-6 py-3 text-left">User</th>
                            <th className="px-6 py-3 text-left">Expert</th>
                            <th className="px-6 py-3 text-left">Date & Time</th>
                            <th className="px-6 py-3 text-center">Duration</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filtered.map(b => (
                            <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer">
                                <td className="px-6 py-4 font-mono text-xs text-slate-400">{b.id}</td>
                                <td className="px-6 py-4 font-semibold">{b.user}</td>
                                <td className="px-6 py-4 text-slate-500">{b.expert}</td>
                                <td className="px-6 py-4 text-slate-500">{b.date} {b.time}</td>
                                <td className="px-6 py-4 text-center text-slate-500">{b.duration} min</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[b.status]}`}>{b.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right font-bold">${b.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingsManagementPage;
