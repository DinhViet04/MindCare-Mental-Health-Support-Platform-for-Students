import React, { useState } from 'react';

interface Category { id: string; name: string; slug: string; count: number; color: string; }

const AdminCategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([
        { id: '1', name: 'Anxiety & Stress', slug: 'anxiety-stress', count: 24, color: '#13ecec' },
        { id: '2', name: 'Depression', slug: 'depression', count: 18, color: '#8b5cf6' },
        { id: '3', name: 'Relationship Issues', slug: 'relationship', count: 15, color: '#f59e0b' },
        { id: '4', name: 'Trauma & PTSD', slug: 'trauma-ptsd', count: 12, color: '#ef4444' },
        { id: '5', name: 'Self-Development', slug: 'self-development', count: 20, color: '#22c55e' },
    ]);
    const [newName, setNewName] = useState('');
    const [showForm, setShowForm] = useState(false);

    const addCategory = () => {
        if (!newName.trim()) return;
        setCategories(prev => [...prev, { id: Date.now().toString(), name: newName, slug: newName.toLowerCase().replace(/ /g, '-'), count: 0, color: '#13ecec' }]);
        setNewName('');
        setShowForm(false);
    };

    const removeCategory = (id: string) => setCategories(prev => prev.filter(c => c.id !== id));

    return (
        <div className="p-6 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Categories</h1>
                    <p className="text-slate-500 text-sm">Manage content and expert specialty categories.</p>
                </div>
                <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Category
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 mb-5 flex gap-3">
                    <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Category name..."
                        className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm" />
                    <button onClick={addCategory} className="px-4 py-2 bg-primary text-slate-900 font-bold rounded-lg text-sm hover:bg-primary/90">Add</button>
                    <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
                </div>
            )}

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Slug</th>
                            <th className="px-6 py-3 text-center">Articles</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {categories.map(c => (
                            <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                                        <span className="font-semibold">{c.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-slate-500">{c.slug}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="bg-primary/10 text-primary font-bold text-xs px-2 py-1 rounded-full">{c.count}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-base">edit</span>
                                        </button>
                                        <button onClick={() => removeCategory(c.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-base">delete</span>
                                        </button>
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

export default AdminCategoriesPage;
