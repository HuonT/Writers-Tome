import React from 'react';
import { plotDefinition, plotTopics } from '../../../lib/plotContent';
import { TopicCard } from '../shared/TopicCard';
import { MyPlotSection } from './MyPlotSection';
import { ModuleQuiz } from '../shared/ModuleQuiz';
import { plotQuizQuestions } from '../../../lib/quizContent';

export const PlotContent: React.FC = () => {
  return (
    <div>
      <div className="bg-emerald-50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is Plot?</h2>
        <p className="text-gray-700 leading-relaxed">{plotDefinition}</p>
      </div>

      <div className="space-y-8">
        {plotTopics.map((topic) => {
          if (topic.id === 'my-plot') {
            return <MyPlotSection key={topic.id} />;
          }
          return <TopicCard key={topic.id} topic={topic} />;
        })}
        
        <ModuleQuiz 
          title="Plot Module Quiz" 
          questions={plotQuizQuestions} 
        />
      </div>
    </div>
  );
};