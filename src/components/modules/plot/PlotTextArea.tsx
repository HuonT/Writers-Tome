import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

interface PlotTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSave: (value: string) => Promise<void>;
  placeholder?: string;
}

export const PlotTextArea: React.FC<PlotTextAreaProps> = ({
  value,
  onChange,
  onSave,
  placeholder
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const debouncedValue = useDebounce(localValue, 1000);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const saveContent = async () => {
      if (debouncedValue === value) return;
      
      setIsSaving(true);
      try {
        await onSave(debouncedValue);
        onChange(debouncedValue);
      } catch (error) {
        console.error('Error saving content:', error);
      } finally {
        setIsSaving(false);
      }
    };

    saveContent();
  }, [debouncedValue, onSave, onChange, value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
  };

  return (
    <div className="relative">
      <textarea
        value={localValue}
        onChange={handleChange}
        className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        placeholder={placeholder}
      />
      {isSaving && (
        <span className="absolute bottom-4 right-4 text-sm text-gray-500">
          Saving...
        </span>
      )}
    </div>
  );
};