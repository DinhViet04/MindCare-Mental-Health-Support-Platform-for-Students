import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface Group {
  id: string;
  name: string;
  description: string;
  type: 'expert-led' | 'peer-to-peer';
  category: string;
  members: number;
  capacity: number;
  schedule: string;
  frequency: string;
  image: string;
  tags: string[];
  status?: 'new' | 'popular' | 'full' | 'spots-left';
  spotsLeft?: number;
}

const SupportGroupsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = ['Anxiety', 'Study Stress', 'Personal Growth'];
  const types = ['All Groups', 'Anxiety', 'Study Stress', 'Personal Growth'];

  const featuredGroup: Group = {
    id: 'featured',
    name: 'Anxiety Support Circle',
    description: 'Join our clinical psychologist-led group to learn evidence-based strategies for managing daily anxiety and social stressors in a supportive environment.',
    type: 'expert-led',
    category: 'Anxiety',
    members: 12,
    capacity: 15,
    schedule: 'Every Tuesday • 6:00 PM',
    frequency: 'Weekly',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Expert Led', 'Weekly'],
    spotsLeft: 3
  };

  const groups: Group[] = [
    {
      id: '1',
      name: 'Finals Prep & Stress Management',
      description: 'Connect with fellow students to share study tips and cope with academic pressure.',
      type: 'peer-to-peer',
      category: 'Study Stress',
      members: 7,
      capacity: 15,
      schedule: 'Bi-weekly',
      frequency: 'Bi-weekly',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Peer-to-Peer'],
      spotsLeft: 8
    },
    {
      id: '2',
      name: 'Mindfulness & Flow',
      description: 'A 6-week intensive guided by mindfulness coaches for deep personal transformation.',
      type: 'expert-led',
      category: 'Personal Growth',
      members: 18,
      capacity: 20,
      schedule: 'Daily',
      frequency: 'Daily',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Expert Led'],
      status: 'new'
    },
    {
      id: '3',
      name: 'Social Connection Club',
      description: 'Overcoming social anxiety through low-pressure group interactions and outings.',
      type: 'peer-to-peer',
      category: 'Anxiety',
      members: 25,
      capacity: 25,
      schedule: 'Monthly',
      frequency: 'Monthly',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Peer-to-Peer'],
      status: 'full'
    },
    {
      id: '4',
      name: 'Grief & Loss Support',
      description: 'A gentle, professionally-facilitated space for navigating the complexities of bereavement.',
      type: 'expert-led',
      category: 'Personal Growth',
      members: 4,
      capacity: 12,
      schedule: 'Weekly',
      frequency: 'Weekly',
      image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Expert Led'],
      status: 'new'
    },
    {
      id: '5',
      name: 'Career Transitioners',
      description: 'Supporting each other through the emotional ups and downs of changing career paths.',
      type: 'peer-to-peer',
      category: 'Personal Growth',
      members: 42,
      capacity: 50,
      schedule: 'Weekly',
      frequency: 'Weekly',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Peer-to-Peer'],
      status: 'popular'
    }
  ];

  const getStatusBadge = (group: Group) => {
    if (group.status === 'new') {
      return (
        <div className="flex items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-sm">star</span>
          <span className="text-xs font-bold">New</span>
        </div>
      );
    }
    if (group.status === 'popular') {
      return (
        <div className="flex items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          <span className="text-xs font-bold">Popular</span>
        </div>
      );
    }
    if (group.status === 'full') {
      return (
        <div className="flex items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span className="text-xs font-bold">Full</span>
        </div>
      );
    }
    if (group.spotsLeft) {
      return (
        <div className="flex items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-sm">bolt</span>
          <span className="text-xs font-bold">{group.spotsLeft} spots left</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Support Groups</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Find a safe space to share and grow with others who understand.
          </p>
          
          {/* Search */}
          <div className="relative w-full max-w-2xl">
            <div className="flex items-stretch rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="flex items-center justify-center pl-4 text-slate-400">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search groups by topic, keyword, or facilitator..."
                className="w-full border-none bg-transparent px-4 py-3 focus:outline-none focus:ring-0 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 pb-4 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
          <button
            onClick={() => setSelectedType('all')}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 text-sm font-semibold transition-all ${
              selectedType === 'all'
                ? 'bg-primary text-slate-900'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary'
            }`}
          >
            All Groups
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 hover:border-primary transition-all ${
                selectedCategory === category ? 'border-primary' : ''
              }`}
            >
              <span className="text-sm">{category}</span>
              <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
          ))}
        </div>

        {/* Featured Group */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            Recommended for You
          </h2>
          
          <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-xl transition-shadow">
            <div
              className="w-full lg:w-2/5 h-64 lg:h-auto bg-cover bg-center"
              style={{ backgroundImage: `url(${featuredGroup.image})` }}
            >
              <div className="w-full h-full bg-primary/10 hover:bg-transparent transition-colors"></div>
            </div>
            
            <div className="flex-1 p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary/20 text-slate-800 dark:text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                  Expert Led
                </span>
                <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                  Weekly
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{featuredGroup.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {featuredGroup.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="material-symbols-outlined text-primary text-sm">group</span>
                    <span>{featuredGroup.members}/{featuredGroup.capacity} members joined</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span>{featuredGroup.schedule}</span>
                  </div>
                </div>
                <button className="px-8 py-3 bg-primary text-slate-900 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95">
                  Join Group
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Groups Grid */}
        <section>
          <h2 className="text-xl font-bold mb-6">Explore All Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div
                key={group.id}
                className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden hover:border-primary/50 transition-colors"
              >
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${group.image})` }}
                ></div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      group.type === 'expert-led'
                        ? 'bg-primary/20 text-slate-800 dark:text-primary'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {group.type === 'expert-led' ? 'Expert Led' : 'Peer-to-Peer'}
                    </span>
                    {getStatusBadge(group)}
                  </div>

                  <h4 className="text-lg font-bold mb-2 line-clamp-1">{group.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                    {group.description}
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">group</span>
                        {group.members}/{group.capacity}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">event_repeat</span>
                        {group.frequency}
                      </span>
                    </div>

                    <button
                      className={`w-full rounded-lg h-10 font-bold transition-all ${
                        group.status === 'full'
                          ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                          : 'bg-primary/10 text-slate-900 dark:text-slate-100 hover:bg-primary hover:text-slate-900'
                      }`}
                      disabled={group.status === 'full'}
                    >
                      {group.status === 'full' ? 'Waiting List' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Create Group CTA */}
            <div className="flex flex-col rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 items-center justify-center p-8 text-center hover:border-primary transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">add</span>
              </div>
              <h4 className="text-lg font-bold mb-2">Can't find what you're looking for?</h4>
              <p className="text-sm text-slate-500 mb-6">
                Start your own peer support group or suggest a topic to our clinical team.
              </p>
              <button className="text-primary font-bold text-sm underline underline-offset-4">
                Create Group Request
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupportGroupsPage;