import React from 'react';
import { Complaint } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { X, Printer, ShieldAlert, AlertTriangle, CheckCircle, Calendar, MapPin, Tag } from 'lucide-react';

interface PrintableReportModalProps {
  complaint: Complaint | null;
  onClose: () => void;
}

export const PrintableReportModal: React.FC<PrintableReportModalProps> = ({ complaint, onClose }) => {
  const { language, t } = useLanguage();

  if (!complaint) return null;

  const handlePrint = () => {
    window.print();
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar - Hidden on print */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm tracking-wide">
              {language === 'hi' ? 'घटना सारांश रिपोर्ट' : 'Incident Summary Assessment'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'hi' ? 'प्रिंट करें' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 space-y-6 print:p-0 print:space-y-4 text-slate-900 printable-document">
          {/* Document Header */}
          <div className="border-b-2 border-slate-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  AAHAR<span className="text-emerald-600">SETU</span>
                </span>
                <span className="text-xs px-2 py-0.5 font-bold uppercase tracking-wider bg-slate-100 text-slate-700 rounded border border-slate-300">
                  Educational Incident Report
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Safer Food. Smarter Communities. • Community Assistance Platform
              </p>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-xs font-mono text-slate-500 block">ID: {complaint.id}</span>
              <span className="text-xs text-slate-600">Generated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Educational Prototype Disclaimer Callout */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 text-xs text-amber-900">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">
                  {language === 'hi' ? 'प्रोटोटाइप मूल्यांकन सूचना:' : 'Prototype Priority Assessment Notice:'}
                </p>
                <p className="mt-0.5 text-amber-800">
                  {t('assessmentDisclaimer')}
                </p>
              </div>
            </div>
          </div>

          {/* Key Incident Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {language === 'hi' ? 'खाद्य पदार्थ / उत्पाद' : 'Food / Product Name'}
              </span>
              <p className="font-bold text-slate-900 mt-0.5 text-base">{complaint.foodName}</p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {t('priorityLevel')}
              </span>
              <span
                className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold border ${getPriorityBadge(
                  complaint.prototypePriority
                )}`}
              >
                {complaint.prototypePriority} Priority Assessment
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <Tag className="w-4 h-4 text-slate-400" />
              <span>
                <strong className="font-medium text-slate-900">Category:</strong> {complaint.detectedCategory}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                <strong className="font-medium text-slate-900">Date:</strong> {complaint.date}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-700 sm:col-span-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>
                <strong className="font-medium text-slate-900">Location:</strong> {complaint.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              {language === 'hi' ? 'शिकायत का विवरण' : 'Submitted Observation Description'}
            </h4>
            <div className="p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 leading-relaxed">
              {complaint.description}
            </div>
          </div>

          {/* Detected Risk Factors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {t('riskFactors')}
            </h4>
            <div className="space-y-1.5">
              {complaint.detectedRiskFactors.map((factor, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-xs sm:text-sm bg-rose-50/70 border border-rose-200 text-rose-900 px-3 py-2 rounded-lg"
                >
                  <span className="font-bold text-rose-700 mt-0.5">•</span>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              {t('explanation')}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {complaint.priorityExplanation}
            </p>
          </div>

          {/* Recommended Next Steps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {t('recommendedNextSteps')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
              {complaint.recommendedActions.map((action, i) => (
                <li key={i} className="flex items-start gap-2 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer note */}
          <div className="border-t border-slate-200 pt-4 text-[11px] text-slate-500 text-center leading-relaxed">
            <p>
              AaharSetu Independent Student Prototype • Educational Public Hygiene Workflow Tool.
            </p>
            <p>
              References: WHO Five Keys to Safer Food • Codex Alimentarius Street Food Standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
