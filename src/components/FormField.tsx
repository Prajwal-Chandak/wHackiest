import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

interface FormFieldProps {
  label: string;
  fieldKey: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  isHighlighted?: boolean;
  onAskAi: (fieldKey: string, fieldName: string) => void;
  helperText?: string;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  fieldKey,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = true,
  options,
  isHighlighted = false,
  onAskAi,
  helperText,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col space-y-1.5 text-left">
      {/* Label & AI Helper Trigger */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1">
          <span>{label}</span>
          {required && <span className="text-rose-500 font-bold">*</span>}
        </label>

        {/* AI Field Explainer Button */}
        <button
          type="button"
          onClick={() => onAskAi(fieldKey, label)}
          title={`Ask ScholarSaathi to explain "${label}"`}
          className="group inline-flex items-center space-x-1 text-[11px] font-medium text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 bg-violet-50 dark:bg-violet-950/60 hover:bg-violet-100 dark:hover:bg-violet-900/60 px-2 py-0.5 rounded-md transition-all border border-violet-200/60 dark:border-violet-800/60"
        >
          <Sparkles className="w-3 h-3 text-violet-500 group-hover:rotate-12 transition-transform" />
          <span>Ask AI</span>
        </button>
      </div>

      {/* Input or Select */}
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 ${
            isHighlighted
              ? 'ring-2 ring-violet-500 border-violet-500 bg-violet-50/50 dark:bg-violet-950/40'
              : 'border-slate-300 dark:border-slate-700'
          }`}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 ${
            isHighlighted
              ? 'ring-2 ring-violet-500 border-violet-500 bg-violet-50/50 dark:bg-violet-950/40 animate-pulse'
              : 'border-slate-300 dark:border-slate-700'
          }`}
        />
      )}

      {helperText && (
        <p className="text-[10px] text-slate-400 dark:text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
