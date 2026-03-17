import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


interface Question {
  id: number;
  text: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
}

const TakeTestPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // Mock questions - sẽ fetch từ API sau
  const questions: Question[] = [
    {
      id: 1,
      text: "How often have you felt overwhelmed by your daily tasks this week?",
      options: [
        { value: 0, label: "Never", description: "I have felt completely in control of my schedule." },
        { value: 1, label: "Rarely", description: "Once or twice, but I managed to recover quickly." },
        { value: 2, label: "Sometimes", description: "Several times this week, affecting my focus." },
        { value: 3, label: "Often", description: "Most days, I struggle to keep up with demands." },
        { value: 4, label: "Very Often", description: "Every day has felt unmanageable and stressful." }
      ]
    },
    {
      id: 2,
      text: "How often have you been bothered by feeling nervous, anxious, or on edge?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    },
    {
      id: 3,
      text: "How often have you had trouble relaxing?",
      options: [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
      ]
    }
  ];

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit test
      navigate(`/tests/${id}/result`);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">      
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-primary font-bold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {currentQ.text}
          </h1>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map((option, index) => (
            <label
              key={index}
              className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                answers[currentQuestion] === option.value
                  ? 'border-primary bg-primary/5'
                  : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="radio"
                  name="answer"
                  value={option.value}
                  checked={answers[currentQuestion] === option.value}
                  onChange={() => handleAnswer(option.value)}
                  className="mt-1 w-5 h-5 text-primary border-slate-300 focus:ring-primary"
                />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {option.label}
                  </p>
                  {option.description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-slate-900 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
          >
            {currentQuestion === totalQuestions - 1 ? 'Submit' : 'Next'}
            <span className="material-symbols-outlined">
              {currentQuestion === totalQuestions - 1 ? 'check' : 'arrow_forward'}
            </span>
          </button>
        </div>

        {/* Privacy Note */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Your responses are private and encrypted. Assessment based on clinically validated metrics.
        </p>
      </main>
    </div>
  );
};

export default TakeTestPage;