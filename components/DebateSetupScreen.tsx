import React, { useState } from 'react';
import { GraduationCapIcon } from './Icons';
import type { DebateDifficulty } from '../types';

interface DebateSetupScreenProps {
  onStart: (topic: string, stance: string, difficulty: DebateDifficulty) => void;
}

const DifficultySelector: React.FC<{ selected: DebateDifficulty; onSelect: (d: DebateDifficulty) => void; }> = ({ selected, onSelect }) => {
  const difficulties: { id: DebateDifficulty; label: string }[] = [
    { id: 'easy', label: 'آسان' },
    { id: 'medium', label: 'متوسط' },
    { id: 'hard', label: 'دشوار' },
  ];
  return (
    <div className="flex justify-center p-1 bg-gray-200 rounded-xl">
      {difficulties.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className={`w-full px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
            selected === id
              ? 'bg-white text-indigo-600 shadow'
              : 'bg-transparent text-gray-500 hover:bg-gray-300/50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const DebateSetupScreen: React.FC<DebateSetupScreenProps> = ({ onStart }) => {
  const [topic, setTopic] = useState('');
  const [stance, setStance] = useState('');
  const [difficulty, setDifficulty] = useState<DebateDifficulty>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && stance.trim()) {
      onStart(topic, stance, difficulty);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 animate-fade-in">
      <div className="text-center mb-8">
        <GraduationCapIcon className="w-16 h-16 mx-auto text-indigo-600" />
        <h1 className="text-4xl font-bold text-gray-800 mt-4">مربی مناظره هوشمند</h1>
        <p className="text-gray-500 mt-2">قدرت استدلال خود را به چالش بکشید.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2 text-center">
                سطح دشواری را انتخاب کنید
            </label>
            <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
        </div>
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            موضوع مناظره
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="مثال: تاثیر هوش مصنوعی بر بازار کار"
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="stance" className="block text-sm font-medium text-gray-700 mb-1">
            موضع و استدلال اولیه شما
          </label>
          <textarea
            id="stance"
            value={stance}
            onChange={(e) => setStance(e.target.value)}
            placeholder="موضع خود را به طور خلاصه با یک یا دو دلیل اولیه بیان کنید..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none min-h-[120px]"
            rows={4}
            required
          />
        </div>
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={!topic.trim() || !stance.trim()}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            شروع مناظره
          </button>
        </div>
      </form>
    </div>
  );
};

export default DebateSetupScreen;
