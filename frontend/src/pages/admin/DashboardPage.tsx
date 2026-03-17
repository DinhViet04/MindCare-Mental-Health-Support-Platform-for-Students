import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface MetricCard {
  title: string;
  value: string;
  change: number;
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface RecentBooking {
  id: string;
  user: { name: string; avatar: string; initials: string };
  expert: { name: string; initials: string };
  sessionType: string;
  status: 'confirmed' | 'in-progress' | 'pending';
  amount: number;
}

const DashboardPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const metrics: MetricCard[] = [
    {
      title: 'Total Users',
      value: '12,840',
      change: 12.5,
      icon: 'person',
      iconBg: 'bg-blue-50 dark:bg-blue-900/30',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Active Experts',
      value: '458',
      change: 5.2,
      icon: 'stethoscope',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary'
    },
    {
      title: 'Total Revenue',
      value: '$84,200',
      change: 18.1,
      icon: 'payments',
      iconBg: 'bg-green-50 dark:bg-green-900/30',
      iconColor: 'text-green-500'
    },
    {
      title: 'Bookings',
      value: '1,205',
      change: -2.4,
      icon: 'book_online',
      iconBg: 'bg-orange-50 dark:bg-orange-900/30',
      iconColor: 'text-orange-500'
    }
  ];

  const recentBookings: RecentBooking[] = [
    {
      id: '#BK-9021',
      user: { name: 'Sarah Jenkins', avatar: '', initials: 'SJ' },
      expert: { name: 'Dr. Emily Stone', initials: 'ES' },
      sessionType: 'Video Consultation',
      status: 'confirmed',
      amount: 120.00
    },
    {
      id: '#BK-9020',
      user: { name: 'Michael Reed', avatar: '', initials: 'MR' },
      expert: { name: 'Dr. Alan Watts', initials: 'AW' },
      sessionType: 'Audio Session',
      status: 'in-progress',
      amount: 95.00
    },
    {
      id: '#BK-9019',
      user: { name: 'Elena Kostas', avatar: '', initials: 'EK' },
      expert: { name: 'Therapist Jane Doe', initials: 'JD' },
      sessionType: 'Chat Support',
      status: 'pending',
      amount: 45.00
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      'confirmed': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'pending': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    };
    return styles[status as keyof typeof styles] || '';
  };

  const quickActions = [
    { icon: 'person_add', title: 'Approve New Expert', description: '12 pending applications', color: 'text-primary' },
    { icon: 'mail_outline', title: 'Bulk Notification', description: 'Send updates to users', color: 'text-blue-500' },
    { icon: 'analytics', title: 'Generate Monthly Audit', description: 'Compliance & activity logs', color: 'text-purple-500' },
    { icon: 'support_agent', title: 'Support Tickets', description: '5 high priority tickets', color: 'text-orange-500' }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Track your platform's performance and growth metrics.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>This Year</option>
                <option>Custom Range</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">
              <span className="material-symbols-outlined text-lg">download</span>
              Export Report
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                  <span className={`material-symbols-outlined ${metric.iconColor}`}>
                    {metric.icon}
                  </span>
                </div>
                <span className={`text-xs font-bold flex items-center gap-1 px-2 py-1 rounded-full ${metric.change >= 0
                    ? 'text-green-500 bg-green-500/10'
                    : 'text-red-500 bg-red-500/10'
                  }`}>
                  <span className="material-symbols-outlined text-xs">
                    {metric.change >= 0 ? 'trending_up' : 'trending_down'}
                  </span>
                  {Math.abs(metric.change)}%
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                {metric.title}
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main Charts & Tasks Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart Placeholder */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Revenue & Booking Trends</h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-xs text-slate-500">Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                  <span className="text-xs text-slate-500">Bookings</span>
                </div>
              </div>
            </div>

            {/* Chart Bars */}
            <div className="h-64 flex items-end justify-between gap-2 px-2 border-b border-slate-100 dark:border-slate-700">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month, i) => {
                const revenueHeight = 40 + Math.random() * 50;
                const bookingHeight = 30 + Math.random() * 40;
                return (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-primary/20 rounded-t-sm relative group" style={{ height: `${revenueHeight}%` }}>
                      <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all group-hover:bg-primary/80" style={{ height: `${bookingHeight}%` }}></div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-4 p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all text-left"
                >
                  <div className={`w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center ${action.color}`}>
                    <span className="material-symbols-outlined">{action.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{action.title}</p>
                    <p className="text-xs text-slate-500">{action.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h3 className="text-lg font-bold">Recent Bookings</h3>
            <button className="text-primary text-sm font-bold hover:underline">
              View All Bookings
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Expert</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Session Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                          {booking.user.initials}
                        </div>
                        <span className="text-sm font-semibold">{booking.user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{booking.expert.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{booking.sessionType}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">${booking.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;