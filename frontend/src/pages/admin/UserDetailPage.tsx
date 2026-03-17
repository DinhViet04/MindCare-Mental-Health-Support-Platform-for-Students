import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface UserDetail {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended';
  memberSince: string;
  lastLogin: string;
  location: string;
  avatar?: string;
  stats: {
    totalBookings: number;
    testsCompleted: number;
    averageMood: number;
    accountStatus: string;
  };
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  healthProfile: {
    dob: string;
    primaryCaregiver: string;
    preferredLanguage: string;
    notificationPrefs: string;
  };
  recentActivity: Array<{
    type: 'booking' | 'test' | 'log';
    description: string;
    date: string;
    status: string;
  }>;
}

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'info' | 'bookings' | 'tests' | 'logs'>('info');

  // Mock data - would fetch from API
  const user: UserDetail = {
    id: id || '1',
    name: 'John Doe',
    email: 'johndoe@email.com',
    status: 'active',
    memberSince: 'Jan 15, 2023',
    lastLogin: '2 hours ago from San Francisco, CA',
    location: 'San Francisco, USA',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    stats: {
      totalBookings: 24,
      testsCompleted: 12,
      averageMood: 7.4,
      accountStatus: 'Good'
    },
    contactInfo: {
      fullName: 'Johnathan Doe',
      email: 'johndoe@email.com',
      phone: '+1 (555) 012-3456',
      location: 'San Francisco, USA'
    },
    healthProfile: {
      dob: 'May 12, 1992 (31 yrs)',
      primaryCaregiver: 'Dr. Sarah Smith',
      preferredLanguage: 'English',
      notificationPrefs: 'Email, SMS'
    },
    recentActivity: [
      {
        type: 'booking',
        description: 'Therapy Session with Dr. Smith',
        date: 'Oct 24, 2023, 10:00 AM',
        status: 'Completed'
      },
      {
        type: 'test',
        description: 'Weekly Wellness Checkpoint',
        date: 'Oct 22, 2023, 03:15 PM',
        status: 'Completed'
      },
      {
        type: 'log',
        description: 'New login from Chrome / macOS',
        date: 'Oct 20, 2023, 09:44 AM',
        status: 'System'
      }
    ]
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return 'calendar_today text-blue-500';
      case 'test': return 'description text-purple-500';
      case 'log': return 'login text-amber-500';
      default: return 'info text-slate-500';
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link to="/admin" className="text-slate-500 hover:text-primary">Dashboard</Link>
          <span className="text-slate-400">/</span>
          <Link to="/admin/users" className="text-slate-500 hover:text-primary">User Management</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 dark:text-white font-bold">User Detail</span>
        </div>

        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex gap-6 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${user.status === 'active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                    {user.status}
                  </span>
                </div>
                <p className="text-slate-500 flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  {user.email} • Member since {user.memberSince}
                </p>
                <p className="text-sm text-slate-400">Last Login: {user.lastLogin}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-bold hover:bg-red-100 hover:text-red-600 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">block</span>
                Suspend
              </button>
              <button className="px-6 py-2.5 bg-primary text-slate-900 rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">lock_reset</span>
                Reset Password
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-slate-500">Total Bookings</p>
              <span className="material-symbols-outlined text-primary">calendar_month</span>
            </div>
            <p className="text-3xl font-bold">{user.stats.totalBookings}</p>
            <p className="text-xs text-green-500 mt-1">+2 this month</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-slate-500">Tests Completed</p>
              <span className="material-symbols-outlined text-primary">fact_check</span>
            </div>
            <p className="text-3xl font-bold">{user.stats.testsCompleted}</p>
            <p className="text-xs text-slate-400">Last: Anxiety Scale</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-slate-500">Average Mood</p>
              <span className="material-symbols-outlined text-primary">sentiment_satisfied</span>
            </div>
            <p className="text-3xl font-bold">{user.stats.averageMood}</p>
            <p className="text-xs text-green-500">Improving trend</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-slate-500">Account Status</p>
              <span className="material-symbols-outlined text-primary">verified_user</span>
            </div>
            <p className="text-3xl font-bold">{user.stats.accountStatus}</p>
            <p className="text-xs text-slate-400">No violations</p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-700 px-6 overflow-x-auto">
            <div className="flex gap-8 whitespace-nowrap">
              {[
                { id: 'info', label: 'Personal Info', icon: 'person' },
                { id: 'bookings', label: 'Booking History', icon: 'history' },
                { id: 'tests', label: 'Test History', icon: 'assignment' },
                { id: 'logs', label: 'Activity Logs', icon: 'list_alt' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 text-sm font-bold transition-colors ${activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'info' && (
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-lg font-bold mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    {Object.entries(user.contactInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                        <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Health Profile</h3>
                  <div className="space-y-4">
                    {Object.entries(user.healthProfile).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                        <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="text-center py-8 text-slate-500">
                Booking history will be displayed here
              </div>
            )}

            {activeTab === 'tests' && (
              <div className="text-center py-8 text-slate-500">
                Test history will be displayed here
              </div>
            )}

            {activeTab === 'logs' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Description</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-bold uppercase text-slate-500">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {user.recentActivity.map((activity, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`material-symbols-outlined text-sm ${getActivityIcon(activity.type)}`}>
                                {activity.type === 'booking' ? 'calendar_today' :
                                  activity.type === 'test' ? 'description' : 'login'}
                              </span>
                              <span className="font-medium capitalize">{activity.type}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{activity.description}</td>
                          <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{activity.date}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${activity.status === 'Completed'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                              }`}>
                              {activity.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button className="text-slate-400 hover:text-primary">
                              <span className="material-symbols-outlined">more_vert</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-200 dark:border-red-900/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-red-700 dark:text-red-400 font-bold text-lg">Danger Zone</h3>
              <p className="text-red-600/70 dark:text-red-400/70 text-sm">
                Once you delete an account, there is no going back. Please be certain.
              </p>
            </div>
            <button className="px-6 py-2.5 border border-red-200 dark:border-red-900 bg-white dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;