import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { sendMessageToSaathi } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! I am Saathi AI. Ask me about rents or areas globally.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const responseText = await sendMessageToSaathi(userText);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-2xl z-40 flex items-center gap-2 group"
          >
            <Sparkles size={24} className="animate-pulse" />
            <motion.span 
              initial={{ width: 0, opacity: 0 }}
              whileHover={{ width: 'auto', opacity: 1 }}
              className="overflow-hidden whitespace-nowrap font-bold pr-1"
            >
              Ask Saathi AI
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-50 flex flex-col border border-gray-100 dark:border-slate-800 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-orange-600 p-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-tight">Saathi AI</h3>
                  <p className="text-[10px] text-orange-100 font-bold uppercase tracking-widest opacity-80">Global Guide</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-5 bg-orange-50/10 dark:bg-slate-950/40 flex flex-col gap-4 scrollbar-hide">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] px-5 py-3 rounded-[1.5rem] text-sm font-medium leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-orange-600 text-white rounded-tr-none shadow-lg shadow-orange-100 dark:shadow-none' 
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 shadow-sm rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
               {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white dark:bg-slate-800 text-orange-600 border border-slate-100 dark:border-slate-700 shadow-sm px-5 py-3 rounded-[1.5rem] rounded-tl-none flex items-center gap-1.5">
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-orange-600 rounded-full"></motion.span>
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-orange-600 rounded-full"></motion.span>
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-orange-600 rounded-full"></motion.span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Queries presets */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 flex gap-2 overflow-x-auto scrollbar-hide border-t border-slate-100 dark:border-slate-800">
              {[
                'Landlord Rules',
                'Agreement Help',
                'Avoid Brokerage'
              ].map((query, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInputValue(query === 'Landlord Rules' 
                      ? 'What are the main rules that landlords must follow on Room Saathi?' 
                      : query === 'Agreement Help' 
                      ? 'What should I verify in my rental agreement draft?' 
                      : 'How can I stay safe from local broker frauds?'
                    );
                  }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl flex-shrink-0 hover:border-orange-600 dark:hover:border-orange-500 transition-colors cursor-pointer"
                >
                  💡 {query}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about areas globally..."
                className="flex-1 bg-slate-50 dark:bg-slate-950 border-2 border-slate-50 dark:border-slate-850 rounded-2xl px-5 py-3 text-sm font-medium focus:border-orange-600 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none transition-all"
              />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="bg-orange-600 text-white p-3.5 rounded-2xl hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-100 dark:shadow-none"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
