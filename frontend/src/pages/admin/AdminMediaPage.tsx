import React, { useState } from 'react';

const media = [
    { id: '1', name: 'hero-banner.jpg', type: 'image', size: '245 KB', date: 'Mar 5, 2026', url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=200&q=60' },
    { id: '2', name: 'expert-profile-1.jpg', type: 'image', size: '89 KB', date: 'Mar 3, 2026', url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=60' },
    { id: '3', name: 'wellness-article.jpg', type: 'image', size: '312 KB', date: 'Feb 28, 2026', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=60' },
    { id: '4', name: 'mindfulness-guide.pdf', type: 'document', size: '1.2 MB', date: 'Feb 20, 2026', url: '' },
    { id: '5', name: 'welcome-video.mp4', type: 'video', size: '45 MB', date: 'Feb 15, 2026', url: '' },
    { id: '6', name: 'community-event.jpg', type: 'image', size: '178 KB', date: 'Feb 10, 2026', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&q=60' },
];

const AdminMediaPage: React.FC = () => {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [typeFilter, setTypeFilter] = useState('all');

    const filtered = typeFilter === 'all' ? media : media.filter(m => m.type === typeFilter);

    const typeIcon: Record<string, string> = { image: 'image', document: 'description', video: 'movie' };

    return (
        <div className="p-6 max-w-6xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Media Library</h1>
                    <p className="text-slate-500 text-sm">Manage images, documents, and videos across the platform.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-sm">upload</span>
                    Upload Media
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-2">
                    {['all', 'image', 'document', 'video'].map(t => (
                        <button key={t} onClick={() => setTypeFilter(t)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${typeFilter === t ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="ml-auto flex gap-2">
                    {(['grid', 'list'] as const).map(v => (
                        <button key={v} onClick={() => setView(v)}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${view === v ? 'bg-primary text-slate-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                            <span className="material-symbols-outlined text-lg">{v === 'grid' ? 'grid_view' : 'list'}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid View */}
            {view === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map(item => (
                        <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden group hover:shadow-lg transition-all">
                            <div className="h-36 bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                                {item.type === 'image' && item.url ? (
                                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="material-symbols-outlined text-4xl text-slate-400">{typeIcon[item.type]}</span>
                                )}
                            </div>
                            <div className="p-3">
                                <p className="font-semibold text-xs truncate mb-1">{item.name}</p>
                                <p className="text-xs text-slate-400">{item.size}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                                <th className="px-6 py-3 text-left">File</th>
                                <th className="px-6 py-3 text-left">Type</th>
                                <th className="px-6 py-3 text-left">Size</th>
                                <th className="px-6 py-3 text-left">Date</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {filtered.map(item => (
                                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">{typeIcon[item.type]}</span>
                                            <span className="font-semibold">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 capitalize">{item.type}</td>
                                    <td className="px-6 py-4 text-slate-500">{item.size}</td>
                                    <td className="px-6 py-4 text-slate-500">{item.date}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-base">download</span></button>
                                            <button className="text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-base">delete</span></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminMediaPage;
