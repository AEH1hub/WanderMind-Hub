import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';
import XMarkIcon from './icons/XMarkIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
import SparklesIcon from './icons/SparklesIcon';

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const chatInstance = ai.chats.create({
      model: 'gemini-2.5-flash-preview-04-17',
      config: {
        systemInstruction: `You are "Wandy", the friendly and helpful AI assistant for WanderMind Hub. Your personality is warm, encouraging, and slightly whimsical. Your goal is to help users discover content on the WanderMind Hub website. Always try to relate travel questions back to potential podcast episodes or articles on topics like mindfulness, sustainability, and personal growth. Keep your responses concise and conversational.`,
      },
    });
    setChat(chatInstance);

    setMessages([
        { role: 'model', content: "Hi there! I'm Wandy, your friendly guide to the WanderMind Hub. What adventure can I help you find today?" }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chat || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const stream = await chat.sendMessageStream({ message: input });
        setIsLoading(false);
        
        let modelResponse = '';
        setMessages(prev => [...prev, { role: 'model', content: '' }]);
        
        for await (const chunk of stream) {
            modelResponse += chunk.text;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = modelResponse;
                return newMessages;
            });
        }

    } catch (error) {
        console.error("Error sending message:", error);
        setMessages(prev => [...prev, { role: 'model', content: "Oops! I seem to be having a little trouble connecting. Please try again in a moment." }]);
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-full max-w-md h-full max-h-[70vh] z-50 animate-slide-up">
        <div className="bg-light/80 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl w-full h-full flex flex-col overflow-hidden">
            <header className="flex items-center justify-between p-4 border-b border-black/10 bg-gradient-to-r from-accent/10 to-primary/10">
                <div className="flex items-center gap-2">
                    <SparklesIcon className="h-6 w-6 text-accent" />
                    <h2 className="font-sans text-lg font-bold text-dark">Wandy</h2>
                </div>
                <button onClick={onClose} className="text-muted hover:text-dark transition-colors" aria-label="Close chat">
                    <XMarkIcon className="h-6 w-6" />
                </button>
            </header>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && <div className="bg-accent text-white rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center p-1"><SparklesIcon className="h-5 w-5"/></div>}
                        <div className={`px-4 py-2 rounded-xl max-w-sm shadow-soft ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white text-dark'}`}>
                            <p className="text-sm">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-2.5">
                        <div className="bg-accent text-white rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center p-1"><SparklesIcon className="h-5 w-5"/></div>
                        <div className="px-4 py-3 rounded-xl bg-white text-dark shadow-soft">
                           <div className="flex items-center gap-1">
                               <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                               <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                               <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-black/10">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={!input.trim() || isLoading} className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Chatbot;