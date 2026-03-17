import React, { useState } from 'react';

const articles = [
    { id: '1', title: 'Understanding Anxiety Disorders', author: 'Dr. Sarah Jenkins', category: 'Anxiety', status: 'published', date: 'Mar 5, 2026', views: 1234 },
    { id: '2', title: '5 Mindfulness Techniques for Daily Life', author: 'Dr. Linda Park', category: 'Mindfulness', status: 'published', date: 'Mar 3, 2026', views: 892 },
    { id: '3', title: 'Overcoming Depression: A Guide', author: 'Dr. Michael Torres', category: 'Depression', status: 'draft', date: 'Mar 1, 2026', views: 0 },
    { id: '4', title: 'Building Healthy Relationships', author: 'Dr. Emma Davis', category: 'Relationships', status: 'published', date: 'Feb 28, 2026', views: 567 },
    { id: '5', title: 'PTSD Recovery: Steps Forward', author: 'Dr. James Wilson', category: 'Trauma', status: 'under_review', date: 'Feb 25, 2026', views: 0 },
];

const statusColors: Record<string, string> = {
    published: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    draft: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
    under_review: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

const ContentManagementPage: React.FC = () => {
    const [tab, setTab] = useState('articles');
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? articles : articles.filter(a => a.status === filter);

    return (
        <div className="p-6 max-w-6xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Content Management</h1>
                    <p className="text-slate-500 text-sm">Manage articles, community posts, and platform content.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                    New Article
                </button>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1.5 mb-6 gap-1 max-w-sm">
                {['articles', 'community', 'announcements'].map(t => (
                    <button key={t} onClick={() => setTab(t)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab === t ? 'bg-white dark:bg-slate-700 shadow text-primary' : 'text-slate-500 hover:text-slate-700'}`}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-4">
                {['all', 'published', 'draft', 'under_review'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary'}`}>
                        {f.replace('_', ' ').charAt(0).toUpperCase() + f.replace('_', ' ').slice(1)}
                    </button>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-6 py-3 text-left">Title</th>
                            <th className="px-6 py-3 text-left">Author</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-center">Views</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filtered.map(a => (
                            <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                <td className="px-6 py-4 font-semibold max-w-xs truncate">{a.title}</td>
                                <td className="px-6 py-4 text-slate-500">{a.author}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">{a.category}</span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{a.date}</td>
                                <td className="px-6 py-4 text-center font-semibold">{a.views.toLocaleString()}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[a.status]}`}>{a.status.replace('_', ' ')}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
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

export default ContentManagementPage;
