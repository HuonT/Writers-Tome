import React from 'react';

export const ThemeInstructions: React.FC = () => {
  return (
    <div className="bg-emerald-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-emerald-800 mb-4">
        Creating Character Theme Profiles
      </h3>
      
      <div className="space-y-4">
        <p className="text-emerald-700">
          For each character, you'll define their thematic journey using three key aspects:
        </p>

        <div className="space-y-2">
          <h4 className="font-medium text-emerald-700">Current State / Comfort Zone</h4>
          <p className="text-emerald-600">
            Describe where your character starts emotionally or philosophically. This could include:
          </p>
          <ul className="list-disc list-inside text-emerald-600 ml-4 space-y-1">
            <li>Their current beliefs and values</li>
            <li>Emotional attachments or dependencies</li>
            <li>Comfort zones and safety nets</li>
            <li>Established relationships and roles</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-emerald-700">Growth / Transformation</h4>
          <p className="text-emerald-600">
            Define the opposing forces or challenges that will push your character to grow:
          </p>
          <ul className="list-disc list-inside text-emerald-600 ml-4 space-y-1">
            <li>New perspectives they'll encounter</li>
            <li>Challenges to their beliefs</li>
            <li>Personal sacrifices they might face</li>
            <li>Opportunities for growth and change</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-emerald-700">Resolution / Outcome</h4>
          <p className="text-emerald-600">
            Describe how these opposing forces might be resolved:
          </p>
          <ul className="list-disc list-inside text-emerald-600 ml-4 space-y-1">
            <li>Potential compromises or realizations</li>
            <li>New understanding or wisdom gained</li>
            <li>How they might balance opposing needs</li>
            <li>The cost or reward of their transformation</li>
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-emerald-200">
          <p className="text-emerald-700 font-medium">Tips:</p>
          <ul className="list-disc list-inside text-emerald-600 ml-4 space-y-1">
            <li>Focus on emotional and philosophical aspects rather than plot events</li>
            <li>Consider how themes will manifest in dialogue and interactions</li>
            <li>Think about how different characters' themes might conflict or complement each other</li>
            <li>Remember that theme development happens gradually throughout the story</li>
          </ul>
        </div>
      </div>
    </div>
  );
};