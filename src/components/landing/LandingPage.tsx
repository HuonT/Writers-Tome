import React from 'react';
import { Hero } from './Hero';
import { Features } from './Features';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
    </div>
  );
};