import React from 'react';
import { Check, User, Users, GraduationCap, UploadCloud, CheckCircle } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  completedSteps: number[];
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  onSelectStep,
  completedSteps,
}) => {
  const steps = [
    { number: 1, title: 'Personal Details', icon: User, subtitle: 'Identity & College' },
    { number: 2, title: 'Family Details', icon: Users, subtitle: 'Income & Category' },
    { number: 3, title: 'Academic Details', icon: GraduationCap, subtitle: 'CGPA & Reg. No.' },
    { number: 4, title: 'Document Upload', icon: UploadCloud, subtitle: 'ID, Income, Marks' },
    { number: 5, title: 'Final Review', icon: CheckCircle, subtitle: 'Verify & Confirm' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative flex items-center justify-between">
          {/* Background Connecting Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />

          {/* Progress Bar Fill */}
          <div 
            className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500 -z-0"
            style={{ 
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` 
            }}
          />

          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.number);
            const isCurrent = currentStep === step.number;
            const Icon = step.icon;

            return (
              <button
                key={step.number}
                onClick={() => onSelectStep(step.number)}
                className="group relative z-10 flex flex-col items-center focus:outline-none"
              >
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 shadow-sm ${
                    isCompleted
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-950/60'
                      : isCurrent
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950/60 scale-110 shadow-indigo-500/20'
                      : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Step Text */}
                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-semibold whitespace-nowrap transition-colors ${
                      isCurrent
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : isCompleted
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    Step {step.number}
                  </p>
                  <p
                    className={`hidden sm:block text-[11px] font-medium max-w-[110px] truncate ${
                      isCurrent
                        ? 'text-slate-800 dark:text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
