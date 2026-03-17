import React from 'react';
import { Link } from 'react-router-dom';


const TestResultPage: React.FC = () => {
  // Mock result data
  const result = {
    score: 75,
    totalScore: 100,
    wellnessScore: 75,
    category: 'Healthy Balance',
    message: "You're doing great, Alex! Your results suggest a positive mental wellbeing with healthy coping mechanisms. You're currently managing daily stressors effectively. This is a non-diagnostic reflection of your current state.",
    comparison: 72, // higher than 72% of users
    observations: [
      {
        icon: 'sleep',
        title: 'Consistent Rest',
        description: 'Your sleep patterns contribute significantly to your resilience.'
      },
      {
        icon: 'psychology',
        title: 'High Focus',
        description: "You're maintaining good cognitive clarity despite workload."
      }
    ],
    recommendations: [
      {
        title: 'Book a 15-min Check-in',
        icon: 'calendar_month',
        primary: true
      },
      {
        title: 'Read: Staying Resilient',
        icon: 'menu_book',
        primary: false
      }
    ],
    resources: [
      {
        title: 'Morning Mindfulness',
        duration: '5 min',
        type: 'Guided Audio',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Stress-Release Yoga',
        duration: '15 min',
        type: 'Video',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Evening Reflection',
        duration: '3 min',
        type: 'Writing Prompt',
        image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ]
  };

  const percentage = (result.score / result.totalScore) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Wellness Insight</h1>
          <p className="text-slate-500">Completed on {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>

        {/* Score Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-primary/10 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Circular Progress */}
            <div className="relative flex items-center justify-center w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="45"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-primary/10"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="45"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="text-primary transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{result.score}</span>
                <span className="text-xs uppercase tracking-widest text-slate-500">
                  Wellness Score
                </span>
              </div>
            </div>

            {/* Score Info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-3">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                {result.category}
              </div>
              <h2 className="text-2xl font-bold mb-3">{result.message}</h2>
              <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${result.comparison}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">
                Your score is higher than {result.comparison}% of users in your age group this month.
              </p>
            </div>
          </div>
        </div>

        {/* Observations & Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Observations */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
              Key Observations
            </h3>
            <div className="space-y-3">
              {result.observations.map((item, index) => (
                <div key={index} className="flex gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-primary/5">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">rocket_launch</span>
              Recommended Actions
            </h3>
            <div className="space-y-3">
              {result.recommendations.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center justify-between p-4 rounded-lg font-semibold transition-all ${
                    item.primary
                      ? 'bg-primary text-slate-900 hover:bg-primary/90'
                      : 'bg-white dark:bg-slate-800 border border-primary/20 hover:bg-primary/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined">{item.icon}</span>
                    {item.title}
                  </span>
                  <span className="material-symbols-outlined">
                    {item.primary ? 'arrow_forward' : 'open_in_new'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="border-t border-primary/10 pt-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Deepen Your Journey</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {result.resources.map((resource, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="h-32 rounded-lg bg-slate-200 dark:bg-slate-700 mb-2 overflow-hidden relative">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="font-bold text-sm">{resource.title}</p>
                <p className="text-xs text-slate-500">{resource.duration} • {resource.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center text-center gap-4">
          <p className="text-sm text-slate-500 max-w-md">
            Remember, these results are based on your self-reported data and are meant for educational purposes. 
            If you are in distress, please reach out to a professional or a crisis hotline immediately.
          </p>
          <div className="flex gap-4">
            <button className="text-primary text-sm font-bold hover:underline">Crisis Resources</button>
            <span className="text-slate-300">•</span>
            <button className="text-primary text-sm font-bold hover:underline">Download Report (PDF)</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestResultPage;