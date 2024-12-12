import React from 'react';
import { worldBuildingDefinition, worldBuildingTopics } from '../../../lib/worldBuildingContent';
import { TopicCard } from '../shared/TopicCard';

export const WorldBuildingContent: React.FC = () => {
  return (
    <div>
      <div className="bg-emerald-50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">World Building</h2>
        <p className="text-gray-700 leading-relaxed">{worldBuildingDefinition}</p>
      </div>

      <div className="space-y-8">
        {worldBuildingTopics.map((topic) => (
          <TopicCard 
            key={topic.id} 
            topic={topic}
          />
        ))}
      </div>
    </div>
  );
};