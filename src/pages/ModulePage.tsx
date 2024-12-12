import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { modules } from '../lib/constants';
import { PlotContent } from '../components/modules/plot/PlotContent';
import { CharacterContent } from '../components/modules/characters/CharacterContent';
import { ThemeContent } from '../components/modules/themes/ThemeContent';
import { WorldBuildingContent } from '../components/modules/worldbuilding/WorldBuildingContent';
import { Header } from '../components/ui/Header';

export const ModulePage: React.FC = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const module = modules.find(m => m.id === moduleId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [moduleId]);

  if (!module) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Module not found</h1>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/home');
  };

  const renderModuleContent = () => {
    switch (moduleId) {
      case 'plot':
        return <PlotContent />;
      case 'characters':
        return <CharacterContent />;
      case 'themes':
        return <ThemeContent />;
      case 'worldbuilding':
        return <WorldBuildingContent />;
      default:
        return (
          <div className="text-center text-gray-600">
            <p>Content for this module will be added based on your requirements.</p>
          </div>
        );
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Modules
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{module.title}</h1>
          <p className="text-gray-600 mb-6 sm:mb-8">{module.description}</p>
          
          {renderModuleContent()}

          <div className="mt-8 sm:mt-12 text-center">
            <button
              onClick={handleBack}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Modules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};