import React, { useState } from 'react';
import { Play, ChevronRight, ChevronLeft, Sparkles, Check, ChevronUp, ChevronDown } from 'lucide-react';

interface DemoTourBarProps {
  currentDemoStep: number;
  onExecuteDemoStep: (stepNumber: number) => void;
}

export const DemoTourBar: React.FC<DemoTourBarProps> = ({
  currentDemoStep,
  onExecuteDemoStep,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const demoSteps = [
    { num: 1, title: "1. Open Portal", desc: "View Simulated National Scholarship Portal" },
    { num: 2, title: "2. Open ScholarSaathi", desc: "Launch AI Chrome Side Panel" },
    { num: 3, title: "3. Ask Income Query", desc: 'Ask "What does annual family income mean?"' },
    { num: 4, title: "4. AI Explanation", desc: "Show natural AI field definition" },
    { num: 5, title: "5. Kannada Translation", desc: "Switch to ಕನ್ನಡ (Kannada) real-time" },
    { num: 6, title: "6. Autofill Profile", desc: 'Trigger "Fill using My Profile"' },
    { num: 7, title: "7. Field Highlight Glow", desc: "Inspect populated fields with glow" },
    { num: 8, title: "8. Upload Valid Doc", desc: "Upload Income Certificate & Verify" },
    { num: 9, title: "9. Catch Invalid Doc", desc: "Demonstrate Blurry / Bad format warning" },
    { num: 10, title: "10. Step 5 Review", desc: "Jump to Final Review & Audit" },
    { num: 11, title: "11. Approval Screen", desc: "Check user declaration & criteria" },
    { num: 12, title: "12. Explicit Confirm", desc: "Submit with student confirmation & confetti" },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[94%] bg-slate-900/95 dark:bg-slate-900/95 text-white backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-2xl p-2.5 transition-all">
      {/* Top Controller Bar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold tracking-tight">
                wHACKiest 2026 Presentation Tour
              </span>
              <span className="text-[10px] bg-violet-800/80 px-2 py-0.5 rounded-full text-violet-200 font-semibold">
                Step {currentDemoStep} of 12
              </span>
            </div>
            <p className="text-[11px] text-slate-300 hidden sm:block">
              {demoSteps[currentDemoStep - 1]?.desc}
            </p>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            disabled={currentDemoStep <= 1}
            onClick={() => onExecuteDemoStep(currentDemoStep - 1)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs"
            title="Previous Demo Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            disabled={currentDemoStep >= 12}
            onClick={() => onExecuteDemoStep(currentDemoStep + 1)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-xs font-bold flex items-center space-x-1 shadow-sm"
            title="Advance Demo Step"
          >
            <span>Next Demo Action</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 ml-1"
            title={isExpanded ? 'Collapse Tour Bar' : 'Expand Tour Bar'}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Quick Step Chips */}
      {isExpanded && (
        <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
          {demoSteps.map((s) => {
            const isDone = s.num < currentDemoStep;
            const isCurrent = s.num === currentDemoStep;
            return (
              <button
                key={s.num}
                onClick={() => onExecuteDemoStep(s.num)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors flex-shrink-0 flex items-center space-x-1 ${
                  isCurrent
                    ? 'bg-violet-600 text-white font-bold ring-2 ring-violet-400/50'
                    : isDone
                    ? 'bg-slate-800/80 text-emerald-400 hover:bg-slate-700'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {isDone && <Check className="w-3 h-3" />}
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
