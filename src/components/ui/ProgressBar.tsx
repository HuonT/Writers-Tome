import React from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import { Module } from '../../lib/types';

interface ProgressBarProps {
  modules: Module[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ modules }) => {
  const { calculateModuleProgress } = useProgress();
  
  const totalProgress = modules.reduce((acc, module) => {
    return acc + calculateModuleProgress(module.id);
  }, 0) / modules.length;

  return (
    <div className="w-full mt-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Overall Progress</span>
        <span className="text-sm font-medium text-gray-700">{Math.round(totalProgress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${totalProgress}%` }}
        />
      </div>
    </div>
  );
};