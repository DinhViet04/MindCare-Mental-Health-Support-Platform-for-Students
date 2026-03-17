import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Expert {
  id: string;
  name: string;
  expertId: string;
  specialization: string;
  rating: number;
  status: 'verified' | 'pending' | 'suspended';
  patients: number;
  avatar?: string;
  initials: string;
}

const ExpertsManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');

  const experts: Expert[] = [
    {
      id: '1',
      name: 'Dr. Sarah Jenkins',
      expertId: 'MC-9021',
      specialization: 'Clinical Psychology',
      rating: 4.9,
      status: 'verified',
      patients: 42,
      initials: 'SJ'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      expertId: 'MC-8432',
      specialization: 'Child Specialist',
      rating: 4.8,
      status: 'verified',
      patients: 28,
      initials: 'MC'
    },
    {
      id: '3',
      name: 'Elena Rodriguez',
      expertId: 'MC-7719',
      specialization: 'Cognitive Therapy',
      rating: 4.7,
      status: 'pending',
      patients: 0,
      initials: 'ER'
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      expertId: 'MC-6522',
      specialization: 'Neuropsychology',
      rating: 5.0,
      status: 'verified',
      patients: 15,
      initials: 'JW'
    },
    {
      id: '5',
      name: 'Dr. Emily Blunt',
      expertId: 'MC-5100',
      specialization: 'Counseling',
      rating: 4.6,
      status: 'suspended',
      patients: 0,
      initials: 'EB'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      verified: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      suspended: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };
    return styles[status as keyof typeof styles] || '';
  };

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.expertId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expert.status === statusFilter;
    const matchesSpecialization = specializationFilter === 'all' || expert.specialization === specializationFilter;
    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  const specializations = ['all', ...new Set(experts.map(e => e.specialization))];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Experts Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Direct and manage verified mental health practitioners.
            </p>
          </div>
          <Link
            to="/admin/experts/onboard"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-slate-900 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">add</span>
            Onboard New Expert
          </Link>
        </div>

        {/* Filter Bar */}
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
                placeholder="Search experts..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Statuses</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <select
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Specializations</option>
                {specializations.filter(s => s !== 'all').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined">filter_list</span>
                Advanced Filters
              </button>
            </div>
          </div>
        </div>

        {/* Specialization Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            {[
              { label: 'All Experts', count: 124 },
              { label: 'Clinical Psychology', count: 42 },
              { label: 'Counseling', count: 28 },
              { label: 'Child Psychology', count: 19 },
              { label: 'Neuropsychology', count: 15 }
            ].map((tab, index) => (
              <button
                key={tab.label}
                className={`pb-3 px-1 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${index === 0
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Experts Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Expert Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Active Patients
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredExperts.map((expert) => (
                  <tr key={expert.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                          {expert.initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{expert.name}</p>
                          <p className="text-xs text-slate-500">ID: {expert.expertId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {expert.specialization}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm font-bold text-slate-900 dark:text-white mr-1">
                          {expert.rating}
                        </span>
                        <span className="material-symbols-outlined text-sm text-yellow-500 fill-current">
                          star
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusBadge(expert.status)}`}>
                        {expert.status.charAt(0).toUpperCase() + expert.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {expert.patients} Patients
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <p className="text-xs text-slate-500">Showing 1 to {filteredExperts.length} of 124 experts</p>
            <div className="flex gap-2">
              <button className="p-2 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="px-3 py-1 rounded bg-primary text-slate-900 font-bold text-xs">1</button>
              <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 text-xs hover:bg-slate-100 dark:hover:bg-slate-600">2</button>
              <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 text-xs hover:bg-slate-100 dark:hover:bg-slate-600">3</button>
              <button className="p-2 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertsManagementPage;