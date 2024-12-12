import React, { useState } from 'react';
import { Exercise } from '../../../lib/types';
import { CheckCircle } from 'lucide-react';

interface ExerciseBoxProps {
  exercise: Exercise;
  onComplete: () => void;
}

export const ExerciseBox: React.FC<ExerciseBoxProps> = ({ exercise, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(exercise.isCompleted);
  const [response, setResponse] = useState('');

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  return (
    <div className="border-2 border-emerald-200 rounded-lg p-6 my-4 bg-emerald-50">
      <h4 className="text-lg font-semibold text-emerald-800 mb-3">Exercise</h4>
      <p className="text-gray-700 mb-4">{exercise.instructions}</p>
      
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className="w-full h-32 p-4 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        placeholder="Write your answer here..."
      />
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleComplete}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            isCompleted
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50'
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
        </button>
      </div>
    </div>
  );
};