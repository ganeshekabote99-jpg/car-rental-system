import React, { useState, useRef, useEffect } from 'react';
import { api } from '../services/api';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  ChevronDown,
  ArrowRight
} from 'lucide-react';

export const ChatbotWidget = ({ onSelectVehicleForBooking, onOpenAiWizard }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm **RideBot AI**, your VelocityFleet concierge. How can I assist your trip today?",
      quickActions: [
        "What documents are required?",
        "Show Electric Vehicles",
        "How do loyalty points work?",
        "Cancellation policy",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const data = await api.sendChatMessage(text.trim());
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.reply,
        suggestedVehicles: data.suggestedVehicles || [],
        quickActions: data.quickActions || [],
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "I'm having trouble connecting to fleet intelligence right now. Please browse our vehicle catalog or call our 24/7 hotline at +1 (800) 835-FLEET.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-all flex items-center space-x-2"
        >
          <Bot className="w-6 h-6 stroke-[2.2]" />
          <span className="hidden sm:inline font-bold text-sm tracking-wide">
            Chat with RideBot
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-slate-950 animate-ping"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[550px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-emerald-500/10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/60 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950">
                  <Bot className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-900"></span>
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center space-x-1.5">
                  <span>RideBot AI</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    24/7 Concierge
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">Autonomous fleet & booking assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none shadow-md shadow-emerald-500/10'
                      : 'bg-slate-800/80 text-slate-200 border border-slate-700/60 rounded-tl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>

                {/* Suggested Vehicle Cards in Bot Response */}
                {m.suggestedVehicles && m.suggestedVehicles.length > 0 && (
                  <div className="mt-2.5 space-y-2 w-full max-w-[90%]">
                    {m.suggestedVehicles.map((veh) => (
                      <div
                        key={veh._id}
                        className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition-colors"
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <img
                            src={veh.images?.[0]}
                            alt={veh.name}
                            className="w-12 h-9 object-cover rounded-lg shrink-0"
                          />
                          <div className="truncate">
                            <div className="font-bold text-white text-xs truncate">{veh.name}</div>
                            <div className="text-[10px] text-emerald-400">${veh.dailyRate}/day</div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onSelectVehicleForBooking(veh);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 shrink-0"
                        >
                          Book
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Action Chips */}
                {m.quickActions && m.quickActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {m.quickActions.map((action, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleSendMessage(action)}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 p-3 rounded-2xl bg-slate-800/50 border border-slate-700/40 w-fit text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-slate-950 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about cars, pricing, policies..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};

