import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CategoryType, Complaint } from '../types';
import { classifyComplaint } from '../utils/classifier';
import { storageService } from '../services/storage';
import { PrintableReportModal } from '../components/PrintableReportModal';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  UploadCloud,
  Printer,
  Sparkles,
  ArrowRight,
  Info,
  AlertCircle
} from 'lucide-react';

const CATEGORIES: CategoryType[] = [
  'Hygiene',
  'Contamination',
  'Adulteration',
  'Packaging',
  'Labelling',
  'Spoilage/Expired Food',
  'Food Premises',
  'Other'
];

export const ConsumerPage: React.FC = () => {
  const { t, language } = useLanguage();

  // Form State
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Auto');
  const [location, setLocation] = useState('');
  const [stallType, setStallType] = useState('Street Food Stall');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  // Submission & Result State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Demo Scenarios Preset Handlers
  const handleApplyDemo = (demoType: 'juice' | 'streetfood' | 'milk' | 'label' | 'insects') => {
    if (demoType === 'juice') {
      setFoodName('Swollen Tetrapack Mango Juice (250ml)');
      setDescription('I bought a packaged juice and the packet was swollen with an unusual smell and puffiness.');
      setSelectedCategory('Auto');
      setLocation('Karol Bagh Market, New Delhi');
      setStallType('Packaged Retail / Corner Grocery');
    } else if (demoType === 'streetfood') {
      setFoodName('Roadside Chole Bhature & Exposed Chutney');
      setDescription('Uncovered chole vessels kept right beside an open drain with flies sitting on the prepared food and unwashed serving plates.');
      setSelectedCategory('Auto');
      setLocation('Sector 18 Market, Noida');
      setStallType('Street Cart / Food Van');
    } else if (demoType === 'milk') {
      setFoodName('Artificial Bright Yellow Rasmalai & Sweet Milk');
      setDescription('The sweet milk had an unnatural neon yellow coloring that strongly stained fingers and tasted like chemical detergent.');
      setSelectedCategory('Auto');
      setLocation('Laxmi Nagar Chowk, East Delhi');
      setStallType('Sweet & Dairy Counter');
    } else if (demoType === 'label') {
      setFoodName('Spicy Mixture Namkeen Pouch');
      setDescription('The packet was sealed but the expiry date, best before, and FSSAI license number fields were completely missing.');
      setSelectedCategory('Auto');
      setLocation('Hauz Khas Market, New Delhi');
      setStallType('Retail Grocery');
    } else if (demoType === 'insects') {
      setFoodName('Prepared Fried Rice & Noodle Counter');
      setDescription('Observed multiple cockroaches and flies crawling across the open cabbage shredder and noodle prep table.');
      setSelectedCategory('Auto');
      setLocation('Connaught Place Outer Circle, New Delhi');
      setStallType('Fast Food Stall');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError(
        language === 'hi'
          ? 'फ़ाइल का आकार 5MB से कम होना चाहिए।'
          : 'File size must be less than 5MB.'
      );
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim() || !description.trim()) return;

    setIsSubmitting(true);

    // Simulate classification processing
    setTimeout(() => {
      const classification = classifyComplaint(description, foodName, selectedCategory);
      const newId = `AS-2025-${Math.floor(1000 + Math.random() * 9000)}`;

      const newComplaint: Complaint = {
        id: newId,
        foodName,
        description,
        category: classification.category,
        detectedCategory: classification.category,
        location: location.trim() || (language === 'hi' ? 'स्थानीय बाज़ार' : 'Local Market'),
        stallType,
        date,
        evidenceUrl: photoPreview || undefined,
        detectedRiskFactors: classification.detectedRiskFactors,
        prototypePriority: classification.prototypePriority,
        priorityExplanation: classification.explanation,
        recommendedActions: classification.recommendedActions,
        status: 'Under Review',
        createdAt: new Date().toISOString(),
        synthetic: false
      };

      storageService.saveComplaint(newComplaint);
      setSubmittedComplaint(newComplaint);
      setIsSubmitting(false);

      // Scroll to assessment result
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }, 600);
  };

  const handleResetForm = () => {
    setSubmittedComplaint(null);
    setFoodName('');
    setDescription('');
    setSelectedCategory('Auto');
    setLocation('');
    setPhotoPreview(null);
    setPhotoError(null);
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High':
        return {
          bg: 'bg-rose-50 border-rose-300 text-rose-900',
          badge: 'bg-rose-600 text-white',
          text: 'text-rose-700'
        };
      case 'Medium':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-900',
          badge: 'bg-amber-600 text-white',
          text: 'text-amber-700'
        };
      default:
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          badge: 'bg-emerald-600 text-white',
          text: 'text-emerald-700'
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
          <FileText className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'उपभोक्ता मॉड्यूल' : 'Consumer Module'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          {t('consumerTitle')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {t('consumerSubtitle')}
        </p>
      </div>

      {/* Demo Scenario Quick-Pills */}
      <div className="bg-slate-100/90 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>{t('tryDemoScenarios')}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleApplyDemo('juice')}
            className="text-xs px-3 py-1.5 bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-lg shadow-xs font-semibold transition-all"
          >
            {t('demoSwollenJuice')}
          </button>
          <button
            type="button"
            onClick={() => handleApplyDemo('streetfood')}
            className="text-xs px-3 py-1.5 bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-lg shadow-xs font-semibold transition-all"
          >
            {t('demoExposedFood')}
          </button>
          <button
            type="button"
            onClick={() => handleApplyDemo('milk')}
            className="text-xs px-3 py-1.5 bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-lg shadow-xs font-semibold transition-all"
          >
            {t('demoAdulteratedMilk')}
          </button>
          <button
            type="button"
            onClick={() => handleApplyDemo('label')}
            className="text-xs px-3 py-1.5 bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-lg shadow-xs font-semibold transition-all"
          >
            {t('demoMissingLabel')}
          </button>
          <button
            type="button"
            onClick={() => handleApplyDemo('insects')}
            className="text-xs px-3 py-1.5 bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-lg shadow-xs font-semibold transition-all"
          >
            {t('demoInsectContamination')}
          </button>
        </div>
      </div>

      {/* Main Submission Form */}
      {!submittedComplaint ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Food Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('foodNameLabel')} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder={t('foodNamePlaceholder')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm placeholder-slate-400"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('descLabel')} <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('descPlaceholder')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm placeholder-slate-400 leading-relaxed"
              />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('categoryLabel')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm bg-white"
              >
                <option value="Auto">{t('autoDetect')}</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Establishment / Stall Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('stallTypeLabel')}
              </label>
              <select
                value={stallType}
                onChange={(e) => setStallType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm bg-white"
              >
                <option value="Street Cart / Food Van">Street Cart / Food Van</option>
                <option value="Fast Food Stall">Fast Food Stall</option>
                <option value="Sweet & Dairy Counter">Sweet & Dairy Counter</option>
                <option value="Packaged Retail / Corner Grocery">Packaged Retail / Corner Grocery</option>
                <option value="Restaurant / Dhaba">Restaurant / Dhaba</option>
                <option value="Juice / Beverage Counter">Juice / Beverage Counter</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('locationLabel')}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('locationPlaceholder')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm placeholder-slate-400"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('dateLabel')}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-sm bg-white"
              />
            </div>

            {/* Photo / Evidence Upload */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('photoUploadLabel')}
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-2xl hover:border-emerald-400 transition-colors bg-slate-50/50">
                <div className="space-y-2 text-center">
                  <UploadCloud className="mx-auto h-8 w-8 text-slate-400" />
                  <div className="flex text-xs text-slate-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-semibold text-emerald-600 hover:text-emerald-500 focus-within:outline-none px-2 py-1 shadow-xs border border-slate-200">
                      <span>{language === 'hi' ? 'फ़ाइल चुनें' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-2 pt-1 text-slate-500">PNG, JPG up to 5MB</p>
                  </div>
                  {photoError && (
                    <p className="text-xs text-rose-600 font-semibold">{photoError}</p>
                  )}
                  {photoPreview && (
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <img
                        src={photoPreview}
                        alt="Evidence Preview"
                        className="h-16 w-16 object-cover rounded-lg border border-slate-300 shadow-xs"
                      />
                      <span className="text-xs text-emerald-700 font-semibold">
                        ✓ {language === 'hi' ? 'तस्वीर संलग्न है' : 'Image attached'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{language === 'hi' ? 'कोई व्यक्तिगत या संवेदनशील डेटा संग्रहीत नहीं किया जाता है।' : 'No Aadhaar, phone, or sensitive personal data collected.'}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>{t('analyzing')}</span>
                </>
              ) : (
                <>
                  <span>{t('submitComplaint')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Assessment Results Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-lg space-y-6 animate-in fade-in duration-300">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {submittedComplaint.id}
                </span>
                <span className="text-xs text-slate-500">
                  {submittedComplaint.date}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {t('assessmentTitle')}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPrintModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>{t('printSummary')}</span>
              </button>
              <button
                onClick={handleResetForm}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                <span>{t('submitAnother')}</span>
              </button>
            </div>
          </div>

          {/* Educational Disclaimer Callout */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                {language === 'hi' ? 'महत्वपूर्ण सूचना:' : 'Prototype Priority Assessment Disclaimer:'}
              </p>
              <p className="mt-0.5 text-amber-800">
                {t('assessmentDisclaimer')}
              </p>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Detected Category */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('detectedCategory')}
              </span>
              <p className="text-lg font-extrabold text-slate-900">
                {submittedComplaint.detectedCategory}
              </p>
            </div>

            {/* Prototype Priority */}
            <div
              className={`p-4 rounded-2xl border space-y-1 ${
                getPriorityStyle(submittedComplaint.prototypePriority).bg
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                {t('priorityLevel')}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-extrabold ${
                    getPriorityStyle(submittedComplaint.prototypePriority).badge
                  }`}
                >
                  {submittedComplaint.prototypePriority} Priority
                </span>
              </div>
            </div>

            {/* Product & Location */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {language === 'hi' ? 'स्थान एवं उत्पाद' : 'Product & Location'}
              </span>
              <p className="text-sm font-bold text-slate-900 truncate">
                {submittedComplaint.foodName}
              </p>
              <p className="text-xs text-slate-500 truncate">{submittedComplaint.location}</p>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t('riskFactors')}
            </h4>
            <div className="space-y-2">
              {submittedComplaint.detectedRiskFactors.map((factor, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm font-medium"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t('explanation')}
            </h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm leading-relaxed">
              {submittedComplaint.priorityExplanation}
            </div>
          </div>

          {/* Recommended Next Steps */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t('recommendedNextSteps')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {submittedComplaint.recommendedActions.map((action, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Printable Report Modal */}
      {showPrintModal && (
        <PrintableReportModal
          complaint={submittedComplaint}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </div>
  );
};
