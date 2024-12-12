import React, { useState, useEffect } from 'react';
import { TopicSection as TopicSectionType } from '../../../lib/types';
import { ExerciseBox } from './ExerciseBox';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ThemeExercise } from '../themes/ThemeExercise';
import { CharacterDecisionsExercise } from '../characters/CharacterDecisionsExercise';
import { useInView } from 'react-intersection-observer';
import { useProgress } from '../../../contexts/ProgressContext';
import { useParams } from 'react-router-dom';

interface TopicSectionProps {
  section: TopicSectionType;
  onExerciseComplete: () => void;
}

export const TopicSection: React.FC<TopicSectionProps> = ({ 
  section, 
  onExerciseComplete
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { moduleId } = useParams();
  const { completeTopic } = useProgress();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && moduleId) {
      completeTopic(moduleId, section.id);
    }
  }, [inView, moduleId, section.id, completeTopic]);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div ref={ref} className="mb-8">
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
      {section.sections && (
        <div className="space-y-4 mt-4">
          {section.sections.map((subSection) => (
            <div key={subSection.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleSection(subSection.id)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 rounded-lg flex justify-between items-center"
              >
                <span className="text-lg font-medium text-gray-900">{subSection.title}</span>
                {expandedSection === subSection.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedSection === subSection.id && (
                <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
                  <div className="prose prose-emerald max-w-none">
                    {subSection.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 mb-4 whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {section.exercise && (
        <>
          <ExerciseBox 
            exercise={section.exercise}
            onComplete={onExerciseComplete}
          />
          {section.exercise.component === 'ThemeExercise' && (
            <div className="mt-6">
              <ThemeExercise />
            </div>
          )}
          {section.exercise.component === 'CharacterDecisionsExercise' && (
            <div className="mt-6">
              <CharacterDecisionsExercise />
            </div>
          )}
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