import React, { useState, useEffect } from 'react';
import { ChromeBrowserFrame } from './components/ChromeBrowserFrame';
import { PortalHeader } from './components/PortalHeader';
import { StepProgressBar } from './components/StepProgressBar';
import { Step1Personal } from './components/Step1Personal';
import { Step2Family } from './components/Step2Family';
import { Step3Academic } from './components/Step3Academic';
import { Step4Documents } from './components/Step4Documents';
import { Step5Review } from './components/Step5Review';
import { AssistantSidePanel } from './components/AssistantSidePanel';
import { DiscoverScholarships } from './components/DiscoverScholarships';
import { ApplicationTracker } from './components/ApplicationTracker';
import { StudentProfileModal } from './components/StudentProfileModal';
import { DocumentPreviewModal } from './components/DocumentPreviewModal';
import { DemoTourBar } from './components/DemoTourBar';

import { 
  Language, 
  StudentProfile, 
  DocumentItem, 
  DocumentKey, 
  ScholarshipItem, 
  ChatMessage 
} from './types';
import { 
  defaultStudentProfile, 
  emptyStudentProfile, 
  defaultDocuments, 
  fieldHelpDatabase 
} from './data/mockData';
import { translations } from './data/translations';

export const App: React.FC = () => {
  // Navigation & View States
  const [activeView, setActiveView] = useState<'portal' | 'discover' | 'tracker'>('portal');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('en');

  // Student Profile state
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('scholarsaathi_student_profile');
    return saved ? JSON.parse(saved) : emptyStudentProfile;
  });

  // Uploaded Documents state
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('scholarsaathi_documents');
    return saved ? JSON.parse(saved) : defaultDocuments;
  });

  // UI Micro-interaction states
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);
  const [isAutofilling, setIsAutofilling] = useState<boolean>(false);
  const [isAiAuditing, setIsAiAuditing] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [previewDocument, setPreviewDocument] = useState<DocumentItem | null>(null);

  // Demo Tour State (1 to 12)
  const [currentDemoStep, setCurrentDemoStep] = useState<number>(1);

  // Chat conversation state
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "Hello! I'm ScholarSaathi. Let me help you complete your scholarship application.\n\nYou can ask me to explain any field, check your documents, or fast-fill using your profile vault.",
      timestamp: 'Just now',
      language: 'en',
      actions: [
        { label: 'Explain Step 1', actionType: 'explain' },
        { label: 'Fill using My Profile', actionType: 'autofill' },
      ]
    }
  ]);

  // Persist student profile changes
  useEffect(() => {
    localStorage.setItem('scholarsaathi_student_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  // Persist documents
  useEffect(() => {
    localStorage.setItem('scholarsaathi_documents', JSON.stringify(documents));
  }, [documents]);

  // Dark mode class toggle on root html
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Form completion percentage
  const calculateCompletion = () => {
    let filled = 0;
    const total = 14;
    if (studentProfile.name) filled++;
    if (studentProfile.dob) filled++;
    if (studentProfile.gender) filled++;
    if (studentProfile.mobile) filled++;
    if (studentProfile.email) filled++;
    if (studentProfile.college) filled++;
    if (studentProfile.course) filled++;
    if (studentProfile.fatherName) filled++;
    if (studentProfile.motherName) filled++;
    if (studentProfile.annualIncome) filled++;
    if (studentProfile.category) filled++;
    if (studentProfile.universityRegNo) filled++;
    if (studentProfile.previousCgpa) filled++;
    const verifiedDocs = documents.filter((d) => d.file?.status === 'verified').length;
    filled += verifiedDocs;
    return Math.min(100, Math.round((filled / total) * 100));
  };

  // Helper to append a user message and AI response
  const handleUserMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Call Python FastAPI backend powered by Gemini API
    fetch('http://127.0.0.1:8000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        language,
        current_step: currentStep,
        student_profile: studentProfile,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setIsTyping(false);
        const reply = data.reply;
        let actions: ChatMessage['actions'] = [];

        const lower = text.toLowerCase();
        if (lower.includes('annual') || lower.includes('income') || lower.includes('ಆದಾಯ') || lower.includes('आय')) {
          actions = [
            { label: 'Go to Step 2 (Family Details)', actionType: 'goto_step', payload: () => { setCurrentStep(2); setActiveView('portal'); } },
            { label: 'Autofill Form', actionType: 'autofill' }
          ];
        } else if (lower.includes('doc') || lower.includes('cert') || lower.includes('ದಾಖಲೆ') || lower.includes('दस्तावेज़')) {
          actions = [
            { label: 'Go to Document Upload', actionType: 'goto_step', payload: () => { setCurrentStep(4); setActiveView('portal'); } }
          ];
        } else {
          actions = [
            { label: 'Fill using My Profile', actionType: 'autofill' },
            { label: 'Audit Uploaded Docs', actionType: 'check_docs' },
          ];
        }

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions,
          language,
        };
        setMessages((prev) => [...prev, aiMsg]);
      })
      .catch((_err) => {
        // Fallback intelligent response if offline
        setIsTyping(false);
        let fallbackReply = '';
        if (language === 'kn') {
          fallbackReply = "ವಾರ್ಷಿಕ ಕುಟುಂಬದ ಆದಾಯವೆಂದರೆ ಒಂದು ಆರ್ಥಿಕ ವರ್ಷದಲ್ಲಿ ನಿಮ್ಮ ಕುಟುಂಬದ ಎಲ್ಲಾ ದುಡಿಯುವ ಸದಸ್ಯರು (ತಂದೆ, ತಾಯಿ ಅಥವಾ ಪಾಲಕರು) ಗಳಿಸಿದ ಒಟ್ಟು ಆದಾಯವಾಗಿದೆ.\n\n💡 ಸಲಹೆ: ಇದು ನಿಮ್ಮ ತಹಶೀಲ್ದಾರ್ ನೀಡಿದ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ನಿಖರವಾಗಿ ಹೊಂದಿಕೆಯಾಗಬೇಕು.";
        } else if (language === 'hi') {
          fallbackReply = "वार्षिक पारिवारिक आय का अर्थ है एक वित्तीय वर्ष में आपके परिवार के सभी कमाने वाले सदस्यों (माता-पिता या अभिभावक) द्वारा अर्जित कुल आय।\n\n💡 टिप: यह राशि आपके राजस्व विभाग द्वारा जारी आय प्रमाण पत्र में दर्ज राशि से मेल खानी चाहिए।";
        } else {
          fallbackReply = "Annual family income is the total income earned by all earning members of your family in one year.\n\n💡 Tip: Enter the exact figure printed on your official Tahsildar / Revenue Income Certificate. Many schemes have a ₹2,50,000 threshold.";
        }

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          language,
        };
        setMessages((prev) => [...prev, aiMsg]);
      });
  };

  // Ask AI about a specific field (triggered by field sparkle button)
  const handleAskAiAboutField = (fieldKey: string, fieldName: string) => {
    setIsSidePanelOpen(true);
    const helpItem = fieldHelpDatabase[fieldKey];

    const question = language === 'kn'
      ? `"${fieldName}" ಕ್ಷೇತ್ರದ ನಿಯಮಗಳು ಮತ್ತು ಮಹತ್ವವನ್ನು ವಿಶ್ಲೇಷಿಸಿ.`
      : language === 'hi'
      ? `"${fieldName}" के नियमों और विवरण का विश्लेषण करें।`
      : `Explain the importance, rules, and requirements for "${fieldName}".`;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fieldKey,
      language,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    fetch('http://127.0.0.1:8000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: question,
        language,
        current_step: currentStep,
        field_key: fieldKey,
        student_profile: studentProfile,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setIsTyping(false);
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fieldKey,
          language,
          actions: [
            { label: `Fill ${fieldName}`, actionType: 'autofill' }
          ]
        };
        setMessages((prev) => [...prev, aiMsg]);
      })
      .catch((_err) => {
        setIsTyping(false);
        let answer = "";
        if (helpItem) {
          answer = `${helpItem.explanation[language]}\n\n💡 ${helpItem.tips[language]}`;
        } else {
          answer = `Please enter your valid ${fieldName} according to your official university records.`;
        }

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fieldKey,
          language,
          actions: [
            { label: `Fill ${fieldName}`, actionType: 'autofill' }
          ]
        };
        setMessages((prev) => [...prev, aiMsg]);
      });
  };

  // Smart Autofill Action
  const triggerAutofill = () => {
    setIsAutofilling(true);

    // List of keys to animate highlight
    const keysToHighlight = [
      'name', 'dob', 'gender', 'mobile', 'email', 'state', 'college', 'course', 'currentYear',
      'fatherName', 'motherName', 'annualIncome', 'category', 'address',
      'universityRegNo', 'previousCgpa', 'academicYear'
    ];
    setHighlightedFields(keysToHighlight);

    setTimeout(() => {
      setStudentProfile(defaultStudentProfile);
      setCompletedSteps([1, 2, 3]);
      setIsAutofilling(false);

      // Append success message in chat
      const successMsg: ChatMessage = {
        id: `autofill-${Date.now()}`,
        sender: 'assistant',
        text: language === 'kn'
          ? "✨ ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ನಿಂದ 16 ಕ್ಷೇತ್ರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಭರ್ತಿ ಮಾಡಲಾಗಿದೆ! ಎಲ್ಲಾ ವಿವರಗಳು ಮಾನ್ಯವಾಗಿವೆ."
          : language === 'hi'
          ? "✨ आपकी प्रोफ़ाइल से 16 फ़ील्ड सफलतापूर्वक भर दिए गए हैं! सभी विवरण सत्यापित हैं।"
          : "✨ Smart Autofill applied! 16 application fields populated with 100% confidence from your verified student profile.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        actions: [
          { label: 'Go to Documents (Step 4)', actionType: 'goto_step', payload: () => setCurrentStep(4) }
        ]
      };
      setMessages((prev) => [...prev, successMsg]);

      // Remove highlight after 2.5s
      setTimeout(() => {
        setHighlightedFields([]);
      }, 2500);
    }, 600);
  };

  // Explain Current Page Action
  const handleExplainCurrentPage = () => {
    setIsSidePanelOpen(true);
    let pageSummary = "";
    if (currentStep === 1) {
      pageSummary = language === 'kn'
        ? "ಹಂತ 1: ವೈಯಕ್ತಿಕ ವಿವರಗಳು. ನಿಮ್ಮ ಹೆಸರು, ಜನ್ಮ ದಿನಾಂಕ ಮತ್ತು ಕಾಲೇಜು ನೋಂದಣಿ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ. ಇದು 10ನೇ ತರಗತಿ ಅಂಕಪಟ್ಟಿಗೆ ಹೊಂದಿಕೆಯಾಗಬೇಕು."
        : language === 'hi'
        ? "चरण 1: व्यक्तिगत विवरण। अपना नाम, जन्मतिथि और कॉलेज विवरण भरें। यह 10वीं की मार्कशीट से मेल खाना चाहिए।"
        : "Step 1: Personal Details. Enter your legal name, DOB, and current institution enrollment. Ensure your mobile number is linked to Aadhaar.";
    } else if (currentStep === 2) {
      pageSummary = language === 'kn'
        ? "ಹಂತ 2: ಕುಟುಂಬದ ವಿವರಗಳು. ನಿಮ್ಮ ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ಮತ್ತು ಜಾತಿ ವರ್ಗವನ್ನು ನಮೂದಿಸಿ. ತಹಶೀಲ್ದಾರ್ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಕಡ್ಡಾಯ."
        : language === 'hi'
        ? "चरण 2: पारिवारिक विवरण। वार्षिक पारिवारिक आय और आरक्षण श्रेणी दर्ज करें। राजस्व आय प्रमाण पत्र अनिवार्य है।"
        : "Step 2: Family & Income Details. Enter combined parental income and reservation quota. Crucial for eligibility thresholds (₹2.5 Lakhs limit).";
    } else if (currentStep === 3) {
      pageSummary = language === 'kn'
        ? "ಹಂತ 3: ಶೈಕ್ಷಣಿಕ ವಿವರಗಳು. ನಿಮ್ಮ ವಿಶ್ವವಿದ್ಯಾಲಯ ನೋಂದಣಿ ಸಂಖ್ಯೆ (USN) ಮತ್ತು ಹಿಂದಿನ ವರ್ಷದ CGPA (8.74) ನಮೂದಿಸಿ."
        : language === 'hi'
        ? "चरण 3: शैक्षणिक विवरण। विश्वविद्यालय पंजीकरण क्रमांक (USN) और पिछले वर्ष का CGPA (8.74) दर्ज करें।"
        : "Step 3: Academic Details. Enter your permanent university USN/Roll Number and previous year CGPA (8.74).";
    } else if (currentStep === 4) {
      pageSummary = language === 'kn'
        ? "ಹಂತ 4: ದಾಖಲೆಗಳ ಅಪ್‌ಲೋಡ್. ವಿದ್ಯಾರ್ಥಿ ID, ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ, ಅಂಕಪಟ್ಟಿ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
        : language === 'hi'
        ? "चरण 4: दस्तावेज़ अपलोड। छात्र आईडी, आय प्रमाण पत्र, अंकतालिका और बैंक पासबुक की डिजिटल प्रति अपलोड करें।"
        : "Step 4: Document Upload. Attach digital copies of Student ID, Tahsildar Income Certificate, Marks Card, and Bank Passbook.";
    } else {
      pageSummary = language === 'kn'
        ? "ಹಂತ 5: ಅಂತಿಮ ಪರಿಶೀಲನೆ. ಸಲ್ಲಿಕೆಗೆ ಮುನ್ನ ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ವಿದ್ಯಾರ್ಥಿ ದೃಢೀಕರಣವನ್ನು ಗುರುತಿಸಿ."
        : language === 'hi'
        ? "चरण 5: अंतिम समीक्षा। सबमिट करने से पहले सभी विवरणों की पुष्टि करें और घोषणा पर टिक करें।"
        : "Step 5: Final Review & Pre-Submission Audit. Review all sections. Note: ScholarSaathi never auto-submits without your explicit consent.";
    }

    const msg: ChatMessage = {
      id: `explain-${Date.now()}`,
      sender: 'assistant',
      text: pageSummary,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
    };
    setMessages((prev) => [...prev, msg]);
  };

  // Upload sample document handler
  const handleUploadSampleDoc = (docKey: DocumentKey, isValid: boolean) => {
    setDocuments((prev) =>
      prev.map((d) => {
        if (d.key === docKey) {
          if (isValid) {
            return {
              ...d,
              file: {
                name: d.sampleExpectedDoc,
                size: '1.2 MB',
                type: 'application/pdf',
                status: 'verified',
                uploadedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }
            };
          } else {
            return {
              ...d,
              file: {
                name: 'Blurry_Unreadable_Scan.jpg',
                size: '4.8 MB',
                type: 'image/jpeg',
                status: 'rejected',
                issue: 'Low resolution & blurred text (Confidence 41%). Exceeds recommended 2MB limit. Please upload a clear scanned PDF.',
                uploadedAt: 'Just now',
              }
            };
          }
        }
        return d;
      })
    );

    // Notify in chat
    if (isValid) {
      const msg: ChatMessage = {
        id: `upload-ok-${Date.now()}`,
        sender: 'assistant',
        text: `✅ Verified "${docKey}": Clean digital certificate detected. Tahsildar seal and RD number matched.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
      };
      setMessages((prev) => [...prev, msg]);
    } else {
      setIsSidePanelOpen(true);
      const warnMsg: ChatMessage = {
        id: `upload-fail-${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ Document Issue Detected on "${docKey}": The uploaded file is blurred and exceeds 2MB. Government portals will reject unreadable certificates. Please re-upload a clear scanned copy.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        actions: [
          { label: 'Replace with Valid Sample', actionType: 'check_docs' }
        ]
      };
      setMessages((prev) => [...prev, warnMsg]);
    }
  };

  const handleRemoveDoc = (docKey: DocumentKey) => {
    setDocuments((prev) =>
      prev.map((d) => (d.key === docKey ? { ...d, file: null } : d))
    );
  };

  // Run AI Document Audit
  const handleRunAiDocAudit = () => {
    setIsAiAuditing(true);
    setIsSidePanelOpen(true);

    setTimeout(() => {
      // Ensure all 4 are verified for a clean demo state
      setDocuments((prev) =>
        prev.map((d) => ({
          ...d,
          file: {
            name: d.sampleExpectedDoc,
            size: '1.4 MB',
            type: 'application/pdf',
            status: 'verified',
            uploadedAt: 'Verified just now',
          }
        }))
      );
      setIsAiAuditing(false);

      const msg: ChatMessage = {
        id: `audit-${Date.now()}`,
        sender: 'assistant',
        text: language === 'kn'
          ? "🎉 ದಾಖಲೆಗಳ ಲೆಕ್ಕಪರಿಶೋಧನೆ ಪೂರ್ಣಗೊಂಡಿದೆ! ಎಲ್ಲಾ 4 ದಾಖಲೆಗಳು (ID, ಆದಾಯ, ಅಂಕಪಟ್ಟಿ, ಪಾಸ್‌ಬುಕ್) ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟಿವೆ."
          : language === 'hi'
          ? "🎉 दस्तावेज़ सत्यापन संपन्न! सभी 4 अनिवार्य दस्तावेज़ (आईडी, आय प्रमाण, अंकतालिका, बैंक पासबुक) 100% सत्यापित हैं।"
          : "🎉 Document Compliance Audit Complete! All 4 mandatory documents (Student ID, Tahsildar Income Certificate, Marks Card, Bank Passbook) verified and compliant with government guidelines.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        actions: [
          { label: 'Proceed to Step 5 Review', actionType: 'goto_step', payload: () => setCurrentStep(5) }
        ]
      };
      setMessages((prev) => [...prev, msg]);
    }, 700);
  };

  // Language Change: updates UI language and translates the last assistant message if applicable
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    // Add translation confirmation notice in chat
    const noticeText = newLang === 'kn'
      ? "ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ. ನಾನು ಈಗ ಕನ್ನಡದಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತೇನೆ."
      : newLang === 'hi'
      ? "भाषा बदलकर हिंदी कर दी गई है। मैं अब हिंदी में सहायता करूँगा।"
      : "Language switched to English. ScholarSaathi will assist in English.";

    setMessages((prev) => [
      ...prev,
      {
        id: `lang-${Date.now()}`,
        sender: 'assistant',
        text: noticeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: newLang,
      }
    ]);
  };

  // 12-Step Demo Presentation Tour Handler
  const handleExecuteDemoStep = (stepNumber: number) => {
    setCurrentDemoStep(stepNumber);

    switch (stepNumber) {
      case 1: // Open simulated portal
        setActiveView('portal');
        setCurrentStep(1);
        break;

      case 2: // Open ScholarSaathi
        setIsSidePanelOpen(true);
        break;

      case 3: // Ask: "What does annual family income mean?"
        setIsSidePanelOpen(true);
        handleUserMessage("What does annual family income mean?");
        break;

      case 4: // Show AI explanation (already answered in chat by step 3)
        // scroll/ensure open
        setIsSidePanelOpen(true);
        break;

      case 5: // Change language to Kannada & demonstrate translation
        setIsSidePanelOpen(true);
        setLanguage('kn');
        // Post direct Kannada explanation
        setMessages((prev) => [
          ...prev,
          {
            id: `tour-kn-${Date.now()}`,
            sender: 'assistant',
            text: "ಕನ್ನಡ ವಿವರಣೆ:\n\nವಾರ್ಷಿಕ ಕುಟುಂಬದ ಆದಾಯವೆಂದರೆ ಒಂದು ಆರ್ಥಿಕ ವರ್ಷದಲ್ಲಿ ನಿಮ್ಮ ಕುಟುಂಬದ ಎಲ್ಲಾ ದುಡಿಯುವ ಸದಸ್ಯರು (ತಂದೆ, ತಾಯಿ ಅಥವಾ ಪಾಲಕರು) ಗಳಿಸಿದ ಒಟ್ಟು ಆದಾಯವಾಗಿದೆ.\n\n💡 ಇದು ತಹಶೀಲ್ದಾರ್ ನೀಡಿದ ಅಧಿಕೃತ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರದಲ್ಲಿರುವ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ನಿಖರವಾಗಿ ಹೊಂದಿಕೆಯಾಗಬೇಕು.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            language: 'kn',
          }
        ]);
        break;

      case 6: // Click "Fill using My Profile"
        setActiveView('portal');
        triggerAutofill();
        break;

      case 7: // Show form getting populated & highlighted
        setActiveView('portal');
        setCurrentStep(2); // Show Step 2 populated with income
        break;

      case 8: // Upload sample document
        setActiveView('portal');
        setCurrentStep(4);
        handleUploadSampleDoc('incomeCert', true);
        handleUploadSampleDoc('studentId', true);
        break;

      case 9: // Demonstrate invalid document warning
        setActiveView('portal');
        setCurrentStep(4);
        handleUploadSampleDoc('marksCard', false);
        break;

      case 10: // Navigate to final review
        // First fix all docs so review looks great
        handleRunAiDocAudit();
        setActiveView('portal');
        setCurrentStep(5);
        break;

      case 11: // Show approval screen
        setActiveView('portal');
        setCurrentStep(5);
        break;

      case 12: // Submission requires explicit confirmation
        setActiveView('portal');
        setCurrentStep(5);
        break;

      default:
        break;
    }
  };

  return (
    <ChromeBrowserFrame
      isSidePanelOpen={isSidePanelOpen}
      onToggleSidePanel={() => setIsSidePanelOpen(!isSidePanelOpen)}
      activeView={activeView}
      onChangeView={(v) => setActiveView(v)}
      onOpenProfile={() => setIsProfileModalOpen(true)}
      isDarkMode={isDarkMode}
      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
    >
      {/* Left / Center: Main Web Experience */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50 dark:bg-slate-950">
        {/* Government Portal Header */}
        <PortalHeader
          activeView={activeView}
          onChangeView={(v) => setActiveView(v)}
          completionPercentage={calculateCompletion()}
          onTriggerAutofill={triggerAutofill}
          studentProfile={studentProfile}
          isAutofilling={isAutofilling}
        />

        {/* Dynamic Portal Content */}
        {activeView === 'portal' && (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Step Progress Stepper */}
            <StepProgressBar
              currentStep={currentStep}
              onSelectStep={(s) => setCurrentStep(s)}
              completedSteps={completedSteps}
            />

            {/* Stepper Form Views */}
            <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 pb-24">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 shadow-soft">
                {currentStep === 1 && (
                  <Step1Personal
                    data={studentProfile}
                    onChange={(field, val) =>
                      setStudentProfile((prev) => ({ ...prev, [field]: val }))
                    }
                    onNext={() => {
                      if (!completedSteps.includes(1)) setCompletedSteps([...completedSteps, 1]);
                      setCurrentStep(2);
                    }}
                    onAskAi={handleAskAiAboutField}
                    highlightedFields={highlightedFields}
                    onTriggerAutofill={triggerAutofill}
                  />
                )}

                {currentStep === 2 && (
                  <Step2Family
                    data={studentProfile}
                    onChange={(field, val) =>
                      setStudentProfile((prev) => ({ ...prev, [field]: val }))
                    }
                    onNext={() => {
                      if (!completedSteps.includes(2)) setCompletedSteps([...completedSteps, 2]);
                      setCurrentStep(3);
                    }}
                    onPrev={() => setCurrentStep(1)}
                    onAskAi={handleAskAiAboutField}
                    highlightedFields={highlightedFields}
                  />
                )}

                {currentStep === 3 && (
                  <Step3Academic
                    data={studentProfile}
                    onChange={(field, val) =>
                      setStudentProfile((prev) => ({ ...prev, [field]: val }))
                    }
                    onNext={() => {
                      if (!completedSteps.includes(3)) setCompletedSteps([...completedSteps, 3]);
                      setCurrentStep(4);
                    }}
                    onPrev={() => setCurrentStep(2)}
                    onAskAi={handleAskAiAboutField}
                    highlightedFields={highlightedFields}
                  />
                )}

                {currentStep === 4 && (
                  <Step4Documents
                    documents={documents}
                    onUploadSample={handleUploadSampleDoc}
                    onRemoveDoc={handleRemoveDoc}
                    onPreviewDoc={(doc) => setPreviewDocument(doc)}
                    onNext={() => {
                      if (!completedSteps.includes(4)) setCompletedSteps([...completedSteps, 4]);
                      setCurrentStep(5);
                    }}
                    onPrev={() => setCurrentStep(3)}
                    onRunAiDocAudit={handleRunAiDocAudit}
                    isAiAuditing={isAiAuditing}
                  />
                )}

                {currentStep === 5 && (
                  <Step5Review
                    studentProfile={studentProfile}
                    documents={documents}
                    onPrev={() => setCurrentStep(4)}
                    onEditStep={(step) => setCurrentStep(step)}
                    onTriggerAutofill={triggerAutofill}
                  />
                )}
              </div>
            </main>
          </div>
        )}

        {/* Discover Scholarships View */}
        {activeView === 'discover' && (
          <DiscoverScholarships
            studentProfile={studentProfile}
            onApplyForScholarship={(scholarship) => {
              setActiveView('portal');
              setCurrentStep(1);
              // notify in chat
              setMessages((prev) => [
                ...prev,
                {
                  id: `apply-${Date.now()}`,
                  sender: 'assistant',
                  text: `🎯 Selected: "${scholarship.title}". Award amount: ${scholarship.amount}. I've synchronized the application form parameters.`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  language,
                }
              ]);
            }}
            onAskAiAboutScholarship={(scholarship) => {
              setIsSidePanelOpen(true);
              handleUserMessage(`Tell me more about eligibility for ${scholarship.title}`);
            }}
          />
        )}

        {/* Application Tracker View */}
        {activeView === 'tracker' && <ApplicationTracker />}
      </div>

      {/* Right: ScholarSaathi Chrome Side Panel */}
      <AssistantSidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        language={language}
        onLanguageChange={handleLanguageChange}
        currentStep={currentStep}
        onExplainPage={handleExplainCurrentPage}
        onTriggerAutofill={triggerAutofill}
        onCheckDocuments={() => {
          setActiveView('portal');
          setCurrentStep(4);
          handleRunAiDocAudit();
        }}
        onFindScholarships={() => setActiveView('discover')}
        messages={messages}
        onSendMessage={handleUserMessage}
        isTyping={isTyping}
        studentProfile={studentProfile}
      />

      {/* Modals & Presentation Overlays */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={studentProfile}
        onSaveProfile={(updated) => setStudentProfile(updated)}
        onResetToDefault={() => setStudentProfile(defaultStudentProfile)}
      />

      <DocumentPreviewModal
        document={previewDocument}
        onClose={() => setPreviewDocument(null)}
      />

      {/* 12-Step Guided Tour Bar for Ideathon Presentation */}
      <DemoTourBar
        currentDemoStep={currentDemoStep}
        onExecuteDemoStep={handleExecuteDemoStep}
      />
    </ChromeBrowserFrame>
  );
};

export default App;
