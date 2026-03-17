import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Test {
  id: string;
  name: string;
  category: string;
  status: 'Active' | 'Draft' | 'Archived';
  completions: number;
  lastModified: string;
}

const ManageTestsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const tests: Test[] = [
    {
      id: 'T-4092',
      name: 'GAD-7 Anxiety Scale',
      category: 'Anxiety',
      status: 'Active',
      completions: 1248,
      lastModified: '2 days ago'
    },
    {
      id: 'T-8122',
      name: 'PHQ-9 Depression Inventory',
      category: 'Depression',
      status: 'Active',
      completions: 856,
      lastModified: 'Oct 12, 2023'
    },
    {
      id: 'T-3310',
      name: 'Work-Life Balance Audit',
      category: 'Stress',
      status: 'Draft',
      completions: 0,
      lastModified: 'Just now'
    },
    {
      id: 'T-1944',
      name: 'MBTI Alternative Assessment',
      category: 'Personality',
      status: 'Active',
      completions: 5912,
      lastModified: 'Sep 30, 2023'
    },
    {
      id: 'T-6621',
      name: 'Social Anxiety Checklist',
      category: 'Anxiety',
      status: 'Active',
      completions: 413,
      lastModified: 'Nov 01, 2023'
    }
  ];

  const stats = {
    totalActive: 18,
    activeGrowth: 12,
    draftsInProgress: 6,
    avgCompletionTime: '8.5m',
    avgCompletionTrend: -4
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
            Active
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            Draft
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {status}
          </span>
        );
    }
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || test.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">Manage Tests</h1>
            <p className="text-slate-500">Create, edit, and monitor psychological assessments.</p>
          </div>
          <Link
            to="/admin/assessments/create"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-slate-900 rounded-lg font-bold hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">add</span>
            Create New Test
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tests by title, ID or category..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Category: All</option>
                  <option value="Anxiety">Anxiety</option>
                  <option value="Depression">Depression</option>
                  <option value="Stress">Stress</option>
                  <option value="Personality">Personality</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Status: All</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Tests Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Test Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Completions</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Last Modified</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredTests.map((test) => (
                  <tr key={test.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold">{test.name}</span>
                        <span className="text-xs text-slate-400">ID: {test.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{test.category}</td>
                    <td className="px-6 py-4">{getStatusBadge(test.status)}</td>
                    <td className="px-6 py-4 text-sm font-medium">{test.completions.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{test.lastModified}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/assessments/${test.id}`}
                          className="p-2 text-slate-400 hover:text-primary"
                          title="Preview"
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </Link>
                        <Link
                          to={`/admin/assessments/${test.id}/edit`}
                          className="p-2 text-slate-400 hover:text-blue-500"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-red-500" title="Delete">
                          <span className="material-symbols-outlined">delete</span>
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
            <span className="text-sm text-slate-500">
              Showing 1 to {filteredTests.length} of {tests.length} tests
            </span>
            <div className="flex gap-2">
              <button className="p-2 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-400 hover:text-primary disabled:opacity-50" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-slate-900 font-bold text-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-600 text-sm">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-600 text-sm">3</button>
              <button className="p-2 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-400 hover:text-primary">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <span className="text-slate-500 text-sm font-medium">Total Active Tests</span>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-black">{stats.totalActive}</span>
              <span className="text-emerald-500 text-sm font-bold flex items-center">
                <span className="material-symbols-outlined text-xs">arrow_upward</span>
                {stats.activeGrowth}%
              </span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <span className="text-slate-500 text-sm font-medium">Drafts in Progress</span>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-black">{stats.draftsInProgress}</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <span className="text-slate-500 text-sm font-medium">Avg. Completion Time</span>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-black">{stats.avgCompletionTime}</span>
              <span className="text-rose-500 text-sm font-bold flex items-center">
                <span className="material-symbols-outlined text-xs">arrow_downward</span>
                {Math.abs(stats.avgCompletionTrend)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTestsPage;