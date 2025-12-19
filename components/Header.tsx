
import React from 'react';
import { Home, LogOut, Languages, Settings } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  onLogout: () => void;
  isSubscribed: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, isSubscribed, language, setLanguage }) => {
  const t = translations[language];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-18 py-3 flex items-center justify-between">
        
        {/* Logo Area */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onLogout}>
          <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-100">
            <Home size={22} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
              Room<span className="text-orange-600">Saathi</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mt-0.5">{t.appTagline}</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* Language Toggle */}
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
            className="flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 rounded-xl text-xs font-bold text-orange-700 transition-colors border border-orange-100"
          >
            <Languages size={16} className="text-orange-600" />
            <span className="hidden md:inline">{language === 'EN' ? 'हिन्दी' : 'English'}</span>
            <span className="md:hidden">{language === 'EN' ? 'HI' : 'EN'}</span>
          </button>

          <div className="h-8 w-px bg-slate-100"></div>

          <div className="flex items-center gap-4">
             <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:text-red-600 font-bold transition-colors"
            >
              <LogOut size={18} /> <span className="hidden sm:inline">{t.signOut}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
