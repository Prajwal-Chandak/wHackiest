import { Language } from '../types';

export interface UIStrings {
  appName: string;
  tagline: string;
  statusOnline: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  quickActions: string;
  actionExplainPage: string;
  actionAutofill: string;
  actionCheckDocs: string;
  actionFindScholarships: string;
  chatPlaceholder: string;
  suggestedQuestions: string;
  voiceListening: string;
  voiceInputLabel: string;
  demoNotice: string;
  portalTitle: string;
  portalSubtitle: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  step5Title: string;
  btnNext: string;
  btnPrev: string;
  btnAutofill: string;
  btnCheckDocs: string;
  btnSubmit: string;
  btnSubmitted: string;
  saveDraft: string;
  validationPassed: string;
  validationErrors: string;
  documentsVerified: string;
  declarationText: string;
  confirmSubmission: string;
  cancel: string;
  editDetails: string;
}

export const translations: Record<Language, UIStrings> = {
  en: {
    appName: "ScholarSaathi",
    tagline: "Scholarships made simpler, one step at a time.",
    statusOnline: "Active on Portal",
    welcomeTitle: "Hello! I'm ScholarSaathi.",
    welcomeSubtitle: "Let me help you complete your scholarship application smoothly.",
    quickActions: "Quick Actions",
    actionExplainPage: "Explain This Page",
    actionAutofill: "Fill My Application",
    actionCheckDocs: "Check Documents",
    actionFindScholarships: "Find Scholarships",
    chatPlaceholder: "Ask anything about this form or scholarships...",
    suggestedQuestions: "Frequently Asked",
    voiceListening: "Listening... speak now",
    voiceInputLabel: "Voice assistance",
    demoNotice: "wHACKiest 2026 Ideathon • Prototype Demonstration",
    portalTitle: "National Scholarship Application — Demo Portal",
    portalSubtitle: "Government of India / State Higher Education Scholarship Board (Simulated)",
    step1Title: "Personal Details",
    step2Title: "Family Details",
    step3Title: "Academic Details",
    step4Title: "Document Upload",
    step5Title: "Final Review & Submit",
    btnNext: "Continue to Next Step",
    btnPrev: "Previous Step",
    btnAutofill: "Fill using My Profile",
    btnCheckDocs: "Verify All Documents",
    btnSubmit: "Submit Scholarship Application",
    btnSubmitted: "Application Submitted Successfully",
    saveDraft: "Save as Draft",
    validationPassed: "All fields valid and complete",
    validationErrors: "Issues detected requiring attention",
    documentsVerified: "All 4 mandatory documents verified",
    declarationText: "I hereby certify that all information provided above is true and authentic according to my original records. I understand that false statements lead to disqualification.",
    confirmSubmission: "Confirm & Submit Application",
    cancel: "Cancel",
    editDetails: "Edit Details",
  },
  kn: {
    appName: "ಸ್ಕಾಲರ್‌ಸಾಥಿ",
    tagline: "ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು ಈಗ ಸರಳ, ಹಂತ ಹಂತವಾಗಿ.",
    statusOnline: "ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿದೆ",
    welcomeTitle: "ನಮಸ್ಕಾರ! ನಾನು ಸ್ಕಾಲರ್‌ಸಾಥಿ.",
    welcomeSubtitle: "ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅರ್ಜಿಯನ್ನು ಸುಲಭವಾಗಿ ಪೂರ್ಣಗೊಳಿಸಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",
    quickActions: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು",
    actionExplainPage: "ಈ ಪುಟವನ್ನು ವಿವರಿಸಿ",
    actionAutofill: "ನನ್ನ ಅರ್ಜಿ ಭರ್ತಿ ಮಾಡಿ",
    actionCheckDocs: "ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    actionFindScholarships: "ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಹುಡುಕಿ",
    chatPlaceholder: "ಫಾರ್ಮ್ ಅಥವಾ ವಿದ್ಯಾರ್ಥಿವೇತನದ ಕುರಿತು ಏನನ್ನಾದರೂ ಕೇಳಿ...",
    suggestedQuestions: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
    voiceListening: "ಆಲಿಸುತ್ತಿದೆ... ಮಾತನಾಡಿ",
    voiceInputLabel: "ಧ್ವನಿ ಸಹಾಯ",
    demoNotice: "wHACKiest 2026 ಐಡಿಯಾಥಾನ್ • ಮಾದರಿ ಪ್ರದರ್ಶನ",
    portalTitle: "ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಅರ್ಜಿ — ಡೆಮೊ ಪೋರ್ಟಲ್",
    portalSubtitle: "ಭಾರತ ಸರ್ಕಾರ / ರಾಜ್ಯ ಉನ್ನತ ಶಿಕ್ಷಣ ವಿದ್ಯಾರ್ಥಿವೇತನ ಮಂಡಳಿ (ಮಾದರಿ)",
    step1Title: "ವೈಯಕ್ತಿಕ ವಿವರಗಳು",
    step2Title: "ಕುಟುಂಬದ ವಿವರಗಳು",
    step3Title: "ಶೈಕ್ಷಣಿಕ ವಿವರಗಳು",
    step4Title: "ದಾಖಲೆಗಳ ಅಪ್‌ಲೋಡ್",
    step5Title: "ಅಂತಿಮ ಪರಿಶೀಲನೆ ಮತ್ತು ಸಲ್ಲಿಕೆ",
    btnNext: "ಮುಂದಿನ ಹಂತಕ್ಕೆ ಮುಂದುವರಿಯಿರಿ",
    btnPrev: "ಹಿಂದಿನ ಹಂತ",
    btnAutofill: "ಪ್ರೊಫೈಲ್‌ನಿಂದ ಭರ್ತಿ ಮಾಡಿ",
    btnCheckDocs: "ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    btnSubmit: "ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ",
    btnSubmitted: "ಅರ್ಜಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    saveDraft: "ಕರಡನ್ನು ಉಳಿಸಿ",
    validationPassed: "ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳು ಮಾನ್ಯವಾಗಿವೆ",
    validationErrors: "ಗಮನಿಸಬೇಕಾದ ದೋಷಗಳು ಕಂಡುಬಂದಿವೆ",
    documentsVerified: "ಎಲ್ಲಾ 4 ಕಡ್ಡಾಯ ದಾಖಲೆಗಳು ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿವೆ",
    declarationText: "ಮೇಲೆ ನೀಡಲಾದ ಎಲ್ಲಾ ಮಾಹಿತಿಯು ನನ್ನ ಮೂಲ ದಾಖಲೆಗಳ ಪ್ರಕಾರ ಸತ್ಯವಾಗಿದೆ ಎಂದು ನಾನು ಈ ಮೂಲಕ ಪ್ರಮಾಣೀಕರಿಸುತ್ತೇನೆ.",
    confirmSubmission: "ದೃಢೀಕರಿಸಿ ಮತ್ತು ಸಲ್ಲಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    editDetails: "ವಿವರಗಳನ್ನು ತಿದ್ದುಪಡಿ ಮಾಡಿ",
  },
  hi: {
    appName: "स्कॉलरसाथी",
    tagline: "छात्रवृत्ति हुई आसान, हर कदम पर आपके साथ।",
    statusOnline: "पोर्टल पर सक्रिय",
    welcomeTitle: "नमस्ते! मैं स्कॉलरसाथी हूँ।",
    welcomeSubtitle: "आइए आपकी छात्रवृत्ति आवेदन प्रक्रिया को सरलता से पूरा करें।",
    quickActions: "त्वरित सहायता",
    actionExplainPage: "यह पेज समझाइए",
    actionAutofill: "मेरा फॉर्म भरें",
    actionCheckDocs: "दस्तावेज़ जाँचें",
    actionFindScholarships: "छात्रवृत्ति खोजें",
    chatPlaceholder: "इस फॉर्म या छात्रवृत्ति के बारे में कुछ भी पूछें...",
    suggestedQuestions: "अक्सर पूछे जाने वाले सवाल",
    voiceListening: "सुन रहा हूँ... बोलिए",
    voiceInputLabel: "आवाज़ सहायता",
    demoNotice: "wHACKiest 2026 आइडियाथॉन • प्रोटोटाइप प्रदर्शन",
    portalTitle: "राष्ट्रीय छात्रवृत्ति आवेदन — डेमो पोर्टल",
    portalSubtitle: "भारत सरकार / राज्य उच्च शिक्षा छात्रवृत्ति बोर्ड (सिम्युलेटेड)",
    step1Title: "व्यक्तिगत विवरण",
    step2Title: "पारिवारिक विवरण",
    step3Title: "शैक्षणिक विवरण",
    step4Title: "दस्तावेज़ अपलोड",
    step5Title: "अंतिम समीक्षा एवं जमा करें",
    btnNext: "अगले चरण पर जाएँ",
    btnPrev: "पिछला चरण",
    btnAutofill: "मेरी प्रोफ़ाइल से भरें",
    btnCheckDocs: "सभी दस्तावेज़ सत्यापित करें",
    btnSubmit: "आवेदन पत्र जमा करें",
    btnSubmitted: "आवेदन सफलतापूर्वक जमा हुआ",
    saveDraft: "ड्राफ्ट सहेजें",
    validationPassed: "सभी विवरण सही एवं पूर्ण हैं",
    validationErrors: "कुछ विसंगतियाँ पाई गईं, कृपया ध्यान दें",
    documentsVerified: "सभी 4 अनिवार्य दस्तावेज़ सत्यापित हैं",
    declarationText: "मैं प्रमाणित करता/करती हूँ कि ऊपर दी गई जानकारी मेरे मूल अभिलेखों के अनुसार सत्य है। किसी भी असत्य जानकारी पर आवेदन निरस्त हो सकता है।",
    confirmSubmission: "पुष्टि करें और जमा करें",
    cancel: "रद्द करें",
    editDetails: "विवरण संपादित करें",
  }
};
