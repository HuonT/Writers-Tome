import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

interface ThemeTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSave: (value: string) => Promise<void>;
  placeholder?: string;
  label: string;
}

export const ThemeTextArea: React.FC<ThemeTextAreaProps> = ({
  value,
  onChange,
  onSave,
  placeholder,
  label
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
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <textarea
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        {isSaving && (
          <span className="absolute bottom-2 right-2 text-sm text-gray-500">
            Saving...
          </span>
        )}
      </div>
    </div>
  );
};