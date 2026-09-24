import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  AAHAR<span className="text-emerald-400">SETU</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">{t('tagline')}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              {t('heroDescription')}
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs text-amber-300 flex items-start gap-2">
              <span className="text-base leading-none">⚠️</span>
              <p>
                <strong>{language === 'hi' ? 'महत्वपूर्ण अस्वीकरण:' : 'Important Disclaimer:'}</strong>{' '}
                {language === 'hi'
                  ? 'आहारसेतु एक स्वतंत्र शैक्षणिक छात्र परियोजना है। यह कोई आधिकारिक FSSAI प्रणाली नहीं है।'
                  : 'AaharSetu is an independent student prototype exploring AI, NLP, and information retrieval for food safety awareness. Not an official FSSAI system.'}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {language === 'hi' ? 'त्वरित लिंक' : 'Platform Modules'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/consumer" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t('navConsumer')}
                </Link>
              </li>
              <li>
                <Link to="/vendor" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t('navVendor')}
                </Link>
              </li>
              <li>
                <Link to="/planner" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t('navPlanner')}
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t('navAssistant')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t('navDashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Reference Sources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {language === 'hi' ? 'सार्वजनिक संदर्भ' : 'Open Knowledge Sources'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="https://www.who.int/activities/promoting-safe-food-handling"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>WHO Five Keys to Safer Food</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.fao.org/fao-who-codexalimentarius/codex-texts/codes-of-practice/en/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Codex Alimentarius Code (CXC 43-1997)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.who.int/news-room/fact-sheets/detail/food-safety"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>WHO Food Safety Fact Sheet</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t('allRightsReserved')}</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with care for Food Safety & Community Health</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
