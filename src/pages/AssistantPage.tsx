import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { storageService } from '../services/storage';
import { ChatMessage } from '../types';
import {
  Bot,
  Send,
  ExternalLink,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';

const SAMPLE_QUESTIONS = [
  {
    en: 'How should food be stored safely?',
    hi: 'पके हुए और कच्चे भोजन को सुरक्षित कैसे स्टोर करें?'
  },
  {
    en: 'What are basic hygiene practices for food handlers?',
    hi: 'भोजन बनाने और परोसने वालों के लिए बुनियादी स्वच्छता नियम क्या हैं?'
  },
  {
    en: 'What should I do if packaged food appears spoiled?',
    hi: 'अगर पैकेट बंद जूस या खाना फूला हुआ या खराब लगे तो क्या करें?'
  },
  {
    en: 'How can a small food stall improve hygiene?',
    hi: 'एक छोटा स्ट्रीट फ़ूड स्टॉल कम खर्च में स्वच्छता कैसे सुधार सकता है?'
  },
  {
    en: 'How to recognize unsafe food additives and dyes?',
    hi: 'असुरक्षित खाद्य मिलावट और रासायनिक रंगों की पहचान कैसे करें?'
  }
];

export const AssistantPage: React.FC = () => {
  const { t, language } = useLanguage();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text:
        language === 'hi'
          ? 'नमस्ते! मैं आहारसेतु का खाद्य सुरक्षा ज्ञान सहायक हूँ (शैक्षणिक प्रोटोटाइप)। आप मुझसे सुरक्षित खाद्य भंडारण, स्ट्रीट स्टॉल स्वच्छता और सामान्य स्वच्छता नियमों के बारे में पूछ सकते हैं। मेरे उत्तर केवल खुले सार्वजनिक संदर्भों (WHO एवं कोडेक्स मानकों) पर आधारित हैं।'
          : 'Namaste! I am the AaharSetu Food Safety Knowledge Assistant (educational prototype). You can ask me about safe food storage temperatures, stall hygiene practices, or recognizing damaged packaging. All answers are strictly grounded in public references from WHO and Codex Alimentarius.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: [
        {
          title: 'WHO Five Keys to Safer Food Manual',
          organization: 'World Health Organization (WHO)',
          url: 'https://www.who.int/activities/promoting-safe-food-handling',
          type: 'WHO Public Hygiene Manual'
        },
        {
          title: 'Codex Alimentarius Code of Hygienic Practice (CXC 43-1997)',
          organization: 'FAO / WHO Codex Alimentarius Commission',
          url: 'https://www.fao.org/fao-who-codexalimentarius/codex-texts/codes-of-practice/en/',
          type: 'International Food Standard'
        }
      ],
      suggestedFollowups: [
        'How should food be stored safely?',
        'What should I do if packaged food appears spoiled?'
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleAsk = (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate retrieval & grounded answer generation
    setTimeout(() => {
      const results = storageService.searchKnowledge(q);
      let responseText = '';
      const responseSources: ChatMessage['sources'] = [];

      if (results.length > 0) {
        const top = results[0];
        responseText = language === 'hi' ? top.contentHi : top.content;
        results.forEach((r) => {
          if (!responseSources.some((s) => s.title === r.sourceTitle)) {
            responseSources.push({
              title: r.sourceTitle,
              organization: r.sourceOrganization,
              url: r.sourceUrl,
              type: r.sourceType
            });
          }
        });
      } else {
        responseText =
          language === 'hi'
            ? 'वर्तमान ज्ञानकोष में प्रासंगिक जानकारी नहीं मिली।'
            : 'Relevant information was not found in the current knowledge base.';
      }

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: responseSources.length > 0 ? responseSources : undefined
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(inputQuery);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
          <Bot className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'स्रोत-प्रमाणित ज्ञान सहायक' : 'Source-Grounded Assistant'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {t('assistantTitle')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {t('assistantSubtitle')}
        </p>
      </div>

      {/* Safety & Source Grounding Banner */}
      <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-xs text-emerald-900 flex items-start gap-3 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">
            {language === 'hi' ? 'सत्यापनीय संदर्भ आधार:' : 'Grounding & Medical Disclaimer:'}
          </p>
          <p className="mt-0.5 text-emerald-800 text-xs">
            {t('assistantDisclaimer')} • {t('noApiNotice')}
          </p>
        </div>
      </div>

      {/* Common Question Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>{t('sampleQuestions')}</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_QUESTIONS.map((qObj, idx) => {
            const label = language === 'hi' ? qObj.hi : qObj.en;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleAsk(label)}
                className="text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 font-medium transition-all shadow-xs text-left"
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
        {/* Messages List */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white shadow-xs rounded-br-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-900 rounded-bl-none shadow-xs'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 font-semibold">
                  <span>{msg.sender === 'user' ? (language === 'hi' ? 'आप' : 'You') : 'AaharSetu Assistant'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Content */}
                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {msg.text}
                </div>

                {/* Grounded Sources Badge Section */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-3 border-t border-slate-200/80 space-y-1.5 text-[11px]">
                    <span className="font-bold text-slate-600 block uppercase tracking-wider text-[10px]">
                      {t('sourcesLabel')}
                    </span>
                    <div className="space-y-1.5">
                      {msg.sources.map((src, i) => (
                        <a
                          key={i}
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex flex-col gap-0.5 text-emerald-700 hover:text-emerald-900 font-semibold bg-white p-2 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors"
                        >
                          <div className="flex items-center gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                            <span className="truncate text-xs">{src.title}</span>
                          </div>
                          {src.organization && (
                            <span className="text-[10px] text-slate-500 pl-5">
                              Source: {src.organization}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 rounded-bl-none flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-xs text-slate-500 ml-1">
                  {language === 'hi' ? 'सत्यापित संदर्भ खोजे जा रहे हैं...' : 'Retrieving grounded sources...'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleFormSubmit} className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={t('assistantPlaceholder')}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-slate-900 bg-white"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="p-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{t('askButton')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
