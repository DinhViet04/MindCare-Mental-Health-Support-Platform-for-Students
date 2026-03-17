import React from 'react';
import { useParams, Link } from 'react-router-dom';


const TestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - sẽ fetch từ API sau
  const testData = {
    id: 'gad7',
    title: 'Generalized Anxiety Assessment (GAD-7)',
    description: 'The Generalized Anxiety Disorder 7-item (GAD-7) scale is a clinically validated, self-reported screening tool used globally by healthcare professionals. It helps measure the severity of anxiety and identify potential symptoms of generalized anxiety disorder in adults.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    duration: 10,
    isPopular: true,
    questions: 7,
    category: 'Anxiety',
    validity: {
      sensitivity: 89,
      specificity: 82,
      reliability: 'Excellent'
    },
    reviewedBy: {
      name: 'Dr. Sarah Mitchell',
      title: 'Clinical Psychologist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative w-full rounded-xl overflow-hidden aspect-[21/9] mb-8">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <img 
            src={testData.image} 
            alt={testData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-8 z-20">
            <div className="flex items-center gap-2 mb-2">
              {testData.isPopular && (
                <span className="bg-primary text-slate-900 text-xs font-bold px-2 py-1 rounded uppercase">
                  Most Popular
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-2 py-1 rounded">
                {testData.duration} mins
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {testData.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Test Overview
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {testData.description}
              </p>
            </section>

            {/* Clinical Validity */}
            <section className="p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified</span>
                Clinical Validity
              </h2>
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  The GAD-7 has shown excellent internal consistency and test-retest reliability. 
                  Studies indicate a sensitivity of {testData.validity.sensitivity}% and a specificity 
                  of {testData.validity.specificity}% for detecting generalized anxiety disorder.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Peer-reviewed and medically accepted
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Standardized scoring system
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Used in clinical trials worldwide
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Sensitive to treatment changes
                  </li>
                </ul>
              </div>
            </section>

            {/* What to Expect */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">assignment</span>
                What to expect
              </h2>
              <div className="space-y-6">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex-none w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold">
                      {step}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {step === 1 && '7 Multiple-Choice Questions'}
                        {step === 2 && 'Instant Scoring'}
                        {step === 3 && 'Personalized Resources'}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {step === 1 && "You'll reflect on your experiences over the past 2 weeks."}
                        {step === 2 && 'Receive your score (0-21) immediately after completion.'}
                        {step === 3 && 'Guided advice based on your specific anxiety level.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="pt-8 border-t border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">Is this anonymous?</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Yes, your results are encrypted and only accessible by you unless you choose to share them with a provider.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">How often should I take this?</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Clinicians often recommend tracking your score every 2-4 weeks to monitor your progress or response to therapy.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Start Test Card */}
              <div className="p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-center mb-6">
                  <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-widest">
                    Ready to start?
                  </p>
                  <p className="text-lg font-bold">Private & Secure</p>
                </div>
                <Link
                  to={`/tests/${id}/take`}
                  className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-black text-lg py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3"
                >
                  Start Assessment
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <p className="text-xs text-center text-slate-500 mt-4">
                  By starting, you agree to our terms. This is not a formal diagnosis.
                </p>
              </div>

              {/* Reviewed By */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                  <img 
                    src={testData.reviewedBy.avatar} 
                    alt={testData.reviewedBy.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase">Reviewed by</p>
                  <p className="font-bold">{testData.reviewedBy.name}</p>
                  <p className="text-xs text-slate-500">{testData.reviewedBy.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestDetailPage;