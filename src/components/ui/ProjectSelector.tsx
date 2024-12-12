import React, { useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { PlusCircle, FolderOpen, Trash2, Edit2, Check, X } from 'lucide-react';
import { ExportImportButtons } from './ExportImportButtons';

export const ProjectSelector: React.FC = () => {
  const { projects, currentProject, createProject, switchProject, deleteProject, updateProjectName } = useProject();
  const [newProjectName, setNewProjectName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName.trim());
      setNewProjectName('');
      setIsCreating(false);
    }
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      deleteProject(projectId);
    }
  };

  const startEditing = (projectId: string, currentName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProjectId(projectId);
    setEditingName(currentName);
  };

  const saveProjectName = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingName.trim()) {
      updateProjectName(projectId, editingName.trim());
    }
    setEditingProjectId(null);
  };

  const cancelEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProjectId(null);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          {isCreating ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Enter project name..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
              />
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Create
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
            >
              <PlusCircle className="w-5 h-5" />
              <span>New Project</span>
            </button>
          )}
        </div>
        <ExportImportButtons />
      </div>

      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => switchProject(project.id)}
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              currentProject?.id === project.id
                ? 'bg-emerald-50 border-2 border-emerald-500'
                : 'bg-white border border-gray-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <FolderOpen className={`w-5 h-5 ${
                currentProject?.id === project.id ? 'text-emerald-600' : 'text-gray-400'
              }`} />
              <div>
                {editingProjectId === project.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      onClick={(e) => saveProjectName(project.id, e)}
                      className="p-1 text-emerald-600 hover:text-emerald-700"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <button
                      onClick={(e) => startEditing(project.id, project.name, e)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  Last modified: {new Date(project.lastModified).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => handleDeleteProject(project.id, e)}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};