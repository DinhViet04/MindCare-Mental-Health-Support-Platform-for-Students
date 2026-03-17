import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  type: 'scale' | 'multiple' | 'text';
  options?: { value: number; label: string }[];
  weight: number;
  required: boolean;
}

interface TestVersion {
  version: string;
  date: string;
  changes: string;
  publishedBy: string;
}

interface TestStats {
  totalCompletions: number;
  avgTimeToComplete: string;
  completionRate: number;
}

const EditTestPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'questions' | 'scoring' | 'settings'>('questions');

  // Mock data - would fetch from API
  const [testInfo, setTestInfo] = useState({
    id: id || 'AX-772-V2',
    name: 'Anxiety Assessment',
    status: 'active' as const,
    lastModified: 'Oct 24, 2023 by Dr. Sarah Smith',
    version: '2.1.4'
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: 'How often have you been bothered by feeling nervous, anxious, or on edge?',
      type: 'multiple',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ],
      weight: 1.0,
      required: true
    },
    {
      id: 2,
      text: 'Not being able to stop or control worrying?',
      type: 'multiple',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ],
      weight: 1.0,
      required: true
    }
  ]);

  const [versions] = useState<TestVersion[]>([
    { version: '2.1.4', date: 'Oct 24, 2023', changes: 'Updated scoring algorithm', publishedBy: 'Dr. Sarah Smith' },
    { version: '2.0.0', date: 'Mar 12, 2023', changes: 'Major revision', publishedBy: 'Dr. John Doe' }
  ]);

  const [stats] = useState<TestStats>({
    totalCompletions: 12482,
    avgTimeToComplete: '4.2 min',
    completionRate: 98
  });

  const [showVersionAlert, setShowVersionAlert] = useState(true);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: '',
      type: 'multiple',
      options: [
        { value: 0, label: '' },
        { value: 1, label: '' },
        { value: 2, label: '' },
        { value: 3, label: '' }
      ],
      weight: 1.0,
      required: true
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: number, updates: Partial<Question>) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, ...updates } : q
    ));
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = { ...newOptions[optionIndex], label: value };
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleSave = () => {
    console.log('Saving changes...');
    // API call to save changes
    navigate('/admin/assessments');
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <a href="/admin" className="text-slate-500 hover:text-primary">Admin</a>
          <span className="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
          <a href="/admin/tests" className="text-slate-500 hover:text-primary">Tests</a>
          <span className="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
          <span className="text-slate-900 dark:text-white font-semibold">Edit {testInfo.name} v{testInfo.version}</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black">{testInfo.name}</h1>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                {testInfo.status}
              </span>
            </div>
            <p className="text-slate-500">
              Last modified: {testInfo.lastModified} •{' '}
              <span className="text-primary font-medium">Version {testInfo.version}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200">
              <span className="material-symbols-outlined text-lg">history</span>
              Version History
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary/10">
              <span className="material-symbols-outlined text-lg">content_copy</span>
              Save as Draft
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
          <div className="flex gap-8">
            {['General Info', 'Questions', 'Scoring Logic', 'Settings'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '') as any)}
                className={`pb-3 text-sm font-bold transition-colors ${(index === 1 && activeTab === 'questions') ||
                    (index === 0 && activeTab === 'info') ||
                    (index === 2 && activeTab === 'scoring') ||
                    (index === 3 && activeTab === 'settings')
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Questions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Version Alert */}
            {showVersionAlert && (
              <div className="bg-primary/10 border border-primary/30 p-4 rounded-xl flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">info</span>
                <div>
                  <p className="font-bold text-sm">You are editing a live version</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Changes will be saved as a new minor version ({testInfo.version}.5) unless you choose to create a major release.
                  </p>
                </div>
                <button
                  onClick={() => setShowVersionAlert(false)}
                  className="text-slate-400 hover:text-primary"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            )}

            {/* Question List Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Questions ({questions.length})</h3>
              <button
                onClick={addQuestion}
                className="flex items-center gap-2 text-primary font-bold text-sm"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Add New Question
              </button>
            </div>

            {/* Question Cards */}
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-slate-100 dark:bg-slate-700 w-6 h-6 flex items-center justify-center rounded text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                      Multiple Choice
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1 text-slate-400 hover:text-primary">
                      <span className="material-symbols-outlined">drag_indicator</span>
                    </button>
                    <button
                      onClick={() => deleteQuestion(question.id)}
                      className="p-1 text-slate-400 hover:text-red-500"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-700 border-none rounded-lg p-3 text-lg font-medium focus:ring-2 focus:ring-primary mb-4"
                />

                <div className="grid grid-cols-2 gap-4">
                  {question.options?.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <span className="text-xs font-bold text-slate-400 w-4">{option.value}</span>
                      <input
                        type="text"
                        value={option.label}
                        onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                        className="bg-transparent border-none text-sm w-full focus:ring-0"
                      />
                    </div>
                  ))}
                </div>

                {index === 1 && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <span className="material-symbols-outlined text-sm">link</span>
                    Using shared option scale "Frequency Standard"
                    <button className="text-primary font-bold hover:underline ml-1">Edit Scale</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column - Stats & Metadata */}
          <div className="space-y-6">
            {/* Test Stats */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-widest">Test Stats</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-black text-primary">{stats.totalCompletions.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 font-medium">Total Completions</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.avgTimeToComplete}</p>
                  <p className="text-xs text-slate-500 font-medium">Avg. Time to Complete</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.completionRate}%</p>
                  <p className="text-xs text-slate-500 font-medium">Completion Rate</p>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-widest">Metadata</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400">ID</span>
                  <p className="text-sm font-mono">{testInfo.id}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400">CREATED</span>
                  <p className="text-sm">Mar 12, 2023</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400">TAGS</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-[10px] rounded border border-slate-200">
                      Anxiety
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-[10px] rounded border border-slate-200">
                      Clinical
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Version History */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h4 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-widest">Version History</h4>
              <div className="space-y-4">
                {versions.map((version, index) => (
                  <div key={index} className="pb-3 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <p className="font-bold">Version {version.version}</p>
                      {index === 0 && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{version.date} • by {version.publishedBy}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{version.changes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-8">
          <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 font-bold text-sm">
            <span className="material-symbols-outlined">delete_forever</span>
            Archive This Test
          </button>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-slate-200 dark:bg-slate-700 rounded-lg font-bold hover:bg-slate-300">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-primary text-slate-900 rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              Update & Publish Version {testInfo.version}.5
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTestPage;