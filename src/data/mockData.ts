import { StudentProfile, DocumentItem, ScholarshipItem, FieldHelpContent } from '../types';

export const defaultStudentProfile: StudentProfile = {
  name: "Aarav Sharma",
  dob: "2004-05-14",
  gender: "Male",
  mobile: "+91 98765 43210",
  email: "aarav.sharma24@gmail.com",
  state: "Karnataka",
  college: "Bangalore Institute of Technology, Bengaluru",
  course: "B.Tech Computer Science & Engineering",
  currentYear: "3rd Year (5th Semester)",
  fatherName: "Ramesh Sharma",
  motherName: "Sunita Sharma",
  annualIncome: "180000",
  annualIncomeFormatted: "₹1,80,000",
  category: "OBC (Category-3A)",
  address: "#42, 5th Cross, 8th Main, Malleshwaram, Bengaluru, Karnataka - 560003",
  universityRegNo: "1BI22CS042",
  previousCgpa: "8.74",
  academicYear: "2025-2026",
  aadhaarSeededBank: "State Bank of India (Malleshwaram Branch)",
  bankAccountNumber: "38947291054",
  ifscCode: "SBIN0001824",
};

export const emptyStudentProfile: StudentProfile = {
  name: "",
  dob: "",
  gender: "",
  mobile: "",
  email: "",
  state: "",
  college: "",
  course: "",
  currentYear: "",
  fatherName: "",
  motherName: "",
  annualIncome: "",
  annualIncomeFormatted: "",
  category: "",
  address: "",
  universityRegNo: "",
  previousCgpa: "",
  academicYear: "",
  aadhaarSeededBank: "",
  bankAccountNumber: "",
  ifscCode: "",
};

export const defaultDocuments: DocumentItem[] = [
  {
    id: "doc-1",
    key: "studentId",
    title: "College Student ID Card",
    description: "Official ID card issued by current educational institution with seal and valid academic year.",
    required: true,
    acceptableFormats: ["PDF", "JPG", "PNG"],
    maxSizeMB: 2,
    sampleExpectedDoc: "Student_ID_BIT_2025_26.pdf",
    file: null,
  },
  {
    id: "doc-2",
    key: "incomeCert",
    title: "Family Income Certificate",
    description: "Income certificate issued by Tahsildar / Revenue Authority (valid within 3 financial years).",
    required: true,
    acceptableFormats: ["PDF"],
    maxSizeMB: 2,
    sampleExpectedDoc: "Income_Cert_Tahsildar_BLR_2025.pdf",
    file: null,
  },
  {
    id: "doc-3",
    key: "marksCard",
    title: "Previous Year Marks Card / Transcript",
    description: "Attested semester grade sheets / marks cards of previous completed academic year.",
    required: true,
    acceptableFormats: ["PDF"],
    maxSizeMB: 5,
    sampleExpectedDoc: "Marksheet_Sem3_Sem4_Consolidated.pdf",
    file: null,
  },
  {
    id: "doc-4",
    key: "bankPassbook",
    title: "Bank Passbook / Cancelled Cheque",
    description: "First page showing student's name, active account number, IFSC code, and Aadhaar seed confirmation.",
    required: true,
    acceptableFormats: ["PDF", "JPG", "PNG"],
    maxSizeMB: 2,
    sampleExpectedDoc: "SBI_Passbook_AadhaarSeeded.pdf",
    file: null,
  },
];

export const fieldHelpDatabase: Record<string, FieldHelpContent> = {
  annualIncome: {
    fieldKey: "annualIncome",
    fieldName: "Annual Family Income",
    step: 2,
    explanation: {
      en: "Annual family income is the total income earned by all earning members of your family in one year (parents or legal guardians).",
      kn: "ವಾರ್ಷಿಕ ಕುಟುಂಬದ ಆದಾಯವೆಂದರೆ ಒಂದು ವರ್ಷದಲ್ಲಿ ನಿಮ್ಮ ಕುಟುಂಬದ ಎಲ್ಲಾ ದುಡಿಯುವ ಸದಸ್ಯರು (ತಂದೆ, ತಾಯಿ ಅಥವಾ ಪಾಲಕರು) ಗಳಿಸಿದ ಒಟ್ಟು ಆದಾಯವಾಗಿದೆ.",
      hi: "वार्षिक पारिवारिक आय का अर्थ है एक वर्ष में आपके परिवार के सभी कमाने वाले सदस्यों (माता-पिता या अभिभावक) द्वारा अर्जित कुल आय।",
    },
    tips: {
      en: "Make sure this matches the exact figure printed on your official Tahsildar Income Certificate. Many schemes set an upper cap of ₹2,50,000.",
      kn: "ಈ ಮೊತ್ತವು ತಹಶೀಲ್ದಾರ್ ನೀಡಿದ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರದಲ್ಲಿರುವ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ನಿಖರವಾಗಿ ಹೊಂದಿಕೆಯಾಗಬೇಕು. ಬಹುತೇಕ ಯೋಜನೆಗಳಲ್ಲಿ ಗರಿಷ್ಠ ಮಿತಿ ₹2,50,000 ಆಗಿದೆ.",
      hi: "यह राशि आपके राजस्व विभाग द्वारा जारी आय प्रमाण पत्र में दर्ज राशि से पूरी तरह मेल खानी चाहिए। अधिकांश योजनाओं में अधिकतम सीमा ₹2,50,000 होती है।",
    },
    requiredDoc: "Income Certificate issued by Revenue Authority",
  },
  universityRegNo: {
    fieldKey: "universityRegNo",
    fieldName: "University Registration Number / USN",
    step: 3,
    explanation: {
      en: "The permanent alphanumeric registration number assigned to you by your university (e.g. VTU USN or Roll Number).",
      kn: "ನಿಮ್ಮ ವಿಶ್ವವಿದ್ಯಾಲಯವು ನಿಮಗೆ ನಿಗದಿಪಡಿಸಿದ ಶಾಶ್ವತ ನೋಂದಣಿ ಸಂಖ್ಯೆ (ಉದಾ: VTU USN ಅಥವಾ ರೋಲ್ ನಂಬರ್).",
      hi: "आपकी यूनिवर्सिटी द्वारा प्रदान किया गया स्थायी पंजीकरण क्रमांक (जैसे रोल नंबर या USN)।",
    },
    tips: {
      en: "Do not enter your temporary college admission number. Use the official examination registration number.",
      kn: "ಕಾಲೇಜಿನ ತಾತ್ಕಾಲಿಕ ಪ್ರವೇಶ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಬೇಡಿ. ಪರೀಕ್ಷಾ ನೋಂದಣಿ ಸಂಖ್ಯೆಯನ್ನೇ ಬಳಸಿ.",
      hi: "कॉलेज का अस्थायी प्रवेश नंबर न लिखें, परीक्षा प्रवेश पत्र वाला आधिकारिक नंबर ही दर्ज करें।",
    },
  },
  previousCgpa: {
    fieldKey: "previousCgpa",
    fieldName: "Previous Year CGPA",
    step: 3,
    explanation: {
      en: "Cumulative Grade Point Average across both semesters of the previous academic year on a 10-point scale.",
      kn: "ಹಿಂದಿನ ಶೈಕ್ಷಣಿಕ ವರ್ಷದ ಎರಡೂ ಸೆಮಿಸ್ಟರ್‌ಗಳ ಸಂಚಿತ ಗ್ರೇಡ್ ಪಾಯಿಂಟ್ ಸರಾಸರಿ (CGPA 10-ಪಾಯಿಂಟ್ ಸ್ಕೇಲ್‌ನಲ್ಲಿ).",
      hi: "पिछले शैक्षणिक वर्ष के दोनों सेमेस्टरों का संचयी ग्रेड प्वाइंट औसत (CGPA 10-पॉइंट स्केल पर)।",
    },
    tips: {
      en: "If your institution uses percentage, convert using: Percentage / 9.5 or your university's official formula.",
      kn: "ನಿಮ್ಮ ಸಂಸ್ಥೆ ಶೇಕಡಾವಾರು ನೀಡಿದರೆ, ಅಧಿಕೃತ ಸೂತ್ರದ ಪ್ರಕಾರ CGPA ಗೆ ಪರಿವರ್ತಿಸಿ ನಮೂದಿಸಿ.",
      hi: "यदि परिणाम प्रतिशत में है, तो विश्वविद्यालय के नियम अनुसार CGPA में बदलकर लिखें।",
    },
  },
  category: {
    fieldKey: "category",
    fieldName: "Social Category / Caste Group",
    step: 2,
    explanation: {
      en: "Your reservation category according to Central/State government records (General, OBC, SC, ST, EWS).",
      kn: "ಸರ್ಕಾರಿ ದಾಖಲೆಗಳ ಪ್ರಕಾರ ನಿಮ್ಮ ಮೀಸಲಾತಿ ವರ್ಗ (ಸಾಮಾನ್ಯ, ಒಬಿಸಿ, ಎಸ್ಸಿ, ಎಸ್ಟಿ, ಇಡಬ್ಲ್ಯೂಎಸ್).",
      hi: "सरकारी रिकॉर्ड के अनुसार आपका आरक्षण वर्ग (सामान्य, ओबीसी, एससी, एसटी, ईडब्ल्यूएस)।",
    },
    tips: {
      en: "You must possess a valid Caste/Category certificate with RD number in Karnataka/your state.",
      kn: "ಕರ್ನಾಟಕದಲ್ಲಿ ನಿಮ್ಮ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರದಲ್ಲಿ ಮಾನ್ಯವಾದ RD ಸಂಖ್ಯೆ ಇರಬೇಕು.",
      hi: "आरक्षित वर्ग के लिए वैध जाति प्रमाण पत्र क्रमांक होना अनिवार्य है।",
    },
  },
  aadhaarBank: {
    fieldKey: "aadhaarBank",
    fieldName: "Aadhaar Seeded Bank Account",
    step: 4,
    explanation: {
      en: "Direct Benefit Transfer (DBT) requires your bank account to be linked with NPCI Aadhaar mapper.",
      kn: "ವಿದ್ಯಾರ್ಥಿವೇತನ ಹಣ ನೇರ ಜಮೆ (DBT) ಆಗಲು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ ಲಿಂಕ್ ಮತ್ತು NPCI ಸೀಡಿಂಗ್ ಆಗಿರಬೇಕು.",
      hi: "डीबीटी छात्रवृत्ति राशि सीधे आपके खाते में आने के लिए बैंक खाते का आधार सीडेड होना जरूरी है।",
    },
    tips: {
      en: "Check NPCI status on UIDAI portal. Inactive or unseeded accounts cause payment failure.",
      kn: "ಖಾತೆಯು ಆಧಾರ್ ಸೀಡ್ ಆಗಿರುವುದನ್ನು ಬ್ಯಾಂಕ್ ಅಥವಾ UIDAI ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
      hi: "सुनिश्चित करें कि खाता आधार से सक्रिय रूप से लिंक है अन्यथा भुगतान अटक सकता है।",
    },
  },
};

export const sampleScholarships: ScholarshipItem[] = [
  {
    id: "sch-1",
    title: "Post-Matric Scholarship for OBC & Minorities",
    provider: "Ministry of Social Justice & Empowerment, Govt. of India",
    badge: "High Match (98%)",
    amount: "₹50,000 / year",
    amountNumber: 50000,
    deadline: "30 Dec 2026",
    category: ["OBC", "EWS", "Minority"],
    minCgpa: 6.0,
    maxIncome: 250000,
    courses: ["Engineering", "Medicine", "B.Sc", "B.Com", "Arts"],
    state: "Karnataka",
    matchPercentage: 98,
    description: "Financial assistance to students belonging to Other Backward Classes to pursue higher technical and professional education at accredited universities.",
    benefits: [
      "Tuition fee reimbursement up to ₹40,000/yr",
      "Monthly maintenance allowance of ₹1,000",
      "One-time study material grant of ₹5,000"
    ],
    eligibilityCriteria: [
      "Student must belong to recognized OBC category",
      "Annual family income must not exceed ₹2,50,000",
      "Passed previous academic year without backlogs"
    ],
    documentsRequired: [
      "OBC Caste Certificate",
      "Family Income Certificate",
      "College Admission Receipt",
      "Previous Year Marksheet"
    ]
  },
  {
    id: "sch-2",
    title: "Karnataka State SSP Post-Matric Merit Assistance",
    provider: "Department of Backward Classes Welfare, Govt. of Karnataka",
    badge: "State Scheme",
    amount: "₹45,000 / year",
    amountNumber: 45000,
    deadline: "15 Jan 2027",
    category: ["OBC", "SC", "ST", "General-EWS"],
    minCgpa: 7.0,
    maxIncome: 200000,
    courses: ["Engineering", "Polytechnic", "Degree", "Post-Graduate"],
    state: "Karnataka",
    matchPercentage: 94,
    description: "Flagship Karnataka State Scholarship Portal (SSP) assistance for meritorious students studying in Karnataka higher education institutions.",
    benefits: [
      "Full Government college fee waiver or private college fee reimbursement subsidy",
      "Hostel fee / food allowance for day scholars",
      "Direct DBT transfer to Aadhaar-seeded bank account"
    ],
    eligibilityCriteria: [
      "Domicile of Karnataka State",
      "Enrolled in approved college with valid USN",
      "Income limit strictly below ₹2,00,000 per annum"
    ],
    documentsRequired: [
      "Kutumba ID / Aadhaar Card",
      "RD-numbered Income & Caste Certificate",
      "College Bonafide Certificate",
      "Aadhaar-seeded Bank Passbook"
    ]
  },
  {
    id: "sch-3",
    title: "AICTE Pragati & Saksham Technical Excellence Award",
    provider: "All India Council for Technical Education (AICTE)",
    badge: "Merit Based",
    amount: "₹50,000 / year",
    amountNumber: 50000,
    deadline: "28 Feb 2027",
    category: ["General", "OBC", "SC", "ST", "EWS"],
    minCgpa: 7.5,
    maxIncome: 800000,
    courses: ["Engineering", "Architecture", "Pharmacy", "MCA"],
    state: "All India",
    matchPercentage: 86,
    description: "Empowerment scheme aimed at fostering technical education excellence for degree and diploma students admitted in AICTE approved colleges.",
    benefits: [
      "₹50,000 per annum for every year of study",
      "Covers college fee, laptop purchase, books and stationary",
      "National certificate of achievement"
    ],
    eligibilityCriteria: [
      "Admitted to 1st year or 2nd year (lateral entry) degree course",
      "Family income must not exceed ₹8,00,000",
      "No active academic backlogs"
    ],
    documentsRequired: [
      "AICTE College Admission Letter",
      "Standard 12th / Diploma Transcript",
      "Income Proof / ITR",
      "Bank Account Cancelled Cheque"
    ]
  },
  {
    id: "sch-4",
    title: "National Central Sector Scholarship for College Students",
    provider: "Department of Higher Education, MHRD",
    badge: "Central Govt",
    amount: "₹20,000 / year",
    amountNumber: 20000,
    deadline: "31 Jan 2027",
    category: ["General", "OBC", "SC", "ST"],
    minCgpa: 8.0,
    maxIncome: 450000,
    courses: ["Engineering", "Arts", "Science", "Commerce", "Law"],
    state: "All India",
    matchPercentage: 82,
    description: "Merit-cum-means scholarship for students who scored above 80th percentile in Class 12 board examinations pursuing regular graduate programs.",
    benefits: [
      "₹12,000/yr for graduation (first 3 years)",
      "₹20,000/yr for post-graduation",
      "Disbursed straight to student account via PFMS"
    ],
    eligibilityCriteria: [
      "Above 80th percentile in relevant board exams",
      "Family income below ₹4.5 Lakhs",
      "Pursuing regular full-time degree course"
    ],
    documentsRequired: [
      "12th Board Marksheet",
      "College Joining Report",
      "Income Certificate",
      "Aadhaar Card"
    ]
  }
];

export const sampleChatQuestions = [
  "What does annual family income mean?",
  "Which income certificate is accepted?",
  "Can I apply if my CGPA is below 7.0?",
  "How to link Aadhaar with bank passbook?",
  "What is the deadline for this scholarship?"
];
