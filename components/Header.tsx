
import React from 'react';
import { Home, ShieldCheck, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  isSubscribed: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, isSubscribed }) => {
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
            <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Kawardha's #1 Rental App</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {isSubscribed ? (
             <div className="hidden md:flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-100">
               <ShieldCheck size={14} /> Premium Member
             </div>
          ) : (
            <span className="hidden md:inline text-xs text-gray-500 font-medium">Explore Properties</span>
          )}
          
          <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 font-medium transition-colors"
          >
            <LogOut size={16} /> <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
