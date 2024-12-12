import React from 'react';
import { Topic, TopicSection } from '../../../lib/types';
import { TopicSection as TopicSectionComponent } from './TopicSection';
import { StoryStructureContent } from './StoryStructureContent';

interface TopicCardProps {
  topic: Topic;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const handleExerciseComplete = () => {
    console.log('Exercise completed');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{topic.title}</h3>
      {topic.sections ? (
        topic.sections.map((section: TopicSection) => (
          <div key={section.id}>
            {section.component === 'StoryStructureContent' ? (
              <StoryStructureContent />
            ) : (
              <TopicSectionComponent
                section={section}
                onExerciseComplete={handleExerciseComplete}
              />
            )}
          </div>
        ))
      ) : (
        <div className="prose prose-emerald">
          {topic.content.split('\n').map((paragraph: string, index: number) => (
            <p key={index} className="text-gray-600 whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};