import React from 'react';
import { Clock, CheckCircle2, AlertCircle, FileText, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const applications = [
    {
      id: "NSP-2026-KA-492019",
      scheme: "Post-Matric Scholarship for Minorities & OBCs 2026-27",
      submittedOn: "20 Nov 2026",
      amount: "₹50,000",
      currentStage: 2, // 0: Submitted, 1: College Verified, 2: District Nodal Officer, 3: DBT Disbursal
      stages: [
        { label: "Application Submitted", date: "20 Nov 2026", status: "completed" },
        { label: "College Level Verification", date: "21 Nov 2026", status: "completed" },
        { label: "District Nodal Officer (DNO) Audit", date: "In Progress", status: "current" },
        { label: "Aadhaar DBT Disbursal (PFMS)", date: "Estimated 15 Dec 2026", status: "pending" },
      ],
      remarks: "College verified Bonafide and Marks transcripts. Awaiting state quota approval.",
      badge: "In Progress",
    },
    {
      id: "SSP-2025-KA-119284",
      scheme: "Karnataka State SSP Merit Assistance 2025-26",
      submittedOn: "14 Oct 2025",
      amount: "₹45,000",
      currentStage: 3,
      stages: [
        { label: "Application Submitted", date: "14 Oct 2025", status: "completed" },
        { label: "College Verification", date: "18 Oct 2025", status: "completed" },
        { label: "Taluk Welfare Officer Approval", date: "02 Nov 2025", status: "completed" },
        { label: "Direct DBT Disbursal into SBI A/c", date: "12 Dec 2025", status: "completed" },
      ],
      remarks: "₹45,000 successfully credited to SBI A/c ending in 1054 via Aadhaar DBT.",
      badge: "Disbursed",
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <span>Scholarship Application Tracker</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time Direct Benefit Transfer (DBT) and verification pipeline tracking.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {app.id}
                </span>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {app.scheme}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {app.amount}
                </span>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                  app.badge === 'Disbursed' 
                    ? 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                }`}>
                  {app.badge}
                </span>
              </div>
            </div>

            {/* Timeline Stepper */}
            <div className="py-5">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {app.stages.map((stg, i) => {
                  const isDone = stg.status === 'completed';
                  const isCurr = stg.status === 'current';
                  return (
                    <div key={i} className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isDone
                              ? 'bg-emerald-500 text-white'
                              : isCurr
                              ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950 animate-pulse'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                          }`}
                        >
                          {isDone ? '✓' : i + 1}
                        </div>
                        <span className={`text-xs font-semibold ${isCurr ? 'text-indigo-600 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                          Step {i + 1}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-2 leading-snug">
                        {stg.label}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1">
                        {stg.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Remarks */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span>
                  <strong>Latest Nodal Update:</strong> {app.remarks}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
