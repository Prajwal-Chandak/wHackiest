import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Bell, 
  HelpCircle, 
  Compass, 
  FileText, 
  Clock, 
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { StudentProfile } from '../types';

interface PortalHeaderProps {
  activeView: 'portal' | 'discover' | 'tracker';
  onChangeView: (view: 'portal' | 'discover' | 'tracker') => void;
  completionPercentage: number;
  onTriggerAutofill: () => void;
  studentProfile: StudentProfile;
  isAutofilling: boolean;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  activeView,
  onChangeView,
  completionPercentage,
  onTriggerAutofill,
  studentProfile,
  isAutofilling,
}) => {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-20">
      {/* Top Demo Disclaimer Ribbon */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[11px] font-medium py-1 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            <strong>DEMO PORTAL:</strong> Simulated prototype for <strong>wHACKiest 2026 Ideathon</strong> (Track: Beyond the Browser). Powered by ScholarSaathi AI.
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-3 text-[10px] tracking-wide uppercase font-semibold">
          <span>Academic Year 2026-27</span>
          <span>•</span>
          <span className="bg-white/20 px-2 py-0.5 rounded">Mock Government Scheme</span>
        </div>
      </div>

      {/* Main Government Portal Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Emblem & Portal Identity */}
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col items-center justify-center shadow-md p-1 border border-indigo-400/20">
            {/* Ashoka Chakra / Gov Emblem Stylized Icon */}
            <Building2 className="w-6 h-6 text-amber-300" />
            <span className="text-[8px] tracking-widest font-extrabold text-amber-200 mt-0.5">NSP</span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                National Scholarship Portal
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 uppercase">
                Demo
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Department of Higher Education & Backward Classes Welfare • Fresh Application FY 2026–27
            </p>
          </div>
        </div>

        {/* Action Controls & Student Status */}
        <div className="flex items-center space-x-3">
          {/* Autofill with ScholarSaathi CTA Button */}
          <button
            onClick={onTriggerAutofill}
            disabled={isAutofilling}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <Zap className={`w-3.5 h-3.5 text-amber-300 ${isAutofilling ? 'animate-spin' : ''}`} />
            <span>{isAutofilling ? 'Autofilling with AI...' : 'Fill using My Profile'}</span>
          </button>

          {/* Completion Meter */}
          <div className="hidden lg:flex flex-col items-end pr-2 border-r border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Form Completion: <strong className="text-slate-800 dark:text-white">{completionPercentage}%</strong>
            </span>
            <div className="w-28 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-200 dark:border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Applicant Avatar & Details */}
          <div className="flex items-center space-x-2 pl-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
              {studentProfile.name ? studentProfile.name.charAt(0) : 'A'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                {studentProfile.name || 'Aarav Sharma'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                USN: {studentProfile.universityRegNo || '1BI22CS042'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <nav className="bg-slate-50/80 dark:bg-slate-850 border-t border-slate-200/80 dark:border-slate-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-4 overflow-x-auto py-1">
          <button
            onClick={() => onChangeView('portal')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeView === 'portal'
                ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Scholarship Application Form</span>
          </button>

          <button
            onClick={() => onChangeView('discover')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeView === 'discover'
                ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Discover Schemes (4 Matches)</span>
          </button>

          <button
            onClick={() => onChangeView('tracker')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeView === 'tracker'
                ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Track Application Status</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
