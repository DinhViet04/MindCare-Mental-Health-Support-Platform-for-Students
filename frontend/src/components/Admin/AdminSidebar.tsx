import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = {
  icon: string;
  label: string;
  href: string;
};

type MenuGroup = {
  groupLabel: string;
  groupIcon: string;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    groupLabel: 'Tổng quan',
    groupIcon: 'grid_view',
    items: [
      { icon: 'dashboard', label: 'Dashboard', href: '/admin' },
      { icon: 'analytics', label: 'Báo cáo & Thống kê', href: '/admin/reports' },
    ],
  },
  {
    groupLabel: 'Người dùng',
    groupIcon: 'people',
    items: [
      { icon: 'manage_accounts', label: 'Quản lý người dùng', href: '/admin/users' },
      { icon: 'person_search', label: 'Quản lý chuyên gia', href: '/admin/experts' },
      { icon: 'verified', label: 'Chờ phê duyệt chuyên gia', href: '/admin/experts/queue' },
      { icon: 'shield_person', label: 'Vai trò & Quyền hạn', href: '/admin/roles' },
    ],
  },
  {
    groupLabel: 'Nội dung',
    groupIcon: 'article',
    items: [
      { icon: 'article', label: 'Quản lý nội dung', href: '/admin/content' },
      { icon: 'category', label: 'Danh mục', href: '/admin/categories' },
      { icon: 'label', label: 'Tags', href: '/admin/tags' },
      { icon: 'perm_media', label: 'Media Library', href: '/admin/media' },
    ],
  },
  {
    groupLabel: 'Booking & Đánh giá',
    groupIcon: 'calendar_month',
    items: [
      { icon: 'calendar_month', label: 'Quản lý booking', href: '/admin/bookings' },
      { icon: 'quiz', label: 'Bài thi & Đánh giá', href: '/admin/assessments' },
    ],
  },
  {
    groupLabel: 'Tài chính',
    groupIcon: 'payments',
    items: [
      { icon: 'payments', label: 'Quản lý thanh toán', href: '/admin/payments' },
      { icon: 'account_balance', label: 'Thanh toán chuyên gia', href: '/admin/payouts' },
      { icon: 'local_offer', label: 'Coupon', href: '/admin/coupons' },
      { icon: 'campaign', label: 'Khuyến mãi', href: '/admin/promotions' },
    ],
  },
  {
    groupLabel: 'Kiểm duyệt',
    groupIcon: 'gavel',
    items: [
      { icon: 'flag', label: 'Hàng chờ kiểm duyệt', href: '/moderation/queue' },
      { icon: 'report', label: 'Hàng chờ báo cáo', href: '/moderation/reports' },
      { icon: 'history', label: 'Lịch sử kiểm duyệt', href: '/moderation/history' },
      { icon: 'tune', label: 'Cài đặt kiểm duyệt', href: '/moderation/settings' },
    ],
  },
  {
    groupLabel: 'Thông báo & Email',
    groupIcon: 'notifications',
    items: [
      { icon: 'notifications', label: 'Thông báo', href: '/admin/notifications' },
      { icon: 'mail', label: 'Email Templates', href: '/admin/email-templates' },
    ],
  },
  {
    groupLabel: 'Hệ thống',
    groupIcon: 'settings',
    items: [
      { icon: 'settings', label: 'Cài đặt hệ thống', href: '/admin/settings' },
      { icon: 'monitor_heart', label: 'System Health', href: '/admin/system-health' },
      { icon: 'key', label: 'API Management', href: '/admin/api' },
      { icon: 'backup', label: 'Backup & Recovery', href: '/admin/backup' },
      { icon: 'fact_check', label: 'Audit Logs', href: '/admin/audit-logs' },
      { icon: 'construction', label: 'Maintenance Mode', href: '/admin/maintenance' },
    ],
  },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<string[]>([]);

  const toggleGroup = (label: string) => {
    setCollapsed(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) =>
    href === '/admin'
      ? location.pathname === '/admin'
      : location.pathname.startsWith(href);

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col min-h-screen">
      {/* Logo / Brand */}
      <div className="px-5 py-5 border-b border-slate-100 dark:border-slate-700">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-900 text-lg">psychology</span>
          </div>
          <div>
            <p className="font-bold text-sm">MindCare</p>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuGroups.map(group => {
          const isGroupCollapsed = collapsed.includes(group.groupLabel);
          const hasActive = group.items.some(item => isActive(item.href));

          return (
            <div key={group.groupLabel}>
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.groupLabel)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors mb-1 ${hasActive
                  ? 'text-primary'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">{group.groupIcon}</span>
                  {group.groupLabel}
                </div>
                <span className="material-symbols-outlined text-sm transition-transform">
                  {isGroupCollapsed ? 'expand_more' : 'expand_less'}
                </span>
              </button>

              {/* Group Items */}
              {!isGroupCollapsed && (
                <div className="space-y-0.5 ml-2 mb-2">
                  {group.items.map(item => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${active
                          ? 'bg-primary/15 text-primary font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                          }`}
                      >
                        <span className={`material-symbols-outlined text-[18px] ${active ? 'text-primary' : 'text-slate-400'}`}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                        {active && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom: Admin Profile + System Status */}
      <div className="px-4 pb-4 space-y-3 border-t border-slate-100 dark:border-slate-700 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-slate-500">All systems operational</span>
        </div>
        <Link
          to="/profile"
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-primary text-sm">admin_panel_settings</span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-xs truncate">Super Admin</p>
            <p className="text-xs text-slate-400 truncate">admin@mindcare.com</p>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;