import React, { useState } from 'react';

interface Applicant {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: number;
  location: string;
  licenseNumber: string;
  education: string;
  appliedAt: string;
  priority: 'priority' | 'normal';
  status: 'pending' | 'in-review' | 'verified';
  avatar?: string;
}

const ExpertApprovalQueuePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'in-review' | 'verified'>('pending');

  const queue: Applicant[] = [
    {
      id: '1',
      name: 'Dr. Sarah Jenkins, PhD',
      title: 'Clinical Psychologist',
      specialization: 'Cognitive Behavioral Therapy',
      experience: 15,
      location: 'Seattle, WA',
      licenseNumber: 'PSY-WA-98210332',
      education: 'Stanford University',
      appliedAt: '2h ago',
      priority: 'priority',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Dr. Marcus Thorne',
      title: 'Psychiatrist',
      specialization: 'Addiction Specialist',
      experience: 12,
      location: 'Portland, OR',
      licenseNumber: 'PSY-OR-771234',
      education: 'Johns Hopkins University',
      appliedAt: '5h ago',
      priority: 'normal',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Dr. Elena Rodriguez',
      title: 'Family Therapist',
      specialization: 'Marriage Counseling',
      experience: 8,
      location: 'San Diego, CA',
      licenseNumber: 'LMFT-CA-88321',
      education: 'UCLA',
      appliedAt: '8h ago',
      priority: 'normal',
      status: 'in-review'
    }
  ];

  const filteredQueue = queue.filter(applicant =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTab === 'pending' ? applicant.status === 'pending' :
      activeTab === 'in-review' ? applicant.status === 'in-review' :
        applicant.status === 'verified')
  );

  const getPriorityBadge = (priority: string) => {
    return priority === 'priority' ? (
      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
        Priority Review
      </span>
    ) : null;
  };

  const documents = [
    { name: 'Medical License.pdf', status: 'Verified via State Registry' },
    { name: 'PhD_Diploma_Stanford.jpg', status: 'Academic Credential' },
    { name: 'Insurance_Certificate.pdf', status: 'Liability Coverage Active' }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Expert Approval Queue
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Validate credentials and review clinical experience for onboarding.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === 'pending'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              Pending Approval (12)
            </button>
            <button
              onClick={() => setActiveTab('in-review')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === 'in-review'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              In Review (4)
            </button>
            <button
              onClick={() => setActiveTab('verified')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === 'verified'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              Recently Verified
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Applicant List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Application Profile */}
            {filteredQueue.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-24 h-24 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-2xl font-bold shrink-0">
                      {applicant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold">{applicant.name}</h2>
                          <p className="text-primary font-semibold">{applicant.title} • {applicant.specialization}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">location_on</span>
                              {applicant.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">work</span>
                              {applicant.experience} Years Experience
                            </span>
                          </div>
                        </div>
                        {getPriorityBadge(applicant.priority)}
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                          <p className="text-xs text-slate-400 font-medium">License Number</p>
                          <p className="text-sm font-semibold">{applicant.licenseNumber}</p>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                          <p className="text-xs text-slate-400 font-medium">Education</p>
                          <p className="text-sm font-semibold">{applicant.education}</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-bold mb-3">Professional Biography</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          Dr. Sarah Jenkins is a licensed clinical psychologist with over 15 years of experience specializing in trauma-informed care and mindfulness-based cognitive therapy.
                        </p>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-bold mb-3">Credentials & Documents</h3>
                        <div className="space-y-3">
                          {documents.map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400">description</span>
                                <div>
                                  <p className="text-sm font-semibold">{doc.name}</p>
                                  <p className="text-xs text-slate-400">{doc.status}</p>
                                </div>
                              </div>
                              <span className="material-symbols-outlined text-slate-300">visibility</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <p className="text-xs text-slate-400">Applied {applicant.appliedAt}</p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-semibold text-sm transition-colors">
                      Reject Application
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-primary text-slate-900 font-bold text-sm hover:bg-primary/90 transition-colors">
                      Approve & Verify
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Queue Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-bold">Queue (12)</h3>
                <span className="text-xs text-primary font-bold">Sort: Newest</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-[500px] overflow-y-auto">
                {queue.map((applicant) => (
                  <div
                    key={applicant.id}
                    className={`p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors ${applicant.id === '1' ? 'bg-primary/5 border-l-4 border-primary' : ''
                      }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold shrink-0">
                        {applicant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{applicant.name}</p>
                        <p className="text-xs text-slate-500">{applicant.specialization} • {applicant.appliedAt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-700/50 text-center">
                <button className="text-xs font-bold text-primary hover:underline">
                  View All Applications
                </button>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-xl border border-primary/20">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Verification Guidelines
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Cross-reference license ID with state board.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Ensure liability insurance is currently active.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  Minimum 3 years clinical experience required.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertApprovalQueuePage;