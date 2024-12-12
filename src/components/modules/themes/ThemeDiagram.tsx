import React from 'react';

export const ThemeDiagram: React.FC = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Tension Diagram</h3>
      <div className="relative w-full aspect-[2/1] max-w-2xl mx-auto">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* Left circle */}
          <circle 
            cx="300" 
            cy="200" 
            r="150" 
            fill="none" 
            stroke="#059669" 
            strokeWidth="2"
          />
          
          {/* Right circle */}
          <circle 
            cx="500" 
            cy="200" 
            r="150" 
            fill="none" 
            stroke="#059669" 
            strokeWidth="2"
          />

          {/* Left circle text */}
          <text x="250" y="180" className="text-sm font-medium" fill="#059669" textAnchor="middle">
            <tspan x="250" dy="0">Belonging</tspan>
            <tspan x="250" dy="25">Comfort</tspan>
            <tspan x="250" dy="25">Security</tspan>
          </text>

          {/* Right circle text */}
          <text x="550" y="180" className="text-sm font-medium" fill="#059669" textAnchor="middle">
            <tspan x="550" dy="0">Personal Growth</tspan>
            <tspan x="550" dy="25">Transformation</tspan>
            <tspan x="550" dy="25">Challenge</tspan>
          </text>

          {/* Center intersection text */}
          <text x="400" y="175" className="text-sm font-medium" fill="#059669" textAnchor="middle">
            <tspan x="400" dy="0">Resolution:</tspan>
            <tspan x="400" dy="25">Acceptance of</tspan>
            <tspan x="400" dy="25">necessary</tspan>
            <tspan x="400" dy="25">self-sacrifices</tspan>
          </text>
        </svg>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">This diagram illustrates how themes create tension through opposing forces:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="text-emerald-600 font-medium">Left Circle:</span> Represents the character's current state, vices, feeling of lack, or comfort zone</li>
          <li><span className="text-emerald-600 font-medium">Right Circle:</span> Shows the ideas in tension, or opposing forces pushing for change or growth</li>
          <li><span className="text-emerald-600 font-medium">Intersection:</span> Depicts the resolution or transformation that occurs through the story</li>
        </ul>
      </div>
    </div>
  );
};