import React, { useState } from 'react';
import { ScholarshipItem, StudentProfile } from '../types';
import { sampleScholarships } from '../data/mockData';
import { 
  Search, 
  Filter, 
  Award, 
  Calendar, 
  IndianRupee, 
  CheckCircle, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react';

interface DiscoverScholarshipsProps {
  studentProfile: StudentProfile;
  onApplyForScholarship: (scholarship: ScholarshipItem) => void;
  onAskAiAboutScholarship: (scholarship: ScholarshipItem) => void;
}

export const DiscoverScholarships: React.FC<DiscoverScholarshipsProps> = ({
  studentProfile,
  onApplyForScholarship,
  onAskAiAboutScholarship,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [maxIncomeFilter, setMaxIncomeFilter] = useState<number>(800000);
  const [activeModalScholarship, setActiveModalScholarship] = useState<ScholarshipItem | null>(null);

  // Filter scholarships
  const filteredList = sampleScholarships.filter((item) => {
    if (searchQuery) {
      const match =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.provider.toLowerCase().includes(searchQuery.toLowerCase());
      if (!match) return false;
    }
    if (selectedState !== 'All' && item.state !== 'All India' && item.state !== selectedState) {
      return false;
    }
    if (selectedCategory !== 'All' && !item.category.includes(selectedCategory) && !item.category.includes('General')) {
      return false;
    }
    if (item.maxIncome < maxIncomeFilter && maxIncomeFilter < 800000) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-violet-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-soft">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Match Engine: 4 Eligible Schemes for You</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Discover Government & Merit Scholarships
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100/80 mt-2 leading-relaxed">
            ScholarSaathi evaluates your profile (Karnataka Domicile, OBC Category, CGPA 8.74) to surface verified schemes with maximum financial awards and lowest barrier to entry.
          </p>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scheme name or ministry..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none"
            >
              <option value="All">All States (National)</option>
              <option value="Karnataka">Karnataka (SSP)</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="All India">All India Schemes</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none"
            >
              <option value="All">All Social Categories</option>
              <option value="OBC">OBC (Backward Classes)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="EWS">EWS (Economically Weaker)</option>
              <option value="General">General / Open</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-violet-300 dark:hover:border-violet-700 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Top Row: Provider & Match Badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 line-clamp-1">
                  {item.provider}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-200/80 dark:border-violet-800">
                  {item.matchPercentage}% Match
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                {item.description}
              </p>

              {/* Metrics Pills */}
              <div className="grid grid-cols-2 gap-2 my-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">Max Award Amount</span>
                  <span className="font-extrabold text-emerald-600 text-sm flex items-center">
                    {item.amount}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">Application Deadline</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    {item.deadline}
                  </span>
                </div>
              </div>

              {/* Eligibility checklist preview */}
              <div className="space-y-1 mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Key Criteria:
                </span>
                {item.eligibilityCriteria.slice(0, 2).map((crit, idx) => (
                  <p key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{crit}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setActiveModalScholarship(item)}
                className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
              >
                View Scheme Details
              </button>

              <button
                type="button"
                onClick={() => onApplyForScholarship(item)}
                className="flex-1 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all hover:scale-[1.02] flex items-center justify-center space-x-1"
              >
                <span>Apply with AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {activeModalScholarship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full shadow-float max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-600">
                  {activeModalScholarship.provider}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {activeModalScholarship.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalScholarship(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Financial Benefits:
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                  {activeModalScholarship.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Full Eligibility Requirements:
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                  {activeModalScholarship.eligibilityCriteria.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Mandatory Documents:
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
                  {activeModalScholarship.documentsRequired.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-2">
              <button
                onClick={() => setActiveModalScholarship(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = activeModalScholarship;
                  setActiveModalScholarship(null);
                  onApplyForScholarship(s);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              >
                Start Application Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
