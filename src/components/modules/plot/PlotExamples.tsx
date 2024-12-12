import React from 'react';

export const PlotExamples: React.FC = () => {
  return (
    <div className="bg-emerald-50 p-6 rounded-lg mb-6">
      <h4 className="font-semibold text-emerald-800 mb-4">Example Plot Categories</h4>
      
      <div className="space-y-6">
        <div>
          <h5 className="font-medium text-emerald-700 mb-2">1. Object-Based Plot</h5>
          <p className="text-emerald-600 mb-2">The main objective revolves around acquiring, destroying, or protecting a significant object or artifact.</p>
          <ul className="list-disc list-inside text-emerald-600 space-y-1 ml-4">
            <li>Destroying the One Ring in "The Lord of the Rings"</li>
            <li>Control who sits on the Iron Throne - it holds the ability to bring peace or chaos</li>
            <li>Find the magic talisman before the enemy can control it</li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium text-emerald-700 mb-2">2. Quest-Based Plot</h5>
          <p className="text-emerald-600 mb-2">The protagonist seeks a specific goal or destination, often involving personal growth or transformation.</p>
          <ul className="list-disc list-inside text-emerald-600 space-y-1 ml-4">
            <li>A journey to find a magical land</li>
            <li>A quest to fulfill an ancient prophecy</li>
            <li>Searching for a lost civilization</li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium text-emerald-700 mb-2">3. Mystery-Based Plot</h5>
          <p className="text-emerald-600 mb-2">The main objective is to uncover secrets, solve puzzles, or reveal hidden truths.</p>
          <ul className="list-disc list-inside text-emerald-600 space-y-1 ml-4">
            <li>Investigating a series of magical disappearances</li>
            <li>Uncovering the truth behind an ancient curse</li>
            <li>Solving the mystery of a powerful artifact's origin</li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium text-emerald-700 mb-2">4. Rescue-Based Plot</h5>
          <p className="text-emerald-600 mb-2">The objective centers around saving a character or group from danger.</p>
          <ul className="list-disc list-inside text-emerald-600 space-y-1 ml-4">
            <li>A hero must rescue a kidnapped princess from a dragon</li>
            <li>Saving a village from an impending magical disaster</li>
            <li>Rescuing trapped explorers from a cursed realm</li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium text-emerald-700 mb-2">5. Rebellion-Based Plot</h5>
          <p className="text-emerald-600 mb-2">The main objective is to overthrow a tyrannical regime or evil force.</p>
          <ul className="list-disc list-inside text-emerald-600 space-y-1 ml-4">
            <li>Leading a revolution against an oppressive ruler</li>
            <li>Fighting against a corrupt magical council</li>
            <li>Overthrowing an evil sorcerer's reign</li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium text-emerald-700 mb-2">6. Survival-Based Plot</h5>
          <p className="text-emerald-600 mb-2">The protagonist's goal is to survive against overwhelming odds, often in a hostile environment.</p>
          <ul className="list-disc list-inside text-emerald-600 space-y-1 ml-4">
            <li>Surviving in a post-apocalyptic world filled with magical creatures</li>
            <li>Enduring in a realm where magic is turning against its users</li>
            <li>Staying alive in a world where ancient beings have awakened</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-emerald-200">
          <p className="text-emerald-700 font-medium">Remember:</p>
          <p className="text-emerald-600 mt-2">
            Your plot premise should be expressible in one clear sentence, such as a main objective, and be the one common motivator for all characters. It is the focal point of the main struggle that drives your story forward.
          </p>
        </div>
      </div>
    </div>
  );
};