import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface TestHistoryItem {
  id: string;
  name: string;
  date: string;
  result: {
    label: string;
    category: 'mild' | 'moderate' | 'severe' | 'normal';
  };
  icon: string;
}

const TestHistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'in-progress'>('all');

  const historyData: TestHistoryItem[] = [
    {
      id: '1',
      name: 'Anxiety Assessment (GAD-7)',
      date: 'Oct 12, 2023',
      result: { label: 'Moderate Anxiety', category: 'moderate' },
      icon: 'sentiment_very_dissatisfied'
    },
    {
      id: '2',
      name: 'Daily Stress Level Check',
      date: 'Sep 25, 2023',
      result: { label: 'Low Stress', category: 'normal' },
      icon: 'stress_management'
    },
    {
      id: '3',
      name: 'Sleep Quality Index',
      date: 'Aug 30, 2023',
      result: { label: 'Optimal Sleep', category: 'normal' },
      icon: 'bedtime'
    },
    {
      id: '4',
      name: 'Focus & Attention (ADHD Self-Report)',
      date: 'Aug 15, 2023',
      result: { label: 'High Functioning', category: 'normal' },
      icon: 'track_changes'
    },
    {
      id: '5',
      name: 'PHQ-9 Depression Inventory',
      date: 'Jul 22, 2023',
      result: { label: 'Mild Depression', category: 'mild' },
      icon: 'mood'
    }
  ];

  const getResultBadge = (result: TestHistoryItem['result']) => {
    const colors = {
      mild: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800',
      moderate: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
      severe: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
      normal: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${colors[result.category]}`}>
        {result.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hidden md:block">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold">Alex Johnson</h3>
              <p className="text-xs text-slate-500">Student ID: 4829</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { icon: 'home', label: 'Home', href: '/' },
              { icon: 'assignment', label: 'Available Tests', href: '/tests' },
              { icon: 'history', label: 'Test History', href: '/tests/history', active: true },
              { icon: 'bar_chart', label: 'Reports', href: '/reports' },
              { icon: 'settings', label: 'Settings', href: '/settings' }
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-primary/20 text-slate-900 dark:text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-primary/10'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Test History</h1>
              <p className="text-slate-500">Track your mental health journey and review past assessment insights.</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
              <div className="flex gap-6">
                {(['all', 'completed', 'in-progress'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium capitalize transition-colors relative ${
                      activeTab === tab
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab === 'all' ? 'All Tests' : tab === 'completed' ? 'Completed' : 'In Progress'}
                  </button>
                ))}
              </div>
            </div>

            {/* History Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Test Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Date Taken
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Result Summary
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {historyData.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary/80">
                              {item.icon}
                            </span>
                            <span className="text-sm font-semibold">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {item.date}
                        </td>
                        <td className="px-6 py-4">
                          {getResultBadge(item.result)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link 
                            to={`/tests/${item.id}/result`}
                            className="text-primary hover:text-primary/80 text-sm font-bold inline-flex items-center gap-1"
                          >
                            View Details
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500">Showing 1-5 of 12 assessments</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-semibold bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded text-slate-600 dark:text-slate-300 disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <button className="px-3 py-1 text-xs font-semibold bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded text-slate-600 dark:text-slate-300">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="mt-6 bg-primary/10 rounded-xl p-6 border border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-900">rocket_launch</span>
                </div>
                <div>
                  <h4 className="font-bold">Ready for your next check-in?</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Regular assessments help track progress more accurately over time.
                  </p>
                </div>
              </div>
              <Link
                to="/tests"
                className="px-6 py-2 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Take New Test
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestHistoryPage;