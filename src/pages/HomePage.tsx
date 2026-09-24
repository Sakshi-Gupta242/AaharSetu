import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  FileText,
  CheckCircle2,
  Bot,
  Sparkles,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 border border-emerald-300 text-xs sm:text-sm font-semibold shadow-xs animate-in fade-in slide-in-from-top-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>{t('subtagline')}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              {language === 'hi' ? (
                <>
                  सुरक्षित आहार। <span className="text-emerald-600">सशक्त समाज।</span>
                </>
              ) : (
                <>
                  Safer Food. <span className="text-emerald-600">Smarter Communities.</span>
                </>
              )}
            </h1>

            {/* Explanation paragraph */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal">
              {t('heroDescription')}
            </p>

            {/* Prototype Notice Box */}
            <div className="p-3.5 bg-amber-50/90 rounded-2xl border border-amber-300 text-amber-900 text-xs sm:text-sm text-left flex items-start gap-3 shadow-xs">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">
                  {language === 'hi' ? 'स्वतंत्र छात्र प्रोटोटाइप सूचना' : 'Independent Student Demonstration'}
                </p>
                <p className="text-amber-800 text-xs mt-0.5 leading-normal">
                  {t('prototypeNotice')}
                </p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/consumer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <FileText className="w-5 h-5" />
                <span>{t('ctaConsumer')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/vendor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{t('ctaVendor')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/assistant"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-300 shadow-xs hover:border-slate-400 transition-all"
              >
                <Bot className="w-5 h-5 text-emerald-600" />
                <span>{t('navAssistant')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Two Pillars Grid (Consumer & Vendor) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {language === 'hi' ? 'दोहरे हितधारक समाधान' : 'Dual-Stakeholder Food Safety Ecosystem'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {language === 'hi'
              ? 'उपभोक्ताओं के लिए त्वरित सुरक्षा विश्लेषण और सूक्ष्म विक्रेताओं के लिए व्यावहारिक स्वच्छता सुधार।'
              : 'Bridging the awareness gap between conscious consumers and hardworking street food entrepreneurs.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Consumer Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {language === 'hi' ? 'उपभोक्ता मॉड्यूल' : 'Consumer Module'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                  {t('ctaConsumer')}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('ctaConsumerDesc')}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'hi'
                      ? '8 श्रेणियों में स्वतः वर्गीकरण (स्वच्छता, मिलावट, खराबी, आदि)'
                      : 'Automatic 8-category rule-based & NLP classification'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'hi'
                      ? 'जोखिम कारक पहचान और प्राथमिकता मूल्यांकन (कम / मध्यम / उच्च)'
                      : 'Risk factor breakdown & prototype priority assessment'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'hi'
                      ? 'प्रिंट करने योग्य घटना सारांश रिपोर्ट'
                      : 'Instant printable educational incident summary report'}
                  </span>
                </li>
              </ul>
            </div>

            <Link
              to="/consumer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition-colors"
            >
              <span>{t('ctaConsumer')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Vendor Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-100 hover:border-teal-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  {language === 'hi' ? 'विक्रेता मॉड्यूल' : 'Vendor Module'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                  {t('ctaVendor')}
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('ctaVendorDesc')}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>
                    {language === 'hi'
                      ? '10-बिंदु बुनियादी स्वच्छता स्व-मूल्यांकन (हां / नहीं / पक्का नहीं)'
                      : '10-point practical self-assessment questionnaire'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>
                    {language === 'hi'
                      ? 'स्कोर, ग्रेड और सुधार योग्य कमजोरियों की पहचान'
                      : 'Actionable hygiene score & gap analysis'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>
                    {language === 'hi'
                      ? '₹300 - ₹1000 बजट के अनुसार कम लागत सुधार किट योजना'
                      : 'Budget-aligned (₹300 - ₹2000) low-cost stall upgrades'}
                  </span>
                </li>
              </ul>
            </div>

            <Link
              to="/vendor"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow transition-colors"
            >
              <span>{t('ctaVendor')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <Link
            to="/planner"
            className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-200 hover:border-amber-400 shadow-xs hover:shadow transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">{t('navPlanner')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'छोटे बजट में स्टॉल स्वच्छता बढ़ाने के लिए अनुशंसित उपकरण और किट सूची।'
                : 'Prioritized, low-cost hygiene gear catalogue tailored for micro-budgets.'}
            </p>
          </Link>

          {/* Feature 2 */}
          <Link
            to="/assistant"
            className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/40 border border-emerald-200 hover:border-emerald-400 shadow-xs hover:shadow transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-200 text-emerald-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">{t('navAssistant')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'विश्व स्वास्थ्य संगठन और सार्वजनिक मानकों पर आधारित संदर्भ-सहित उत्तर।'
                : 'Source-grounded guidance with citations from WHO Five Keys and safety codex.'}
            </p>
          </Link>

          {/* Feature 3 */}
          <Link
            to="/dashboard"
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/40 border border-blue-200 hover:border-blue-400 shadow-xs hover:shadow transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-200 text-blue-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">{t('navDashboard')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'सिंथेटिक डेटा रुझान, जोखिम विश्लेषण और विक्रेता प्रगति डैशबोर्ड।'
                : 'Synthetic incident analytics, category distribution charts, and trends.'}
            </p>
          </Link>
        </div>
      </section>

      {/* 3-Step Workflow */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              {language === 'hi' ? 'कार्यप्रणाली' : 'How It Works'}
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              {language === 'hi' ? 'सरल एवं पारदर्शी प्रक्रिया' : 'Simple, Transparent Community Workflow'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-base">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {language === 'hi' ? 'अवलोकन या चेकलिस्ट दर्ज करें' : 'Record Observation or Check'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'उपभोक्ता भोजन की स्थिति दर्ज करते हैं या स्ट्रीट वेंडर 10 प्रश्नों की चेकलिस्ट भरते हैं।'
                  : 'Consumers report unhygienic/spoiled food, or stall owners evaluate their everyday setup.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-teal-700 text-white font-extrabold flex items-center justify-center text-base">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {language === 'hi' ? 'तत्काल एनएलपी व जोखिम विश्लेषण' : 'Instant Rule & NLP Evaluation'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'पारदर्शी नियम इंजन स्वचालित रूप से श्रेणी, जोखिम और प्राथमिकता तय करता है।'
                  : 'Transparent keyword & rule matching tags risk factors and prototype priority levels.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-extrabold flex items-center justify-center text-base">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {language === 'hi' ? 'व्यावहारिक मार्गदर्शन एवं योजना' : 'Actionable Guidance & Upgrades'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'उपभोक्ताओं को सुरक्षा सलाह और विक्रेताओं को बजट के अनुकूल सुधार योजना मिलती है।'
                  : 'Get immediate safety steps, printable summary reports, and budget-matched stall kits.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
