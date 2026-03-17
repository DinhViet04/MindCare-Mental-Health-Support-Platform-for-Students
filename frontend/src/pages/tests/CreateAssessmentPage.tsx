import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import AdminSidebar from '../../components/Admin/AdminSidebar';

interface Question {
  id: number;
  text: string;
  type: 'scale' | 'multiple' | 'text';
  options?: { value: number; label: string }[];
  weight: number;
  required: boolean;
}

const CreateAssessmentPage: React.FC = () => {
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
    title: '',
    category: '',
    duration: 15,
    description: ''
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

  const handleSave = () => {
    console.log('Saving test:', testInfo);
    console.log('Questions:', questions);
    // API call to save test
    navigate('/admin/assessments');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <AdminNavbar />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm mb-4">
              <span className="text-xs font-medium text-primary uppercase tracking-widest">Dashboard</span>
              <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
              <span className="text-xs font-medium text-primary uppercase tracking-widest">New Assessment</span>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-black mb-2">Create Assessment</h1>
                <p className="text-slate-500">Define the core parameters and questions for your clinical evaluation.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary/5">
                  Preview
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-2 bg-primary text-slate-900 rounded-lg font-bold hover:bg-primary/90"
                >
                  Publish Test
                </button>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex gap-8 mb-8">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'info' 
                    ? 'bg-primary text-slate-900 font-semibold shadow-lg shadow-primary/20' 
                    : 'text-slate-600 hover:bg-primary/10'
                }`}
              >
                <span className="material-symbols-outlined">info</span>
                <span className="text-sm">Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'questions' 
                    ? 'bg-primary text-slate-900 font-semibold shadow-lg shadow-primary/20' 
                    : 'text-slate-600 hover:bg-primary/10'
                }`}
              >
                <span className="material-symbols-outlined">quiz</span>
                <span className="text-sm">Questions</span>
              </button>
              <button
                onClick={() => setActiveTab('scoring')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'scoring' 
                    ? 'bg-primary text-slate-900 font-semibold shadow-lg shadow-primary/20' 
                    : 'text-slate-600 hover:bg-primary/10'
                }`}
              >
                <span className="material-symbols-outlined">calculate</span>
                <span className="text-sm">Scoring Rules</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'settings' 
                    ? 'bg-primary text-slate-900 font-semibold shadow-lg shadow-primary/20' 
                    : 'text-slate-600 hover:bg-primary/10'
                }`}
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="text-sm">Test Settings</span>
              </button>
            </div>

            {/* Content */}
            {activeTab === 'info' && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">description</span>
                  Assessment Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Test Title
                    </label>
                    <input
                      type="text"
                      value={testInfo.title}
                      onChange={(e) => setTestInfo({ ...testInfo, title: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g. Cognitive Anxiety Scale (CAS-20)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Category
                    </label>
                    <select
                      value={testInfo.category}
                      onChange={(e) => setTestInfo({ ...testInfo, category: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select category</option>
                      <option value="anxiety">Anxiety & Stress</option>
                      <option value="depression">Mood Disorders</option>
                      <option value="personality">Personality</option>
                      <option value="cognitive">Cognitive Function</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Estimated Duration (mins)
                    </label>
                    <input
                      type="number"
                      value={testInfo.duration}
                      onChange={(e) => setTestInfo({ ...testInfo, duration: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="15"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Clinical Description
                    </label>
                    <textarea
                      rows={4}
                      value={testInfo.description}
                      onChange={(e) => setTestInfo({ ...testInfo, description: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="Explain the purpose and methodology of this test..."
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">list_alt</span>
                    Test Questions
                  </h3>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {questions.length} Questions Added
                  </span>
                </div>

                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-l-4 ${
                      question.type === 'scale' 
                        ? 'border-primary' 
                        : 'border-slate-300 dark:border-slate-600'
                    } border border-slate-200 dark:border-slate-700`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-3 items-start w-full">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          question.type === 'scale' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                        }`}>
                          Q{index + 1}
                        </span>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={question.text}
                            onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                            className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium"
                            placeholder="Enter your question here..."
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => deleteQuestion(question.id)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">
                          Question Type
                        </label>
                        <select
                          value={question.type}
                          onChange={(e) => updateQuestion(question.id, { type: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
                        >
                          <option value="scale">Likert Scale (1-5)</option>
                          <option value="multiple">Multiple Choice</option>
                          <option value="text">Text Input</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">
                          Weight
                        </label>
                        <input
                          type="number"
                          value={question.weight}
                          onChange={(e) => updateQuestion(question.id, { weight: parseFloat(e.target.value) })}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
                          step="0.1"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500 mb-1 block">
                          Required
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={question.required}
                            onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>

                    {question.type === 'scale' && question.options && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                            <span className="text-xs font-bold text-slate-400 w-4">{option.value}</span>
                            <input
                              type="text"
                              value={option.label}
                              onChange={(e) => {
                                const newOptions = [...question.options!];
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
                      <div className="space-y-2 mt-4">
                        {question.options?.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                            <input
                              type="text"
                              value={option.label}
                              onChange={(e) => {
                                const newOptions = [...question.options!];
                                newOptions[optIndex] = { ...option, label: e.target.value };
                                updateQuestion(question.id, { options: newOptions });
                              }}
                              className="flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                              placeholder={`Option ${optIndex + 1}`}
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => addOption(question.id)}
                          className="flex items-center gap-2 text-primary text-sm font-bold mt-2"
                        >
                          <span className="material-symbols-outlined text-sm">add_circle</span>
                          Add Option
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex gap-4">
                  <button
                    onClick={addQuestion}
                    className="flex-1 flex items-center justify-center gap-2 py-4 border-2 border-dashed border-primary/40 rounded-2xl hover:bg-primary/5 transition-all"
                  >
                    <span className="material-symbols-outlined text-primary">add_circle</span>
                    <span className="font-bold">Add New Question</span>
                  </button>
                  <button className="flex items-center justify-center px-6 py-4 border-2 border-dashed border-slate-300 rounded-2xl hover:bg-slate-100">
                    <span className="material-symbols-outlined">content_copy</span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-700 mt-8">
              <button className="px-6 py-2 rounded-lg font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700">
                Save as Draft
              </button>
              <div className="flex gap-4">
                <button className="px-6 py-2 rounded-lg font-bold border-2 border-primary text-primary hover:bg-primary/5">
                  Preview
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-2 rounded-lg font-bold bg-primary text-slate-900 hover:bg-primary/90 shadow-xl shadow-primary/30"
                >
                  Publish Test
                </button>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-2">Pro Tip</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Add a "Neutral" option to scale questions for more balanced responses.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateAssessmentPage;