import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm font-medium">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1 bg-amber-200 rounded-full text-amber-800 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </span>
          <p>
            <strong className="font-semibold">
              {language === 'hi' ? 'शैक्षणिक प्रोटोटाइप:' : 'Educational Prototype:'}
            </strong>{' '}
            {language === 'hi'
              ? 'यह एक स्वतंत्र छात्र प्रोटोटाइप है और कोई आधिकारिक FSSAI निरीक्षण या नियामक प्रणाली नहीं है।'
              : 'This is an independent student prototype for educational demonstration. Not an official FSSAI system.'}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-amber-800 shrink-0 text-xs bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{language === 'hi' ? 'सार्वजनिक जागरूकता पहल' : 'Public Awareness Initiative'}</span>
        </div>
      </div>
    </div>
  );
};
