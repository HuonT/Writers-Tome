import React from 'react';
import { StoryStructureDiagram } from './StoryStructureDiagram';

export const StoryStructureContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Understanding Story Structure</h3>
        <p className="text-gray-700 mb-4">
          Now that you understand how plot serves as the central driving force for your characters,
          let's explore how to structure your story effectively. A well-structured story helps maintain
          reader engagement while providing a satisfying journey from beginning to end.
        </p>
      </section>

      <StoryStructureDiagram />

      <section className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">1. Setup (The Beginning)</h4>
          <p className="text-gray-700">
            Introduce your protagonist in their normal world, establish the setting, and hint at the
            underlying tensions. This is where you begin showing how your plot premise affects your
            main character's world, even before the main conflict begins.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">2. Inciting Incident</h4>
          <p className="text-gray-700">
            The event that sets your story in motion. This is where your plot premise begins to
            actively affect your protagonist's life, forcing them to make decisions that will lead
            them into the main conflict.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">3. Rising Action</h4>
          <p className="text-gray-700">
            A series of events where the conflict intensifies, and the stakes get higher. This is
            where your plot premise begins affecting more characters, creating alliances and
            oppositions. Each event should build upon the previous one, creating mounting tension.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">4. Climax</h4>
          <p className="text-gray-700">
            The peak of tension where your plot premise comes to a head. This is where the central
            conflict reaches its highest point of tension, and your protagonist must make their most
            crucial decisions. The climax should feel like a natural culmination of all previous events.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">5. Falling Action</h4>
          <p className="text-gray-700">
            The aftermath of the climax where the consequences of the climactic decisions begin to unfold.
            This section shows how the characters deal with the immediate results of their choices,
            begins to tie up loose plot threads, and demonstrates the cost or reward of their actions.
            The tension gradually decreases as the story moves toward its conclusion.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">6. Resolution</h4>
          <p className="text-gray-700">
            Show how the climax's outcome affects your characters and their world. This is where you
            demonstrate how your plot premise has changed your characters and their relationships.
            Tie up major plot threads while possibly leaving some minor ones for reader imagination.
          </p>
        </div>
      </section>

      <section className="bg-emerald-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-emerald-800 mb-3">Key Points to Remember</h4>
        <ul className="space-y-2 text-emerald-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Each part of your structure should clearly connect to your plot premise
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Character decisions and growth should drive the story forward
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Build tension gradually through escalating conflicts
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Ensure each major event impacts your protagonist's journey
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            The climax should feel both surprising and inevitable
          </li>
        </ul>
      </section>
    </div>
  );
};