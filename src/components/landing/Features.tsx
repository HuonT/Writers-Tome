import React from 'react';
import { BookOpen, Users, Lightbulb, Globe, MessageSquare, PenTool } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Plot Development',
    description: 'Learn to craft compelling storylines that keep readers engaged from start to finish.'
  },
  {
    icon: Users,
    title: 'Character Creation',
    description: 'Create memorable characters with depth, motivation, and authentic relationships.'
  },
  {
    icon: Lightbulb,
    title: 'Theme Integration',
    description: 'Weave meaningful themes throughout your story to create lasting impact.'
  },
  {
    icon: Globe,
    title: 'World Building',
    description: 'Build rich, immersive worlds that enhance your story without overwhelming it.'
  },
  {
    icon: MessageSquare,
    title: 'Writer Community',
    description: 'Connect with fellow writers, share experiences, and get valuable feedback.'
  },
  {
    icon: PenTool,
    title: 'Writing Workshops',
    description: 'Participate in workshops to refine your craft and improve your writing.'
  }
];

export const Features: React.FC = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything You Need to Write Your Novel
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            A comprehensive guide crafted by writers, for writers.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-emerald-500 rounded-md shadow-lg">
                          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};