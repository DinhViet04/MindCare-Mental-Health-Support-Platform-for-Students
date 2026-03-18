import React, { useState } from 'react';

const assessments = [
    { id: '1', title: 'PHQ-9 Depression Screening', category: 'Depression', questions: 9, completions: 1243, avgScore: 7.2, status: 'published' },
    { id: '2', title: 'GAD-7 Anxiety Scale', category: 'Anxiety', questions: 7, completions: 981, avgScore: 8.5, status: 'published' },
    { id: '3', title: 'PTSD Checklist (PCL-5)', category: 'Trauma', questions: 20, completions: 342, avgScore: 22.1, status: 'published' },
    { id: '4', title: 'Mindfulness Attention Awareness', category: 'Mindfulness', questions: 15, completions: 567, avgScore: 65.0, status: 'published' },
    { id: '5', title: 'Relationship Satisfaction Survey', category: 'Relationships', questions: 12, completions: 0, avgScore: 0, status: 'draft' },
];

const AssessmentsManagementPage: React.FC = () => {
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? assessments : assessments.filter(a => a.status === filter);

    return (
        <div className="p-6 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Assessments Management</h1>
                    <p className="text-slate-500 text-sm">Create and manage mental health assessment tests.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Create Assessment
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: 'Published', value: assessments.filter(a => a.status === 'published').length, icon: 'task_alt', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
                    { label: 'Total Completions', value: assessments.reduce((s, a) => s + a.completions, 0).toLocaleString(), icon: 'quiz', color: 'text-primary', bg: 'bg-primary/10' },
                    { label: 'Draft', value: assessments.filter(a => a.status === 'draft').length, icon: 'edit_note', color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-700' },
                ].map(s => (
                    <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                        <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                            <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
                        </div>
                        <p className="text-2xl font-bold mb-1">{s.value}</p>
                        <p className="text-xs text-slate-500">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-4">
                {['all', 'published', 'draft'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === f ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'}`}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-6 py-3 text-left">Assessment</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-center">Questions</th>
                            <th className="px-6 py-3 text-center">Completions</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filtered.map(a => (
                            <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                <td className="px-6 py-4 font-semibold">{a.title}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">{a.category}</span>
                                </td>
                                <td className="px-6 py-4 text-center text-slate-500">{a.questions}</td>
                                <td className="px-6 py-4 text-center font-semibold">{a.completions.toLocaleString()}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${a.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500'}`}>
                                        {a.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-base">visibility</span></button>
                                        <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-base">edit</span></button>
                                        <button className="text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-base">delete</span></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssessmentsManagementPage;
