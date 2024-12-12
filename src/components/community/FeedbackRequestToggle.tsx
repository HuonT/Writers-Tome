import React from 'react';
import { MessageSquare } from 'lucide-react';

interface FeedbackRequestToggleProps {
  isRequesting: boolean;
  onToggle: (value: boolean) => void;
}

export const FeedbackRequestToggle: React.FC<FeedbackRequestToggleProps> = ({
  isRequesting,
  onToggle
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isRequesting}
          onChange={(e) => onToggle(e.target.checked)}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
        <div className="flex items-center ml-3">
          <MessageSquare className="w-4 h-4 mr-1 text-emerald-600" />
          <span className="text-sm font-medium text-gray-900">Request Feedback</span>
        </div>
      </label>
    </div>
  );
};