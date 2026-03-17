import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface Test {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: number;
  duration: number;
  image: string;
  isPopular?: boolean;
}

const TestsListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tests', icon: 'apps' },
    { id: 'anxiety', name: 'Anxiety', icon: 'mood_bad' },
    { id: 'depression', name: 'Depression', icon: 'sentiment_dissatisfied' },
    { id: 'stress', name: 'Stress', icon: 'bolt' },
    { id: 'sleep', name: 'Sleep', icon: 'bedtime' },
    { id: 'eating', name: 'Eating Habits', icon: 'nutrition' },
  ];

  const tests: Test[] = [
    {
      id: 'gad7',
      title: 'Anxiety Assessment (GAD-7)',
      description: 'Generalized Anxiety Disorder scale. Helps identify symptoms of nervousness, worry, and fear.',
      category: 'anxiety',
      questions: 7,
      duration: 5,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isPopular: true
    },
    {
      id: 'phq9',
      title: 'Depression Screen (PHQ-9)',
      description: 'A common screening tool for identifying symptoms of depression and monitoring treatment progress.',
      category: 'depression',
      questions: 9,
      duration: 6,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pss',
      title: 'Perceived Stress Scale',
      description: 'Measure the degree to which situations in your life are appraised as stressful.',
      category: 'stress',
      questions: 10,
      duration: 8,
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'sleep',
      title: 'Sleep Quality Index',
      description: 'Assess your sleep patterns and identify potential factors affecting your rest.',
      category: 'sleep',
      questions: 15,
      duration: 10,
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'eating',
      title: 'Eating Habits Inventory',
      description: 'Understand your relationship with food and identify signs of emotional eating.',
      category: 'eating',
      questions: 12,
      duration: 7,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredTests = tests.filter(test => {
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3">
            Self-Assessment Tests
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Take a proactive step towards understanding your mental well-being. 
            Our clinically-validated tools are private, secure, and designed to help you identify patterns.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400">search</span>
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assessments..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 pb-2 border-b border-slate-200 dark:border-slate-700">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="group flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={test.image}
                  alt={test.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {test.isPopular && (
                  <div className="absolute top-4 right-4 bg-primary text-slate-900 text-xs font-bold px-2 py-1 rounded">
                    MOST POPULAR
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {test.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-1">
                  {test.description}
                </p>
                
                <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">quiz</span>
                    <span>{test.questions} Questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    <span>{test.duration} mins</span>
                  </div>
                </div>

                <Link
                  to={`/tests/${test.id}`}
                  className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-slate-900 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  Take Test
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}

          {/* Coming Soon Placeholder */}
          <div className="flex flex-col rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 items-center justify-center p-8 text-center bg-slate-50/50 dark:bg-slate-800/50">
            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">add_circle</span>
            <h3 className="text-slate-500 dark:text-slate-400 font-bold">More Tests Coming Soon</h3>
            <p className="text-slate-400 text-sm mt-2">We're working with experts to add more validated assessments.</p>
          </div>
        </div>

        {/* Resources CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Need immediate support?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              If you're in a crisis, help is available. You can speak with a professional right now.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
              Help Center
            </button>
            <button className="px-6 py-3 bg-primary text-slate-900 rounded-lg font-bold hover:bg-primary/90 transition-colors">
              Talk to Someone
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestsListPage;