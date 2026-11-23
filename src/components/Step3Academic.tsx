import React from 'react';
import { FormField } from './FormField';
import { StudentProfile } from '../types';
import { ArrowLeft, ArrowRight, Award } from 'lucide-react';

interface Step3AcademicProps {
  data: StudentProfile;
  onChange: (field: keyof StudentProfile, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onAskAi: (fieldKey: string, fieldName: string) => void;
  highlightedFields: string[];
}

export const Step3Academic: React.FC<Step3AcademicProps> = ({
  data,
  onChange,
  onNext,
  onPrev,
  onAskAi,
  highlightedFields,
}) => {
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center">
            3
          </span>
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            Academic Performance & University Enrollment
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Merit-cum-means scholarships evaluate your academic record, CGPA, and official university registration number.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <FormField
            label="College / Institution Name"
            fieldKey="college"
            value={data.college}
            onChange={(v) => onChange('college', v)}
            placeholder="e.g. Bangalore Institute of Technology, Bengaluru"
            isHighlighted={highlightedFields.includes('college')}
            onAskAi={onAskAi}
            helperText="Auto-synchronized from Personal Details"
          />
        </div>

        <FormField
          label="University Registration Number / USN"
          fieldKey="universityRegNo"
          value={data.universityRegNo}
          onChange={(v) => onChange('universityRegNo', v)}
          placeholder="e.g. 1BI22CS042"
          isHighlighted={highlightedFields.includes('universityRegNo')}
          onAskAi={onAskAi}
          helperText="Alphanumeric number assigned by University (VTU/University Roll No)"
        />

        <FormField
          label="Previous Academic Year CGPA"
          fieldKey="previousCgpa"
          value={data.previousCgpa}
          onChange={(v) => onChange('previousCgpa', v)}
          placeholder="e.g. 8.74"
          isHighlighted={highlightedFields.includes('previousCgpa')}
          onAskAi={onAskAi}
          helperText="Out of 10.0 scale. Minimum 6.0 required for merit schemes"
        />

        <FormField
          label="Course / Program Name"
          fieldKey="course"
          value={data.course}
          onChange={(v) => onChange('course', v)}
          placeholder="e.g. B.Tech Computer Science & Engineering"
          isHighlighted={highlightedFields.includes('course')}
          onAskAi={onAskAi}
        />

        <FormField
          label="Current Academic Session"
          fieldKey="academicYear"
          value={data.academicYear}
          onChange={(v) => onChange('academicYear', v)}
          options={[
            { value: '2025-2026', label: '2025-2026 (Current Academic Year)' },
            { value: '2026-2027', label: '2026-2027 (Upcoming Cycle)' },
          ]}
          isHighlighted={highlightedFields.includes('academicYear')}
          onAskAi={onAskAi}
        />
      </div>

      {/* Merit Highlight Card */}
      {parseFloat(data.previousCgpa || '0') >= 7.5 && (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3.5 flex items-center space-x-3 text-xs text-emerald-800 dark:text-emerald-200">
          <Award className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <span className="font-semibold">Merit Tier Qualified:</span> Your CGPA of {data.previousCgpa} qualifies you for Tier-1 Merit Schemes including AICTE Technical Excellence and State Top 10% Fee Waiver scholarships!
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Family Details</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all hover:translate-x-0.5"
        >
          <span>Continue to Document Upload</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
