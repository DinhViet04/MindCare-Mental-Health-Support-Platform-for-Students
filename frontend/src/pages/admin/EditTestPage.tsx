import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTestPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState('PHQ-9 Depression Screening');
    const [category, setCategory] = useState('Depression');
    const [description, setDescription] = useState('A standardized questionnaire used to screen for depression and assess the severity of depressive symptoms.');
    const [questions, setQuestions] = useState([
        { id: '1', question: 'Little interest or pleasure in doing things?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'], correct: 0 },
        { id: '2', question: 'Feeling down, depressed, or hopeless?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'], correct: 0 },
    ]);

    const removeQuestion = (qId: string) => setQuestions(prev => prev.filter(q => q.id !== qId));
    const updateQuestion = (qId: string, value: string) => setQuestions(prev => prev.map(q => q.id === qId ? { ...q, question: value } : q));

    return (
        <div className="p-6 max-w-3xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-2 transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Assessments
                    </button>
                    <h1 className="text-2xl font-bold">Edit Assessment <span className="text-slate-400 font-normal text-lg">#{id}</span></h1>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Save Draft
                    </button>
                    <button className="px-4 py-2 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all text-sm">
                        Update & Publish
                    </button>
                </div>
            </div>

            <div className="space-y-5">
                {/* Basic Info */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
                    <h3 className="font-bold">Basic Information</h3>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Assessment Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none">
                            <option>Depression</option>
                            <option>Anxiety</option>
                            <option>Trauma</option>
                            <option>Mindfulness</option>
                            <option>Relationships</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                        <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)}
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
                                <button onClick={() => removeQuestion(q.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-base">delete</span>
                                </button>
                            </div>
                            <input type="text" value={q.question} onChange={e => updateQuestion(q.id, e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary outline-none mb-4 text-sm" />
                            <div className="space-y-2">
                                {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className="flex items-center gap-3">
                                        <input type="radio" name={`correct-${q.id}`} checked={q.correct === oIdx} readOnly className="text-primary" />
                                        <div className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm">{opt}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button onClick={() => setQuestions(prev => [...prev, { id: Date.now().toString(), question: '', options: ['', '', '', ''], correct: 0 }])}
                        className="w-full py-3 border-2 border-dashed border-primary/30 rounded-xl text-primary font-semibold hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Add Question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTestPage;
