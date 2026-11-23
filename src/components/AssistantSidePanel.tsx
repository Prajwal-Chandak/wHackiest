import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Globe, 
  HelpCircle, 
  FileCheck2, 
  Search, 
  Zap, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  Bot,
  User,
  ExternalLink
} from 'lucide-react';
import { Language, ChatMessage, StudentProfile } from '../types';
import { translations } from '../data/translations';
import { fieldHelpDatabase, sampleChatQuestions } from '../data/mockData';

interface AssistantSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentStep: number;
  onExplainPage: () => void;
  onTriggerAutofill: () => void;
  onCheckDocuments: () => void;
  onFindScholarships: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isTyping: boolean;
  studentProfile: StudentProfile;
}

export const AssistantSidePanel: React.FC<AssistantSidePanelProps> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  currentStep,
  onExplainPage,
  onTriggerAutofill,
  onCheckDocuments,
  onFindScholarships,
  messages,
  onSendMessage,
  isTyping,
  studentProfile,
}) => {
  const [inputText, setInputText] = useState('');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  // Simulated Voice Input
  const toggleVoiceInput = () => {
    if (isVoiceListening) {
      setIsVoiceListening(false);
    } else {
      setIsVoiceListening(true);
      // Simulate speech recognition after 2.2 seconds
      setTimeout(() => {
        setIsVoiceListening(false);
        const query = language === 'kn' 
          ? "ವಾರ್ಷಿಕ ಕುಟುಂಬದ ಆದಾಯ ಎಂದರೇನು?" 
          : language === 'hi'
          ? "वार्षिक पारिवारिक आय का क्या अर्थ है?"
          : "What does annual family income mean?";
        onSendMessage(query);
      }, 2200);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside className="w-full sm:w-[410px] md:w-[440px] flex-shrink-0 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-float flex flex-col h-full z-30 transition-all duration-300">
      {/* 1. Header with Glowing AI Orb & Language Switcher */}
      <div className="p-4 border-b border-slate-200/90 dark:border-slate-800 bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-900 dark:to-slate-900/90 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            {/* Luminous AI Orb inspired by TaskFlow AI reference image */}
            <div className="relative w-8 h-8 rounded-full ai-orb flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white drop-shadow-md" />
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                  {t.appName}
                </h2>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {t.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Speech audio enabled' : 'Mute speech audio'}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-indigo-600" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Close / Minimize */}
            <button
              onClick={onClose}
              title="Close panel"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Language Selector Pill: English | Kannada | Hindi */}
        <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs">
          <div className="flex items-center space-x-1.5 pl-2 text-slate-500 dark:text-slate-400 text-[11px] font-medium">
            <Globe className="w-3 h-3 text-indigo-500" />
            <span>Language:</span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('kn')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                language === 'kn'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                language === 'hi'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      {/* 2. Middle Scrollable Area: Quick Action Cards & Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome Greeting Banner */}
        <div className="bg-gradient-to-br from-indigo-50/70 via-violet-50/40 to-white dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900 p-3.5 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 shadow-xs">
          <div className="flex items-center space-x-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              {t.welcomeTitle}
            </h3>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.welcomeSubtitle}
          </p>
          <div className="mt-2 pt-2 border-t border-indigo-100/60 dark:border-indigo-900/40 flex items-center justify-between text-[10px] text-indigo-700 dark:text-indigo-300 font-medium">
            <span>Currently on Step {currentStep} of 5</span>
            <span className="bg-white/80 dark:bg-slate-800 px-2 py-0.5 rounded-full shadow-2xs">
              Context Aware
            </span>
          </div>
        </div>

        {/* 3. Four Attractive Action Cards (Mandatory Requirement) */}
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 px-1">
            {t.quickActions}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {/* 1. Explain This Page */}
            <button
              onClick={onExplainPage}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-violet-50/80 dark:hover:bg-violet-950/40 border border-slate-200/80 dark:border-slate-700/80 hover:border-violet-300 transition-all text-left group flex flex-col justify-between"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-violet-700 dark:group-hover:text-violet-300">
                  {t.actionExplainPage}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Guidance for Step {currentStep}
                </p>
              </div>
            </button>

            {/* 2. Fill My Application */}
            <button
              onClick={onTriggerAutofill}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-violet-50/80 dark:hover:bg-violet-950/40 border border-slate-200/80 dark:border-slate-700/80 hover:border-violet-300 transition-all text-left group flex flex-col justify-between"
            >
              <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-900/60 text-violet-600 dark:text-violet-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-violet-700 dark:group-hover:text-violet-300">
                  {t.actionAutofill}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Smart Profile Vault
                </p>
              </div>
            </button>

            {/* 3. Check Documents */}
            <button
              onClick={onCheckDocuments}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-violet-50/80 dark:hover:bg-violet-950/40 border border-slate-200/80 dark:border-slate-700/80 hover:border-violet-300 transition-all text-left group flex flex-col justify-between"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-violet-700 dark:group-hover:text-violet-300">
                  {t.actionCheckDocs}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Format & Size Audit
                </p>
              </div>
            </button>

            {/* 4. Find Scholarships */}
            <button
              onClick={onFindScholarships}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-violet-50/80 dark:hover:bg-violet-950/40 border border-slate-200/80 dark:border-slate-700/80 hover:border-violet-300 transition-all text-left group flex flex-col justify-between"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-violet-700 dark:group-hover:text-violet-300">
                  {t.actionFindScholarships}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Matches & Criteria
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* 4. Conversational Chat Stream */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
              Assistance Log
            </span>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
              Multilingual NLP Active
            </span>
          </div>

          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-slide-up`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-xs shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/80 dark:border-slate-700/80'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Interactive Action Chips inside message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (act.actionType === 'autofill') onTriggerAutofill();
                            if (act.actionType === 'check_docs') onCheckDocuments();
                            if (act.actionType === 'goto_step' && act.payload) act.payload();
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-semibold text-[10px] shadow-2xs hover:bg-indigo-50 border border-indigo-200/60 dark:border-indigo-800 flex items-center space-x-1"
                        >
                          <Sparkles className="w-3 h-3 text-violet-500" />
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800/90 rounded-2xl px-3.5 py-2.5 max-w-[120px] rounded-bl-xs border border-slate-200/80 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>
      </div>

      {/* 5. Suggested Questions Chips */}
      <div className="px-4 py-2 bg-slate-50/70 dark:bg-slate-900 border-t border-slate-200/70 dark:border-slate-800">
        <p className="text-[10px] font-semibold text-slate-400 mb-1.5">
          {t.suggestedQuestions}
        </p>
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
          {sampleChatQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(q)}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-violet-400 hover:text-violet-600 whitespace-nowrap transition-colors flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Voice Status Banner (when active) */}
      {isVoiceListening && (
        <div className="bg-violet-600 text-white px-4 py-2 text-xs flex items-center justify-between animate-pulse">
          <div className="flex items-center space-x-2">
            <Mic className="w-4 h-4 animate-bounce text-amber-300" />
            <span className="font-semibold">{t.voiceListening}</span>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">
            Tap mic to cancel
          </span>
        </div>
      )}

      {/* 7. Bottom Chat Input Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2"
      >
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={toggleVoiceInput}
          title={isVoiceListening ? 'Stop Listening' : 'Voice Input (Simulated speech)'}
          className={`p-2.5 rounded-xl border transition-all ${
            isVoiceListening
              ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
          }`}
        >
          {isVoiceListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.chatPlaceholder}
          className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all placeholder:text-slate-400"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
};
