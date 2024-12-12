import React, { createContext, useContext, useCallback } from 'react';
import { CourseProgress, QuizResponse } from '../lib/types';
import { useProject } from './ProjectContext';
import { TOPIC_WEIGHT, EXERCISE_WEIGHT, modules } from '../lib/constants';
import { debounce } from '../lib/utils/debounce';

interface ProgressContextType {
  progress: CourseProgress;
  completeExercise: (moduleId: string, exerciseId: string) => void;
  completeTopic: (moduleId: string, topicId: string) => void;
  setCurrentModule: (moduleId: string | null) => void;
  calculateModuleProgress: (moduleId: string) => number;
  saveExerciseResponse: (moduleId: string, exerciseId: string, response: string | Record<string, any>) => void;
  getExerciseResponse: (moduleId: string, exerciseId: string) => string | Record<string, any> | undefined;
  saveQuizResponse: (moduleId: string, response: QuizResponse) => Promise<void>;
  getQuizResponses: (moduleId: string) => QuizResponse[];
}

const defaultProgress: CourseProgress = {
  completedModules: [],
  currentModule: null,
  moduleProgress: {
    plot: { completedTopics: [], completedExercises: [], exerciseResponses: [], quizResponses: [], progress: 0 },
    characters: { completedTopics: [], completedExercises: [], exerciseResponses: [], quizResponses: [], progress: 0 },
    themes: { completedTopics: [], completedExercises: [], exerciseResponses: [], quizResponses: [], progress: 0 },
    worldbuilding: { completedTopics: [], completedExercises: [], exerciseResponses: [], quizResponses: [], progress: 0 }
  }
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentProject, updateProjectProgress } = useProject();
  const progress = currentProject?.progress || defaultProgress;

  const debouncedUpdateProgress = useCallback(
    debounce((updatedProgress: CourseProgress) => {
      updateProjectProgress(updatedProgress);
    }, 1000),
    [updateProjectProgress]
  );

  const saveQuizResponse = useCallback(async (moduleId: string, response: QuizResponse) => {
    if (!currentProject) return;

    const moduleProgress = progress.moduleProgress[moduleId];
    const updatedResponses = moduleProgress.quizResponses || [];
    const existingIndex = updatedResponses.findIndex(r => r.questionId === response.questionId);

    if (existingIndex >= 0) {
      updatedResponses[existingIndex] = response;
    } else {
      updatedResponses.push(response);
    }

    const updatedProgress: CourseProgress = {
      ...progress,
      moduleProgress: {
        ...progress.moduleProgress,
        [moduleId]: {
          ...moduleProgress,
          quizResponses: updatedResponses
        }
      }
    };

    debouncedUpdateProgress(updatedProgress);
  }, [currentProject, progress, debouncedUpdateProgress]);

  const getQuizResponses = useCallback((moduleId: string): QuizResponse[] => {
    if (!currentProject) return [];
    return progress.moduleProgress[moduleId]?.quizResponses || [];
  }, [currentProject, progress]);

  const saveExerciseResponse = useCallback((moduleId: string, exerciseId: string, response: string | Record<string, any>) => {
    if (!currentProject) return;

    const moduleProgress = progress.moduleProgress[moduleId];
    const updatedResponses = moduleProgress.exerciseResponses.filter(r => r.exerciseId !== exerciseId);
    
    const updatedProgress: CourseProgress = {
      ...progress,
      moduleProgress: {
        ...progress.moduleProgress,
        [moduleId]: {
          ...moduleProgress,
          exerciseResponses: [...updatedResponses, { exerciseId, response }]
        }
      }
    };

    debouncedUpdateProgress(updatedProgress);
  }, [currentProject, progress, debouncedUpdateProgress]);

  const getExerciseResponse = useCallback((moduleId: string, exerciseId: string) => {
    if (!currentProject) return undefined;

    const response = progress.moduleProgress[moduleId]?.exerciseResponses
      .find(r => r.exerciseId === exerciseId);
    return response?.response;
  }, [currentProject, progress]);

  const completeExercise = useCallback((moduleId: string, exerciseId: string) => {
    if (!currentProject) return;

    const moduleProgress = progress.moduleProgress[moduleId];
    if (!moduleProgress.completedExercises.includes(exerciseId)) {
      const updatedProgress: CourseProgress = {
        ...progress,
        moduleProgress: {
          ...progress.moduleProgress,
          [moduleId]: {
            ...moduleProgress,
            completedExercises: [...moduleProgress.completedExercises, exerciseId]
          }
        }
      };

      debouncedUpdateProgress(updatedProgress);
    }
  }, [currentProject, progress, debouncedUpdateProgress]);

  const completeTopic = useCallback((moduleId: string, topicId: string) => {
    if (!currentProject) return;

    const moduleProgress = progress.moduleProgress[moduleId];
    if (!moduleProgress.completedTopics.includes(topicId)) {
      const updatedProgress: CourseProgress = {
        ...progress,
        moduleProgress: {
          ...progress.moduleProgress,
          [moduleId]: {
            ...moduleProgress,
            completedTopics: [...moduleProgress.completedTopics, topicId]
          }
        }
      };

      debouncedUpdateProgress(updatedProgress);
    }
  }, [currentProject, progress, debouncedUpdateProgress]);

  const setCurrentModule = useCallback((moduleId: string | null) => {
    if (!currentProject) return;

    const updatedProgress: CourseProgress = {
      ...progress,
      currentModule: moduleId
    };

    debouncedUpdateProgress(updatedProgress);
  }, [currentProject, progress, debouncedUpdateProgress]);

  const calculateModuleProgress = useCallback((moduleId: string): number => {
    if (!currentProject) return 0;

    const moduleData = progress.moduleProgress[moduleId];
    if (!moduleData) return 0;

    const moduleConfig = modules.find(m => m.id === moduleId);
    if (!moduleConfig) return 0;

    if (moduleId === 'worldbuilding') {
      return Math.min(Math.round((moduleData.completedExercises.length / moduleConfig.totalExercises) * 100), 100);
    }

    const topicProgress = (moduleData.completedTopics.length / moduleConfig.totalTopics) * TOPIC_WEIGHT * 100;
    const exerciseProgress = (moduleData.completedExercises.length / moduleConfig.totalExercises) * EXERCISE_WEIGHT * 100;

    return Math.min(Math.round(topicProgress + exerciseProgress), 100);
  }, [currentProject, progress]);

  const value = {
    progress,
    completeExercise,
    completeTopic,
    setCurrentModule,
    calculateModuleProgress,
    saveExerciseResponse,
    getExerciseResponse,
    saveQuizResponse,
    getQuizResponses
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};