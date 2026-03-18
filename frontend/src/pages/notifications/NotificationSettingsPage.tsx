import React, { useState } from 'react';


interface NotificationSetting {
  id: string;
  category: 'appointments' | 'messages' | 'tips' | 'security';
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  icon: string;
}

const NotificationSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    // Appointments
    {
      id: 'appointments-email',
      category: 'appointments',
      title: 'Email Notifications',
      description: 'Receive reminders about your upcoming sessions via email.',
      email: true,
      push: false,
      icon: 'mail'
    },
    {
      id: 'appointments-push',
      category: 'appointments',
      title: 'Push Notifications',
      description: 'Get instant alerts on your device for appointment changes.',
      email: false,
      push: true,
      icon: 'smartphone'
    },
    // Messages
    {
      id: 'messages-email',
      category: 'messages',
      title: 'Email Notifications',
      description: 'Notifications when you receive a message from your therapist.',
      email: false,
      push: false,
      icon: 'mail'
    },
    {
      id: 'messages-push',
      category: 'messages',
      title: 'Push Notifications',
      description: 'Instant notification of new chat messages.',
      email: false,
      push: true,
      icon: 'smartphone'
    },
    // Health Tips
    {
      id: 'tips-email',
      category: 'tips',
      title: 'Email Notifications',
      description: 'Weekly digest of wellness articles and personalized tips.',
      email: true,
      push: false,
      icon: 'mail'
    },
    {
      id: 'tips-push',
      category: 'tips',
      title: 'Push Notifications',
      description: 'Daily mood check-ins and quick mental health exercises.',
      email: false,
      push: false,
      icon: 'smartphone'
    },
    // Security
    {
      id: 'security-email',
      category: 'security',
      title: 'Email Notifications',
      description: 'Critical alerts regarding login attempts and password changes.',
      email: true,
      push: false,
      icon: 'mail'
    },
    {
      id: 'security-push',
      category: 'security',
      title: 'Push Notifications',
      description: 'Instant alerts for unusual account activity.',
      email: true,
      push: true,
      icon: 'smartphone'
    }
  ]);

  const [hasChanges, setHasChanges] = useState(false);

  const toggleSetting = (id: string, type: 'email' | 'push') => {
    setSettings(settings.map(setting => {
      if (setting.id === id) {
        return { ...setting, [type]: !setting[type] };
      }
      return setting;
    }));
    setHasChanges(true);
  };

  const saveChanges = () => {
    // API call to save settings
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success message
  };

  const cancelChanges = () => {
    // Reset to original state (would need to fetch from API)
    setHasChanges(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'appointments': return 'calendar_today';
      case 'messages': return 'chat';
      case 'tips': return 'auto_awesome';
      case 'security': return 'security';
      default: return 'notifications';
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'appointments': return 'Appointments';
      case 'messages': return 'Messages';
      case 'tips': return 'Health Tips';
      case 'security': return 'Security Alerts';
      default: return category;
    }
  };

  // Group settings by category
  const groupedSettings = settings.reduce((groups, setting) => {
    if (!groups[setting.category]) {
      groups[setting.category] = [];
    }
    groups[setting.category].push(setting);
    return groups;
  }, {} as Record<string, NotificationSetting[]>);

  const categories = ['appointments', 'messages', 'tips', 'security'];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Notification Settings</h1>
          <p className="text-slate-500">Manage how you receive updates and alerts from MindCare.</p>
        </div>

        <div className="space-y-8">
          {categories.map((category) => (
            <section key={category} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Category Header */}
              <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <span className="material-symbols-outlined text-primary">
                  {getCategoryIcon(category)}
                </span>
                <h3 className="text-lg font-bold">{getCategoryTitle(category)}</h3>
              </div>

              {/* Settings for this category */}
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {groupedSettings[category]?.map((setting) => (
                  <div key={setting.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 w-12 h-12">
                          <span className="material-symbols-outlined">{setting.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold mb-1">{setting.title}</p>
                          <p className="text-sm text-slate-500">{setting.description}</p>
                        </div>
                      </div>

                      {/* Toggle Switch for Email */}
                      <div className="flex items-center gap-6 ml-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-500">Email</span>
                          <button
                            onClick={() => toggleSetting(setting.id, 'email')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              setting.email ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                                setting.email ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-500">Push</span>
                          <button
                            onClick={() => toggleSetting(setting.id, 'push')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              setting.push ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                                setting.push ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Action Buttons */}
        {hasChanges && (
          <div className="mt-8 flex justify-end gap-4 border-t border-slate-200 dark:border-slate-700 pt-6">
            <button
              onClick={cancelChanges}
              className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveChanges}
              className="px-6 py-2.5 rounded-lg bg-primary text-slate-900 font-bold hover:bg-primary/90 transition-opacity"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Footer Links */}
        <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="material-symbols-outlined text-sm">psychology</span>
              <span>© 2024 MindCare Health Inc.</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Help Center</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default NotificationSettingsPage;