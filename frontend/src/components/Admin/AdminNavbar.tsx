import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-slate-900">psychology</span>
            </div>
            <h2 className="text-lg font-bold">MindCare <span className="text-primary/80">Admin</span></h2>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/admin/assessments" className="text-primary text-sm font-medium border-b-2 border-primary">
              Tests
            </Link>
            <Link to="/admin/users" className="text-sm font-medium hover:text-primary transition-colors">
              Users
            </Link>
            <Link to="/admin/settings" className="text-sm font-medium hover:text-primary transition-colors">
              Settings
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-primary/10 text-slate-600 dark:text-slate-400">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;