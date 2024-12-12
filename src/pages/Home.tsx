import React from 'react';
import { BookOpen } from 'lucide-react';
import { ModuleCard } from '../components/ui/ModuleCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ProjectSelector } from '../components/ui/ProjectSelector';
import { Header } from '../components/ui/Header';
import { EmailVerification } from '../components/auth/EmailVerification';
import { HomeBadges } from '../components/ui/HomeBadges';
import { modules } from '../lib/constants';
import { useProject } from '../contexts/ProjectContext';

export const Home: React.FC = () => {
  const { currentProject } = useProject();

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <EmailVerification />
        
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-emerald-100 rounded-full">
              <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Welcome to Writer's Tome
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your story ideas into a compelling novel with our comprehensive novel planning guide.
            Master the essential elements of storytelling at your own pace.
          </p>
        </div>

        <HomeBadges />

        <ProjectSelector />

        {currentProject ? (
          <>
            <ProgressBar modules={modules} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 mt-8">
            Create or select a project to begin your writing journey.
          </div>
        )}
      </div>
    </div>
  );
};