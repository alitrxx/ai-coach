import React, { useState } from 'react';
import { getDebateResponse } from './services/geminiService';
import DebateSetupScreen from './components/DebateSetupScreen';
import DebateScreen from './components/DebateScreen';
import type { ChatMessage, DebateDifficulty } from './types';

type AppState = 'setup' | 'debating' | 'loading';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('setup');
  const [topic, setTopic] = useState<string>('');
  const [difficulty, setDifficulty] = useState<DebateDifficulty>('medium');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const handleStartDebate = async (newTopic: string, userStance: string, newDifficulty: DebateDifficulty) => {
    setTopic(newTopic);
    setDifficulty(newDifficulty);
    setAppState('loading');
    setError(null);

    const initialHistory: ChatMessage[] = [
      { role: 'user', content: `موضوع مناظره: "${newTopic}"\nسطح دشواری: ${newDifficulty}\nموضع اولیه من: "${userStance}"` }
    ];
    setChatHistory(initialHistory);

    try {
      const aiResponse = await getDebateResponse(initialHistory, newDifficulty);
      setChatHistory(prev => [...prev, aiResponse]);
      setAppState('debating');
    } catch (err) {
      handleError(err);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newUserMessage: ChatMessage = { role: 'user', content: message };
    const updatedHistory = [...chatHistory, newUserMessage];
    setChatHistory(updatedHistory);
    setAppState('loading');
    setError(null);
    
    try {
      const aiResponse = await getDebateResponse(updatedHistory, difficulty);
      setChatHistory(prev => [...prev, aiResponse]);
    } catch (err) {
      handleError(err);
    } finally {
      setAppState('debating');
    }
  };
  
  const handleError = (err: unknown) => {
    console.error("Error in debate:", err);
    const errorMessage = err instanceof Error ? err.message : "یک خطای ناشناخته رخ داد.";
    setError(`متاسفانه مشکلی پیش آمد: ${errorMessage}`);
    setAppState('debating'); // Return to debate screen to show error
  }

  const handleReset = () => {
    setAppState('setup');
    setTopic('');
    setChatHistory([]);
    setError(null);
  };

  const renderContent = () => {
    const difficultyMap = { easy: 'آسان', medium: 'متوسط', hard: 'دشوار' };
    switch (appState) {
      case 'setup':
        return <DebateSetupScreen onStart={handleStartDebate} />;
      case 'debating':
        return <DebateScreen topic={topic} difficulty={difficultyMap[difficulty]} messages={chatHistory} onSendMessage={handleSendMessage} onReset={handleReset} error={error} isLoading={false} />;
      case 'loading':
        return <DebateScreen topic={topic} difficulty={difficultyMap[difficulty]} messages={chatHistory} onSendMessage={handleSendMessage} onReset={handleReset} error={error} isLoading={true} />;
      default:
        return <DebateSetupScreen onStart={handleStartDebate} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
