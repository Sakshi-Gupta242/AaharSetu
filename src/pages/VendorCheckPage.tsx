import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { VENDOR_QUESTIONS } from '../data/catalogue';
import { storageService } from '../services/storage';
import { VendorCheckResult } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  XCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  CheckCircle
} from 'lucide-react';

export const VendorCheckPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Form State
  const [stallName, setStallName] = useState('Gupta Fast Food & Chaat');
  const [location, setLocation] = useState('Sector 18 Market, Noida');
  const [stallType, setStallType] = useState('Street Food Cart / Thela');

  // Answers map: questionId -> 'yes' | 'no' | 'not_sure'
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no' | 'not_sure'>>({
    1: 'yes',
    2: 'yes',
    3: 'no',
    4: 'yes',
    5: 'no',
    6: 'yes',
    7: 'yes',
    8: 'no',
    9: 'no',
    10: 'yes'
  });

  const [result, setResult] = useState<VendorCheckResult | null>(null);

  const handleAnswerChange = (questionId: number, value: 'yes' | 'no' | 'not_sure') => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    let passedCount = 0;
    let failedCount = 0;
    let uncertainCount = 0;
    const completedPractices: string[] = [];
    const areasNeedingAttention: string[] = [];
    const priorityImprovements: string[] = [];

    VENDOR_QUESTIONS.forEach((q) => {
      const ans = answers[q.id];
      const qText = language === 'hi' ? q.questionHi : q.questionEn;
      if (ans === 'yes') {
        passedCount++;
        completedPractices.push(qText);
      } else if (ans === 'no') {
        failedCount++;
        areasNeedingAttention.push(qText);
        priorityImprovements.push(language === 'hi' ? q.guidanceHi : q.guidanceEn);
      } else {
        uncertainCount++;
        areasNeedingAttention.push(`${qText} (${language === 'hi' ? 'पुष्टि आवश्यक' : 'Uncertain'})`);
      }
    });

    const score = Math.round((passedCount / VENDOR_QUESTIONS.length) * 100);

    let grade: VendorCheckResult['grade'] = 'Grade A - Excellent Hygiene';
    let gradeHi = 'ग्रेड A - उत्कृष्ट स्वच्छता';

    if (score >= 80) {
      grade = 'Grade A - Excellent Hygiene';
      gradeHi = 'ग्रेड A - उत्कृष्ट स्वच्छता';
    } else if (score >= 60) {
      grade = 'Grade B - Good Hygiene';
      gradeHi = 'ग्रेड B - अच्छी स्वच्छता';
    } else if (score >= 40) {
      grade = 'Grade C - Needs Improvement';
      gradeHi = 'ग्रेड C - सुधार की आवश्यकता';
    } else {
      grade = 'Critical - Immediate Action Needed';
      gradeHi = 'गंभीर - तत्काल सुधार आवश्यक';
    }

    const checkResult: VendorCheckResult = {
      id: `VC-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      stallName: stallName.trim() || 'Food Stall',
      location: location.trim() || 'Local Area',
      stallType,
      date: new Date().toISOString().split('T')[0],
      answers,
      score,
      passedCount,
      failedCount,
      uncertainCount,
      grade,
      gradeHi,
      completedPractices,
      areasNeedingAttention,
      priorityImprovements,
      createdAt: new Date().toISOString()
    };

    storageService.saveVendorCheck(checkResult);
    setResult(checkResult);

    // Scroll to results
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleReset = () => {
    setResult(null);
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-100 border-emerald-300';
    if (score >= 60) return 'text-teal-700 bg-teal-100 border-teal-300';
    if (score >= 40) return 'text-amber-700 bg-amber-100 border-amber-300';
    return 'text-rose-700 bg-rose-100 border-rose-300';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold border border-teal-300">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'विक्रेता मॉड्यूल' : 'Vendor Module'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {t('vendorTitle')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {t('vendorSubtitle')}
        </p>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">
            {language === 'hi' ? 'स्व-मूल्यांकन अस्वीकरण:' : 'Self-Assessment Disclaimer:'}
          </p>
          <p className="mt-0.5 text-amber-800 text-xs">
            {t('vendorDisclaimer')}
          </p>
        </div>
      </div>

      {!result ? (
        /* Questionnaire Form */
        <form onSubmit={handleCalculate} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
          {/* Stall Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-200">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('stallNameLabel')}
              </label>
              <input
                type="text"
                value={stallName}
                onChange={(e) => setStallName(e.target.value)}
                placeholder="e.g. Ramesh Chaat Corner"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('vendorLocationLabel')}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Karol Bagh Market"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('stallTypeOpt')}
              </label>
              <select
                value={stallType}
                onChange={(e) => setStallType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-slate-900 text-sm bg-white"
              >
                <option value="Street Food Cart / Thela">Street Food Cart / Thela</option>
                <option value="Temporary Kiosk / Stall">Temporary Kiosk / Stall</option>
                <option value="Permanent Micro-Eatery">Permanent Micro-Eatery</option>
                <option value="Juice / Shake Counter">Juice / Shake Counter</option>
              </select>
            </div>
          </div>

          {/* 10 Hygiene Questions */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
              <span>
                {language === 'hi'
                  ? '10-बिंदु बुनियादी स्वच्छता चेकलिस्ट'
                  : '10-Point Everyday Hygiene Checklist'}
              </span>
            </h3>

            <div className="space-y-4">
              {VENDOR_QUESTIONS.map((q, index) => {
                const currentAns = answers[q.id] || 'yes';
                return (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-teal-300 transition-all bg-slate-50/50 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-teal-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                            {language === 'hi' ? q.questionHi : q.questionEn}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 pl-8">
                          {language === 'hi' ? q.guidanceHi : q.guidanceEn}
                        </p>
                      </div>

                      {/* Tri-state buttons */}
                      <div className="flex items-center gap-1.5 pl-8 sm:pl-0 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleAnswerChange(q.id, 'yes')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            currentAns === 'yes'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t('yes')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAnswerChange(q.id, 'no')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            currentAns === 'no'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{t('no')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAnswerChange(q.id, 'not_sure')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            currentAns === 'not_sure'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>{t('notSure')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-base shadow-md hover:shadow-lg transition-all"
            >
              <span>{t('calculateScore')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      ) : (
        /* Evaluation Results Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-200 shadow-lg space-y-8 animate-in fade-in duration-300">
          {/* Result Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-100 text-teal-800 border border-teal-300">
                  {result.id}
                </span>
                <span className="text-xs text-slate-500">{result.stallName} • {result.location}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {language === 'hi' ? 'स्टॉल स्वच्छता मूल्यांकन परिणाम' : 'Stall Hygiene Assessment Summary'}
              </h2>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'पुनः मूल्यांकन करें' : 'Retake Assessment'}</span>
            </button>
          </div>

          {/* Score & Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Score */}
            <div className={`p-6 rounded-2xl border text-center space-y-1 ${getScoreBadgeColor(result.score)}`}>
              <span className="text-xs font-bold uppercase tracking-wider block">
                {t('hygieneScore')}
              </span>
              <div className="text-4xl font-black tracking-tight">{result.score}/100</div>
              <p className="text-xs font-semibold">
                {result.passedCount} of {VENDOR_QUESTIONS.length} {language === 'hi' ? 'मानक पूरे किए' : 'Practices Met'}
              </p>
            </div>

            {/* Grade */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-1 sm:col-span-2 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('gradeLabel')}
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'hi' ? result.gradeHi : result.grade}
              </div>
              <p className="text-xs text-slate-500">
                {language === 'hi'
                  ? 'व्यावहारिक सुधार के लिए नीचे दिए गए सुझावों का पालन करें।'
                  : 'Follow the targeted action plan below to level up hygiene.'}
              </p>
            </div>
          </div>

          {/* Completed vs Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Completed */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{t('completedPractices')} ({result.passedCount})</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                {result.completedPractices.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas Needing Attention */}
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>{t('areasAttention')} ({result.failedCount + result.uncertainCount})</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                {result.areasNeedingAttention.length > 0 ? (
                  result.areasNeedingAttention.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">⚠️</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-emerald-800 font-semibold">
                    {language === 'hi' ? 'सभी मुख्य मानक पूरे हैं!' : 'All core practices met! Keep it up.'}
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* CTA to Low-Cost Planner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-900 to-emerald-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{language === 'hi' ? 'अगला व्यावहारिक कदम' : 'Recommended Next Step'}</span>
              </div>
              <h3 className="text-xl font-black">
                {language === 'hi' ? 'बजट के अनुसार स्टॉल अपग्रेड किट चुनें' : 'Build Your Low-Cost Improvement Plan'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-lg">
                {language === 'hi'
                  ? 'अपनी पहचानी गई कमियों के अनुसार ₹300, ₹500 या ₹1000 के भीतर प्रमाणित उपकरण चुनें।'
                  : 'Filter hygiene equipment matching your gaps within ₹300, ₹500, or ₹1000 micro-budgets.'}
              </p>
            </div>

            <button
              onClick={() => navigate('/planner')}
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg transition-all transform hover:scale-105 shrink-0 flex items-center gap-2"
            >
              <span>{t('actionPlanBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
