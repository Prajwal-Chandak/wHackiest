import React from 'react';
import { DocumentItem } from '../types';
import { X, FileText, CheckCircle2, ShieldCheck, Download, Printer } from 'lucide-react';

interface DocumentPreviewModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  onClose,
}) => {
  if (!document || !document.file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full shadow-float animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                {document.file.name}
              </h3>
              <p className="text-[10px] text-slate-400">
                Uploaded: {document.file.uploadedAt} • Size: {document.file.size}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mock Certificate Canvas Preview */}
        <div className="my-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden">
          <div className="border-4 border-double border-indigo-200 dark:border-indigo-900/60 p-4 rounded-xl bg-white dark:bg-slate-900 shadow-inner">
            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Government of Karnataka / Educational Board
            </div>
            <h4 className="text-sm font-extrabold text-indigo-900 dark:text-indigo-300 mt-1 uppercase">
              {document.title}
            </h4>
            <div className="w-12 h-0.5 bg-indigo-500 mx-auto my-2" />
            
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs mx-auto leading-relaxed">
              This digital document has been verified by <strong>ScholarSaathi Automated Compliance Engine</strong>.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-[10px] text-slate-500">
              <span>Security Stamp: VERIFIED</span>
              <span>•</span>
              <span>Signature: Digital PKI</span>
            </div>
          </div>

          {/* Validation Seal */}
          <div className="flex items-center justify-center space-x-1.5 text-xs text-emerald-600 font-semibold pt-1">
            <ShieldCheck className="w-4 h-4" />
            <span>ScholarSaathi OCR Confidence: 99.4%</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
