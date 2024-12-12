import React, { useEffect } from 'react';
import { Topic } from '../../../lib/types';
import { TopicSection } from './TopicSection';
import { StoryStructureContent } from '../plot/StoryStructureContent';
import { useProgress } from '../../../contexts/ProgressContext';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

interface TopicCardProps {
  topic: Topic;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const { moduleId } = useParams();
  const { completeTopic } = useProgress();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && moduleId) {
      completeTopic(moduleId, topic.id);
    }
  }, [inView, moduleId, topic.id, completeTopic]);

  const handleExerciseComplete = () => {
    if (moduleId) {
      completeTopic(moduleId, topic.id);
    }
  };

  return (
    <div ref={ref} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{topic.title}</h3>
      {topic.sections ? (
        topic.sections.map((section) => (
          <div key={section.id}>
            {section.component === 'StoryStructureContent' ? (
              <StoryStructureContent />
            ) : (
              <TopicSection
                section={section}
                onExerciseComplete={handleExerciseComplete}
              />
            )}
          </div>
        ))
      ) : (
        <div className="prose prose-emerald">
          {topic.content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-600 whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      )}
      {topic.exercise && (
        <TopicSection
          section={{
            id: `${topic.id}-exercise`,
            title: '',
            content: '',
            exercise: topic.exercise
          }}
          onExerciseComplete={handleExerciseComplete}
        />
      )}
    </div>
  );
};