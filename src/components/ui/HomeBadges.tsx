import React, { useState, useEffect } from 'react';
import { Badge } from '../../lib/types';
import { 
  BookOpen, Building, Users, LineChart, Lightbulb, Heart,
  Globe, Mountain, Sparkles, Crown, Scroll, Hammer, Swords
} from 'lucide-react';
import { badges } from '../../lib/badges';
import { getUserBadges } from '../../lib/utils/badgeUtils';
import { useAuth } from '../../contexts/AuthContext';

const iconMap = {
  BookOpen,
  Building,
  Users,
  LineChart,
  Lightbulb,
  Heart,
  Globe,
  Mountain,
  Sparkles,
  Crown,
  Scroll,
  Hammer,
  Swords
};

export const HomeBadges: React.FC = () => {
  const { currentUser } = useAuth();
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBadges = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      
      try {
        const userBadges = await getUserBadges(currentUser.uid);
        setEarnedBadges(userBadges);
      } catch (error) {
        console.error('Error loading badges:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBadges();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievement Badges</h2>
        <div className="flex justify-center">
          <p className="text-gray-500">Loading badges...</p>
        </div>
      </div>
    );
  }

  const earnedBadgeIds = earnedBadges.map(b => b.id);
  const allBadges = badges.map(badge => ({
    ...badge,
    earned: earnedBadgeIds.includes(badge.id)
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievement Badges</h2>
      <div className="flex flex-wrap gap-4">
        {allBadges.map((badge) => {
          const Icon = iconMap[badge.icon as keyof typeof iconMap];
          return Icon ? (
            <div
              key={badge.id}
              className="flex flex-col items-center"
              title={badge.description}
            >
              <div className={`p-3 rounded-full mb-2 ${
                badge.earned ? 'bg-emerald-100' : 'bg-gray-200'
              }`}>
                <Icon className={`w-6 h-6 ${
                  badge.earned ? 'text-emerald-600' : 'text-gray-400'
                }`} />
              </div>
              <span className={`text-sm font-medium text-center ${
                badge.earned ? 'text-emerald-900' : 'text-gray-500'
              }`}>
                {badge.name}
              </span>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};