import React, { useState } from 'react';

const roles = [
    { id: '1', name: 'Super Admin', users: 2, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', permissions: 'full' },
    { id: '2', name: 'Admin', users: 5, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', permissions: 'high' },
    { id: '3', name: 'Moderator', users: 8, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', permissions: 'medium' },
    { id: '4', name: 'Expert', users: 124, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', permissions: 'limited' },
    { id: '5', name: 'User', users: 5840, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', permissions: 'basic' },
];

const permissionGroups = [
    {
        group: 'User Management',
        permissions: [
            { name: 'View Users', admin: true, moderator: true, expert: false, user: false },
            { name: 'Edit Users', admin: true, moderator: false, expert: false, user: false },
            { name: 'Ban Users', admin: true, moderator: true, expert: false, user: false },
            { name: 'Delete Users', admin: true, moderator: false, expert: false, user: false },
        ],
    },
    {
        group: 'Content Management',
        permissions: [
            { name: 'Publish Articles', admin: true, moderator: true, expert: true, user: false },
            { name: 'Delete Content', admin: true, moderator: true, expert: false, user: false },
            { name: 'Manage Categories', admin: true, moderator: false, expert: false, user: false },
        ],
    },
    {
        group: 'Payment Management',
        permissions: [
            { name: 'View Payments', admin: true, moderator: false, expert: false, user: false },
            { name: 'Process Refunds', admin: true, moderator: false, expert: false, user: false },
            { name: 'Manage Payouts', admin: true, moderator: false, expert: false, user: false },
        ],
    },
];

const RolesPermissionsPage: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState('admin');

    return (
        <div className="p-6 max-w-6xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Roles & Permissions</h1>
                    <p className="text-slate-500 text-sm">Manage access control and permission settings for each role.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Role
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Roles List */}
                <div className="space-y-3">
                    {roles.map(role => (
                        <div key={role.id} onClick={() => setSelectedRole(role.name.toLowerCase())}
                            className={`cursor-pointer bg-white dark:bg-slate-800 rounded-xl border-2 p-5 transition-all ${selectedRole === role.name.toLowerCase() ? 'border-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/40'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold">{role.name}</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${role.color}`}>{role.permissions}</span>
                            </div>
                            <p className="text-xs text-slate-500">{role.users.toLocaleString()} members</p>
                        </div>
                    ))}
                </div>

                {/* Permissions Table */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold">Permission Matrix</h3>
                        <p className="text-xs text-slate-500 mt-1">Green = allowed, Grey = not allowed</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold uppercase text-slate-400">
                                    <th className="px-5 py-3 text-left">Permission</th>
                                    <th className="px-4 py-3 text-center">Admin</th>
                                    <th className="px-4 py-3 text-center">Moderator</th>
                                    <th className="px-4 py-3 text-center">Expert</th>
                                    <th className="px-4 py-3 text-center">User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissionGroups.map(group => (
                                    <>
                                        <tr key={group.group} className="bg-slate-50/50 dark:bg-slate-700/20">
                                            <td colSpan={5} className="px-5 py-2 font-bold text-slate-400 text-xs uppercase">{group.group}</td>
                                        </tr>
                                        {group.permissions.map(perm => (
                                            <tr key={perm.name} className="divide-y divide-slate-100 dark:divide-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40">
                                                <td className="px-5 py-3 font-medium">{perm.name}</td>
                                                {(['admin', 'moderator', 'expert', 'user'] as const).map(role => (
                                                    <td key={role} className="px-4 py-3 text-center">
                                                        <div className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center ${perm[role] ? 'bg-green-100 dark:bg-green-900/30' : 'bg-slate-100 dark:bg-slate-700'}`}>
                                                            <span className={`material-symbols-outlined text-[12px] ${perm[role] ? 'text-green-600' : 'text-slate-400'}`}>
                                                                {perm[role] ? 'check' : 'close'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolesPermissionsPage;
