import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface Post {
  id: string;
  type: 'encouragement' | 'vent' | 'story' | 'gratitude';
  title: string;
  content: string;
  author: string;
  timeAgo: string;
  likes: number;
  comments: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  badgeColor: string;
}

const AnonymousSharingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'encouragement', label: 'Encouragement' },
    { id: 'vent', label: 'Vent' },
    { id: 'story', label: 'Personal Story' },
    { id: 'gratitude', label: 'Gratitude' }
  ];

  const posts: Post[] = [
    {
      id: '1',
      type: 'encouragement',
      title: 'You are doing better than you think',
      content: 'To whoever is reading this: I know the semester is getting heavy and your to-do list seems endless. Just a reminder that you are more than your productivity. Take five minutes to just breathe today. You\'ve survived 100% of your hardest days so far.',
      author: 'Anonymous',
      timeAgo: '2 hours ago',
      likes: 24,
      comments: 8,
      icon: 'favorite',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      badgeColor: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
    },
    {
      id: '2',
      type: 'vent',
      title: 'Feeling overwhelmed by expectations',
      content: 'Does anyone else feel like they\'re just pretending to know what they\'re doing? My parents think I\'m thriving, but I\'m actually struggling to even get out of bed some mornings. The pressure to be "perfect" is exhausting. Just needed to say this somewhere.',
      author: 'Anonymous',
      timeAgo: '5 hours ago',
      likes: 56,
      comments: 12,
      icon: 'bolt',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      badgeColor: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
    },
    {
      id: '3',
      type: 'story',
      title: 'A small win today',
      content: 'I finally went to the counseling center today. I\'ve been putting it off for months because I was scared of what people would think. It was actually such a relief to talk to someone who just listened. If you\'re on the fence, this is your sign to go.',
      author: 'Anonymous',
      timeAgo: '1 day ago',
      likes: 102,
      comments: 15,
      icon: 'auto_stories',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
    }
  ];

  const trendingTags = ['#FinalsWeek', '#SocialAnxiety', '#SuccessStories', '#DormLife', '#SelfCare'];

  const guidelines = [
    'Be kind and empathetic.',
    'No hate speech or harassment.',
    'Keep identities private.',
    'Use content warnings for heavy topics.'
  ];

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.type === selectedCategory);

  const getLikeIcon = (type: string) => {
    switch (type) {
      case 'encouragement': return 'volunteer_activism';
      case 'vent': return 'handshake';
      case 'story': return 'celebration';
      default: return 'favorite';
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col w-64 gap-6">
            <nav className="flex flex-col gap-2">
              {[
                { icon: 'home', label: 'Feed', href: '#', active: true },
                { icon: 'edit_note', label: 'My Posts', href: '#', active: false },
                { icon: 'bookmark', label: 'Saved', href: '#', active: false },
                { icon: 'policy', label: 'Guidelines', href: '#', active: false }
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    item.active
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Guidelines */}
            <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                Safe Space Rules
              </h3>
              <ul className="text-xs text-slate-500 space-y-2 leading-relaxed">
                {guidelines.map((rule, index) => (
                  <li key={index}>• {rule}</li>
                ))}
              </ul>
              <button className="mt-3 text-xs font-bold text-primary hover:underline flex items-center gap-1">
                Read Full Guidelines
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-black tracking-tight mb-2">Anonymous Sharing</h1>
              <p className="text-slate-500">A safe, non-judgmental space to exhale and find support.</p>
            </div>

            {/* Create Post */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-sm flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-400">face</span>
              </div>
              <input
                type="text"
                placeholder="Share your thoughts anonymously..."
                className="flex-1 bg-slate-50 dark:bg-slate-700 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20">
                Post
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Posts Feed */}
            <div className="space-y-5">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${post.iconBg} flex items-center justify-center ${post.iconColor}`}>
                        <span className="material-symbols-outlined text-lg">{post.icon}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${post.badgeColor}`}>
                        {post.type}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">{post.timeAgo}</span>
                  </div>

                  <h2 className="text-lg font-bold mb-3">{post.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-500 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">{getLikeIcon(post.type)}</span>
                      <span className="text-xs font-bold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-500 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">chat_bubble_outline</span>
                      <span className="text-xs font-bold">{post.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <button className="w-full py-4 mt-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 hover:text-primary hover:border-primary transition-all font-bold text-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">expand_more</span>
              Load more stories
            </button>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden xl:flex flex-col w-72 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-medium cursor-pointer hover:bg-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-primary p-6 rounded-2xl text-slate-900">
              <h3 className="font-black text-lg leading-tight mb-2">Need immediate support?</h3>
              <p className="text-xs font-medium opacity-80 mb-4">You are not alone. Professional help is available 24/7.</p>
              <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold text-sm">
                Get Help Now
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default AnonymousSharingPage;