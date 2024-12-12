import { Module, CategoryInfo } from './types';

export const modules: Module[] = [
  {
    id: 'plot',
    title: 'Plot Development',
    description: 'Master the art of crafting compelling storylines and narrative arcs',
    icon: 'BookOpen',
    progress: 0,
    totalTopics: 3,
    totalExercises: 3,
    stage: 1
  },
  {
    id: 'characters',
    title: 'Character Creation',
    description: 'Develop memorable characters with depth and authenticity',
    icon: 'Users',
    progress: 0,
    totalTopics: 4,
    totalExercises: 1,
    stage: 2
  },
  {
    id: 'themes',
    title: 'Thematic Elements',
    description: 'Explore and weave meaningful themes throughout your story',
    icon: 'Lightbulb',
    progress: 0,
    totalTopics: 4,
    totalExercises: 1,
    stage: 3
  },
  {
    id: 'worldbuilding',
    title: 'World Building',
    description: 'Create rich and immersive settings for your narrative',
    icon: 'Globe',
    progress: 0,
    totalTopics: 8,
    totalExercises: 8,
    stage: 4
  }
];

// Topics and exercises have equal weight in progress calculation
export const TOPIC_WEIGHT = 0.5; // Topics are worth 50% of module progress
export const EXERCISE_WEIGHT = 0.5; // Exercises are worth 50% of module progress

export const POST_CATEGORIES: CategoryInfo[] = [
  {
    id: 'plot',
    label: 'Plot Development',
    description: 'Discuss story structure, plot devices, and narrative techniques',
    icon: 'BookOpen'
  },
  {
    id: 'characters',
    label: 'Character Creation',
    description: 'Share character development tips and get feedback on your characters',
    icon: 'Users'
  },
  {
    id: 'themes',
    label: 'Thematic Elements',
    description: 'Explore theme development and symbolic storytelling',
    icon: 'Lightbulb'
  },
  {
    id: 'worldbuilding',
    label: 'World Building',
    description: 'Create and discuss immersive story settings and environments',
    icon: 'Globe'
  },
  {
    id: 'workshop',
    label: 'Workshop for Writers',
    description: 'Get feedback on your writing and help others improve',
    icon: 'PenTool'
  },
  {
    id: 'self-publishing',
    label: 'Self Publishing',
    description: 'Share experiences and advice about self-publishing',
    icon: 'Upload'
  },
  {
    id: 'traditional-publishing',
    label: 'Traditional Publishing',
    description: 'Discuss traditional publishing paths and experiences',
    icon: 'BookMarked'
  },
  {
    id: 'writers-chatter',
    label: "Writer's Chatter",
    description: 'General discussion about the writing life',
    icon: 'MessageSquare'
  },
  {
    id: 'writing-tips',
    label: 'Writing Tips',
    description: 'Share and discover general writing advice and techniques',
    icon: 'Lightbulb'
  }
];