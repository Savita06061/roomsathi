
import React from 'react';
import { Home, ShieldCheck, LogOut, Languages } from 'lucide-react';
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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo Area */}
        <div className="flex items-center space-x-2.5">
          <div className="bg-orange-600 p-1.5 rounded-lg text-white shadow-sm">
            <Home size={22} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">
              Room<span className="text-orange-600">Saathi</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">{t.appTagline}</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Toggle */}
          <button 
            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-bold text-gray-700 transition-colors border border-gray-200"
          >
            <Languages size={16} className="text-orange-600" />
            {language === 'EN' ? 'हिन्दी' : 'English'}
          </button>

          <div className="h-6 w-px bg-gray-200"></div>

          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 font-medium transition-colors"
          >
            <LogOut size={16} /> <span className="hidden sm:inline">{t.signOut}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
