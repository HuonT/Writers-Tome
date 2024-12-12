import React from 'react';
import { characterDefinition, characterTopics } from '../../../lib/characterContent';
import { TopicCard } from '../shared/TopicCard';
import { ModuleQuiz } from '../shared/ModuleQuiz';
import { characterQuizQuestions } from '../../../lib/quizContent';
import { CharacterDecisionsExercise } from './CharacterDecisionsExercise';

export const CharacterContent: React.FC = () => {
  return (
    <div>
      <div className="bg-emerald-50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Character Creation</h2>
        <p className="text-gray-700 leading-relaxed">{characterDefinition}</p>
      </div>

      <div className="space-y-8">
        {characterTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
        
        <div className="mt-8">
          <CharacterDecisionsExercise />
        </div>
        
        <ModuleQuiz 
          title="Character Module Quiz" 
          questions={characterQuizQuestions} 
        />
      </div>
    </div>
  );
};