import React, { useState, useEffect } from 'react';
import { CharacterTextArea } from './CharacterTextArea';
import { useDebounce } from '../../../hooks/useDebounce';
import { ConfirmDialog } from '../../ui/ConfirmDialog';

interface CharacterCardProps {
  name: string;
  arcType: string;
  decisions: string;
  influences: string;
  onUpdateField: (field: string, value: string) => void;
  onSaveField: (field: string, value: string) => Promise<void>;
  onRemove: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  arcType,
  decisions,
  influences,
  onUpdateField,
  onSaveField,
  onRemove
}) => {
  const [customArchetype, setCustomArchetype] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const debouncedArchetype = useDebounce(customArchetype, 1000);

  const arcTypes = [
    'The Hero',
    'The Heroine',
    'The Sidekick',
    'The Mentor',
    'The Trickster',
    'The Wise Old Sage',
    'The Villain',
    'The Anti-Hero',
    'The Rebel',
    'The Innocent',
    'The Caregiver',
    'Other'
  ];

  useEffect(() => {
    if (arcType && !arcTypes.includes(arcType)) {
      setShowCustomInput(true);
      setCustomArchetype(arcType);
    } else {
      setShowCustomInput(false);
      setCustomArchetype('');
    }
  }, [arcType]);

  useEffect(() => {
    const saveArchetype = async () => {
      if (debouncedArchetype === arcType) return;
      
      setIsSaving(true);
      try {
        await onSaveField('arcType', debouncedArchetype);
        onUpdateField('arcType', debouncedArchetype);
      } catch (error) {
        console.error('Error saving archetype:', error);
      } finally {
        setIsSaving(false);
      }
    };

    if (showCustomInput && debouncedArchetype) {
      saveArchetype();
    }
  }, [debouncedArchetype, arcType, onSaveField, onUpdateField, showCustomInput]);

  const handleArchetypeChange = (value: string) => {
    if (value === 'Other') {
      setShowCustomInput(true);
      setCustomArchetype('');
      onUpdateField('arcType', '');
    } else {
      setShowCustomInput(false);
      setCustomArchetype('');
      onUpdateField('arcType', value);
      onSaveField('arcType', value);
    }
  };

  const handleCustomArchetypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomArchetype(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Character Name"
          value={name}
          onChange={(e) => onUpdateField('name', e.target.value)}
          className="text-lg font-semibold text-gray-900 border-b-2 border-transparent focus:border-emerald-500 focus:outline-none"
        />
        <button
          onClick={() => setShowConfirmDialog(true)}
          className="text-gray-400 hover:text-red-500"
        >
          Remove
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Character Archetype
          </label>
          <select
            value={showCustomInput ? 'Other' : arcType}
            onChange={(e) => handleArchetypeChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Select an archetype...</option>
            {arcTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          {showCustomInput && (
            <div className="relative mt-2">
              <input
                type="text"
                value={customArchetype}
                onChange={handleCustomArchetypeChange}
                placeholder="Enter custom archetype"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              {isSaving && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  Saving...
                </span>
              )}
            </div>
          )}
        </div>

        <CharacterTextArea
          label="Key Decisions and Actions"
          value={decisions}
          onChange={(value) => onUpdateField('decisions', value)}
          onSave={(value) => onSaveField('decisions', value)}
          placeholder="List the main decisions and actions this character will make throughout the story..."
        />

        <CharacterTextArea
          label="Influence on Other Characters"
          value={influences}
          onChange={(value) => onUpdateField('influences', value)}
          onSave={(value) => onSaveField('influences', value)}
          placeholder="Describe how this character's decisions will affect other characters..."
        />
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={onRemove}
        title="Remove Character"
        message="Are you sure you want to remove this character? This action cannot be undone."
        confirmText="Remove"
      />
    </div>
  );
};