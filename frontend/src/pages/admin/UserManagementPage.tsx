import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  status: 'active' | 'pending' | 'blocked';
  registrationDate: string;
  lastActive: string;
  avatar?: string;
  initials: string;
}

const UserManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const stats = [
    { label: 'Total Students', value: '2,845', change: 12, icon: 'group' },
    { label: 'Active Now', value: '156', change: null, icon: 'online_prediction' },
    { label: 'Pending Verifications', value: '42', change: null, icon: 'pending_actions' },
    { label: 'Blocked Users', value: '18', change: null, icon: 'block' }
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'Alex Thompson',
      email: 'alex.t@university.edu',
      studentId: 'MC-2024-001',
      status: 'active',
      registrationDate: 'Oct 12, 2023',
      lastActive: '2 hours ago',
      initials: 'AT'
    },
    {
      id: '2',
      name: 'Sarah Jenkins',
      email: 's.jenkins@campus.ac.uk',
      studentId: 'MC-2024-042',
      status: 'pending',
      registrationDate: 'Jan 05, 2024',
      lastActive: 'Never',
      initials: 'SJ'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'mchen@student.uni.edu',
      studentId: 'MC-2023-882',
      status: 'blocked',
      registrationDate: 'Aug 22, 2023',
      lastActive: '3 days ago',
      initials: 'MC'
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      email: 'emily.rod@univ-state.edu',
      studentId: 'MC-2024-009',
      status: 'active',
      registrationDate: 'Nov 30, 2023',
      lastActive: 'Yesterday',
      initials: 'ER'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      blocked: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
    };
    return styles[status as keyof typeof styles] || '';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              User Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage and monitor student accounts, registration and activity.
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-slate-900 rounded-lg font-bold hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined">person_add</span>
            Add New User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="material-symbols-outlined text-slate-400">{stat.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
              {stat.change && (
                <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  +{stat.change}% this month
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <span className="material-symbols-outlined">search</span>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, student ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="blocked">Blocked</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary"
              >
                <option value="all">Registration Date</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="year">This Year</option>
              </select>
              <button className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                <span className="material-symbols-outlined text-lg mr-2 align-middle">filter_list</span>
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500 tracking-wider">
                    User Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Reg. Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                          {user.initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm">{user.studentId}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusBadge(user.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' :
                            user.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
                          }`}></span>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {user.registrationDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/users/${user.id}`}
                          className="p-2 text-slate-400 hover:text-primary transition-colors"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" title="Edit">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors" title="Block User">
                          <span className="material-symbols-outlined">block</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing 1 to {filteredUsers.length} of 2,845 users</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-semibold disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-slate-900 text-sm font-bold">1</button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-600">2</button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-600">3</button>
              <span className="px-2 py-1.5 text-slate-400">...</span>
              <button className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-600">285</button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-600">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;