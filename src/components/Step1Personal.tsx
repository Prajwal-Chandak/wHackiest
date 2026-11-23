import React from 'react';
import { FormField } from './FormField';
import { StudentProfile } from '../types';
import { ArrowRight, UserCheck, Sparkles } from 'lucide-react';

interface Step1PersonalProps {
  data: StudentProfile;
  onChange: (field: keyof StudentProfile, value: string) => void;
  onNext: () => void;
  onAskAi: (fieldKey: string, fieldName: string) => void;
  highlightedFields: string[];
  onTriggerAutofill: () => void;
}

export const Step1Personal: React.FC<Step1PersonalProps> = ({
  data,
  onChange,
  onNext,
  onAskAi,
  highlightedFields,
  onTriggerAutofill,
}) => {
  const isFilled = Boolean(data.name && data.email && data.mobile && data.college);

  return (
    <div className="space-y-6">
      {/* Step Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h2 className="text-base font-bold text-slate-800 dark:text-white">
              Student Personal & Identity Details
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enter your basic identity and current higher education enrollment details as registered with your college.
          </p>
        </div>

        {!isFilled && (
          <button
            type="button"
            onClick={onTriggerAutofill}
            className="self-start sm:self-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-semibold hover:bg-violet-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>Fast-fill with Profile</span>
          </button>
        )}
      </div>

      {/* Grid of Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          label="Student Full Name"
          fieldKey="name"
          value={data.name}
          onChange={(v) => onChange('name', v)}
          placeholder="e.g. Aarav Sharma"
          isHighlighted={highlightedFields.includes('name')}
          onAskAi={onAskAi}
          helperText="As printed on SSLC / Class 10th marks card"
        />

        <FormField
          label="Date of Birth"
          fieldKey="dob"
          type="date"
          value={data.dob}
          onChange={(v) => onChange('dob', v)}
          isHighlighted={highlightedFields.includes('dob')}
          onAskAi={onAskAi}
        />

        <FormField
          label="Gender"
          fieldKey="gender"
          value={data.gender}
          onChange={(v) => onChange('gender', v)}
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other / Non-Binary' },
          ]}
          isHighlighted={highlightedFields.includes('gender')}
          onAskAi={onAskAi}
        />

        <FormField
          label="Mobile Number"
          fieldKey="mobile"
          value={data.mobile}
          onChange={(v) => onChange('mobile', v)}
          placeholder="+91 98765 43210"
          isHighlighted={highlightedFields.includes('mobile')}
          onAskAi={onAskAi}
          helperText="Must be linked to your Aadhaar for OTP verification"
        />

        <FormField
          label="Email Address"
          fieldKey="email"
          type="email"
          value={data.email}
          onChange={(v) => onChange('email', v)}
          placeholder="student@example.com"
          isHighlighted={highlightedFields.includes('email')}
          onAskAi={onAskAi}
          helperText="All scholarship notifications will be sent here"
        />

        <FormField
          label="Domicile State"
          fieldKey="state"
          value={data.state}
          onChange={(v) => onChange('state', v)}
          options={[
            { value: 'Karnataka', label: 'Karnataka' },
            { value: 'Maharashtra', label: 'Maharashtra' },
            { value: 'Tamil Nadu', label: 'Tamil Nadu' },
            { value: 'Telangana', label: 'Telangana' },
            { value: 'Delhi', label: 'Delhi NCR' },
            { value: 'Other', label: 'Other State' },
          ]}
          isHighlighted={highlightedFields.includes('state')}
          onAskAi={onAskAi}
        />

        <div className="md:col-span-2">
          <FormField
            label="College / Institution Name"
            fieldKey="college"
            value={data.college}
            onChange={(v) => onChange('college', v)}
            placeholder="e.g. Bangalore Institute of Technology, Bengaluru"
            isHighlighted={highlightedFields.includes('college')}
            onAskAi={onAskAi}
            helperText="AISHE affiliated institution name"
          />
        </div>

        <FormField
          label="Current Degree / Course"
          fieldKey="course"
          value={data.course}
          onChange={(v) => onChange('course', v)}
          placeholder="e.g. B.Tech Computer Science"
          isHighlighted={highlightedFields.includes('course')}
          onAskAi={onAskAi}
        />

        <FormField
          label="Current Year of Study"
          fieldKey="currentYear"
          value={data.currentYear}
          onChange={(v) => onChange('currentYear', v)}
          placeholder="e.g. 3rd Year (5th Semester)"
          isHighlighted={highlightedFields.includes('currentYear')}
          onAskAi={onAskAi}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs text-slate-400">
          Step 1 of 5 • Personal Details
        </span>

        <button
          type="button"
          onClick={onNext}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all hover:translate-x-0.5"
        >
          <span>Continue to Family Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
