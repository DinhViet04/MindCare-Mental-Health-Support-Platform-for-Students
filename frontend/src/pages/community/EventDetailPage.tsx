import React from 'react';
import { useParams, Link } from 'react-router-dom';


const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const event = {
    title: 'Navigating Workplace Anxiety',
    type: 'Workshop',
    date: 'Saturday, Oct 24 • 10 AM',
    location: 'Online (Zoom Link)',
    description: [
      'In today\'s fast-paced corporate world, anxiety can often become an uninvited desk mate. This intensive workshop focuses on identifying the root causes of professional stress and provides actionable tools to maintain your mental wellbeing while excelling in your career.',
      'We\'ll cover everything from managing high-pressure deadlines to navigating complex office dynamics and setting healthy boundaries.'
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    speaker: {
      name: 'Dr. Sarah Jenkins',
      title: 'Lead Organizational Psychologist',
      bio: 'Dr. Jenkins has over 15 years of experience helping Fortune 500 teams build emotional resilience and sustainable performance cultures.',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    agenda: [
      { time: '10:00 AM', title: 'Welcome & Grounding Session', description: 'Opening meditation and goal setting for the day.' },
      { time: '10:30 AM', title: 'The Science of Stress', description: 'Understanding cortisol and your brain\'s response to deadlines.' },
      { time: '11:30 AM', title: 'Live Q&A Session', description: 'Direct consultation on your specific workplace challenges.' }
    ],
    relatedEvents: [
      {
        id: 'related-1',
        title: 'Mindful Mornings: Yoga at Work',
        date: 'Oct 28 • 8:00 AM',
        type: 'Wellness',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'related-2',
        title: 'Empathetic Leadership Summit',
        date: 'Nov 02 • 1:00 PM',
        type: 'Leadership',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/community/events"
              className="flex items-center justify-center rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h2 className="text-lg font-bold">Event Details</h2>
          </div>
          <div className="flex gap-3">
            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-80 rounded-xl overflow-hidden mb-8">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block px-3 py-1 bg-primary text-slate-900 text-xs font-bold rounded-full mb-3 uppercase">
                {event.type}
              </span>
              <h1 className="text-4xl font-bold text-white">{event.title}</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-primary/10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase text-primary tracking-wide">Date & Time</p>
                  <p className="font-medium">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-primary/10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">video_camera_front</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase text-primary tracking-wide">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
                <button className="px-3 py-1 bg-primary text-slate-900 rounded font-bold text-xs">JOIN</button>
              </div>
            </div>

            {/* Description */}
            <section>
              <h3 className="text-2xl font-bold mb-4">About this Event</h3>
              {event.description.map((para, index) => (
                <p key={index} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </section>

            {/* Speaker */}
            <section>
              <h3 className="text-2xl font-bold mb-4">Featured Speaker</h3>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 flex items-start gap-6">
                <img
                  src={event.speaker.avatar}
                  alt={event.speaker.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xl font-bold">{event.speaker.name}</h4>
                  <p className="text-primary font-medium mb-2">{event.speaker.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{event.speaker.bio}</p>
                </div>
              </div>
            </section>

            {/* Agenda */}
            <section>
              <h3 className="text-2xl font-bold mb-4">Agenda</h3>
              <div className="space-y-4">
                {event.agenda.map((item, index) => (
                  <div key={index} className="flex gap-4 border-l-2 border-primary pl-6 py-2">
                    <span className="font-bold text-primary min-w-[80px]">{item.time}</span>
                    <div>
                      <h5 className="font-bold">{item.title}</h5>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Form */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-primary shadow-xl sticky top-8">
              <h3 className="text-xl font-bold mb-4 text-center">Secure Your Spot</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-primary/20 bg-slate-50 dark:bg-slate-700 focus:border-primary focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border-primary/20 bg-slate-50 dark:bg-slate-700 focus:border-primary focus:ring-primary"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-primary/20 bg-slate-50 dark:bg-slate-700 focus:border-primary focus:ring-primary"
                    placeholder="Acme Inc"
                  />
                </div>
                <button className="w-full py-3 bg-primary text-slate-900 font-black rounded-lg hover:brightness-110 transition-all uppercase tracking-widest text-sm">
                  Register Now
                </button>
                <p className="text-xs text-center text-slate-400 mt-2">Limited slots available (Only 12 left)</p>
              </form>
            </div>

            {/* Share */}
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
              <p className="text-sm font-bold mb-3 text-center">Share with Colleagues</p>
              <div className="flex justify-center gap-4">
                <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined">link</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-sm">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white shadow-sm">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        <div className="mt-16 pt-8 border-t border-primary/10">
          <h3 className="text-2xl font-bold mb-6">Related Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {event.relatedEvents.map((related) => (
              <Link
                key={related.id}
                to={`/community/events/${related.id}`}
                className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-primary/10 hover:shadow-lg transition-all"
              >
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${related.image})` }}></div>
                <div className="p-4">
                  <p className="text-primary text-xs font-bold uppercase mb-1">{related.type}</p>
                  <h4 className="font-bold group-hover:text-primary transition-colors">{related.title}</h4>
                  <p className="text-sm text-slate-500 mt-2">{related.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetailPage;