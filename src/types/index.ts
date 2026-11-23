export type Language = 'en' | 'kn' | 'hi';

export interface StudentProfile {
  name: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  state: string;
  college: string;
  course: string;
  currentYear: string;
  fatherName: string;
  motherName: string;
  annualIncome: string; // e.g. "180000"
  annualIncomeFormatted: string; // e.g. "₹1,80,000"
  category: string; // "OBC", "SC", "ST", "General-EWS", "General"
  address: string;
  universityRegNo: string;
  previousCgpa: string;
  academicYear: string;
  aadhaarSeededBank: string;
  bankAccountNumber: string;
  ifscCode: string;
}

export type DocumentKey = 'studentId' | 'incomeCert' | 'marksCard' | 'bankPassbook';

export interface UploadedFile {
  name: string;
  size: string;
  type: string;
  status: 'verified' | 'rejected' | 'pending' | 'missing';
  issue?: string;
  uploadedAt: string;
  previewUrl?: string;
}

export interface DocumentItem {
  id: string;
  key: DocumentKey;
  title: string;
  description: string;
  required: boolean;
  acceptableFormats: string[];
  maxSizeMB: number;
  sampleExpectedDoc: string;
  file: UploadedFile | null;
}

export interface ScholarshipItem {
  id: string;
  title: string;
  provider: string;
  badge: string;
  amount: string;
  amountNumber: number;
  deadline: string;
  category: string[];
  minCgpa: number;
  maxIncome: number;
  courses: string[];
  state: string;
  matchPercentage: number;
  description: string;
  benefits: string[];
  eligibilityCriteria: string[];
  documentsRequired: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  fieldKey?: string;
  actions?: {
    label: string;
    actionType: 'autofill' | 'explain' | 'goto_step' | 'check_docs' | 'apply_filter';
    payload?: any;
  }[];
  language: Language;
}

export interface FieldHelpContent {
  fieldKey: string;
  fieldName: string;
  step: number;
  explanation: {
    en: string;
    kn: string;
    hi: string;
  };
  tips: {
    en: string;
    kn: string;
    hi: string;
  };
  requiredDoc?: string;
}
