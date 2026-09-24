import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IMPROVEMENT_CATALOGUE } from '../data/catalogue';
import { storageService } from '../services/storage';
import {
  Sparkles,
  Printer,
  AlertCircle,
  ShoppingBag,
  Filter,
  Check,
  Plus
} from 'lucide-react';

export const ImprovementPlannerPage: React.FC = () => {
  const { t, language } = useLanguage();

  // Selected Budget
  const [budget, setBudget] = useState<number>(500);
  const [customBudgetInput, setCustomBudgetInput] = useState<string>('500');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Selected Items in Kit
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([
    'mesh-cover-set',
    'handwash-dispenser-kit',
    'pedal-dustbin'
  ]);

  // Load latest vendor check gaps to prioritize
  const [vendorGaps, setVendorGaps] = useState<number[]>([]);

  useEffect(() => {
    const latestCheck = storageService.getLatestVendorCheck();
    if (latestCheck) {
      const gaps: number[] = [];
      Object.entries(latestCheck.answers).forEach(([qId, ans]) => {
        if (ans === 'no' || ans === 'not_sure') {
          gaps.push(Number(qId));
        }
      });
      setVendorGaps(gaps);

      // Auto select items that resolve the vendor's gaps within budget
      const recommended: string[] = [];
      let currentSum = 0;
      IMPROVEMENT_CATALOGUE.forEach((item) => {
        const matchesGap = item.targetQuestionIds.some((id) => gaps.includes(id));
        if (matchesGap && currentSum + item.cost <= budget) {
          recommended.push(item.id);
          currentSum += item.cost;
        }
      });

      if (recommended.length > 0) {
        setSelectedItemIds(recommended);
      }
    }
  }, [budget]);

  const handleBudgetPreset = (amount: number) => {
    setBudget(amount);
    setCustomBudgetInput(amount.toString());
  };

  const handleCustomBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customBudgetInput, 10);
    if (!isNaN(val) && val > 0) {
      setBudget(val);
    }
  };

  const toggleItem = (id: string) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds(selectedItemIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedItemIds([...selectedItemIds, id]);
    }
  };

  const totalCost = selectedItemIds.reduce((acc, id) => {
    const item = IMPROVEMENT_CATALOGUE.find((it) => it.id === id);
    return acc + (item ? item.cost : 0);
  }, 0);

  const filteredItems = IMPROVEMENT_CATALOGUE.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'माइक्रो-बजट स्वच्छता उन्नयन' : 'Micro-Budget Hygiene Upgrade'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {t('plannerTitle')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {t('plannerSubtitle')}
        </p>
      </div>

      {/* Demo Price Disclaimer */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-3 shadow-xs">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">
            {language === 'hi' ? 'डेमो मूल्य सूचना:' : 'Demo Costing Notice:'}
          </p>
          <p className="mt-0.5 text-amber-800 text-xs">
            {t('catalogueNote')}
          </p>
        </div>
      </div>

      {/* Budget Selector & Tracker Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t('budgetLabel')}
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {[300, 500, 1000, 2000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleBudgetPreset(amt)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                    budget === amt
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Custom budget input */}
          <form onSubmit={handleCustomBudgetSubmit} className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                min="50"
                step="50"
                value={customBudgetInput}
                onChange={(e) => setCustomBudgetInput(e.target.value)}
                placeholder={t('customBudgetPlaceholder')}
                className="w-32 pl-7 pr-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
            >
              {language === 'hi' ? 'सेट करें' : 'Set'}
            </button>
          </form>
        </div>

        {/* Budget Progress Meter */}
        <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-bold gap-2">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-slate-600" />
              <span>{t('budgetSummary')}</span>
              <span className="text-lg font-black text-slate-900">₹{totalCost}</span>
              <span className="text-slate-400 font-normal">/ ₹{budget}</span>
            </div>

            <div>
              {totalCost <= budget ? (
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 text-xs">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('withinBudget')} (₹{budget - totalCost} {language === 'hi' ? 'शेष' : 'remaining'})</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full border border-rose-300 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{t('budgetExceeded')} (₹{totalCost - budget} {language === 'hi' ? 'अधिक' : 'over budget'})</span>
                </span>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                totalCost <= budget ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, (totalCost / budget) * 100)}%` }}
            ></div>
          </div>

          {vendorGaps.length > 0 && (
            <p className="text-xs text-teal-800 font-medium pt-1">
              ✨ {t('recommendedForYou')} ({vendorGaps.length} {language === 'hi' ? 'कमियां खोजी गईं' : 'gaps identified'})
            </p>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {[
          { id: 'all', label: t('categoryFilterAll') },
          { id: 'food_protection', label: t('filterFoodProtection') },
          { id: 'water_sanitation', label: t('filterWaterSanitation') },
          { id: 'waste_management', label: t('filterWasteManagement') },
          { id: 'personal_hygiene', label: t('filterPersonalHygiene') },
          { id: 'storage_pest', label: t('filterStoragePest') }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedCategory(filter.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === filter.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Item Catalogue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isSelected = selectedItemIds.includes(item.id);
          const resolvesVendorGap = item.targetQuestionIds.some((id) => vendorGaps.includes(id));

          return (
            <div
              key={item.id}
              className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-emerald-50/40 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                {/* Header row with badges & price */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                    {language === 'hi' ? item.categoryLabelHi : item.categoryLabel}
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900">₹{item.cost}</span>
                    <span className="text-[10px] text-slate-400 block">{language === 'hi' ? 'अनुमानित' : 'est. cost'}</span>
                  </div>
                </div>

                {resolvesVendorGap && (
                  <span className="inline-block text-[11px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded border border-teal-300">
                    ★ {language === 'hi' ? 'आपकी चेकलिस्ट के अनुसार अनुशंसित' : 'Recommended for your gaps'}
                  </span>
                )}

                {/* Name */}
                <h3 className="font-black text-slate-900 text-base leading-snug">
                  {language === 'hi' ? item.nameHi : item.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'hi' ? item.descriptionHi : item.description}
                </p>

                {/* Vendor Benefit & Tip */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-emerald-900">
                    💡 {language === 'hi' ? item.vendorBenefitHi : item.vendorBenefit}
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Tip: {language === 'hi' ? item.practicalTipHi : item.practicalTip}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                  isSelected
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300'
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === 'hi' ? 'किट में जोड़ा गया' : 'Added to Stall Kit'}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>{language === 'hi' ? 'किट में जोड़ें' : 'Add to Stall Kit'}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Printable Stall Checklist & Summary Action */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl no-print">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-black flex items-center justify-center sm:justify-start gap-2">
            <Printer className="w-5 h-5 text-amber-400" />
            <span>{t('printChecklist')}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
            {language === 'hi'
              ? 'अपनी चयनित किट और दैनिक स्टॉल स्वच्छता गाइड को स्थानीय बाज़ार खरीदारी के लिए प्रिंट करें।'
              : 'Print your selected micro-upgrade kit and daily vendor routine for market procurement.'}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg transition-all transform hover:scale-105 shrink-0 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>{language === 'hi' ? 'चेकलिस्ट प्रिंट करें' : 'Print Action Plan'}</span>
        </button>
      </div>
    </div>
  );
};
