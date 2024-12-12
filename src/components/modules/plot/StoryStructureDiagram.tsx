import React from 'react';

export const StoryStructureDiagram: React.FC = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Story Structure Diagram</h3>
      <div className="relative w-full h-64 sm:h-48">
        {/* Main arc line */}
        <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
          {/* Background grid */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Story arc - Modified to peak at climax */}
          <path
            d="M 20,120 Q 80,120 120,100 T 200,60 T 260,30 T 320,60 T 380,120"
            fill="none"
            stroke="#059669"
            strokeWidth="3"
          />

          {/* Points on the arc */}
          <circle cx="20" cy="120" r="4" fill="#059669" />   {/* Setup */}
          <circle cx="120" cy="100" r="4" fill="#059669" />  {/* Inciting Incident */}
          <circle cx="200" cy="60" r="4" fill="#059669" />   {/* Rising Action */}
          <circle cx="260" cy="30" r="4" fill="#059669" />   {/* Climax */}
          <circle cx="320" cy="60" r="4" fill="#059669" />   {/* Falling Action */}
          <circle cx="380" cy="120" r="4" fill="#059669" />  {/* Resolution */}

          {/* Labels */}
          <text x="20" y="140" className="text-xs sm:text-sm" fill="#4B5563" textAnchor="middle">Setup</text>
          <text x="120" y="120" className="text-xs sm:text-sm" fill="#4B5563" textAnchor="middle">
            <tspan x="120" dy="0">Inciting</tspan>
            <tspan x="120" dy="12">Incident</tspan>
          </text>
          <text x="200" y="80" className="text-xs sm:text-sm" fill="#4B5563" textAnchor="middle">
            <tspan x="200" dy="0">Rising</tspan>
            <tspan x="200" dy="12">Action</tspan>
          </text>
          <text x="260" y="20" className="text-xs sm:text-sm" fill="#4B5563" textAnchor="middle">Climax</text>
          <text x="320" y="80" className="text-xs sm:text-sm" fill="#4B5563" textAnchor="middle">
            <tspan x="320" dy="0">Falling</tspan>
            <tspan x="320" dy="12">Action</tspan>
          </text>
          <text x="380" y="140" className="text-xs sm:text-sm" fill="#4B5563" textAnchor="middle">Resolution</text>
        </svg>
      </div>
    </div>
  );
};