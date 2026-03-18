import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface BookingDetail {
  id: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  platform: string;
  patient: {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar?: string;
  };
  expert: {
    id: string;
    name: string;
    title: string;
    email: string;
    rating: number;
    avatar?: string;
  };
  payment: {
    sessionFee: number;
    tax: number;
    total: number;
    status: 'paid' | 'pending' | 'refunded';
    method: string;
    transactionId: string;
  };
  logs: Array<{
    action: string;
    description: string;
    time: string;
    icon: string;
    status: 'active' | 'completed';
  }>;
  adminNotes: Array<{
    author: string;
    content: string;
    time: string;
    avatar?: string;
  }>;
}

const AdminBookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [adminNote, setAdminNote] = useState('');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  // Mock data - would fetch from API
  const booking: BookingDetail = {
    id: id || 'BK-8824',
    status: 'confirmed',
    createdAt: 'Oct 24, 2023 · 10:45 AM',
    date: 'Friday, October 27, 2023',
    time: '02:00 PM - 03:00 PM (GMT+2)',
    duration: '60 Minutes',
    type: 'Video Consultation',
    platform: 'Native Web App v2.4.1',
    patient: {
      id: 'PT-4592',
      name: 'Sarah Jenkins',
      email: 's.jenkins@example.com',
      phone: '+1 (555) 012-3456',
      location: 'Chicago, USA'
    },
    expert: {
      id: 'EX-1234',
      name: 'Dr. Aris Thorne',
      title: 'Clinical Psychologist',
      email: 'a.thorne@mindcare.com',
      rating: 4.9
    },
    payment: {
      sessionFee: 120.00,
      tax: 6.00,
      total: 126.00,
      status: 'paid',
      method: 'Visa ****4242',
      transactionId: 'TXN-9021'
    },
    logs: [
      {
        action: 'Booking Confirmed',
        description: 'Payment verified and professional availability confirmed automatically.',
        time: 'Oct 24, 11:30 AM',
        icon: 'check',
        status: 'active'
      },
      {
        action: 'Payment Received',
        description: 'Transaction #TXN-9021 successful via Stripe.',
        time: 'Oct 24, 10:50 AM',
        icon: 'payments',
        status: 'completed'
      },
      {
        action: 'Booking Created',
        description: 'Session requested by patient Sarah Jenkins.',
        time: 'Oct 24, 10:45 AM',
        icon: 'add',
        status: 'completed'
      }
    ],
    adminNotes: [
      {
        author: 'Mark S.',
        content: 'Patient requested a female therapist initially. Noted for future bookings.',
        time: 'Oct 24, 02:15 PM'
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      refunded: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link to="/admin" className="text-slate-500 hover:text-primary">Dashboard</Link>
          <span className="text-slate-400">/</span>
          <Link to="/admin/bookings" className="text-slate-500 hover:text-primary">Bookings</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 dark:text-white font-bold">Booking #{booking.id}</span>
        </nav>

        {/* Header Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-black">Booking #{booking.id}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusBadge(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <p className="text-slate-500 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">event</span>
                Created on {booking.createdAt}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRescheduleModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                <span className="material-symbols-outlined text-lg">calendar_today</span>
                Reschedule
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 transition-all">
                <span className="material-symbols-outlined text-lg">cancel</span>
                Cancel Session
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-slate-900 font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-lg">notifications_active</span>
                Send Reminder
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Booking Details & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Info */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <h3 className="font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">info</span>
                  Appointment Information
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date & Time</p>
                    <p className="font-semibold">{booking.date}</p>
                    <p className="text-sm text-slate-500">{booking.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary">videocam</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Session Type</p>
                    <p className="font-semibold">{booking.type}</p>
                    <p className="text-sm text-slate-500">Secure MindCare Link</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                    <p className="font-semibold">{booking.duration}</p>
                    <p className="text-sm text-slate-500">Standard Session</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary">language</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Platform</p>
                    <p className="font-semibold">{booking.platform}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient & Expert Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                  <h3 className="font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">person</span>
                    Patient Info
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold">
                      {booking.patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{booking.patient.name}</h4>
                      <p className="text-sm text-slate-500">ID: #{booking.patient.id}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-slate-400">mail</span>
                      <span className="text-slate-600 dark:text-slate-400">{booking.patient.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-slate-400">phone</span>
                      <span className="text-slate-600 dark:text-slate-400">{booking.patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-slate-400">location_on</span>
                      <span className="text-slate-600 dark:text-slate-400">{booking.patient.location}</span>
                    </div>
                  </div>
                  <Link
                    to={`/admin/users/${booking.patient.id}`}
                    className="mt-4 block text-center py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              {/* Expert Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                  <h3 className="font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">medical_services</span>
                    Expert Info
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold">
                      {booking.expert.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{booking.expert.name}</h4>
                      <p className="text-sm text-slate-500">{booking.expert.title}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-slate-400">mail</span>
                      <span className="text-slate-600 dark:text-slate-400">{booking.expert.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-slate-400">verified</span>
                      <span className="text-slate-600 dark:text-slate-400">Licensed Professional</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-yellow-400">star</span>
                      <span className="text-slate-600 dark:text-slate-400">{booking.expert.rating}/5.0 Rating</span>
                    </div>
                  </div>
                  <Link
                    to={`/admin/experts/${booking.expert.id}`}
                    className="mt-4 block text-center py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Session Logs */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <h3 className="font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">history</span>
                  Session Logs
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-8">
                  {booking.logs.map((log, index) => (
                    <div key={index} className="relative flex gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${log.status === 'active'
                        ? 'bg-primary text-slate-900'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                        }`}>
                        <span className="material-symbols-outlined text-sm">{log.icon}</span>
                      </div>
                      <div className="flex-1 pb-8 border-l-2 border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <p className="font-bold">{log.action}</p>
                          <span className="text-xs text-slate-400">{log.time}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{log.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Payment & Admin Tools */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                <span className="material-symbols-outlined text-primary">payments</span>
                Payment Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Session Fee</span>
                  <span className="font-semibold">${booking.payment.sessionFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Tax (VAT 5%)</span>
                  <span className="font-semibold">${booking.payment.tax.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                  <span className="font-bold">Total Amount</span>
                  <span className="text-xl font-black text-primary">${booking.payment.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getStatusBadge(booking.payment.status)}`}>
                    {booking.payment.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Method</span>
                  <span className="text-sm font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">credit_card</span>
                    {booking.payment.method}
                  </span>
                </div>
                <button className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-primary/30 text-primary font-bold text-sm hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-lg">download</span>
                  Download Invoice
                </button>
              </div>
            </div>

            {/* Admin Notes */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                <span className="material-symbols-outlined text-primary">sticky_note_2</span>
                Admin Notes
              </h3>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                className="w-full h-24 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                placeholder="Type private admin notes here..."
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-slate-400 italic">Visible only to admins</span>
                <button className="px-4 py-1.5 bg-slate-900 dark:bg-primary text-white dark:text-slate-900 rounded text-xs font-bold hover:brightness-110 transition-all">
                  Save Note
                </button>
              </div>

              {booking.adminNotes.map((note, index) => (
                <div key={index} className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                      {note.author[0]}
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        <span className="font-bold">{note.author}:</span> {note.content}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">{note.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                <span className="material-symbols-outlined text-primary">link</span>
                Related Info
              </h3>
              <div className="space-y-2">
                <Link
                  to={`/admin/patients/${booking.patient.id}/history`}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-primary/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">description</span>
                    <span className="text-sm font-semibold">Patient Case History</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                </Link>
                <Link
                  to={`/admin/experts/${booking.expert.id}/schedule`}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-primary/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">calendar_month</span>
                    <span className="text-sm font-semibold">Expert's Full Schedule</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                </Link>
                <Link
                  to={`/chat/${booking.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-primary/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">chat</span>
                    <span className="text-sm font-semibold">Pre-session Chat Logs</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Reschedule Session</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">New Date</label>
                <input type="date" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Time</label>
                <input type="time" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reason for Rescheduling</label>
                <textarea className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary h-20" placeholder="Enter reason..." />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowRescheduleModal(false)} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</button>
              <button className="px-4 py-2 bg-primary text-slate-900 rounded-lg font-bold hover:bg-primary/90">Confirm Reschedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookingDetailPage;