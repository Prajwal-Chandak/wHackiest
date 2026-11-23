import React from 'react';
import { FormField } from './FormField';
import { StudentProfile } from '../types';
import { ArrowLeft, ArrowRight, Info, AlertCircle } from 'lucide-react';

interface Step2FamilyProps {
  data: StudentProfile;
  onChange: (field: keyof StudentProfile, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onAskAi: (fieldKey: string, fieldName: string) => void;
  highlightedFields: string[];
}

export const Step2Family: React.FC<Step2FamilyProps> = ({
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
            2
          </span>
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            Family & Income Information
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Government scholarships require accurate income and social category verification for fee concessions and quota benefits.
        </p>
      </div>

      {/* Helpful Tip Box */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-amber-900 dark:text-amber-200">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Income Verification Rule:</span> Annual family income must include earnings from all sources (agricultural, business, salary) of parents. You will need to upload an official Revenue/Tahsildar Income Certificate in Step 4.
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Father's / Guardian's Full Name"
          fieldKey="fatherName"
          value={data.fatherName}
          onChange={(v) => onChange('fatherName', v)}
          placeholder="e.g. Ramesh Sharma"
          isHighlighted={highlightedFields.includes('fatherName')}
          onAskAi={onAskAi}
        />

        <FormField
          label="Mother's Full Name"
          fieldKey="motherName"
          value={data.motherName}
          onChange={(v) => onChange('motherName', v)}
          placeholder="e.g. Sunita Sharma"
          isHighlighted={highlightedFields.includes('motherName')}
          onAskAi={onAskAi}
        />

        {/* Annual Family Income Field - Crucial demo point! */}
        <div className="relative">
          <FormField
            label="Annual Family Income (in INR)"
            fieldKey="annualIncome"
            value={data.annualIncome}
            onChange={(v) => {
              onChange('annualIncome', v);
              // auto format formatted string
              const num = parseInt(v.replace(/\D/g, '') || '0', 10);
              onChange('annualIncomeFormatted', num > 0 ? `₹${num.toLocaleString('en-IN')}` : '');
            }}
            placeholder="e.g. 180000"
            isHighlighted={highlightedFields.includes('annualIncome')}
            onAskAi={onAskAi}
            helperText={data.annualIncomeFormatted ? `Formatted: ${data.annualIncomeFormatted} per annum` : 'Enter combined gross family income'}
          />
        </div>

        <FormField
          label="Social Category / Reservation Group"
          fieldKey="category"
          value={data.category}
          onChange={(v) => onChange('category', v)}
          options={[
            { value: 'OBC (Category-3A)', label: 'OBC (Category-3A)' },
            { value: 'OBC (Category-2A)', label: 'OBC (Category-2A)' },
            { value: 'SC (Scheduled Caste)', label: 'SC (Scheduled Caste)' },
            { value: 'ST (Scheduled Tribe)', label: 'ST (Scheduled Tribe)' },
            { value: 'General-EWS', label: 'General - EWS (Economically Weaker Section)' },
            { value: 'General', label: 'General / Unreserved' },
          ]}
          isHighlighted={highlightedFields.includes('category')}
          onAskAi={onAskAi}
          helperText="As verified in state caste database / RD certificate"
        />

        <div className="md:col-span-2">
          <FormField
            label="Permanent Residential Address"
            fieldKey="address"
            value={data.address}
            onChange={(v) => onChange('address', v)}
            placeholder="House / Flat No., Street, Landmark, City, State - PIN Code"
            isHighlighted={highlightedFields.includes('address')}
            onAskAi={onAskAi}
            helperText="Address should match Aadhaar or Domicile Certificate"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 1</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all hover:translate-x-0.5"
        >
          <span>Continue to Academic Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
