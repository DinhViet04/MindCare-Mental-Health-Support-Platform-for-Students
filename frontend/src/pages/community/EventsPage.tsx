import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface Event {
  id: string;
  title: string;
  description: string;
  type: 'webinar' | 'meetup' | 'awareness' | 'workshop';
  date: string;
  time: string;
  location: string;
  image: string;
  attendees: number;
  maxAttendees?: number;
  price?: string;
  isFree?: boolean;
}

const EventsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDate, setSelectedDate] = useState('This Month');

  const events: Event[] = [
    {
      id: '1',
      title: 'Mindful Meditation: Evening Flow',
      description: 'A guided session focused on releasing daily stress and preparing the mind for restful sleep.',
      type: 'webinar',
      date: 'OCT 24',
      time: '6:00 PM',
      location: 'Online',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      attendees: 42,
      maxAttendees: 100,
      price: 'Free'
    },
    {
      id: '2',
      title: 'Creative Journaling Circle',
      description: 'Connect with others through the power of written word and artistic expression in a cozy local cafe.',
      type: 'meetup',
      date: 'OCT 26',
      time: '2:00 PM',
      location: 'NYC',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      attendees: 15,
      maxAttendees: 30,
      price: 'Free'
    },
    {
      id: '3',
      title: 'World Mental Health Week',
      description: 'A series of free workshops and talks dedicated to breaking the stigma around mental wellness.',
      type: 'awareness',
      date: 'OCT 28',
      time: 'All Day',
      location: 'Online',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      attendees: 2400,
      price: 'Free'
    },
    {
      id: '4',
      title: 'Navigating Work Burnout',
      description: 'Practical strategies for corporate professionals to maintain work-life balance and mental health.',
      type: 'webinar',
      date: 'NOV 02',
      time: '10:00 AM',
      location: 'Online',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      attendees: 128,
      maxAttendees: 200,
      price: '$25'
    },
    {
      id: '5',
      title: 'Nature Walk & Talk',
      description: 'Join us for a light hike and conversation about mindfulness in the beauty of nature.',
      type: 'meetup',
      date: 'NOV 05',
      time: '9:00 AM',
      location: 'Central Park',
      image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      attendees: 8,
      maxAttendees: 20,
      price: 'Free'
    }
  ];

  const getEventTypeBadge = (type: string) => {
    const styles = {
      webinar: 'bg-primary/90 text-slate-900',
      meetup: 'bg-purple-500/90 text-white',
      awareness: 'bg-blue-500/90 text-white',
      workshop: 'bg-green-500/90 text-white'
    };
    return styles[type as keyof typeof styles] || styles.webinar;
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Community <span className="text-primary">Events</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Safe spaces to learn, grow, and connect. Explore our upcoming webinars, meetups, and workshops led by experts.
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <span className="material-symbols-outlined text-sm">list</span>
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white dark:bg-slate-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              Calendar
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 py-4 border-y border-slate-200 dark:border-slate-700 mb-8">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              selectedType === 'all'
                ? 'bg-primary text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setSelectedType('webinar')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <span className="material-symbols-outlined text-lg">videocam</span>
            Webinars
          </button>
          <button
            onClick={() => setSelectedType('meetup')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <span className="material-symbols-outlined text-lg">groups</span>
            Social Meetups
          </button>
          <button
            onClick={() => setSelectedType('awareness')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <span className="material-symbols-outlined text-lg">psychology</span>
            Awareness
          </button>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden md:block"></div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 ml-auto">
            <span className="material-symbols-outlined">calendar_today</span>
            {selectedDate}
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/community/events/${event.id}`}
              className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute top-4 left-4 z-10 ${getEventTypeBadge(event.type)} backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase tracking-wider`}>
                  {event.type}
                </div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-primary text-xs font-bold mb-2">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  {event.date} • {event.time}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2">
                  {event.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">favorite</span>
                    <span className="text-xs font-medium text-slate-500">
                      {event.attendees.toLocaleString()} {event.maxAttendees ? `• ${event.maxAttendees} max` : 'interested'}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary">{event.price}</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Create Event Card */}
          <div className="flex flex-col items-center justify-center gap-4 bg-primary/10 border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:bg-primary/20 transition-all cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-slate-800">add</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Propose an Event</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Have an idea for a mental health event? We'd love to hear it.
              </p>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-lg bg-primary text-slate-900 font-bold flex items-center justify-center">1</button>
          <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800">2</button>
          <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800">3</button>
          <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;