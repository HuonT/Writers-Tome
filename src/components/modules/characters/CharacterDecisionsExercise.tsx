import React, { useState, useEffect, useCallback } from 'react';
import { useProgress } from '../../../contexts/ProgressContext';
import { useParams } from 'react-router-dom';
import { CharacterCard } from './CharacterCard';
import { CharacterInstructions } from './CharacterInstructions';
import { useProject } from '../../../contexts/ProjectContext';
import { useAuth } from '../../../contexts/AuthContext';
import { calculateBadgeProgress } from '../../../lib/badges';
import { saveUserBadge } from '../../../lib/utils/badgeUtils';

interface CharacterDecision {
  id: string;
  name: string;
  arcType: string;
  decisions: string;
  influences: string;
}

export const CharacterDecisionsExercise: React.FC = () => {
  const { moduleId } = useParams();
  const { currentProject } = useProject();
  const { currentUser } = useAuth();
  const { saveExerciseResponse, getExerciseResponse, completeExercise } = useProgress();
  const exerciseId = 'character-decisions';
  
  const [characters, setCharacters] = useState<CharacterDecision[]>([
    { id: crypto.randomUUID(), name: '', arcType: '', decisions: '', influences: '' }
  ]);

  useEffect(() => {
    if (moduleId && currentProject) {
      const savedResponse = getExerciseResponse(moduleId, exerciseId);
      if (savedResponse && Array.isArray(savedResponse)) {
        setCharacters(savedResponse.map(char => ({
          ...char,
          id: char.id || crypto.randomUUID()
        })));
      }
    }
  }, [moduleId, getExerciseResponse, exerciseId, currentProject]);

  const saveCharacters = useCallback(async (newCharacters: CharacterDecision[]) => {
    if (!moduleId || !currentProject || !currentUser) return;

    try {
      await saveExerciseResponse(moduleId, exerciseId, newCharacters);

      // Check if any character has complete content
      const hasCompleteCharacter = newCharacters.some(char => 
        char.name.trim() && 
        char.arcType.trim() && 
        char.decisions.trim() && 
        char.influences.trim()
      );

      if (hasCompleteCharacter) {
        await completeExercise(moduleId, exerciseId);
        
        // Award badge for first completed character
        const newBadges = calculateBadgeProgress(moduleId, 1, 1);
        for (const badge of newBadges) {
          if (badge.earned) {
            await saveUserBadge(currentUser.uid, badge);
          }
        }
      }
    } catch (error) {
      console.error('Error saving characters:', error);
    }
  }, [moduleId, exerciseId, saveExerciseResponse, completeExercise, currentProject, currentUser]);

  const handleUpdateField = useCallback((id: string, field: keyof CharacterDecision, value: string) => {
    setCharacters(prev => prev.map(char => 
      char.id === id ? { ...char, [field]: value } : char
    ));
  }, []);

  const handleSaveField = useCallback(async (id: string, field: keyof CharacterDecision, value: string) => {
    const updatedCharacters = characters.map(char =>
      char.id === id ? { ...char, [field]: value } : char
    );
    await saveCharacters(updatedCharacters);
  }, [characters, saveCharacters]);

  const addCharacter = () => {
    const newCharacter = {
      id: crypto.randomUUID(),
      name: '',
      arcType: '',
      decisions: '',
      influences: ''
    };
    const newCharacters = [...characters, newCharacter];
    setCharacters(newCharacters);
    saveCharacters(newCharacters);
  };

  const removeCharacter = async (id: string) => {
    if (characters.length > 1) {
      const updatedCharacters = characters.filter(char => char.id !== id);
      setCharacters(updatedCharacters);
      await saveCharacters(updatedCharacters);
    }
  };

  if (!currentProject) {
    return (
      <div className="text-center text-gray-600 p-4">
        Please select or create a project to start developing characters.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Character Development</h2>
      <CharacterInstructions />
      
      <div className="space-y-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            {...character}
            onUpdateField={(field, value) => handleUpdateField(character.id, field as keyof CharacterDecision, value)}
            onSaveField={(field, value) => handleSaveField(character.id, field as keyof CharacterDecision, value)}
            onRemove={() => removeCharacter(character.id)}
          />
        ))}

        <button
          onClick={addCharacter}
          className="w-full py-3 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          Add Another Character
        </button>
      </div>
    </div>
  );
};