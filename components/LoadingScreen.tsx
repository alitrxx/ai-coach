import React from 'react';
import { BrainIcon } from './Icons';

interface LoadingScreenProps {
    message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-gray-600 animate-fade-in">
        <div className="relative mb-6">
            <BrainIcon className="w-16 h-16 text-indigo-600 animate-pulse"/>
        </div>
        <p className="text-lg font-medium text-gray-700">{message}</p>
    </div>
  );
};

export default LoadingScreen;