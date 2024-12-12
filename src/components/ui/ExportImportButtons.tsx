import React, { useRef, useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { useProject } from '../../contexts/ProjectContext';
import { downloadProject, importProject } from '../../lib/utils/projectExport';
import { Tooltip } from './Tooltip';

export const ExportImportButtons: React.FC = () => {
  const { currentProject, createProject } = useProject();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = () => {
    if (currentProject) {
      downloadProject(currentProject);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setError(null);
        const content = e.target?.result as string;
        const importedProject = importProject(content);
        
        if (importedProject) {
          await createProject(importedProject.name, importedProject);
        } else {
          setError('Invalid project file format');
        }
      } catch (err) {
        setError('Failed to import project. Please check the file format.');
        console.error('Error importing project:', err);
      }
    };

    reader.readAsText(file);
    
    // Reset file input
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <div className="flex flex-col items-end space-y-2">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExport}
            disabled={!currentProject}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              currentProject
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Export Project</span>
          </button>
          
          <button
            onClick={handleImportClick}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Import Project</span>
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          <Tooltip content="Export your project to save a backup file, or import a previously exported project. This allows you to safely backup your work or transfer it between devices." />
        </div>
      </div>
      
      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};