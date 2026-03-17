import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface TestVersion {
  version: string;
  date: string;
  changes: string;
  publishedBy: string;
}

interface TestDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  visibility: 'public' | 'private';
  questions: number;
  completionRate: number;
  completions: number;
  avgTime: string;
  tags: string[];
  versions: TestVersion[];
  stats: {
    totalCompletions: number;
    avgTimeToComplete: string;
    completionRate: number;
  };
  questionsList: Array<{
    id: number;
    text: string;
    type: string;
    options?: string[];
  }>;
}

const AdminTestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'results' | 'analytics'>('overview');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const test: TestDetail = {
    id: id || 'T-4092',
    name: 'PHQ-9 (Depression)',
    category: 'Clinical Diagnostic',
    description: 'The PHQ-9 is a clinically validated, self-reported screening tool used globally by healthcare professionals.',
    status: 'active',
    visibility: 'public',
    questions: 9,
    completionRate: 82,
    completions: 12482,
    avgTime: '4.2 min',
    tags: ['Depression', 'Clinical', 'PHQ-9'],
    versions: [
      { version: '2.1.4', date: 'Oct 24, 2023', changes: 'Updated scoring algorithm', publishedBy: 'Dr. Sarah Smith' },
      { version: '2.0.0', date: 'Mar 12, 2023', changes: 'Major revision', publishedBy: 'Dr. John Doe' },
      { version: '1.0.0', date: 'Jan 05, 2023', changes: 'Initial release', publishedBy: 'Dr. Emily Chen' }
    ],
    stats: {
      totalCompletions: 12482,
      avgTimeToComplete: '4.2 min',
      completionRate: 98
    },
    questionsList: [
      { id: 1, text: 'Little interest or pleasure in doing things', type: 'Likert Scale (0-3)' },
      { id: 2, text: 'Feeling down, depressed, or hopeless', type: 'Likert Scale (0-3)' },
      { id: 3, text: 'Trouble falling or staying asleep, or sleeping too much', type: 'Likert Scale (0-3)' },
      { id: 4, text: 'Feeling tired or having little energy', type: 'Likert Scale (0-3)' },
      { id: 5, text: 'Poor appetite or overeating', type: 'Likert Scale (0-3)' }
    ]
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      draft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      archived: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  const getVisibilityBadge = (visibility: string) => {
    return visibility === 'public'
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link to="/admin" className="text-slate-500 hover:text-primary">Dashboard</Link>
          <span className="text-slate-400">/</span>
          <Link to="/admin/assessments" className="text-slate-500 hover:text-primary">Assessments</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 dark:text-white font-bold">{test.name}</span>
        </div>

        {/* Header Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-black">{test.name}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusBadge(test.status)}`}>
                  {test.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getVisibilityBadge(test.visibility)}`}>
                  {test.visibility}
                </span>
              </div>
              <p className="text-slate-500 mb-2">ID: {test.id} • Category: {test.category}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">{test.description}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2.5 border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg font-bold text-sm hover:bg-red-100 transition-all"
              >
                Delete Test
              </button>
              <button className="px-6 py-2.5 bg-primary text-slate-900 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all">
                Edit Test
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-slate-500 font-medium">Total Completions</p>
              <span className="material-symbols-outlined text-primary">description</span>
            </div>
            <p className="text-3xl font-bold">{test.stats.totalCompletions.toLocaleString()}</p>
            <div className="mt-2 flex items-center gap-1 text-green-500 text-sm font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+12% this month</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-slate-500 font-medium">Avg. Time</p>
              <span className="material-symbols-outlined text-primary">schedule</span>
            </div>
            <p className="text-3xl font-bold">{test.stats.avgTimeToComplete}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-slate-500 font-medium">Completion Rate</p>
              <span className="material-symbols-outlined text-primary">task_alt</span>
            </div>
            <p className="text-3xl font-bold">{test.stats.completionRate}%</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-slate-500 font-medium">Questions</p>
              <span className="material-symbols-outlined text-primary">quiz</span>
            </div>
            <p className="text-3xl font-bold">{test.questions}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
          <div className="flex gap-8">
            {(['overview', 'questions', 'results', 'analytics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab
                    ? 'border-primary text-slate-900 dark:text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
              >
                {tab === 'overview' ? 'Overview' :
                  tab === 'questions' ? `Questions (${test.questions})` :
                    tab === 'results' ? 'Results' : 'Analytics'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-bold mb-4">About this Test</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{test.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {test.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-bold">{tag}</span>
                  ))}
                </div>
              </section>

              <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                  <h3 className="font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">history</span>
                    Version History
                  </h3>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {test.versions.map((version, index) => (
                    <div key={index} className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold">Version {version.version}</p>
                          <p className="text-sm text-slate-500">{version.date} • by {version.publishedBy}</p>
                        </div>
                        {index === 0 && (
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-bold">Current</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{version.changes}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">info</span>
                  Test Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm text-slate-500">Test ID</span>
                    <span className="text-sm font-mono font-bold">{test.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm text-slate-500">Category</span>
                    <span className="text-sm font-bold">{test.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-sm text-slate-500">Questions</span>
                    <span className="text-sm font-bold">{test.questions}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-slate-500">Avg. Time</span>
                    <span className="text-sm font-bold">{test.avgTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">bolt</span>
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-primary/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">preview</span>
                      <span className="text-sm font-semibold">Preview Test</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-primary/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">download</span>
                      <span className="text-sm font-semibold">Export Results</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 flex justify-between items-center">
              <h3 className="font-bold">Test Questions</h3>
              <button className="text-primary text-sm font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">add</span>
                Add Question
              </button>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {test.questionsList.map((question, index) => (
                <div key={question.id} className="p-6 flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold mb-1">{question.text}</p>
                    <p className="text-sm text-slate-500">{question.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1 text-slate-400 hover:text-primary">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-1 text-slate-400 hover:text-red-500">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <span className="material-symbols-outlined text-4xl">warning</span>
              <h3 className="text-xl font-bold">Delete Test</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Are you sure you want to delete "{test.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors">
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestDetailPage;