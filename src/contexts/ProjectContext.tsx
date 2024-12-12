import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, ProjectState, CourseProgress } from '../lib/types';
import { saveProject, getAllProjects, deleteProject as deleteProjectFromDb } from '../lib/utils/firestore';
import { useAuth } from './AuthContext';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  createProject: (name: string, importedProject?: Project) => Promise<void>;
  switchProject: (projectId: string) => void;
  deleteProject: (projectId: string) => Promise<void>;
  updateProjectProgress: (progress: CourseProgress) => Promise<void>;
  updateProjectName: (projectId: string, newName: string) => Promise<void>;
}

const defaultProjectState: ProjectState = {
  projects: [],
  currentProjectId: null
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projectState, setProjectState] = useState<ProjectState>(defaultProjectState);
  const { currentUser } = useAuth();

  // Load projects when user changes
  useEffect(() => {
    const loadProjects = async () => {
      if (currentUser?.uid) {
        try {
          const userProjects = await getAllProjects(currentUser.uid);
          setProjectState(prev => ({
            ...prev,
            projects: userProjects
          }));
        } catch (error) {
          console.error('Error loading projects:', error);
        }
      } else {
        setProjectState(defaultProjectState);
      }
    };

    loadProjects();
  }, [currentUser]);

  const createProject = async (name: string, importedProject?: Project) => {
    if (!currentUser?.uid) return;

    const newProject: Project = importedProject || {
      id: crypto.randomUUID(),
      userId: currentUser.uid,
      name,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      progress: {
        completedModules: [],
        currentModule: null,
        moduleProgress: {
          plot: { completedTopics: [], completedExercises: [], exerciseResponses: [], progress: 0 },
          characters: { completedTopics: [], completedExercises: [], exerciseResponses: [], progress: 0 },
          themes: { completedTopics: [], completedExercises: [], exerciseResponses: [], progress: 0 },
          worldbuilding: { completedTopics: [], completedExercises: [], exerciseResponses: [], progress: 0 }
        }
      }
    };

    try {
      await saveProject(newProject);
      setProjectState(prev => ({
        projects: [...prev.projects, newProject],
        currentProjectId: newProject.id
      }));
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const switchProject = (projectId: string) => {
    setProjectState(prev => ({
      ...prev,
      currentProjectId: projectId
    }));
  };

  const deleteProject = async (projectId: string) => {
    try {
      await deleteProjectFromDb(projectId);
      setProjectState(prev => ({
        projects: prev.projects.filter(p => p.id !== projectId),
        currentProjectId: prev.currentProjectId === projectId ? null : prev.currentProjectId
      }));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const updateProjectProgress = async (progress: CourseProgress) => {
    if (!projectState.currentProjectId) return;

    const updatedProject = {
      ...projectState.projects.find(p => p.id === projectState.currentProjectId)!,
      lastModified: new Date().toISOString(),
      progress
    };

    try {
      await saveProject(updatedProject);
      setProjectState(prev => ({
        ...prev,
        projects: prev.projects.map(project => 
          project.id === prev.currentProjectId ? updatedProject : project
        )
      }));
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const updateProjectName = async (projectId: string, newName: string) => {
    const updatedProject = {
      ...projectState.projects.find(p => p.id === projectId)!,
      name: newName,
      lastModified: new Date().toISOString()
    };

    try {
      await saveProject(updatedProject);
      setProjectState(prev => ({
        ...prev,
        projects: prev.projects.map(project =>
          project.id === projectId ? updatedProject : project
        )
      }));
    } catch (error) {
      console.error('Error updating project name:', error);
    }
  };

  const currentProject = projectState.projects.find(p => p.id === projectState.currentProjectId) || null;

  return (
    <ProjectContext.Provider value={{
      projects: projectState.projects,
      currentProject,
      createProject,
      switchProject,
      deleteProject,
      updateProjectProgress,
      updateProjectName
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};