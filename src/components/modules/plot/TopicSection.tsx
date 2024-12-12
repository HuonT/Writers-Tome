import React, { useState } from 'react';
import { TopicSection as TopicSectionType } from '../../../lib/types';
import { ExerciseBox } from './ExerciseBox';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TopicSectionProps {
  section: TopicSectionType;
  onExerciseComplete: () => void;
}

export const TopicSection: React.FC<TopicSectionProps> = ({ section, onExerciseComplete }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="mb-8">
      {section.title && (
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h3>
      )}
      <div className="prose prose-emerald max-w-none">
        {section.content.split('\n').map((paragraph, index) => (
          <p key={index} className="text-gray-700 mb-4 whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
      {section.exercise && (
        <>
          <ExerciseBox 
            exercise={section.exercise}
            onComplete={onExerciseComplete}
          />
          {section.answer && (
            <div className="mt-4">
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {showAnswer ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
                <span>{showAnswer ? 'Hide Answer' : 'Show Answer'}</span>
              </button>
              {showAnswer && (
                <div className="mt-4 p-6 bg-emerald-50 rounded-lg border-2 border-emerald-100">
                  <h4 className="text-lg font-semibold text-emerald-800 mb-4">Answer & Explanation</h4>
                  <div className="prose prose-emerald">
                    {section.answer.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 mb-4 whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};