import { Project } from '../types';

export const exportProject = (project: Project): string => {
  const exportData = {
    version: '1.0',
    project: {
      ...project,
      // Ensure dates are properly serialized
      createdAt: project.createdAt,
      lastModified: new Date().toISOString()
    }
  };
  return JSON.stringify(exportData, null, 2);
};

export const importProject = (jsonData: string): Project | null => {
  try {
    const data = JSON.parse(jsonData);
    
    // Validate the imported data structure
    if (!data.version || !data.project) {
      throw new Error('Invalid project data format');
    }

    // Ensure required fields exist
    const requiredFields = ['id', 'name', 'progress'];
    for (const field of requiredFields) {
      if (!data.project[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Create a new project ID to avoid conflicts
    const importedProject: Project = {
      ...data.project,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    return importedProject;
  } catch (error) {
    console.error('Error importing project:', error);
    return null;
  }
};

export const downloadProject = (project: Project) => {
  const exportData = exportProject(project);
  const blob = new Blob([exportData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}-backup.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};