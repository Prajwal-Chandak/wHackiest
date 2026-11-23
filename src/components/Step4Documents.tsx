import React, { useState } from 'react';
import { DocumentItem, DocumentKey } from '../types';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  Trash2, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  ShieldAlert,
  FileCheck2,
  UploadCloud
} from 'lucide-react';

interface Step4DocumentsProps {
  documents: DocumentItem[];
  onUploadSample: (docKey: DocumentKey, isValid: boolean) => void;
  onRemoveDoc: (docKey: DocumentKey) => void;
  onPreviewDoc: (doc: DocumentItem) => void;
  onNext: () => void;
  onPrev: () => void;
  onRunAiDocAudit: () => void;
  isAiAuditing: boolean;
}

export const Step4Documents: React.FC<Step4DocumentsProps> = ({
  documents,
  onUploadSample,
  onRemoveDoc,
  onPreviewDoc,
  onNext,
  onPrev,
  onRunAiDocAudit,
  isAiAuditing,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'verified' | 'issues'>('all');

  const verifiedCount = documents.filter((d) => d.file?.status === 'verified').length;
  const issueCount = documents.filter((d) => d.file?.status === 'rejected').length;
  const missingCount = documents.filter((d) => !d.file || d.file.status === 'missing').length;

  const filteredDocs = documents.filter((d) => {
    if (filterTab === 'verified') return d.file?.status === 'verified';
    if (filterTab === 'issues') return d.file?.status === 'rejected' || !d.file;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center">
              4
            </span>
            <h2 className="text-base font-bold text-slate-800 dark:text-white">
              Document Verification & Upload
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Upload clear digital copies. ScholarSaathi AI inspects file formats, validity, blurriness, and issuing authorities.
          </p>
        </div>

        {/* AI Audit Action */}
        <button
          type="button"
          onClick={onRunAiDocAudit}
          disabled={isAiAuditing}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] disabled:opacity-50"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isAiAuditing ? 'animate-spin' : ''}`} />
          <span>{isAiAuditing ? 'Scanning with ScholarSaathi...' : 'Scan & Validate with AI'}</span>
        </button>
      </div>

      {/* Summary Filter Pills (inspired by Reference Image 4) */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              filterTab === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All Required ({documents.length})
          </button>
          <button
            onClick={() => setFilterTab('verified')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              filterTab === 'verified'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
            }`}
          >
            Verified ({verifiedCount})
          </button>
          <button
            onClick={() => setFilterTab('issues')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              filterTab === 'issues'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'
            }`}
          >
            Needs Attention ({issueCount + missingCount})
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500">Status:</span>
          {missingCount === 0 && issueCount === 0 ? (
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" /> All 4 Documents Ready
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-amber-700 font-semibold bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="w-3.5 h-3.5" /> {missingCount} missing, {issueCount} rejected
            </span>
          )}
        </div>
      </div>

      {/* Grid of Document Cards (inspired by Reference Image 4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => {
          const file = doc.file;
          const isVerified = file?.status === 'verified';
          const isRejected = file?.status === 'rejected';
          const isPending = file?.status === 'pending';
          const isMissing = !file || file?.status === 'missing';

          return (
            <div
              key={doc.id}
              className={`rounded-2xl border p-4 transition-all flex flex-col justify-between ${
                isVerified
                  ? 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/80 shadow-xs'
                  : isRejected
                  ? 'bg-rose-50/40 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800/80 shadow-xs'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-xs'
              }`}
            >
              <div>
                {/* Top Row: Title & Status Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isVerified
                          ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600'
                          : isRejected
                          ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-600'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-snug">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">
                        Formats: {doc.acceptableFormats.join(', ')} • Max {doc.maxSizeMB}MB
                      </p>
                    </div>
                  </div>

                  {/* Status Pill Badge (Reference Image 4 style) */}
                  <div>
                    {isVerified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-900/70 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    )}
                    {isRejected && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-rose-100 dark:bg-rose-900/70 text-rose-800 dark:text-rose-200 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                        <XCircle className="w-3 h-3 text-rose-600" />
                        Rejected
                      </span>
                    )}
                    {isPending && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-100 dark:bg-amber-900/70 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                        Pending
                      </span>
                    )}
                    {isMissing && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                        Missing
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                  {doc.description}
                </p>

                {/* Uploaded File Info Card */}
                {file && (
                  <div
                    className={`rounded-xl p-3 mb-3 border text-xs flex items-center justify-between ${
                      isVerified
                        ? 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-800'
                        : isRejected
                        ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileCheck2
                        className={`w-4 h-4 flex-shrink-0 ${
                          isVerified ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      />
                      <div className="truncate">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {file.size} • {file.uploadedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 pl-2">
                      <button
                        type="button"
                        onClick={() => onPreviewDoc(doc)}
                        title="Preview Document"
                        className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveDoc(doc.key)}
                        title="Remove file"
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Warning message if rejected */}
                {isRejected && file?.issue && (
                  <div className="bg-rose-100/70 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-900 rounded-xl p-2.5 mb-3 flex items-start space-x-2 text-xs text-rose-800 dark:text-rose-300">
                    <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-rose-900 dark:text-rose-200">
                        ScholarSaathi Flag:
                      </strong>
                      <span>{file.issue}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons for Demonstration */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-1.5">
                  {/* Quick Upload Sample (Valid) */}
                  <button
                    type="button"
                    onClick={() => onUploadSample(doc.key, true)}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                  >
                    + Sample Valid Doc
                  </button>

                  {/* Upload Invalid (Demo error detection) */}
                  <button
                    type="button"
                    onClick={() => onUploadSample(doc.key, false)}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors"
                  >
                    + Test Invalid / Blurry
                  </button>
                </div>

                {/* File picker */}
                <label className="cursor-pointer inline-flex items-center space-x-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 underline">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Browse Device</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        onUploadSample(doc.key, true);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Academic Details</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all hover:translate-x-0.5"
        >
          <span>Continue to Final Review</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
