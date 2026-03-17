import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  type: 'scale' | 'multiple' | 'text';
  options?: { value: number; label: string }[];
  weight: number;
  required: boolean;
}

const CreateTestPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'questions' | 'scoring' | 'settings'>('info');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: 'How often have you felt unable to control the important things in your life?',
      type: 'scale',
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
      text: '',
      type: 'multiple',
      options: [
        { value: 0, label: '' },
        { value: 1, label: '' }
      ],
      weight: 1.0,
      required: true
    }
  ]);

  const [testInfo, setTestInfo] = useState({
    title: 'Anxiety Assessment',
    category: 'Anxiety & Stress',
    duration: 15,
    description: '',
    version: '2.1.4'
  });

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: '',
      type: 'multiple',
      options: [{ value: 0, label: '' }, { value: 1, label: '' }],
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

  const addOption = (questionId: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newValue = q.options.length;
        return {
          ...q,
          options: [...q.options, { value: newValue, label: '' }]
        };
      }
      return q;
    }));
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <a href="/admin" className="text-slate-500 hover:text-primary">Admin</a>
          <span className="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
          <a href="/admin/tests" className="text-slate-500 hover:text-primary">Tests</a>
          <span className="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
          <span className="text-slate-900 dark:text-white font-semibold">Create New Assessment</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Create New Assessment</h1>
            <p className="text-slate-500">Define the core parameters and questions for your clinical evaluation.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-primary text-primary rounded-lg font-bold hover:bg-primary/5">
              Preview
            </button>
            <button className="px-6 py-2 bg-primary text-slate-900 rounded-lg font-bold hover:bg-primary/90">
              Publish Test
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
          <div className="flex gap-6">
            {[
              { id: 'info', label: 'General Info', icon: 'info' },
              { id: 'questions', label: `Questions (${questions.length})`, icon: 'quiz' },
              { id: 'scoring', label: 'Scoring Logic', icon: 'calculate' },
              { id: 'settings', label: 'Settings', icon: 'settings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span>
                Assessment Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Test Title
                  </label>
                  <input
                    type="text"
                    value={testInfo.title}
                    onChange={(e) => setTestInfo({ ...testInfo, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. Cognitive Anxiety Scale (CAS-20)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Category
                  </label>
                  <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary">
                    <option>Select category</option>
                    <option>Anxiety & Stress</option>
                    <option>Mood Disorders</option>
                    <option>Personality</option>
                    <option>Cognitive Function</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Estimated Duration (mins)
                  </label>
                  <input
                    type="number"
                    value={testInfo.duration}
                    onChange={(e) => setTestInfo({ ...testInfo, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Clinical Description
                  </label>
                  <textarea
                    rows={4}
                    value={testInfo.description}
                    onChange={(e) => setTestInfo({ ...testInfo, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                    placeholder="Explain the purpose and methodology of this test..."
                  />
                </div>
              </div>
            </div>

            {/* Version Info */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">info</span>
              <div>
                <p className="font-bold text-sm">You are creating a new test</p>
                <p className="text-sm text-slate-500">Version {testInfo.version} will be saved as a draft until you publish.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="space-y-6">
            {/* Questions Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Test Questions</h3>
              <button
                onClick={addQuestion}
                className="flex items-center gap-2 text-primary font-bold text-sm"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Add New Question
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 w-6 h-6 flex items-center justify-center rounded text-xs font-bold">
                        {index + 1}
                      </span>
                      <select
                        value={question.type}
                        onChange={(e) => updateQuestion(question.id, { type: e.target.value as any })}
                        className="text-sm font-bold text-slate-400 uppercase tracking-widest bg-transparent border-none focus:ring-0"
                      >
                        <option value="scale">Likert Scale</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="text">Text Input</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">drag_indicator</span>
                      </button>
                      <button
                        onClick={() => deleteQuestion(question.id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-700 border-none rounded-lg p-3 font-medium focus:ring-2 focus:ring-primary mb-4"
                    placeholder="Enter your question here..."
                  />

                  {question.type === 'scale' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {question.options?.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <span className="text-xs font-bold text-slate-400 w-4">{option.value}</span>
                          <input
                            type="text"
                            value={option.label}
                            onChange={(e) => {
                              const newOptions = [...(question.options || [])];
                              newOptions[optIndex] = { ...option, label: e.target.value };
                              updateQuestion(question.id, { options: newOptions });
                            }}
                            className="bg-transparent border-none text-sm w-full focus:ring-0"
                            placeholder={`Option ${optIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'multiple' && (
                    <div className="space-y-3">
                      {question.options?.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                          <input
                            type="text"
                            value={option.label}
                            onChange={(e) => {
                              const newOptions = [...(question.options || [])];
                              newOptions[optIndex] = { ...option, label: e.target.value };
                              updateQuestion(question.id, { options: newOptions });
                            }}
                            className="flex-1 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm outline-none"
                            placeholder={`Option ${optIndex + 1}`}
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => addOption(question.id)}
                        className="flex items-center gap-2 text-primary text-sm font-bold mt-2 hover:opacity-80"
                      >
                        <span className="material-symbols-outlined text-sm">add_circle</span>
                        Add Option
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-slate-500">Weight:</label>
                      <input
                        type="number"
                        value={question.weight}
                        onChange={(e) => updateQuestion(question.id, { weight: parseFloat(e.target.value) })}
                        className="w-20 px-2 py-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-sm"
                        step="0.1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={question.required}
                        onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                        className="rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      <label className="text-sm text-slate-500">Required</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-700 mt-8">
          <button className="px-6 py-2 rounded-lg font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            Save as Draft
          </button>
          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-lg font-bold border-2 border-primary text-primary hover:bg-primary/5 transition-colors">
              Preview
            </button>
            <button className="px-8 py-2 rounded-lg font-bold bg-primary text-slate-900 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Publish Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTestPage;