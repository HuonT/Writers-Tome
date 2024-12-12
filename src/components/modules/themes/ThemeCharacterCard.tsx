import React, { useState, useEffect } from 'react';
import { ThemeTextArea } from './ThemeTextArea';
import { ConfirmDialog } from '../../ui/ConfirmDialog';
import { useDebounce } from '../../../hooks/useDebounce';

interface ThemeCharacterCardProps {
  id: string;
  name: string;
  leftSide: string;
  rightSide: string;
  resolution: string;
  onUpdateField: (field: string, value: string) => void;
  onSaveField: (field: string, value: string) => Promise<void>;
  onRemove: () => void;
}

export const ThemeCharacterCard: React.FC<ThemeCharacterCardProps> = ({
  name,
  leftSide,
  rightSide,
  resolution,
  onUpdateField,
  onSaveField,
  onRemove
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [localName, setLocalName] = useState(name);
  const [isSaving, setIsSaving] = useState(false);
  const debouncedName = useDebounce(localName, 1000);

  useEffect(() => {
    setLocalName(name);
  }, [name]);

  useEffect(() => {
    const saveName = async () => {
      if (debouncedName === name) return;
      
      setIsSaving(true);
      try {
        await onSaveField('name', debouncedName);
        onUpdateField('name', debouncedName);
      } catch (error) {
        console.error('Error saving name:', error);
      } finally {
        setIsSaving(false);
      }
    };

    saveName();
  }, [debouncedName, onSaveField, onUpdateField, name]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            placeholder="Character Name"
            className="text-lg font-semibold text-gray-900 border-b-2 border-transparent focus:border-emerald-500 focus:outline-none w-full"
          />
          {isSaving && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              Saving...
            </span>
          )}
        </div>
        <button
          onClick={() => setShowConfirmDialog(true)}
          className="text-gray-400 hover:text-red-500 ml-4"
        >
          Remove
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ThemeTextArea
          label="Current State / Comfort Zone"
          value={leftSide}
          onChange={(value) => onUpdateField('leftSide', value)}
          onSave={(value) => onSaveField('leftSide', value)}
          placeholder="e.g., belonging, comfort, security"
        />

        <ThemeTextArea
          label="Growth / Transformation"
          value={rightSide}
          onChange={(value) => onUpdateField('rightSide', value)}
          onSave={(value) => onSaveField('rightSide', value)}
          placeholder="e.g., personal growth, challenge"
        />

        <ThemeTextArea
          label="Resolution / Outcome"
          value={resolution}
          onChange={(value) => onUpdateField('resolution', value)}
          onSave={(value) => onSaveField('resolution', value)}
          placeholder="e.g., acceptance of necessary changes"
        />
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={onRemove}
        title="Remove Character Theme"
        message="Are you sure you want to remove this character's theme profile? This action cannot be undone."
        confirmText="Remove"
      />
    </div>
  );
};