import React from 'react';

export const CharacterInstructions: React.FC = () => {
  return (
    <div className="bg-emerald-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-emerald-800 mb-4">
        Creating Character Profiles
      </h3>
      
      <div className="space-y-4">
        <p className="text-emerald-700">
          For each character, you'll define their role and journey through the story using these key elements:
        </p>

        <div className="space-y-2">
          <h4 className="font-medium text-emerald-700">Character Archetype</h4>
          <p className="text-emerald-600">
            Choose the primary archetype that best fits your character's role. Consider:
          </p>
          <ul className="list-disc list-inside text-emerald-600 ml-4 space-y-1">
            <li>Their fundamental role in the story</li>
            <li>Core personality traits and tendencies</li>
            <li>How they typically interact with others</li>
            <li>Their general approach to challenges</li>
          </ul>
          <p className="text-emerald-600 mt-2">
            Remember: You can blend multiple archetypes, but one will usually be dominant.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-emerald-700">Key Decisions and Actions</h4>
          <p className="text-emerald-600">
            Map out the major choices and actions your character will make. These will need to also tie in with your story structure:
          </p>
          <ul className="list-disc list-inside text-emerald-600 ml-4 space-y-1">
            <li>Initial response to the plot's challenge</li>
            <li>Critical turning points in their journey</li>
            <li>Moments that test their beliefs or values</li>
            <li>Final decisions that resolve their arc</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-emerald-700">Influence on Other Characters</h4>
          <p className="text-emerald-600">
            Describe how their decisions affect others:
          </p>
          <ul className="list-disc list-inside text-emerald-600 ml-4 space-y-1">
            <li>Impact on main character relationships</li>
            <li>How they drive or hinder the plot</li>
            <li>Their role in other characters' development</li>
            <li>Ripple effects of their actions</li>
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-emerald-200">
          <p className="text-emerald-700 font-medium">Tips:</p>
          <ul className="list-disc list-inside text-emerald-600 ml-4 space-y-1">
            <li>Start with key plot-related decisions - you can add more detail later</li>
            <li>Focus on actions that drive the story forward</li>
            <li>Consider how each decision affects other characters</li>
            <li>Keep physical descriptions minimal - focus on their role in the story</li>
            <li>Remember that characters can evolve beyond their initial archetype</li>
          </ul>
        </div>
      </div>
    </div>
  );
};