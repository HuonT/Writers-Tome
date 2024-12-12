import React from 'react';
import { themeDefinition, themeTopics } from '../../../lib/themeContent';
import { TopicCard } from '../shared/TopicCard';
import { ThemeDiagram } from './ThemeDiagram';
import { ThemeExercise } from './ThemeExercise';
import { ModuleQuiz } from '../shared/ModuleQuiz';
import { themeQuizQuestions } from '../../../lib/quizContent';

export const ThemeContent: React.FC = () => {
  return (
    <div>
      <div className="bg-emerald-50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Thematic Elements</h2>
        <p className="text-gray-700 leading-relaxed">{themeDefinition}</p>
      </div>

      <div className="space-y-8">
        {themeTopics.map((topic) => (
          <React.Fragment key={topic.id}>
            <TopicCard topic={topic} />
            {topic.id === 'incorporation' && (
              <div className="mt-6">
                <ThemeDiagram />
              </div>
            )}
          </React.Fragment>
        ))}

        <div className="mt-8">
          <ThemeExercise />
        </div>
        
        <ModuleQuiz 
          title="Theme Module Quiz" 
          questions={themeQuizQuestions} 
        />
      </div>
    </div>
  );
};