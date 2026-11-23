import React from 'react';
import { 
  ShieldCheck, 
  RotateCw, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Layout, 
  PanelRightClose, 
  PanelRightOpen, 
  Moon, 
  Sun,
  User,
  Compass
} from 'lucide-react';

interface ChromeBrowserFrameProps {
  children: React.ReactNode;
  isSidePanelOpen: boolean;
  onToggleSidePanel: () => void;
  activeView: 'portal' | 'discover' | 'tracker';
  onChangeView: (view: 'portal' | 'discover' | 'tracker') => void;
  onOpenProfile: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ChromeBrowserFrame: React.FC<ChromeBrowserFrameProps> = ({
  children,
  isSidePanelOpen,
  onToggleSidePanel,
  activeView,
  onChangeView,
  onOpenProfile,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const getUrl = () => {
    switch (activeView) {
      case 'portal':
        return 'https://scholarships.gov.in/portal/fresh-application-2026-27';
      case 'discover':
        return 'https://scholarships.gov.in/portal/discover-schemes';
      case 'tracker':
        return 'https://scholarships.gov.in/portal/track-status';
      default:
        return 'https://scholarships.gov.in/portal';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-800'}`}>
      {/* Top Chrome Browser Shell */}
      <div className="bg-slate-200/90 dark:bg-slate-900 border-b border-slate-300/80 dark:border-slate-800 select-none">
        {/* Chrome Tab Bar */}
        <div className="flex items-center justify-between px-3 pt-2">
          {/* Tabs */}
          <div className="flex items-center space-x-1 max-w-2xl overflow-x-auto">
            {/* Window Dots (mac/modern browser style) */}
            <div className="flex items-center space-x-1.5 mr-3 pl-1">
              <span className="w-3 h-3 rounded-full bg-rose-400 hover:bg-rose-500 transition-colors shadow-sm inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400 hover:bg-amber-500 transition-colors shadow-sm inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400 hover:bg-emerald-500 transition-colors shadow-sm inline-block"></span>
            </div>

            {/* Main Active Tab */}
            <div className="flex items-center bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-3.5 py-1.5 rounded-t-lg shadow-sm border-t border-x border-slate-300/60 dark:border-slate-700 text-xs font-medium space-x-2 max-w-xs truncate">
              <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-[9px] font-bold">
                SS
              </span>
              <span className="truncate">
                {activeView === 'portal' ? 'National Scholarship Portal 2026' : activeView === 'discover' ? 'Find Scholarships' : 'Application Tracking'}
              </span>
              <span className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 ml-1 text-sm font-semibold">×</span>
            </div>

            {/* Quick Tab: Discover */}
            <button
              onClick={() => onChangeView('discover')}
              className={`flex items-center px-3 py-1 rounded-t text-xs font-medium space-x-1.5 transition-colors ${
                activeView === 'discover'
                  ? 'bg-white/80 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-300/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Discover Schemes</span>
            </button>
          </div>

          {/* Quick Controls in Tab Bar */}
          <div className="flex items-center space-x-1.5 pb-1 text-xs">
            {/* Ideathon Badge */}
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
              <Sparkles className="w-3 h-3 text-violet-600 dark:text-violet-400" />
              wHACKiest 2026 Ideathon
            </span>

            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Chrome Navigation & Omnibox Bar */}
        <div className="bg-white dark:bg-slate-850 px-3 py-1.5 flex items-center space-x-2 border-b border-slate-200/80 dark:border-slate-800">
          {/* Back / Forward / Refresh */}
          <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
            <button
              onClick={() => onChangeView('portal')}
              title="Back"
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
              disabled={activeView === 'portal'}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onChangeView('discover')}
              title="Forward"
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
              disabled={activeView === 'discover'}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => window.location.reload()}
              title="Reload Page"
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Omnibox / URL Bar */}
          <div className="flex-1 max-w-3xl flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-full px-3 py-1 text-xs text-slate-700 dark:text-slate-300 shadow-inner">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0" />
            <span className="text-slate-400 dark:text-slate-500 mr-0.5">https://</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">scholarships.gov.in</span>
            <span className="text-slate-500 dark:text-slate-400 truncate">
              {activeView === 'portal' ? '/portal/fresh-application-2026-27' : activeView === 'discover' ? '/portal/discover-schemes' : '/portal/track-status'}
            </span>
            <span className="ml-auto text-[10px] bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-medium px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              Verified Gov Portal
            </span>
          </div>

          {/* Extension Toolbar & Side Panel Toggle */}
          <div className="flex items-center space-x-2 pl-2">
            {/* Student Profile Button */}
            <button
              onClick={onOpenProfile}
              title="View Student Profile Vault"
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden md:inline">Profile</span>
            </button>

            {/* Primary Extension Action: ScholarSaathi Side Panel Button */}
            <button
              onClick={onToggleSidePanel}
              title={isSidePanelOpen ? 'Collapse ScholarSaathi Side Panel' : 'Open ScholarSaathi Side Panel'}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-sm ${
                isSidePanelOpen
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-violet-500/20 ring-2 ring-violet-400/40'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-violet-400'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white animate-spin-slow" />
              </div>
              <span className="font-semibold">ScholarSaathi</span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isSidePanelOpen ? (
                <PanelRightClose className="w-3.5 h-3.5 ml-1 opacity-80" />
              ) : (
                <PanelRightOpen className="w-3.5 h-3.5 ml-1 opacity-80" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};
