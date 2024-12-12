import { Badge } from './types';

export const badges: Badge[] = [
  // Plot Badges
  {
    id: 'plot-strategist',
    moduleId: 'plot',
    name: 'Master Strategist',
    description: 'Created your first plot outline',
    icon: 'BookOpen',
    earned: false
  },
  {
    id: 'plot-architect',
    moduleId: 'plot',
    name: 'Story Architect',
    description: 'Completed the plot development quiz',
    icon: 'Building',
    earned: false
  },
  
  // Character Badges
  {
    id: 'character-creator',
    moduleId: 'characters',
    name: 'Character Creator',
    description: 'Created your first character profile',
    icon: 'Users',
    earned: false
  },
  {
    id: 'arc-master',
    moduleId: 'characters',
    name: 'Arc Master',
    description: 'Completed the character development quiz',
    icon: 'LineChart',
    earned: false
  },
  
  // Theme Badges
  {
    id: 'theme-weaver',
    moduleId: 'themes',
    name: 'Theme Weaver',
    description: 'Created your first theme profile',
    icon: 'Lightbulb',
    earned: false
  },
  {
    id: 'emotional-resonator',
    moduleId: 'themes',
    name: 'Emotional Resonator',
    description: 'Completed the theme development quiz',
    icon: 'Heart',
    earned: false
  },

  // World Building Exercise Badges
  {
    id: 'world-scale',
    moduleId: 'worldbuilding',
    name: 'World Architect',
    description: 'Completed the world scale exercise',
    icon: 'Globe',
    earned: false
  },
  {
    id: 'environment-master',
    moduleId: 'worldbuilding',
    name: 'Geologist',
    description: 'Completed the environment mapping exercise',
    icon: 'Mountain',
    earned: false
  },
  {
    id: 'magic-weaver',
    moduleId: 'worldbuilding',
    name: 'Magician',
    description: 'Completed the magic system design exercise',
    icon: 'Sparkles',
    earned: false
  },
  {
    id: 'culture-sage',
    moduleId: 'worldbuilding',
    name: 'Culture Sage',
    description: 'Completed the culture development exercise',
    icon: 'Users',
    earned: false
  },
  {
    id: 'power-strategist',
    moduleId: 'worldbuilding',
    name: 'Power Strategist',
    description: 'Completed the power structure exercise',
    icon: 'Crown',
    earned: false
  },
  {
    id: 'lore-keeper',
    moduleId: 'worldbuilding',
    name: 'Lore Keeper',
    description: 'Completed the history development exercise',
    icon: 'Scroll',
    earned: false
  },
  {
    id: 'guild-master',
    moduleId: 'worldbuilding',
    name: 'Guild Master',
    description: 'Completed the crafts and occupations exercise',
    icon: 'Hammer',
    earned: false
  },
  {
    id: 'conflict-weaver',
    moduleId: 'worldbuilding',
    name: 'Troublemaker',
    description: 'Completed the world tensions exercise',
    icon: 'Swords',
    earned: false
  }
];

export const getModuleBadges = (moduleId: string): Badge[] => {
  return badges.filter(badge => badge.moduleId === moduleId);
};

export const calculateBadgeProgress = (
  moduleId: string,
  completedItems: number,
  totalItems: number,
  isQuiz: boolean = false
): Badge[] => {
  const moduleBadges = getModuleBadges(moduleId);

  // For worldbuilding module, award badge for each completed exercise
  if (moduleId === 'worldbuilding') {
    const exerciseIndex = completedItems - 1;
    if (exerciseIndex >= 0 && exerciseIndex < moduleBadges.length) {
      moduleBadges[exerciseIndex].earned = true;
      moduleBadges[exerciseIndex].earnedAt = new Date().toISOString();
    }
    return moduleBadges;
  }

  // For other modules, award first badge for exercise completion
  // and second badge for quiz completion
  if (isQuiz) {
    // Award second badge for completing quiz
    if (completedItems === totalItems) {
      moduleBadges[1].earned = true;
      moduleBadges[1].earnedAt = new Date().toISOString();
    }
  } else {
    // Award first badge for completing first exercise/profile
    moduleBadges[0].earned = true;
    moduleBadges[0].earnedAt = new Date().toISOString();
  }

  return moduleBadges;
};