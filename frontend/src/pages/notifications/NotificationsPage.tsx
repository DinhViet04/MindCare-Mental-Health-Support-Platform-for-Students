import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface Notification {
  id: string;
  type: 'session' | 'message' | 'test' | 'booking' | 'tip';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: string;
  iconColor: string;
  iconBg: string;
}

const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'session',
      title: 'Session Reminder',
      message: 'Your therapy session with Dr. Smith starts in 15 minutes. Tap to join the waiting room.',
      time: '10m ago',
      isRead: false,
      icon: 'calendar_today',
      iconColor: 'text-slate-900 dark:text-primary',
      iconBg: 'bg-primary/20'
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message from Expert',
      message: 'Sarah Jenkins replied: "That\'s a great observation about your morning routine..."',
      time: '2h ago',
      isRead: true,
      icon: 'mail',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      id: '3',
      type: 'test',
      title: 'Test Results Ready',
      message: 'Your results from the "Anxiety Assessment" are now available in your dashboard.',
      time: 'Yesterday',
      isRead: true,
      icon: 'analytics',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100'
    },
    {
      id: '4',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your follow-up appointment for next Tuesday has been successfully scheduled.',
      time: '2 days ago',
      isRead: true,
      icon: 'verified',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      id: '5',
      type: 'tip',
      title: 'Weekly Tip',
      message: 'Small steps lead to big changes. Try our 5-minute meditation today to reset.',
      time: '3 days ago',
      isRead: true,
      icon: 'lightbulb',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100'
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.isRead;
    return false; // archived filter would need additional logic
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIconClass = (notif: Notification) => {
    return `flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${notif.iconBg} ${notif.iconColor}`;
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">My Account</h1>
            <p className="text-slate-500">Mental Wellness for Students</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Side Navigation */}
            <aside className="w-full md:w-64 flex flex-col gap-2">
              <nav className="flex flex-col gap-1">
                {[
                  { icon: 'home', label: 'Home', href: '/', active: false },
                  { icon: 'calendar_month', label: 'Sessions', href: '/bookings', active: false },
                  { icon: 'assignment', label: 'Tests', href: '/tests', active: false },
                  { icon: 'notifications', label: 'Notifications', href: '/notifications', active: true },
                  { icon: 'person', label: 'Profile', href: '/profile', active: false }
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      item.active
                        ? 'bg-primary text-slate-900'
                        : 'hover:bg-primary/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className={`text-sm ${item.active ? 'font-semibold' : 'font-medium'}`}>
                      {item.label}
                      {item.label === 'Notifications' && unreadCount > 0 && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </span>
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header Section */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 bg-primary/10 text-slate-900 dark:text-slate-100 border border-primary/20 rounded-lg text-sm font-semibold hover:bg-primary transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 w-fit rounded-xl mb-6">
                {(['all', 'unread', 'archived'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                      filter === f
                        ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Notification List */}
              <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <span className="material-symbols-outlined text-5xl text-slate-400 mb-3">
                      notifications_off
                    </span>
                    <p className="text-slate-500">No notifications to show</p>
                  </div>
                ) : (
                  filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => !notif.isRead && markAsRead(notif.id)}
                      className={`flex gap-4 p-4 rounded-2xl shadow-sm cursor-pointer transition-all ${
                        !notif.isRead
                          ? 'bg-white dark:bg-slate-800 border-l-4 border-primary'
                          : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className={getIconClass(notif)}>
                        <span className="material-symbols-outlined">{notif.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold">{notif.title}</p>
                          <span className="text-xs font-medium text-slate-400">{notif.time}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-normal">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Load More */}
              {filteredNotifications.length > 0 && filteredNotifications.length >= 5 && (
                <div className="flex justify-center py-6">
                  <button className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                    Load older notifications
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;