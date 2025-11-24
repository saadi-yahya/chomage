import React, { useState, useRef, useEffect } from 'react';
import { createChatSession } from '../services/geminiService';
import { ChatRole, ChatMessage } from '../types';
import { Send, User, Bot, AlertCircle } from 'lucide-react';
import { GenerateContentResponse } from '@google/genai';

export const Coach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: ChatRole.MODEL, text: "Hi! I'm Coach Pro. I can help you rewrite your CV, prepare for interviews, or plan your career path. How can I help today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef(createChatSession());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: ChatRole.USER,
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const chat = chatSessionRef.current;
      if (!chat) {
        throw new Error("Chat session not initialized. Missing API Key?");
      }

      const result = await chat.sendMessageStream({ message: userMsg.text });
      
      let fullText = "";
      const modelMsgId = (Date.now() + 1).toString();
      
      // Add placeholder for streaming
      setMessages(prev => [...prev, { id: modelMsgId, role: ChatRole.MODEL, text: "..." }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages(prev => prev.map(m => 
            m.id === modelMsgId ? { ...m, text: fullText } : m
          ));
        }
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: ChatRole.MODEL, 
        text: "I'm having trouble connecting right now. Please check your API key setup.",
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:h-[calc(100vh-60px)] -m-6 rounded-none md:rounded-xl overflow-hidden bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-white flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Bot className="text-orange-500" /> AI Career Coach
          </h2>
          <p className="text-xs text-slate-500">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.role === ChatRole.USER ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === ChatRole.USER ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
            }`}>
              {msg.role === ChatRole.USER ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === ChatRole.USER 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : msg.isError 
                  ? 'bg-red-50 text-red-600 border border-red-200 rounded-tl-none'
                  : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
            }`}>
               {msg.isError && <AlertCircle size={16} className="inline mr-2 -mt-0.5" />}
               {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for interview tips, resume feedback..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};