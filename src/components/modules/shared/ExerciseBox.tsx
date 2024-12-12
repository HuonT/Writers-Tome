import React, { useState, useEffect, useRef } from 'react';
import { Exercise } from '../../../lib/types';
import { CheckCircle } from 'lucide-react';
import { useProgress } from '../../../contexts/ProgressContext';
import { useParams } from 'react-router-dom';
import { useProject } from '../../../contexts/ProjectContext';
import { useDebounce } from '../../../hooks/useDebounce';
import { useAuth } from '../../../contexts/AuthContext';
import { calculateBadgeProgress } from '../../../lib/badges';
import { saveUserBadge } from '../../../lib/utils/badgeUtils';

interface ExerciseBoxProps {
  exercise: Exercise;
  onComplete: () => void;
}

export const ExerciseBox: React.FC<ExerciseBoxProps> = ({ 
  exercise, 
  onComplete
}) => {
  const { moduleId } = useParams();
  const { currentUser } = useAuth();
  const { currentProject } = useProject();
  const { progress, completeExercise, saveExerciseResponse, getExerciseResponse } = useProgress();
  const [localResponse, setLocalResponse] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const debouncedResponse = useDebounce(localResponse, 2000);
  const previousResponseRef = useRef(localResponse);
  
  const isCompleted = moduleId && currentProject && 
    progress.moduleProgress[moduleId]?.completedExercises.includes(exercise.id);

  useEffect(() => {
    if (moduleId && currentProject) {
      const savedResponse = getExerciseResponse(moduleId, exercise.id);
      if (typeof savedResponse === 'string') {
        setLocalResponse(savedResponse);
        previousResponseRef.current = savedResponse;
      }
    }
  }, [moduleId, exercise.id, getExerciseResponse, currentProject]);

  useEffect(() => {
    const saveResponse = async () => {
      if (moduleId && currentProject && 
          debouncedResponse !== '' && 
          debouncedResponse !== previousResponseRef.current) {
        setIsSaving(true);
        try {
          await saveExerciseResponse(moduleId, exercise.id, debouncedResponse);
          previousResponseRef.current = debouncedResponse;
        } catch (error) {
          console.error('Error saving response:', error);
        } finally {
          setIsSaving(false);
        }
      }
    };

    saveResponse();
  }, [debouncedResponse, moduleId, exercise.id, saveExerciseResponse, currentProject]);

  const handleComplete = async () => {
    if (!moduleId || !currentProject || !currentUser) return;
    
    if (!isCompleted) {
      await completeExercise(moduleId, exercise.id);
      onComplete();

      // Award badge for first exercise completion
      const newBadges = calculateBadgeProgress(moduleId, 1, 1);
      for (const badge of newBadges) {
        if (badge.earned) {
          await saveUserBadge(currentUser.uid, badge);
        }
      }
    }
  };

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalResponse(e.target.value);
  };

  if (!currentProject) {
    return (
      <div className="text-center text-gray-600 p-4">
        Please select or create a project to access exercises.
      </div>
    );
  }

  return (
    <div className="border-2 border-emerald-200 rounded-lg p-6 my-4 bg-emerald-50">
      <h4 className="text-lg font-semibold text-emerald-800 mb-3">Exercise</h4>
      <p className="text-gray-700 mb-4">{exercise.instructions}</p>
      
      <div className="relative">
        <textarea
          value={localResponse}
          onChange={handleResponseChange}
          className="w-full h-32 p-4 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Write your answer here..."
        />
        {isSaving && (
          <span className="absolute bottom-6 right-4 text-sm text-gray-500">
            Saving...
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleComplete}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            isCompleted
              ? 'bg-emerald-600 text-white cursor-not-allowed'
              : 'bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-50'
          }`}
          aria-label={isCompleted ? 'Exercise completed' : 'Mark exercise as complete'}
        >
          <CheckCircle className="w-5 h-5" />
          <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
        </button>
      </div>
    </div>
  );
};