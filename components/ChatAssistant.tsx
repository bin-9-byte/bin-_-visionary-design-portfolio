import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Loader2, Terminal } from 'lucide-react';
import { sendMessageToGemini, ChatMessage } from '../services/geminiService';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Systems initialized. I am NEXUS AI. Query me regarding Alex's design protocols or availability." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages, userMsg.text);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-8 right-8 z-50 p-4 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(56,189,248,0.45)] hover:border-sky-300 transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="w-6 h-6 group-hover:text-sky-300 transition-colors" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-300"></span>
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 md:right-8 w-[90vw] md:w-[400px] h-[550px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-sky-500/20 rounded-md border border-sky-400/60">
                   <Terminal size={14} className="text-sky-300" />
                </div>
                <div>
                   <span className="font-mono font-bold text-sm tracking-wider block leading-none">NEXUS AI</span>
                   <span className="text-[10px] text-emerald-300 uppercase tracking-wider">Online</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white hover:bg-white/10 p-1 rounded-full transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 font-mono text-sm scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-xl relative ${
                      msg.role === 'user'
                        ? 'bg-sky-300/10 border border-sky-300/25 text-white rounded-br-none ml-8'
                        : 'bg-zinc-900 border border-white/10 text-gray-300 rounded-bl-none mr-8'
                    }`}
                  >
                    {msg.role === 'model' && (
                        <span className="absolute -top-3 left-0 text-[10px] text-gray-500 uppercase tracking-wider bg-black/80 px-1 border border-white/5 rounded">Nexus</span>
                    )}
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-white/10 p-4 rounded-xl rounded-bl-none flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-sky-300" />
                    <span className="text-xs text-sky-300 animate-pulse">Computing response...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/60 backdrop-blur-lg">
              <div className="flex items-center gap-2 bg-zinc-900/50 border border-white/10 rounded-full px-4 py-2 focus-within:border-sky-300/60 focus-within:bg-zinc-900 transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Enter command..."
                  className="flex-1 bg-transparent border-none text-white focus:ring-0 placeholder-gray-600 font-mono text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2 text-sky-300 hover:bg-sky-300/20 rounded-full transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
