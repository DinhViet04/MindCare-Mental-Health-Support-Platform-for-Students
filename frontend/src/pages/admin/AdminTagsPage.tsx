import React, { useState } from 'react';

const AdminTagsPage: React.FC = () => {
    const [tags, setTags] = useState([
        { id: '1', name: 'mindfulness', count: 34 },
        { id: '2', name: 'therapy', count: 28 },
        { id: '3', name: 'mental-health', count: 45 },
        { id: '4', name: 'cbt', count: 19 },
        { id: '5', name: 'self-care', count: 22 },
        { id: '6', name: 'anxiety', count: 31 },
        { id: '7', name: 'depression', count: 27 },
        { id: '8', name: 'stress', count: 18 },
        { id: '9', name: 'relationships', count: 14 },
        { id: '10', name: 'grief', count: 10 },
        { id: '11', name: 'trauma', count: 16 },
        { id: '12', name: 'wellbeing', count: 25 },
    ]);
    const [newTag, setNewTag] = useState('');

    const addTag = () => {
        if (!newTag.trim()) return;
        setTags(prev => [...prev, { id: Date.now().toString(), name: newTag.toLowerCase().replace(/ /g, '-'), count: 0 }]);
        setNewTag('');
    };

    return (
        <div className="p-6 max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">Tags</h1>
                <p className="text-slate-500 text-sm">Manage content tags used across articles and expert profiles.</p>
            </div>

            {/* Add Tag */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 mb-6 flex gap-3">
                <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTag()}
                    placeholder="New tag name (press Enter to add)..."
                    className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
                <button onClick={addTag} className="px-4 py-2 bg-primary text-slate-900 font-bold rounded-lg text-sm hover:bg-primary/90">
                    Add Tag
                </button>
            </div>

            {/* Tags Cloud */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <p className="text-sm font-semibold text-slate-500 mb-4">{tags.length} tags total</p>
                <div className="flex flex-wrap gap-3">
                    {tags.sort((a, b) => b.count - a.count).map(tag => (
                        <div key={tag.id} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 group hover:border-primary/50 transition-all">
                            <span className="text-sm font-mono font-semibold text-slate-700 dark:text-slate-200">#{tag.name}</span>
                            <span className="bg-primary/10 text-primary text-xs font-bold px-1.5 py-0.5 rounded-full">{tag.count}</span>
                            <button onClick={() => setTags(prev => prev.filter(t => t.id !== tag.id))}
                                className="hidden group-hover:flex w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 items-center justify-center text-red-500 hover:bg-red-200 transition-colors">
                                <span className="material-symbols-outlined text-[12px]">close</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminTagsPage;
