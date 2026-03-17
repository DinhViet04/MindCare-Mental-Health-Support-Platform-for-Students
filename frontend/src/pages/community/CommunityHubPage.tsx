import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface Story {
  id: string;
  author: string;
  authorType: 'anonymous' | 'user';
  timeAgo: string;
  category: string;
  categoryColor: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  avatar?: string;
}

interface Group {
  id: string;
  name: string;
  icon: string;
  members: number;
  active: number;
  isJoined: boolean;
}

const CommunityHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'trending' | 'stories' | 'guidelines'>('feed');
  const [searchTerm, setSearchTerm] = useState('');

  const featuredGroups: Group[] = [
    {
      id: '1',
      name: 'Exam Anxiety',
      icon: 'psychology',
      members: 1200,
      active: 15,
      isJoined: false
    },
    {
      id: '2',
      name: 'Night Owls Support',
      icon: 'nights_stay',
      members: 850,
      active: 4,
      isJoined: true
    }
  ];

  const stories: Story[] = [
    {
      id: '1',
      author: 'Anonymous Hero',
      authorType: 'anonymous',
      timeAgo: '2 hours ago',
      category: '#StressManagement',
      categoryColor: 'primary',
      title: 'Finally spoke to a counselor today',
      content: 'Just wanted to share that I finally spoke to a counselor today. It took me three months to build up the courage, but I feel so much lighter. If you\'re on the fence, this is your sign to just go for it.',
      tags: ['#SelfCare', '#Counseling'],
      likes: 124,
      comments: 18
    },
    {
      id: '2',
      author: 'MindfulStudent',
      authorType: 'user',
      timeAgo: '5 hours ago',
      category: '#Mindfulness',
      categoryColor: 'primary',
      title: 'Started 10-minute morning meditation',
      content: 'Started the 10-minute morning meditation challenge today. My focus during my 10am lecture was actually significantly better! Highly recommend the resources section of MindCare for some easy guided audios.',
      tags: ['#Mindfulness', '#Meditation'],
      likes: 89,
      comments: 5
    }
  ];

  const trendingTopics = [
    '#ExamStress', '#SelfCare', '#SleepHygiene', '#Mindfulness', '#StudentLife', '#FreshmanTips'
  ];

  const guidelines = [
    'Keep it respectful and kind. We are here to support one another.',
    'Protect anonymity. Do not share personal identifying info of others.',
    'No medical advice. Consult professionals for clinical concerns.'
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Hero Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Community Hub
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              A safe space for students to connect, share, and grow together.
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex gap-8 overflow-x-auto scrollbar-hide">
              {(['feed', 'trending', 'stories', 'guidelines'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 pt-4 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Create Post */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-500">person</span>
                </div>
                <button className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-500 text-left px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  Share a story or ask for support anonymously...
                </button>
              </div>

              {/* Featured Groups */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Featured Groups</h2>
                  <Link to="/community/groups" className="text-primary text-sm font-semibold hover:underline">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredGroups.map((group) => (
                    <div
                      key={group.id}
                      className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/40 transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-3xl">{group.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold">{group.name}</h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {group.members.toLocaleString()} members • {group.active} active now
                          </p>
                        </div>
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            group.isJoined
                              ? 'bg-primary text-slate-900'
                              : 'bg-primary/10 text-primary hover:bg-primary/20'
                          }`}
                        >
                          <span className="material-symbols-outlined">
                            {group.isJoined ? 'check' : 'add'}
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Stories */}
              <section>
                <h2 className="text-xl font-bold mb-4">Recent Stories</h2>
                <div className="space-y-4">
                  {stories.map((story) => (
                    <article
                      key={story.id}
                      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                              <span className="material-symbols-outlined text-slate-500 text-sm">
                                {story.authorType === 'anonymous' ? 'person' : 'face'}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-bold">{story.author}</p>
                              <p className="text-xs text-slate-500">
                                {story.timeAgo} in {story.category}
                              </p>
                            </div>
                          </div>
                          <button className="text-slate-400 hover:text-primary">
                            <span className="material-symbols-outlined">more_horiz</span>
                          </button>
                        </div>

                        <h3 className="text-lg font-bold mb-2">{story.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                          {story.content}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {story.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 flex items-center gap-6">
                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">favorite</span>
                          <span className="text-sm font-medium">{story.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">chat_bubble</span>
                          <span className="text-sm font-medium">{story.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors ml-auto">
                          <span className="material-symbols-outlined">share</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Trending Topics */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-bold mb-4">Trending Topics</h2>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic) => (
                    <button
                      key={topic}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-medium hover:bg-primary/20 hover:text-primary transition-all"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guidelines */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">gavel</span>
                  <h2 className="text-lg font-bold">Safety Guidelines</h2>
                </div>
                <ul className="space-y-3">
                  {guidelines.map((guideline, index) => (
                    <li key={index} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="text-primary font-bold">{index + 1}.</span>
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 py-2.5 rounded-lg border border-primary text-primary text-sm font-bold hover:bg-primary/5 transition-colors">
                  Read Full Guidelines
                </button>
              </div>

              {/* Upcoming Events */}
              <div className="bg-primary/10 rounded-xl p-5 border border-primary/20">
                <h2 className="text-lg font-bold mb-4">Next Workshop</h2>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center bg-primary text-slate-900 font-bold px-3 py-1 rounded-md">
                    <span className="text-xs uppercase">Oct</span>
                    <span className="text-lg">24</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Stress-Free Finals Prep</p>
                    <p className="text-xs text-slate-500">6:00 PM • Zoom</p>
                  </div>
                </div>
                <Link
                  to="/community/events"
                  className="block text-center text-xs font-bold text-primary uppercase tracking-widest mt-4 hover:opacity-80"
                >
                  Browse All Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityHubPage;