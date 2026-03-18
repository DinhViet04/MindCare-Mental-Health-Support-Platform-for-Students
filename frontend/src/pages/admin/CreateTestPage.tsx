import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTestPage: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ id: '1', question: '', options: ['', '', '', ''], correct: 0 }]);

    const addQuestion = () => {
        setQuestions(prev => [...prev, { id: Date.now().toString(), question: '', options: ['', '', '', ''], correct: 0 }]);
    };

    const removeQuestion = (id: string) => {
        setQuestions(prev => prev.filter(q => q.id !== id));
    };

    const updateQuestion = (id: string, field: string, value: string | number) => {
        setQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const updateOption = (qId: string, optIdx: number, value: string) => {
        setQuestions(prev => prev.map(q => q.id === qId ? { ...q, options: q.options.map((o, i) => i === optIdx ? value : o) } : q));
    };

    return (
        <div className="p-6 max-w-3xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-2 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Assessments
                    </button>
                    <h1 className="text-2xl font-bold">Create Assessment</h1>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Save Draft
                    </button>
                    <button className="px-4 py-2 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all text-sm">
                        Publish
                    </button>
                </div>
            </div>

            <div className="space-y-5">
                {/* Basic Info */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
                    <h3 className="font-bold">Basic Information</h3>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Assessment Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., PHQ-9 Depression Screening"
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none">
                            <option value="">Select category...</option>
                            <option value="Depression">Depression</option>
                            <option value="Anxiety">Anxiety</option>
                            <option value="Trauma">Trauma</option>
                            <option value="Mindfulness">Mindfulness</option>
                            <option value="Relationships">Relationships</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                        <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description..."
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none text-sm" />
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold">Questions ({questions.length})</h3>
                    </div>
                    {questions.map((q, qIdx) => (
                        <div key={q.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">Q{qIdx + 1}</span>
                                {questions.length > 1 && (
                                    <button onClick={() => removeQuestion(q.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined text-base">delete</span>
                                    </button>
                                )}
                            </div>
                            <input type="text" value={q.question} onChange={e => updateQuestion(q.id, 'question', e.target.value)}
                                placeholder="Enter question..."
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none mb-4 text-sm" />
                            <div className="space-y-2">
                                {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className="flex items-center gap-3">
                                        <input type="radio" name={`correct-${q.id}`} checked={q.correct === oIdx} onChange={() => updateQuestion(q.id, 'correct', oIdx)} className="text-primary" />
                                        <input type="text" value={opt} onChange={e => updateOption(q.id, oIdx, e.target.value)}
                                            placeholder={`Option ${oIdx + 1}`}
                                            className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button onClick={addQuestion}
                        className="w-full py-3 border-2 border-dashed border-primary/30 rounded-xl text-primary font-semibold hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Add Question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTestPage;
