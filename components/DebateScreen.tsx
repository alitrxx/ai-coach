import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';
import { SendIcon, RestartIcon, GraduationCapIcon, LightbulbIcon, AlertTriangleIcon } from './Icons';

interface DebateScreenProps {
  topic: string;
  difficulty: string;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onReset: () => void;
  error: string | null;
  isLoading: boolean;
}

const DebateScreen: React.FC<DebateScreenProps> = ({ topic, difficulty, messages, onSendMessage, onReset, error, isLoading }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl flex flex-col h-[90vh] max-h-[800px] animate-fade-in">
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
            <GraduationCapIcon className="w-8 h-8 text-indigo-600" />
            <div>
                <h1 className="text-xl font-bold text-gray-800">موضوع: {topic}</h1>
                <p className="text-sm text-gray-500 font-medium">سطح دشواری: <span className="font-bold text-indigo-600">{difficulty}</span></p>
            </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
        >
          <RestartIcon className="w-5 h-5" />
          <span>شروع مجدد</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"><GraduationCapIcon className="w-6 h-6 text-indigo-600" /></div>}
            <div className={`max-w-xl p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.coachingFeedback && (
                <div className="mt-4 border-t-2 border-amber-500/30 pt-3 space-y-3">
                  <div>
                    <h4 className="font-bold text-sm flex items-center gap-2 text-amber-700">
                      <AlertTriangleIcon className="w-5 h-5" />
                      تحلیل استدلال
                    </h4>
                    <p className="font-semibold mt-1 text-amber-800">{msg.coachingFeedback.name}</p>
                    <p className="text-sm text-amber-700/90">{msg.coachingFeedback.explanation}</p>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                     <h4 className="font-bold text-sm flex items-center gap-2 text-indigo-700">
                        <LightbulbIcon className="w-5 h-5" />
                        نکته مربیگری
                     </h4>
                     <p className="text-sm mt-1 text-indigo-800/90">{msg.coachingFeedback.suggestion}</p>
                  </div>
                </div>
              )}
            </div>
             {msg.role === 'user' && <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 text-gray-600 font-bold">شما</div>}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end gap-3 justify-start">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"><GraduationCapIcon className="w-6 h-6 text-indigo-600" /></div>
                <div className="max-w-xl p-4 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                    <div className="flex items-center gap-2 text-gray-500">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </main>

       {error && (
            <div className="m-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">خطا</p>
                <p>{error}</p>
            </div>
        )}

      <footer className="p-4 border-t border-gray-200">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="استدلال خود را اینجا بنویسید..."
            className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="flex-shrink-0 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 disabled:cursor-not-allowed transition"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default DebateScreen;
