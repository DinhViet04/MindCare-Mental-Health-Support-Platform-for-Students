import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';


interface Discussion {
  id: string;
  author: string;
  authorAvatar?: string;
  timeAgo: string;
  title: string;
  content: string;
  replies: number;
  likes: number;
}

const GroupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'schedule' | 'discussions'>('overview');

  const group = {
    name: 'Anxiety & Mindfulness Support',
    description: 'A safe space for those seeking to manage anxiety through mindful practices and community connection.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    facilitator: {
      name: 'Dr. Sarah Chen',
      title: 'Licensed Psychologist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      bio: 'Dr. Sarah Chen has over 15 years of experience in clinical psychology specializing in anxiety disorders.'
    },
    stats: {
      members: 1200,
      yearsActive: 8
    },
    schedule: [
      { day: 'Tue', date: '14', time: '06:00 PM - 07:30 PM EST', title: 'Weekly Live Session' },
      { day: 'Fri', date: '17', time: '02:00 PM - 03:00 PM EST', title: 'Q&A Afternoon' }
    ],
    rules: [
      'Keep all discussions confidential.',
      'Listen with empathy and without judgment.',
      'No unsolicited medical advice.',
      'Use "I" statements to share feelings.'
    ],
    discussions: [
      {
        id: '1',
        author: 'Elena M.',
        timeAgo: '2 hours ago',
        title: 'Morning routine suggestions for high-anxiety days?',
        content: 'Does anyone have a specific set of grounding exercises they do before starting work? I\'ve been struggling with morning jitters lately...',
        replies: 12,
        likes: 8
      },
      {
        id: '2',
        author: 'James K.',
        timeAgo: 'Yesterday',
        title: 'Success story: Using the 5-4-3-2-1 technique',
        content: 'I wanted to share that I successfully navigated a panic attack at the grocery store today using the technique Dr. Chen taught us!',
        replies: 24,
        likes: 45
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
              to="/community/groups"
              className="flex items-center justify-center rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h2 className="text-lg font-bold">Group Details</h2>
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
        <div className="relative rounded-xl overflow-hidden h-80 mb-6">
          <img
            src={group.image}
            alt={group.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block px-3 py-1 bg-primary text-slate-900 text-xs font-bold rounded-full mb-3 uppercase">
                Active Group
              </span>
              <h1 className="text-4xl font-bold text-white mb-2">{group.name}</h1>
              <p className="text-slate-200 max-w-xl">{group.description}</p>
            </div>
          </div>
        </div>

        {/* Facilitator & CTA */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex gap-4 items-center">
              <img
                src={group.facilitator.avatar}
                alt={group.facilitator.name}
                className="w-20 h-20 rounded-full border-2 border-primary object-cover"
              />
              <div>
                <p className="text-xl font-bold">{group.facilitator.name}</p>
                <p className="text-slate-500 text-sm">{group.facilitator.title}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-primary text-xs">verified</span>
                  <span className="text-xs text-primary font-medium">Verified Expert</span>
                </div>
              </div>
            </div>
            <button className="px-8 py-3 bg-primary text-slate-900 rounded-lg font-bold hover:bg-primary/90 transition-colors">
              Apply to Join
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-6 sticky top-0 bg-background-light dark:bg-background-dark z-10">
          <div className="flex gap-8 overflow-x-auto">
            {(['overview', 'rules', 'schedule', 'discussions'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 pt-4 text-sm font-medium capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-slate-900 dark:text-white'
                    : 'border-transparent text-slate-500 hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Description */}
                <section>
                  <h3 className="text-xl font-bold mb-4">About this Group</h3>
                  <div className="text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
                    <p>Welcome to our community. This group is designed for individuals navigating the challenges of daily anxiety and stress. We focus on evidence-based mindfulness techniques, Cognitive Behavioral Therapy (CBT) principles, and peer support.</p>
                    <p>Our sessions provide a structured environment to share experiences, learn coping mechanisms, and develop a more compassionate relationship with your mind.</p>
                  </div>
                </section>

                {/* Facilitator Bio */}
                <section className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">clinical_notes</span>
                    Meet your Facilitator
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {group.facilitator.bio} She is an author of "The Mindful Path" and has led over 200 support group sessions worldwide. Her approach combines professional expertise with deep empathy.
                  </p>
                </section>

                {/* Recent Discussions Preview */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Recent Discussions</h3>
                    <button className="text-primary text-sm font-bold">View All</button>
                  </div>
                  <div className="space-y-4">
                    {group.discussions.map((discussion) => (
                      <div
                        key={discussion.id}
                        className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                            <span className="text-sm font-bold">{discussion.author[0]}</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold">{discussion.author}</p>
                            <p className="text-xs text-slate-500">{discussion.timeAgo}</p>
                          </div>
                        </div>
                        <p className="font-medium mb-1">{discussion.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {discussion.content}
                        </p>
                        <div className="flex gap-4 mt-3">
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="material-symbols-outlined text-base">chat_bubble_outline</span>
                            {discussion.replies} replies
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="material-symbols-outlined text-base">favorite</span>
                            {discussion.likes} likes
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === 'rules' && (
              <section className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">gavel</span>
                  Community Rules
                </h3>
                <ul className="space-y-4">
                  {group.rules.map((rule, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-primary font-bold">{index + 1}.</span>
                      <span className="text-slate-600 dark:text-slate-400">{rule}</span>
                    </li>
                  ))}
                </ul>
                <Link to="#" className="inline-block mt-6 text-sm font-bold text-primary underline">
                  Read full handbook
                </Link>
              </section>
            )}

            {activeTab === 'schedule' && (
              <section className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  Group Schedule
                </h3>
                <div className="space-y-4">
                  {group.schedule.map((item, index) => (
                    <div key={index} className="flex gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                      <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg h-14 w-14">
                        <span className="text-xs font-bold uppercase text-primary">{item.day}</span>
                        <span className="text-lg font-bold text-primary">{item.date}</span>
                      </div>
                      <div>
                        <p className="font-bold">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Add to Calendar
                </button>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">group</span>
                Group Stats
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{group.stats.members.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Members</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{group.stats.yearsActive}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Years Active</p>
                </div>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                Upcoming Sessions
              </h4>
              <div className="space-y-3">
                {group.schedule.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg h-12 w-12 shrink-0">
                      <span className="text-xs font-bold uppercase text-primary">{item.day}</span>
                      <span className="text-base font-bold text-primary">{item.date}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">gavel</span>
                Quick Rules
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {group.rules.slice(0, 3).map((rule, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to take the next step?</h2>
          <p className="text-slate-300 max-w-md mx-auto mb-6">
            Our next intake starts in 3 days. Join a cohort of supportive individuals and start your healing journey.
          </p>
          <button className="px-8 py-3 bg-primary text-slate-900 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg">
            Apply to Join Now
          </button>
          <p className="text-xs text-slate-500 mt-4">Application takes less than 2 minutes.</p>
        </div>
      </main>
    </div>
  );
};

export default GroupDetailPage;