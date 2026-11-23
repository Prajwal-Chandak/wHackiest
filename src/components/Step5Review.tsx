import React, { useState } from 'react';
import { StudentProfile, DocumentItem } from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowLeft, 
  FileText, 
  User, 
  Users, 
  GraduationCap, 
  Download, 
  RotateCcw,
  Sparkles,
  Lock,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Step5ReviewProps {
  studentProfile: StudentProfile;
  documents: DocumentItem[];
  onPrev: () => void;
  onEditStep: (stepNumber: number) => void;
  onTriggerAutofill: () => void;
}

export const Step5Review: React.FC<Step5ReviewProps> = ({
  studentProfile,
  documents,
  onPrev,
  onEditStep,
  onTriggerAutofill,
}) => {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<string>('');
  const [submissionDate, setSubmissionDate] = useState<string>('');

  // Validate missing fields
  const missingPersonal = !studentProfile.name || !studentProfile.email || !studentProfile.mobile;
  const missingFamily = !studentProfile.fatherName || !studentProfile.annualIncome;
  const missingAcademic = !studentProfile.universityRegNo || !studentProfile.previousCgpa;
  const missingDocs = documents.some((d) => !d.file || d.file.status !== 'verified');

  const hasIssues = missingPersonal || missingFamily || missingAcademic || missingDocs;

  const handleFinalSubmit = () => {
    setShowConfirmModal(false);
    const newId = `NSP-2026-KA-${Math.floor(100000 + Math.random() * 900000)}`;
    setApplicationId(newId);
    setSubmissionDate(new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }));
    setIsSubmitted(true);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#7C3AED', '#10B981', '#F59E0B'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center max-w-2xl mx-auto shadow-soft my-4 animate-slide-up">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 mx-auto flex items-center justify-center mb-4 ring-8 ring-emerald-50 dark:ring-emerald-900/30">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
          Submission Verified & Recorded
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mt-3">
          Application Submitted Successfully!
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
          Your application for the <strong>National Post-Matric Higher Education Scholarship FY 2026-27</strong> has been officially registered with the state verification nodals.
        </p>

        {/* Application Reference Badge */}
        <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 my-6 border border-slate-200 dark:border-slate-700 max-w-md mx-auto text-left">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-slate-500">Application Reference ID:</span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              {applicationId}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>Applicant:</span>
            <span className="font-semibold">{studentProfile.name}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mt-1">
            <span>Submission Timestamp:</span>
            <span>{submissionDate}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mt-1">
            <span>ScholarSaathi Audit:</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Pre-validated
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => alert(`Downloaded receipt for Application ${applicationId}`)}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Acknowledgment</span>
          </button>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setHasAgreed(false);
            }}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Form</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center">
            5
          </span>
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            Final Application Review & Pre-Submission Audit
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review all details carefully. ScholarSaathi has performed an automated compliance check on your information.
        </p>
      </div>

      {/* Validation Status Banner */}
      {hasIssues ? (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl p-4 flex items-start space-x-3 text-xs text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-1">
              Incomplete Information Detected
            </h4>
            <p className="text-amber-800 dark:text-amber-300">
              Some required fields or documents are still incomplete or unverified. You can use <strong>"Fill using My Profile"</strong> to populate missing data instantly for the demonstration.
            </p>
            <button
              onClick={onTriggerAutofill}
              className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px]"
            >
              <Sparkles className="w-3 h-3" />
              <span>Autofill Missing Data Now</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-4 flex items-center space-x-3 text-xs text-emerald-900 dark:text-emerald-200">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-emerald-900 dark:text-emerald-100">
              ScholarSaathi AI Compliance Check: 100% Passed
            </h4>
            <p className="text-emerald-800 dark:text-emerald-300 text-[11px]">
              All identity data, income brackets, university credentials, and 4/4 mandatory documents meet the state scholarship scheme guidelines.
            </p>
          </div>
        </div>
      )}

      {/* Section 1: Personal Details Summary */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              1. Personal & Identity Details
            </h3>
          </div>
          <button
            onClick={() => onEditStep(1)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Student Name</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {studentProfile.name || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Date of Birth</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {studentProfile.dob || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Gender</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {studentProfile.gender || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Mobile</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {studentProfile.mobile || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Email</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
              {studentProfile.email || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Domicile State</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {studentProfile.state || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Family Details Summary */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              2. Family & Income Details
            </h3>
          </div>
          <button
            onClick={() => onEditStep(2)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Father's Name</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {studentProfile.fatherName || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Mother's Name</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {studentProfile.motherName || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Annual Income</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {studentProfile.annualIncomeFormatted || `₹${studentProfile.annualIncome || '—'}`}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Social Category</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {studentProfile.category || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Section 3: Academic Details Summary */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              3. Academic Performance
            </h3>
          </div>
          <button
            onClick={() => onEditStep(3)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">College</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
              {studentProfile.college || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Registration / USN</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {studentProfile.universityRegNo || '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Previous Year CGPA</span>
            <span className="font-bold text-emerald-600">
              {studentProfile.previousCgpa ? `${studentProfile.previousCgpa} / 10.0` : '—'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Course & Year</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
              {studentProfile.course || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Section 4: Document Upload Status */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              4. Document Verification Checklist
            </h3>
          </div>
          <button
            onClick={() => onEditStep(4)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            Manage Docs
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {documents.map((doc) => {
            const isVerified = doc.file?.status === 'verified';
            return (
              <div
                key={doc.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700"
              >
                <span className="text-slate-700 dark:text-slate-300 font-medium truncate">
                  {doc.title}
                </span>
                {isVerified ? (
                  <span className="flex items-center text-emerald-600 text-[11px] font-semibold gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <span className="flex items-center text-rose-500 text-[11px] font-semibold gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> {doc.file?.status === 'rejected' ? 'Rejected' : 'Missing'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Explicit User Declaration Checkbox (Mandatory requirement: never auto-submit) */}
      <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900 rounded-2xl p-4">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={hasAgreed}
            onChange={(e) => setHasAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
          />
          <span className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
            I hereby certify that all information submitted above is true, complete, and authentic according to my college and government records. I acknowledge that ScholarSaathi is an assistant and final submission requires my conscious, explicit authorization.
          </span>
        </label>
      </div>

      {/* Navigation & Submit CTA */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Document Upload</span>
        </button>

        <button
          type="button"
          disabled={!hasAgreed}
          onClick={() => setShowConfirmModal(true)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-xs font-bold text-white shadow-md transition-all ${
            hasAgreed
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/20 hover:scale-[1.02]'
              : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-60'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Submit Scholarship Application</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 max-w-md w-full shadow-float animate-slide-up">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Confirm Final Submission?
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Are you sure you want to submit your application for <strong>{studentProfile.name}</strong> to the National Scholarship Portal?
            </p>

            <ul className="my-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
              <li>• Scheme: Post-Matric Higher Education 2026-27</li>
              <li>• CGPA: {studentProfile.previousCgpa}</li>
              <li>• Annual Income: {studentProfile.annualIncomeFormatted}</li>
              <li>• Documents: 4 of 4 attached</li>
            </ul>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              >
                Yes, Final Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
