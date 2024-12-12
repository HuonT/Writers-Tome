import React from 'react';
import { Badge } from '../../../lib/types';
import * as Icons from 'lucide-react';

interface BadgeDisplayProps {
  badges: Badge[];
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {badges.map((badge) => {
        const Icon = (Icons as any)[badge.icon];
        return (
          <div
            key={badge.id}
            className={`flex items-center p-4 rounded-lg ${
              badge.earned
                ? 'bg-emerald-50 border border-emerald-200'
                : 'bg-gray-100 border border-gray-200'
            }`}
          >
            <div className={`p-2 rounded-full ${
              badge.earned ? 'bg-emerald-100' : 'bg-gray-200'
            }`}>
              <Icon className={`w-6 h-6 ${
                badge.earned ? 'text-emerald-600' : 'text-gray-400'
              }`} />
            </div>
            <div className="ml-3">
              <h4 className={`font-medium ${
                badge.earned ? 'text-emerald-900' : 'text-gray-500'
              }`}>
                {badge.name}
              </h4>
              <p className={`text-sm ${
                badge.earned ? 'text-emerald-600' : 'text-gray-400'
              }`}>
                {badge.description}
              </p>
              {badge.earnedAt && (
                <p className="text-xs text-emerald-500 mt-1">
                  Earned {new Date(badge.earnedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};