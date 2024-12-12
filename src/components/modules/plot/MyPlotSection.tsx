import React, { useState, useEffect, useCallback } from 'react';
import { useProgress } from '../../../contexts/ProgressContext';
import { useParams } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { PlotTextArea } from './PlotTextArea';
import { PlotExamples } from './PlotExamples';

export const MyPlotSection: React.FC = () => {
  const { moduleId } = useParams();
  const { currentProject } = useProject();
  const { saveExerciseResponse, getExerciseResponse, completeExercise } = useProgress();
  const [plotContent, setPlotContent] = useState('');
  const exerciseId = 'my-plot-content';

  useEffect(() => {
    if (moduleId && currentProject) {
      const savedContent = getExerciseResponse(moduleId, exerciseId);
      if (typeof savedContent === 'string') {
        setPlotContent(savedContent);
      }
    }
  }, [moduleId, getExerciseResponse, currentProject]);

  const handleSave = useCallback(async (newContent: string) => {
    if (!moduleId || !currentProject) return;

    await saveExerciseResponse(moduleId, exerciseId, newContent);
    if (newContent.trim().length > 0) {
      await completeExercise(moduleId, exerciseId);
    }
  }, [moduleId, exerciseId, saveExerciseResponse, completeExercise, currentProject]);

  if (!currentProject) {
    return (
      <div className="text-center text-gray-600 p-4">
        Please select or create a project to start writing your plot.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">My Plot</h3>
      <p className="text-gray-600 mb-4">
        Now it's time for you to write your plot premise. It's okay if you need to come back and fine tune it later, but it's good to try start with a clear idea of the main conflict and character motivator so you can plan and write relevant characters.
      </p>

      <PlotExamples />
      
      <PlotTextArea
        value={plotContent}
        onChange={setPlotContent}
        onSave={handleSave}
        placeholder="Write your plot here..."
      />
      
      <p className="text-sm text-gray-500 mt-2">
        Tip: Your plot should be something that affects all your main characters and drives their decisions throughout the story.
      </p>
    </div>
  );
};