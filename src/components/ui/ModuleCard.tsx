import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Module } from '../../lib/types';
import { clsx } from 'clsx';
import { useProgress } from '../../contexts/ProgressContext';

interface ModuleCardProps {
  module: Module;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const navigate = useNavigate();
  const { calculateModuleProgress } = useProgress();
  const Icon = (Icons as any)[module.icon];
  const progress = calculateModuleProgress(module.id);

  return (
    <div
      onClick={() => navigate(`/module/${module.id}`)}
      className={clsx(
        "bg-white rounded-xl shadow-lg p-4 sm:p-6 cursor-pointer",
        "transform transition-all duration-300 hover:scale-105 hover:shadow-xl",
        "border border-gray-100 relative"
      )}
    >
      <div className="absolute top-4 right-4 bg-emerald-100 px-2 py-1 rounded-full">
        <span className="text-sm text-emerald-700">Stage {module.stage}</span>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="p-2 sm:p-3 bg-emerald-100 rounded-lg">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{module.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{module.description}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};