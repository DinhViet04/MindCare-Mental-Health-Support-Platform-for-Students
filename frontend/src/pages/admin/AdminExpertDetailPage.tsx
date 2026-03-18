import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface ExpertDetail {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  status: 'active' | 'pending' | 'suspended';
  email: string;
  phone: string;
  location: string;
  languages: string[];
  bio: string;
  specialties: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  services: Array<{
    name: string;
    duration: string;
    price: number;
  }>;
  availability: Array<{
    day: string;
    hours: string;
  }>;
  stats: {
    totalBookings: number;
    completedSessions: number;
    totalRevenue: number;
    avgResponseTime: string;
  };
  recentActivity: Array<{
    type: 'booking' | 'session' | 'review';
    description: string;
    time: string;
    icon: string;
    iconBg: string;
    iconColor: string;
  }>;
}

const AdminExpertDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'info' | 'credentials' | 'activity' | 'reviews'>('info');
  const [adminNotes, setAdminNotes] = useState('');
  const [accountStatus, setAccountStatus] = useState('active');

  // Mock data - would fetch from API
  const expert: ExpertDetail = {
    id: id || '1',
    name: 'Dr. Sarah Jenkins',
    title: 'Senior Clinical Psychologist',
    rating: 4.9,
    reviews: 124,
    status: 'active',
    email: 'sarah.jenkins@mindcare.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA, USA',
    languages: ['English', 'Spanish'],
    bio: 'Dr. Sarah Jenkins is a licensed clinical psychologist with over 12 years of experience specializing in Cognitive Behavioral Therapy (CBT) and mindfulness-based stress reduction. She has worked extensively with professionals dealing with burnout, anxiety, and work-life balance issues.',
    specialties: ['Anxiety Disorders', 'Workplace Burnout', 'Relationships', 'Mindfulness'],
    education: [
      { degree: 'Ph.D. in Clinical Psychology', institution: 'Stanford University', year: '2011' },
      { degree: 'M.Sc. in Psychological Research', institution: 'University of Washington', year: '2008' }
    ],
    services: [
      { name: 'Individual Therapy Session', duration: '60 minutes', price: 150.00 },
      { name: 'Couples Counseling', duration: '90 minutes', price: 220.00 },
      { name: 'Emergency 15-min Consultation', duration: '15 minutes', price: 45.00 }
    ],
    availability: [
      { day: 'Monday', hours: '09:00 AM - 05:00 PM' },
      { day: 'Tuesday', hours: '09:00 AM - 05:00 PM' },
      { day: 'Wednesday', hours: '09:00 AM - 08:00 PM' },
      { day: 'Thursday', hours: '09:00 AM - 05:00 PM' },
      { day: 'Friday', hours: '09:00 AM - 02:00 PM' },
      { day: 'Sat - Sun', hours: 'Unavailable' }
    ],
    stats: {
      totalBookings: 1284,
      completedSessions: 1150,
      totalRevenue: 42580,
      avgResponseTime: '45m'
    },
    recentActivity: [
      {
        type: 'booking',
        description: 'New booking from Mark Spencer',
        time: '2 hours ago',
        icon: 'event_available',
        iconBg: 'bg-primary/20',
        iconColor: 'text-primary'
      },
      {
        type: 'session',
        description: 'Session completed: Julia R.',
        time: 'Yesterday at 4:30 PM',
        icon: 'done_all',
        iconBg: 'bg-green-100 dark:bg-green-900/30',
        iconColor: 'text-green-600'
      },
      {
        type: 'review',
        description: 'Received 5-star review',
        time: '2 days ago',
        icon: 'rate_review',
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600'
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      suspended: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link to="/admin" className="text-slate-500 hover:text-primary">Dashboard</Link>
          <span className="text-slate-400">/</span>
          <Link to="/admin/experts" className="text-slate-500 hover:text-primary">Expert Directory</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 dark:text-white font-bold">{expert.name}</span>
        </div>

        {/* Header Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary">
                  {expert.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-700"></div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{expert.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusBadge(expert.status)}`}>
                    {expert.status}
                  </span>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {expert.title} • <span className="text-primary font-semibold">Verified</span>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-yellow-400">star</span>
                  <span className="font-bold">{expert.rating}</span>
                  <span className="text-sm text-slate-500">({expert.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-bold hover:bg-red-100 hover:text-red-600 transition-all">
                Suspend Account
              </button>
              <button className="px-6 py-2.5 bg-primary text-slate-900 rounded-lg font-bold hover:bg-primary/90 transition-all">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 font-medium mb-1">Total Bookings</p>
            <p className="text-2xl font-bold">{expert.stats.totalBookings.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>12% this month</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 font-medium mb-1">Completed Sessions</p>
            <p className="text-2xl font-bold">{expert.stats.completedSessions.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-bold">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>94.2% Success rate</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 font-medium mb-1">Total Revenue</p>
            <p className="text-2xl font-bold">${expert.stats.totalRevenue.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-bold">
              <span className="material-symbols-outlined text-sm">payments</span>
              <span>+$4.2k pending</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 font-medium mb-1">Avg. Response Time</p>
            <p className="text-2xl font-bold">{expert.stats.avgResponseTime}</p>
            <div className="flex items-center gap-1 mt-2 text-primary text-sm font-bold">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Top 5% of experts</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Professional & Personal Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Navigation */}
            <div className="border-b border-slate-200 dark:border-slate-700">
              <div className="flex gap-6">
                {(['info', 'credentials', 'activity', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab
                        ? 'border-primary text-slate-900 dark:text-white'
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'info' && (
              <>
                {/* Personal Info */}
                <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                    <h3 className="font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">person</span>
                      Personal & Contact Information
                    </h3>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                      <p className="font-medium">{expert.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                      <p className="font-medium">{expert.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                      <p className="font-medium">{expert.location}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Languages</p>
                      <p className="font-medium">{expert.languages.join(', ')}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Professional Bio</p>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{expert.bio}</p>
                    </div>
                  </div>
                </section>

                {/* Services & Pricing */}
                <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">sell</span>
                      Services & Pricing
                    </h3>
                    <button className="text-primary text-sm font-bold">Edit Rates</button>
                  </div>
                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {expert.services.map((service, index) => (
                      <div key={index} className="p-6 flex justify-between items-center">
                        <div>
                          <p className="font-bold">{service.name}</p>
                          <p className="text-sm text-slate-500">{service.duration}</p>
                        </div>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">
                          ${service.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === 'credentials' && (
              <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                  <h3 className="font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">workspace_premium</span>
                    Professional Credentials
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Education</p>
                    <ul className="space-y-3">
                      {expert.education.map((edu, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary mt-0.5">school</span>
                          <div>
                            <p className="font-bold">{edu.degree}</p>
                            <p className="text-sm text-slate-500">{edu.institution}, {edu.year}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Primary Specialties</p>
                      <div className="flex flex-wrap gap-2">
                        {expert.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-bold"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Years of Experience</p>
                      <p className="text-2xl font-bold text-primary">12+ Years</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'activity' && (
              <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                  <h3 className="font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">history</span>
                    Recent Activity
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {expert.recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full ${activity.iconBg} flex items-center justify-center shrink-0 ${activity.iconColor}`}>
                        <span className="material-symbols-outlined text-sm">{activity.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Admin Tools & Schedule */}
          <div className="space-y-6">
            {/* Availability */}
            <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <h3 className="font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  Weekly Availability
                </h3>
              </div>
              <div className="p-6 space-y-3">
                {expert.availability.map((slot, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
                  >
                    <span className="font-medium">{slot.day}</span>
                    {slot.hours === 'Unavailable' ? (
                      <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded">
                        Unavailable
                      </span>
                    ) : (
                      <span className="text-sm text-slate-500">{slot.hours}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Admin Management */}
            <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <h3 className="font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
                  Admin Management
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Account Status
                  </label>
                  <select
                    value={accountStatus}
                    onChange={(e) => setAccountStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                  >
                    <option value="active">Active / Approved</option>
                    <option value="pending">Pending Verification</option>
                    <option value="suspended">Suspended</option>
                    <option value="deactivated">Deactivated</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Verification Tier
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg border border-primary/30">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    <span className="text-sm font-bold">Top Rated Expert</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Internal Admin Notes
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary min-h-[100px]"
                    placeholder="Add notes for other administrators..."
                  />
                  <p className="text-[10px] text-slate-400 mt-1 italic">
                    Last edited by Admin: James K. on Oct 24, 2023
                  </p>
                </div>

                <button className="w-full py-3 bg-slate-900 dark:bg-primary text-white dark:text-slate-900 rounded-lg font-bold hover:brightness-110 transition-all">
                  Save Internal Changes
                </button>
              </div>
            </section>

            {/* Quick Stats */}
            <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <h3 className="font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">insights</span>
                  Quick Stats
                </h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-xs text-slate-500">Satisfaction Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">24</p>
                  <p className="text-xs text-slate-500">Upcoming Sessions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">4.9</p>
                  <p className="text-xs text-slate-500">Avg Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">3</p>
                  <p className="text-xs text-slate-500">Years on Platform</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExpertDetailPage;